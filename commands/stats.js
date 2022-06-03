const discord = require("discord.js");
os = require("os");

module.exports = {
   name: "stats",
   description: "Show stats of this bot!",
   run: async (client, message, args) => {
      let embed = new discord.MessageEmbed()
         .setTimestamp()
         .addField(
            `:map: Number of actif servers`,
            `${client.guilds.cache.size}`,
            true
         )
         .addField(
            `:bust_in_silhouette: Number of users`,
            `${client.users.cache.size}`,
            true
         )
         .addField(
            `:speech_balloon:  amount of channel(s)`,
            `${client.channels.cache.size}`,
            true
         )
         .addField(`:desktop: Operating system`, `${os.platform()}`, true)
         .addField(`:gear: Architecture`, `${os.arch()}`, true)
         .addField(
            `:rocket:  CPU`,
            `${os.cpus().map((i) => `${i.model}`)[0]}`,
            true
         )
         .addField(
            `:pager: RAM`,
            `${Math.trunc(
               process.memoryUsage().heapUsed / 1024 / 1000
            )} MB / ${Math.trunc(os.totalmem() / 1024 / 1000)} MB (${Math.round(
               (Math.round(process.memoryUsage().heapUsed / 1024 / 1024) /
                  Math.round(os.totalmem() / 1024 / 1024)) *
                  100
            )}%)`,
            true
         )
         .addField(`:dividers: Lib`, `discord.js ${discord.version}`, true)
         .addField(
            `:alarm_clock: connected since`,
            "" +
               Math.round(client.uptime / (1000 * 60 * 60)) +
               " Hours, " +
               (Math.round(client.uptime / (1000 * 60)) % 60) +
               " minutes and " +
               (Math.round(client.uptime / 1000) % 60) +
               " secondes" +
               ""
         );

      message.channel.send(embed);
   },
};
