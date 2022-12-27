// When an error occurs, we want to reply to the message that triggered it.
// Therefor we need the `discord-reply` package to reply to the message.
require('discord-reply');

const discord = require("discord.js");
const axios = require("axios");

const { prefix } = require("./../config.json");

module.exports = {
    name: "category",
    description: "Tell a joke from a specific category!",
    run: async (client, message, args) => {
        const FetchJoke = async (category) => {
            try {
                const categories = [
                    "programming",
                    "misc",
                    "dark",
                    "pun",
                    "spooky",
                    "christmas",
                ];

                // Check if a category was provided.
                // If not, error out.
                if (category === "" || category === undefined) {
                    throw new Error("No category specified.");
                }

                // Check if the category is valid.
                // If not, error out.
                if (!categories.includes(category.toLowerCase()))
                    throw new Error(`Invalid category: '${category}'`);

                // Fetch a random joke from the API.
                // When the joke was requested in a nsfw channel, the API is allowed return a NSFW joke.
                const response = await axios.get(
                    `https://v2.jokeapi.dev/joke/${category}${
                        message.channel.nsfw ? "" : "?blacklistFlags=nsfw"
                    }`
                );

                // Check if the API successfully returned a joke.
                if (response)
                    console.log(
                        `${new Date()}: \x1b[32mJoke successfully fetched.\x1b[0m`
                    );
                else throw new Error("Failed to fetch joke.");

                // Check if the returned joke has a setup and a punchline.
                // Send the coresponding embeded message.
                if (response.data.type === "single") {
                    const embed = new discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle(
                            response.data.category +
                                `${response.data.flags.nsfw ? " (NSFW)" : ""}`
                        )
                        .setDescription(response.data.joke)
                        .setFooter(
                            `${message.author.username}`,
                            message.author.displayAvatarURL()
                        );
                    message.channel.send(embed);
                } else {
                    const embed = new discord.MessageEmbed()
                        .setColor("RANDOM")
                        .setTitle(
                            response.data.category +
                                `${response.data.flags.nsfw ? " (NSFW)" : ""}`
                        )
                        .setDescription(
                            response.data.setup +
                                "\n\n" +
                                response.data.delivery
                        )
                        .setFooter(
                            `${message.author.username}`,
                            message.author.displayAvatarURL()
                        );
                    message.channel.send(embed);
                }
            } catch (err) {
                console.error(`${new Date()}: \x1b[31m${err.message}\x1b[0m`);

                // Respond with an error message.
                const embed = new discord.MessageEmbed()
                    .setColor("#FF0000")
                    .setTitle("Error:")
                    .setDescription(
                        `${err.message}\nUse ${prefix}help for more info.`
                    )
                    .setFooter(
                        `${message.author.username}`,
                        message.author.displayAvatarURL()
                    );

                // Send a reply to the message that triggered the error.
                // The reply will mention so he's more likely to see it.
                message.lineReply(embed);
            }
        };

        FetchJoke(args[0]);
    },
};
