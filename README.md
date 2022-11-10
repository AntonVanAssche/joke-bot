<div align="center">
    <h1>
        Joke-bot
    </h1>
    <p align="center">
    Simple Discord bot to tell random jokes.
        <br/>
        <strong>·</strong>
        <a href="https://github.com/AntonVanAssche/joke-bot/issues">Report Bug</a>
        <strong>·</strong>
        <a href="https://github.com/AntonVanAssche/joke-bot/issues">Request Feature</a>
    </p>
    <p align="center">
        <a href="https://github.com/AntonVanAssche/joke-bot/graphs/contributors">
            <img src="https://img.shields.io/github/contributors/AntonVanAssche/joke-bot.svg?style=for-the-badge">
        </a>
        <a href="https://github.com/AntonVanAssche/joke-bot/network/members">
            <img src="https://img.shields.io/github/forks/AntonVanAssche/joke-bot.svg?style=for-the-badge">
        </a>
        <a href="https://github.com/AntonVanAssche/AntonVanAssche/joke-bot">
            <img src="https://img.shields.io/github/stars/AntonVanAssche/joke-bot.svg?style=for-the-badge">
        </a>
        <a href="https://github.com/AntonVanAssche/AntonVanAssche/joke-bot">
            <img src="https://img.shields.io/github/issues/AntonVanAssche/joke-bot.svg?style=for-the-badge">
        </a>
        <a href="https://github.com/AntonVanAssche/joke-bot/blob/master/LICENSE.md">
            <img src="https://img.shields.io/github/license/AntonVanAssche/joke-bot.svg?style=for-the-badge">
        </a>
</div>

<img src="assets/preview.gif" alt="preview" align="right" style="padding: 30px;">

## How it works

The bot makes use of the [JokeAPI](https://jokeapi.dev/) to get the random jokes. This is a REST API, which means that it can be used without any API token, membership, registration or payment.
The API is also highly customizable, this is due to the fact that it supports a variety of filters that can be applied to get just the right jokes you need. This makes it the perfect API for this kinds of projects.

To use the `meme` command, you need to set up an API that returns Reddit posts in JSON format. 
If you don't want to make it yourself, you can use [RedditAPI](https://github.com/AntonVanAssche/RedditAPI), which is an API I made especially for this bot. 
Be aware, this API is intended to be hosted locally.

## Commands

Underneath you will find a list of commands that the bot can use.

-  `!help`: Shows this help message.
-  `!ping`: Pong!
-  `!stats`: Shows the bot's stats.
-  `!joke`: Get a random joke.
-  `!category <category>`: Get a random joke from a specific category.
    -  categories: `programming`, `misc`, `dark`, `pun`, `spooky`, `christmas`
-  `!meme`: Get a random meme from Reddit.

Do you have a recommendation for a new command? Feel free to [submit it here](https://github.com/AntonVanAssche/joke-bot/issues/new).

## How to install

You can install te bot by entering the following commands in your terminal:

```bash
$ git clone https://github.com/AntonVanAssche/joke-bot.git # Clone the repository
$ cd joke-bot # Go to the directory
$ npm install # Install the dependencies
```

Once you have successfully cloned the project and installed the dependencies, you'll have to update the `config.json` file with your bot token.
You can find the token in the [Bot Settings](https://discordapp.com/developers/applications/me) of your bot under the `Bot` tab.
If you wish to change the prefix of the bot, you can do so in the `config.json` file. This is by default `!`.

```json
{
    "prefix": "---YOUR-BOT-PREFIX---",
    "token": "---PLACE-YOUR-TOKEN-HERE---"
}
```

Once you have successfully configured the `config.json` file, you can start the bot by running the following command in your terminal:

```bash
$ cd src/
$ node ./index.js
```

That's it! You can now use the bot by sending a message to the bot with the `!joke` command.
If you encountered any issues while installing the bot, feel free to [report them here](https://github.com/AntonVanAssche/joke-bot/issues/new).

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag `enhancement`.
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for more information.

## Feedback

This project isn't perfect, therefore suggestions/improvements are always [welcome](https://github.com/AntonVanAssche/joke-bot/issues)!
