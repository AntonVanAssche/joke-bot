const discord = require("discord.js");
const axios = require("axios");

const { prefix } = require("./../config.json");

module.exports = {
    name: "meme",
    description: "Get a random meme from Reddit!",
    run: async (client, message, args) => {
        const FetchMeme = async (category) => {
            try {
                // Select a random subreddit from the array.
                var subs = [
                    "dankmemes",
                    "memes",
                    "AdviceAnimals",
                    "MemeEconomy",
                    "me_irl",
                    "ComedyCemetery",
                    "terriblefacebookmemes"
                ];
                const randomsub = subs[Math.floor(Math.random() * subs.length)];

                // Fetch a random meme from the API.
                const response = await axios.get(
                    `http://127.0.0.1:5000/${randomsub}`
                );

                // Check if the API successfully returned a joke.
                if (response)
                    console.log(
                        `${new Date()}: \x1b[32mMeme successfully fetched.\x1b[0m`
                    );
                else throw new Error("Failed to fetch joke.");

                const embed = new discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(
                        `${response.data.title}${response.data.nsfw ? " (NSFW)" : ""}`
                    )
                    .setImage(
                        response.data.image_previews[
                            Object.keys(response.data.image_previews)[
                                Object.keys(response.data.image_previews).length - 1
                            ]
                        ]
                    )
                    .setDescription(
                        `Up votes: ${response.data.ups}\nOriginal post: ${response.data.post_link}`
                    )
                    .setFooter(`Meme provided by r/${response.data.subreddit}`);
                message.channel.send(embed);
            } catch (err) {
                console.error(`${new Date()}: \x1b[31m${err.message}\x1b[0m`);

                // Respond with an error message.
                const embed = new discord.MessageEmbed()
                    .setColor("#FF0000")
                    .setTitle("Error:")
                    .setDescription(
                        `${err.message}


                    Use ${prefix}help for more info.`
                    )
                    .setFooter(
                        `${message.author.username}`,
                        message.author.displayAvatarURL()
                    );
                message.reply(embed);
            }
        };

        FetchMeme();
    },
};
