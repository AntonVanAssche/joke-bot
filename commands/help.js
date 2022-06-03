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
            `help: Show this help message.\nping: Check the bot's ping.\nstats: Check the bot's stats.\njoke: Get a random joke.\ncategory: Get a random joke from a specific category.\nmeme: Get a random meme from Reddit.\n`
         )
         .addField(
            `List of categories :`,
            `"Programming", "Misc", "Dark", "Pun", "Spooky", "Christmas"`
         )
         .setTimestamp();
      message.channel.send(help);
   },
};
