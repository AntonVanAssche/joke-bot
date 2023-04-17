// When an error occurs, we want to reply to the message that triggered it.
// Therefor we need the `discord-reply` package to reply to the message.
require("discord-reply");

const discord = require("discord.js");

const { prefix } = require("./../config.json");

module.exports = {
    name: "lovemeter",
    description: "Displays love meter between two users.",
    run: async (client, message, args) => {
        try {
            if (message.mentions.users.size < 1)
                throw new Error("Please provide at least one user.");

            if (message.mentions.users.size > 2)
                throw new Error("Please provide at most two users.");

            let target1 = message.mentions.users.first();
            const target2 = message.mentions.users.last();

            if (target1.id === target2.id) target1 = message.author;

            const loveMeter = Math.floor(Math.random() * 101);
            const loveMeterEmoji = "❤️";
            const loveMeterIndex = loveMeterEmoji.repeat(loveMeter / 10);

            const embed = new discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(
                    `${
                        loveMeter >= 90
                            ? "Get a room! And don't forget to invite me!"
                            : loveMeter >= 80
                            ? "Looks like someone's found their lobster!"
                            : loveMeter >= 70
                            ? "You two are like a match made in heaven, or Tinder?"
                            : loveMeter >= 60
                            ? "I haven't seen a connection this strong since Wi-Fi."
                            : loveMeter >= 50
                            ? "Friends with benefits? Can I be your wingman?"
                            : loveMeter >= 40
                            ? "At least you won't have to worry about 'we were on a break' drama!"
                            : loveMeter >= 30
                            ? "Maybe try dating your ex's ex... just a thought."
                            : loveMeter >= 20
                            ? "Well, it's not the worst match I've seen... but it's close."
                            : loveMeter >= 10
                            ? "Uh oh, I think you should start swiping left..."
                            : "Well, at least you're not enemies... yet."
                    }`
                )
                .setDescription(
                    `<@${target1.id}> and <@${target2.id}> are ${loveMeter}% in love!\n${loveMeterIndex}`
                )
                .setFooter(
                    `${message.author.username}`,
                    message.author.displayAvatarURL()
                );

            message.channel.send(embed);
        } catch (err) {
            console.error(
                `${new Date()}: \x1b[31m'${prefix}lovemeter' triggered an error: ${
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
