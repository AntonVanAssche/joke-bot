const discord = require("discord.js");
const client = new discord.Client();
const fs = require("fs");
const config = require("./config.json");

client.config = require("./config.json");   // Config file.
client.commands = new discord.Collection(); // Collection of commands.
client.aliases = new discord.Collection();  // Collection of aliases.

// Read the commands directory.
fs.readdir("./commands/", (err, files) => {
    // Log an error if the directory can't be read.
    if (err) return console.log("Could not find any commands!");

    // Filter the files to only get .js files.
    const jsFiles = files.filter((f) => f.split(".").pop() === "js");

    // Log an error if there are no commands found.
    // AKA: if there are no .js files in the commands directory.
    if (jsFiles.length <= 0) return console.log("Could not find any commands!");

    // Import all of the commands.
    jsFiles.forEach((file) => {
        const cmd = require(`./commands/${file}`);

        // Add the command to the collection.
        console.log(`Loaded ${file}`);
        client.commands.set(cmd.name, cmd);

        // Check whether the command has aliases.
        // If it does, add them to the aliases collection.
        if (cmd.aliases)
            cmd.aliases.forEach((alias) => client.aliases.set(alias, cmd.name));
    });
});

// When the bot is ready, log a message.
client.on("ready", () => {
    console.log(
        `${new Date()}: \x1b[32mLogged in as ${client.user.tag}!\x1b[0m`
    );
    client.user.setActivity("@Joke-bot");
});

// When the bot receives a message.
client.on("message", async (message) => {
    const prefix = config.prefix;

    // Ignore messages from other bots or that don't start with the prefix.
    if (message.author.bot || !message.content.startsWith(prefix)) return;

    // Split the message into arguments.
    const args = message.content.slice(prefix.length).trim().split(/ +/g);

    // Extract the command name from the arguments.
    const command = args.shift().toLowerCase();

    // Retrieve the command from the collection, either by name or alias.
    const cmd =
        client.commands.get(command) ||
        client.commands.get(client.aliases.get(command));

    // If the command doesn't exist, return.
    if (!cmd) return;

    // Try running the command.
    // If there is an error, log it.
    try {
        cmd.run(client, message, args);
    } catch (e) {
        console.error(e);
        message.reply(`Error: ${e}`);
    }
});

// Log the bot in.
client.login(config.token);
