const discord = require("discord.js");
const client = new discord.Client();
const fs = require("fs");
const config = require("./config.json");

client.config = require("./config.json");
client.commands = new discord.Collection();
client.aliases = new discord.Collection();
client.emotes = config.emoji;

fs.readdir("./commands/", (err, files) => {
    if (err) return console.log("Could not find any commands!");
    const jsFiles = files.filter((f) => f.split(".").pop() === "js");
    if (jsFiles.length <= 0) return console.log("Could not find any commands!");
    jsFiles.forEach((file) => {
        const cmd = require(`./commands/${file}`);
        console.log(`Loaded ${file}`);
        client.commands.set(cmd.name, cmd);
        if (cmd.aliases)
            cmd.aliases.forEach((alias) => client.aliases.set(alias, cmd.name));
    });
});

client.on("ready", () => {
    console.log(`${new Date()}: \x1b[32mLogged in as ${client.user.tag}!\x1b[0m`);
    client.user.setActivity("@Joke-bot");
});

client.on("message", async (message) => {
    const prefix = config.prefix;
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd =
        client.commands.get(command) ||
        client.commands.get(client.aliases.get(command));
    if (!cmd) return;
    try {
        cmd.run(client, message, args);
    } catch (e) {
        console.error(e);
        message.reply(`Error: ${e}`);
    }
});

client.login(config.token);
