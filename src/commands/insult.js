// When an error occurs, we want to reply to the message that triggered it.
// Therefor we need the `discord-reply` package to reply to the message.
require("discord-reply");

const discord = require("discord.js");
const axios = require("axios");

const { prefix } = require("./../config.json");

module.exports = {
    name: "insult",
    description: "Sends a random insult.",
    run: async (client, message, args) => {
        const FetchInsult = async () => {
            try {
                const response = await axios.get(
                    "https://evilinsult.com/generate_insult.php?lang=en&type=json"
                );

                if (response)
                    console.log(
                        `${new Date()}: \x1b[32mInsult successfully fetched.\x1b[0m`
                    );
                else throw new Error("Failed to fetch insult.");

                // If a user is mentioned, we'll use that user's name in the
                // insult. We will mention the user in the message, so he's
                // the one who gets insulted. MHUAHA HA HA HA HA HA ;D
                const target = message.mentions.users.first();

                const embed = new discord.MessageEmbed()
                    .setColor("RANDOM")
                    .setTitle(
                        `${message.channel.nsfw ? "Fuck YOUUUUUU" : "SHUT UP"}!`
                    )
                    .setDescription(
                        `${
                            target
                                ? "HEY " +
                                  "<@" +
                                  target.id +
                                  ">" +
                                  "! "
                                : ""
                        } ${response.data.insult}`
                    )
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
        };

        // Call the function.to fetch the pickup line.
        FetchInsult();
    },
};
