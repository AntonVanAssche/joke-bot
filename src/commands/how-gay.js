// When an error occurs, we want to reply to the message that triggered it.
// Therefor we need the `discord-reply` package to reply to the message.
require("discord-reply");

const discord = require("discord.js");

const { prefix } = require("./../config.json");

module.exports = {
    name: "how-gay",
    description: "How gay are/is you/your friend?",
    run: async (client, message, args) => {
        try {
            const gayScore = Math.floor(Math.random() * 101);

            // Get the target user.
            const target = message.mentions.users.first() || message.author;

            const embed = new discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`Gay Scoreifier`)
                .setDescription(`<@${target.id}> is ${gayScore}% gay 🌈`)
                .setFooter(
                    `${message.author.username}`,
                    message.author.displayAvatarURL()
                );

            message.channel.send(embed);
        } catch (err) {
            console.error(
                `${new Date()}: \x1b[31m'${prefix}how-gay' triggered an error: ${
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
