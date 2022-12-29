var discord = require("discord.js");
const { prefix } = require("./../config.json");

module.exports = {
    name: "help",
    description: "Get some help!",
    run: async (client, message, args) => {
        var help = new discord.MessageEmbed()
            .setAuthor("Help :")
            .setDescription(`Prefix : ${prefix}`)
            .addField(
                `List of commands :`,
                "`help`: Show this help message.\n`ping`: Check the bot's ping.\n`stats`: Check the bot's stats.\n`joke`: Get a random joke.\n`category`: Get a random joke from a specific category.\n`meme`: Get a random meme from Reddit.\n"
            )
            .addField(
                `List of categories :`,
                `"Programming", "Misc", "Dark", "Pun", "Spooky", "Christmas"`
            )
            .setTimestamp();
        message.channel.send(help);
    },
};
