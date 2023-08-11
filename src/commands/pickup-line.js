// When an error occurs, we want to reply to the message that triggered it.
// Therefor we need the `discord-reply` package to reply to the message.
require("discord-reply");

// This command reuires an API token to work.
// Since we don't want to share our token with the world, we'll store it in a
// '.env' file and use the 'dotenv' package to load it.
require("dotenv").config();

const discord = require("discord.js");
const axios = require("axios");

const { prefix } = require("./../config.json");

module.exports = {
    name: "pickup-line",
    description: "Sends a random pickup line.",
    run: async (client, message, args) => {
        try {
            const options = {
                method: "GET",
                url: "https://pickup-lines-api.p.rapidapi.com/pickupline",
                headers: {
                    "X-RapidAPI-Key": process.env.RAPID_API_TOKEN,
                    "X-RapidAPI-Host": "pickup-lines-api.p.rapidapi.com",
                },
            };

            const response = await axios.request(options);

            if (response)
                console.log(
                    `${new Date()}: \x1b[32mPickup line successfully fetched.\x1b[0m`
                );
            else throw new Error("Failed to fetch pickup line.");

            const embed = new discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(
                    `Oh ${message.channel.nsfw ? "Fuck" : "Charm"} Me Daddy...`
                )
                .setDescription(response.data.line)
                .setFooter(
                    `${message.author.username}`,
                    message.author.displayAvatarURL()
                );

            message.channel.send(embed);
        } catch (err) {
            console.error(
                `${new Date()}: \x1b[31m'${prefix}pickup-line' triggered an error: ${
                    err.message
                }\x1b[0m`
            );

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
    },
};
