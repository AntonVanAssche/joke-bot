// When an error occurs, we want to reply to the message that triggered it.
// Therefor we need the `discord-reply` package to reply to the message.
require("discord-reply");

const discord = require("discord.js");
const axios = require("axios");

const { prefix } = require("./../config.json");

module.exports = {
    name: "meme",
    description: "Get a random meme from Reddit!",
    run: async (client, message, args) => {
        try {
            // Select a random subreddit from the array.
            var subs = [
                "dankmemes",
                "memes",
                "AdviceAnimals",
                "MemeEconomy",
                "me_irl",
                "ComedyCemetery",
                "terriblefacebookmemes",
            ];
            const randomsub = subs[Math.floor(Math.random() * subs.length)];

            // Set `response` and `image` temperarily on `undefined`.
            let response = undefined;
            let image = undefined;

            // Set attempts to 0.
            // We will use this to make sure we don't spam the API with requests.
            let attempts = 0;

            // While no image url has been set fetch another post.
            // This is needed for small subreddits, since these return `NoneType` errors for some reason.
            while (response == undefined || image == undefined) {
                // Allow 3 API requests before giving up.
                if (attempts == 3) {
                    // Throw an error if the maximum amount of attempts has been reached.
                    // This will be caught by the `catch` block.
                    // The catch block will send a message to the channel notifying the user.
                    throw new Error(
                        `Failed to fetch a meme, maximum attempts reached. (attempts: ${attempts}/3)`
                    );
                } else {
                    attempts++;
                }

                // Fetch a random post from the API.
                response = await axios.get(
                    `http://127.0.0.1:5000/${randomsub}`
                );

                if (response.data.code == 200) {
                    image =
                        response.data.image_previews[
                            Object.keys(response.data.image_previews)[
                                Object.keys(response.data.image_previews)
                                    .length - 1
                            ]
                        ];
                    if (image === "No image preview found for this post")
                        image = undefined;
                } else {
                    console.error(
                        `${new Date()}: \x1b[31mFailed to fetch a meme, retrying\x1b[0m... (attempt: ${attempts}/3)`
                    );
                }
            }

            // Check if the API successfully returned a joke.
            if (response)
                console.log(
                    `${new Date()}: \x1b[32mMeme successfully fetched.\x1b[0m`
                );
            else throw new Error("Failed to fetch joke.");

            const embed = new discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(
                    `${response.data.title}${
                        response.data.nsfw ? " (NSFW)" : ""
                    }`
                )
                .setImage(
                    response.data.image_previews[
                        Object.keys(response.data.image_previews)[
                            Object.keys(response.data.image_previews).length - 1
                        ]
                    ]
                )
                .setDescription(
                    `Up votes: ${response.data.ups}\nOriginal post: ${response.data.post_link}`
                )
                .setFooter(`Meme provided by r/${response.data.subreddit}`);
            message.channel.send(embed);
        } catch (err) {
            console.error(
                `${new Date()}: \x1b[31m'${prefix}meme' triggered an error: ${
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
