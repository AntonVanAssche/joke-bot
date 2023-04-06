// When an error occurs, we want to reply to the message that triggered it.
// Therefor we need the `discord-reply` package to reply to the message.
require("discord-reply");

const discord = require("discord.js");

const { prefix } = require("./../config.json");

module.exports = {
    name: "pp-size",
    description: "Let everyone know how big your pp is.",
    run: async (client, message, args) => {
        try {
            // Generate a random number between 1 and 20.
            const ppSize = Math.floor(Math.random() * 20) + 1;

            // Create a string with the size of the pp.
            // Example: '8=====D'
            let pp = "8";
            for (let i = 0; i < ppSize; i++) pp += "=";
            pp += "D";

            // Fill the string with spaces until it's 20 characters long.
            while (pp.length < 20) pp += " ";

            const target = message.mentions.users.first() || message.author;

            const title =
                ppSize > 14
                    ? "Big Meat Stick"
                    : ppSize < 7
                    ? "Small Meat Stick"
                    : "Average Meat Stick";

            const embed = new discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`${title}`)
                .setDescription(`<@${target.id}>'s pp:\n${pp}`)
                .setFooter(
                    `${message.author.username}`,
                    message.author.displayAvatarURL()
                );

            message.channel.send(embed);
        } catch (err) {
            console.error(
                `${new Date()}: \x1b[31m'${prefix}insult' triggered an error: ${
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
