var discord = require("discord.js");

module.exports = {
    name: "ping",
    description: "Ping this bot!",
    run: async (client, message, args) => {
        const ping = new discord.MessageEmbed()
            .setTitle("Ping")
            .setDescription(
                `🏓 Bot latency is ${Date.now() - message.createdTimestamp}ms.`
            );
        message.channel.send(ping);
    },
};
