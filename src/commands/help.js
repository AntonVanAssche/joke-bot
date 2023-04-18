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
                "`help`: Show this help message.\n" +
                    "`ping`: Check the bot's ping.\n" +
                    "`stats`: Check the bot's stats.\n" +
                    "`joke`: Get a random joke.\n" +
                    "`category`: Get a random joke from a specific category.\n" +
                    "`pickup-line`: Get a random pickup line.\n" +
                    "`insult`: Get insulted!\n" +
                    "`compliment`: Get a compliment!\n" +
                    "`pp-size`: Let everyone kow how big your pp is.\n" +
                    "`how-gay`: Let everyone know how _gay_ you are.\n" +
                    "`lovemeter`: Let everyone know how much you love someone.\n" +
                    "`8ball`: Ask the magic 8ball a question.\n" +
                    "`meme`: Get a random meme from Reddit.\n"
            )
            .addField(
                `List of categories :`,
                `"Programming", "Misc", "Dark", "Pun", "Spooky", "Christmas"`
            )
            .setTimestamp();
        message.channel.send(help);
    },
};
