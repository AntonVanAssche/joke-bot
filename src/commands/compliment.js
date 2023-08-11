// When an error occurs, we want to reply to the message that triggered it.
// Therefor we need the `discord-reply` package to reply to the message.
require("discord-reply");

const discord = require("discord.js");
const axios = require("axios");

const { prefix } = require("./../config.json");

module.exports = {
    name: "compliment",
    description: "Sends a random compliment.",
    run: async (client, message, args) => {
        try {
            const response = await axios.get("https://complimentr.com/api");

            if (response)
                console.log(
                    `${new Date()}: \x1b[32mCompliment successfully fetched.\x1b[0m`
                );
            else throw new Error("Failed to fetch compliment.");

            target = message.mentions.users.first() || args[0];

            const titles = [
                "Hey there, sunshine!",
                "Psst, you!",
                "Yoohoo, cutie!",
                "Ahoy there, matey!",
                "Greetings, earthling!",
                "Aloha, beautiful!",
                "Hola, amigo!",
                "Howdy, partner!",
                "Konnichiwa, friend!",
                "Salut, mon ami!",
                "Love you honey!",
            ];

            const randomTitle =
                titles[Math.floor(Math.random() * titles.length)];

            const embed = new discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(randomTitle)
                .setDescription(
                    `${target ? "HEY " + "<@" + target.id + ">" + "! " : ""} ${
                        response.data.compliment
                    }`
                )
                .setFooter(
                    `${message.author.username}`,
                    message.author.displayAvatarURL()
                );

            message.channel.send(embed);
        } catch (err) {
            console.error(
                `${new Date()}: \x1b[31m'${prefix}compliment' triggered an error: ${
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
