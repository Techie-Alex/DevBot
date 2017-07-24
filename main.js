// https://discordapp.com/oauth2/authorize?client_id=330825119582650368&scope=bot&permissions=2146958591
const Discord = require("discord.js"); // npm install --save discord.js
const client = new Discord.Client();
const con = require("./config.json");
const set = require("./settings.json");
client.on("ready", () => {
    client.user.setStatus("online");
    let game = 0;
    setInterval(function () {
        const games = ["🌀 .help 🌀", "🌀 " + client.guilds.size + " servers 🌀", "🌀 " + client.users.size + " users 🌀"];
        client.user.setGame(games[game], "https://www.twitch.tv/#");
        if (game >= games.length - 1) game = 0;
        else game++;
    }, 30000);
    console.log(" ▓▓ DevBot .loaded ▓▓ ");
});
client.on("message", message => {
    if (message.author.bot) return;
    let args = message.content.split(" ");
    if (String(args[0]).match("^[.]{2,}$")) return;
    if (!message.content.startsWith(con.pre)) return;
    console.log("// " + (message.channel.type === "dm" ? "DM" : message.guild.name) + " // " + message.channel.name + " // " + message.author.username + " // " + message.content);
    switch (args[0].toLowerCase()) {
        case con.pre:
            commandPrefix(message, args);
            break;
        case con.pre + "help":
            commandHelp(message, args);
            break;
        case con.pre + "info":
            commandInfo(message, args);
            break;
        case con.pre + "eval":
            commandEval(message, args);
            break;
        case con.pre + "8ball":
            command8Ball(message, args);
            break;
        case con.pre + "vote":
            commandVote(message, args);
            break;
        case con.pre + "clear":
            commandClear(message, args);
            break;
        case con.pre + "joke":
            commandJoke(message, args);
            break;
        case con.pre + "lazy":
            commandLazy(message, args);
            break;
        case con.pre + "test":
            commandTest(message, args);
            break;
        default:
            commandNotFound(message, args);
    }
});
client.on("guildMemberAdd", guildmember => {
    guildmember.guild.channels.find("name", "devbot-log").send("test")
    guildmember.guild.defaultChannel.send({
        embed: {
            title: guildmember.user.username + " joined",
            thumbnail: {
                url: guildmember.user.avatarurl
            },
            description: guildmember.guild.members.size + " total members",
            color: 0x00E676,
            timestamp: new Date(),
        }
    });
});
client.on("guildMemberRemove", guildmember => {
    guildmember.guild.defaultChannel.send({
        embed: {
            title: guildmember.user.username + " left",
            thumbnail: {
                url: guildmember.user.avatarurl
            },
            description: guildmember.guild.members.size + " total members",
            color: 0xFF5252,
            timestamp: new Date(),
        }
    });
});
client.on("guildCreate", guild => {
    guild.createChannel("devbot-log", "text").catch(e => {
        guild.defaultChannel.send("Uh oh, this isn't a good start but I seem to have failed to create the channel called `devbot-log`. Here's my error: " + e)
    });
    guild.defaultChannel.send("Hi! I just joined, let me introduce myself. I am DevBot, created by Alex. I don't do much so feel free to see what I can do with `.help`. Thanks for having me on this server!");
    client.guilds.get("303548834074722304").channels.get("336695177009954827").send({
        embed: {
            title: ":smile: Joined a server called " + guild.name,
            thumbnail: {
                url: guild.iconURL
            },
            color: 0x00E676,
            fields: [{
                name: "Members",
                value: guild.memberCount
            }, {
                name: "Channels",
                value: guild.channels.size
            }, {
                name: "Owner",
                value: "<@" + guild.ownerID + "> | " + guild.owner.user.username
            }, {
                name: "Region",
                value: guild.region
            }],
            timestamp: new Date(),
        }
    });
    client.guilds.get("303548834074722304").channels.get("336695177009954827").setName("bot-log-" + client.guilds.size + "-servers");
});
client.on("guildDelete", guild => {
    client.guilds.get("303548834074722304").channels.get("336695177009954827").send({
        embed: {
            title: ":frowning: Left server called " + guild.name,
            thumbnail: {
                url: guild.iconURL
            },
            color: 0xFF5252,
            fields: [{
                name: "Owner",
                value: "<@" + guild.ownerID + "> | " + guild.owner.user.username
            }],
            timestamp: new Date(),
        }
    });
    client.guilds.get("303548834074722304").channels.get("336695177009954827").setName("bot-log-" + client.guilds.size + "-servers");
});
/*
// Commands //
*/
function commandPrefix(message, args) {
    message.channel.send({
        embed: {
            title: "DevBot",
            author: {
                name: "Coded by Alex",
                icon_url: "https://images-ext-2.discordapp.net/external/wQBnSsNXEVsyC0AsgxyaENVPwTkT1USRvEF4CYkQa8I/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/250425759452233729/837f040609032ac18094ad8bad0a7faa.png"
            },
            thumbnail: {
                url: client.user.avatarURL
            },
            color: 0x03A9F4,
            description: "For help use `.help`, info use `.info`",
        }
    });
}

function commandHelp(message, args) {
    message.author.send({
        embed: {
            title: "Commands for DevBot",
            description: "{} = Required, [] = Optional Arguments",
            color: 0x03A9F4,
            fields: [{
                    name: "Helpful",
                    value: ". » Bot creator\n.help » Shows the commands for the bot\n" + ".info » Awesome information about this bot\n"
            }, {
                    name: "Staff",
                    value: ".clear {amount} » Clear chat 3 - 100 lines | Permission: `MANAGE_MESSAGES`\n"
            }, {
                    name: "Fun",
                    value: "(in progress) .joke [ym, cn] » Have a random joke! [Yo Momma, Chuck Norris]\n.8ball {question} » Have the mystic 8-ball answer your wisest questions\n.lazy » Command dedicated to LazyCraft\n"
            }, {
                    name: "Alex Commands",
                    value: ".test » This is my testing command :P No need\n.eval » Run JavaScript code from chat\n"
            }, {
                    name: "In Progress / Coming up",
                    value: ".vote » Vote per channel with a time limit. Respond with yes or no in chat\n.kick » Cool kick command with logging\n.ban » Same as kick\n.option » Per server options to make the bot work with you"
            }],
        }
    });
    message.channel.send({
        embed: {
            title: "Help is on the way!",
            color: 0x00E676,
            description: "Check your direct messages <@" + message.author.id + "> for a new message",
        }
    });
}

function commandInfo(message, args) {
    let uptime = (Math.round(client.uptime / 1000 / 60));
    message.channel.send({
        embed: {
            url: "https://discordapp.com/oauth2/authorize?client_id=330825119582650368&scope=bot&permissions=2146958591",
            author: {
                name: "Info about DevBot (click to invite)",
                icon_url: client.user.avatarURL
            },
            color: 0x03A9F4,
            fields: [{
                name: "Stats",
                value: "Helping " + client.channels.size + " channels\n" + "In " + client.guilds.size + " servers\n" + "with " + client.users.size + " users using this bot\n" + "Ping is " + Math.round(client.ping) + "ms\n"
            }, {
                name: "Info",
                value: "Help command: `.help`\n" + "Coder: <@250425759452233729> or Alex\n" + "Uptime: " + uptime + " " + (uptime === 1 ? "minute" : "minutes") + "\n"
            }, {
                name: "Reason",
                value: "There is no real purpose to this bot but rather than to learn JavaScript from scratch. So don't expect this to be public!"
            }],
            timestamp: new Date(),
        }
    });
}

function commandEval(message, args) {
    if (message.author.id !== "250425759452233729") {
        message.channel.send({
            embed: {
                title: "Error!",
                color: 0xFF5252,
                description: "You must be Alex for this",
            }
        });
        return;
    }

    function clean(text) {
        if (typeof (text) === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        else return text;
    }
    let input = message.content.replace(".eval ", "");
    let color = 0xFFFFFF;
    let output = "No output was defined";
    try {
        let result = eval(input);
        color = 0x00E676;
        output = result;
    } catch (error) {
        color = 0xFF5252;
        output = error;
    }
    message.channel.send({
        embed: {
            title: "`" + input + "`",
            color: 0x03A9F4,
        }
    });
    message.channel.send({
        embed: {
            title: "`" + output + "`",
            color: color,
        }
    });
}

function command8Ball(message, args) {
    if (args.length > 1) {
        const responseg = ["It is certain", "It is decidedly so", "Without a doubt", "Yes definitely", "You may rely on it", "As I see it, yes", "Most likely", "Outlook good", "Yes", "Signs point to yes"];
        const responseo = ["Reply hazy try again", "Ask again later", "Better not tell you now", "Cannot predict now", "Concentrate and ask again"];
        const responseb = ["Don't count on it", "My reply is no", "My sources say no", "Outlook not so good", "Very doubtful"];
        let choice = Math.floor(Math.random() * 3);
        let color = null;
        let response = null;
        switch (choice) {
            case 0:
                color = 0x00E676;
                response = responseg[Math.floor(Math.random() * responseg.length)]
                break;
            case 1:
                color = 0xFFFF00;
                response = responseo[Math.floor(Math.random() * responseo.length)]
                break;
            case 2:
                color = 0xFF5252;
                response = responseb[Math.floor(Math.random() * responseb.length)]
                break;
        }
        message.channel.send({
            embed: {
                author: {
                    name: message.author.username + " asked",
                    icon_url: message.author.avatarURL
                },
                thumbnail: {
                    url: "http://i.imgur.com/0MayFz0.png"
                },
                color: color,
                fields: [{
                    name: "Question",
                    value: String(message.content).replace(".8ball ", "")
                }, {
                    name: "8 Ball says...",
                    value: response
                }],
            }
        });
        return;
    }
    message.channel.send({
        embed: {
            title: "Usage: " + con.pre + "8ball {question}",
            color: 0xFFFFFF,
        }
    });
}

function commandVote(message, args) {
    message.channel.send({
        embed: {
            title: "Vote command is currently in progress",
            color: 0xFFFFFF,
        }
    });
    if (message.author.id !== "250425759452233729") return;
    if (args.length == 0) {
        message.channel.send({
            embed: {
                title: "Usage: " + con.pre + "vote {question}",
                color: 0xFFFFFF,
            }
        });
        return;
    }
    if (args[1].toLowerCase() === "stop") {}
    message.channel.send({
        embed: {
            author: {
                name: message.author.username + " started a vote",
                icon_url: message.author.avatarURL
            },
            color: 0xFFA726,
            fields: [{
                name: "Question",
                value: String(message.content).replace(".vote ", "")
            }],
            footer: {
                text: "🔵 Reply \"Yes\" or \"No\" in chat to vote 🔵"
            }
        }
    });
}

function commandClear(message, args) {
    if (!message.guild) {
        message.channel.send({
            embed: {
                title: "Error!",
                color: 0xFF5252,
                description: "You need to use this command in a server",
            }
        });
        return;
    }
    if (!message.channel.permissionsFor(message.member).has("MANAGE_MESSAGES")) {
        message.channel.send({
            embed: {
                title: "Error! @" + message.author.username,
                color: 0xFF5252,
                description: "Lacking permission",
                fields: [{
                    name: "You need the permission",
                    value: "`MANAGE_MESSAGES`"
                }],
            }
        });
        return;
    }
    if (args.length > 1 && args[1].match("^[0-9]*$") && args[1] <= 100 && args[1] >= 1) {
        if (args[1] == 1) {
            message.delete().then(e => {
                message.channel.send({
                    embed: {
                        title: "Success!",
                        color: 0x00E676,
                        description: "Cleared 1 message",
                    }
                }).then(m => {
                    m.delete(5000)
                });
            }).catch(e => {
                message.channel.send({
                    embed: {
                        title: "Error!",
                        color: 0xFF5252,
                        description: "" + e,
                    }
                });
            });
        } else {
            message.channel.bulkDelete(args[1]).then(e => {
                message.channel.send({
                    embed: {
                        title: "Success!",
                        color: 0x00E676,
                        description: "Cleared " + (args[1]) + " messages",
                    }
                }).then(m => {
                    m.delete(5000)
                });
            }).catch(e => {
                message.channel.send({
                    embed: {
                        title: "Error!",
                        color: 0xFF5252,
                        description: "" + e,
                    }
                });
            });
        }
        return;
    }
    message.channel.send({
        embed: {
            title: "Usage: " + con.pre + "clear {amount 1 - 100}",
            color: 0xFFFFFF,
        }
    });
}

function commandJoke(message, args) {
    message.channel.send({
        embed: {
            title: "Joke command is currently in progress",
            color: 0xFFFFFF,
        }
    });
    if (message.author.id !== "250425759452233729") return;
}

function commandLazy(message, args) {
    if (!message.guild || message.guild.id !== "245984809933996032") {
        message.channel.send("You must use this command on LazyCraft server, here's a link: https://discord.gg/wv5Qce4");
        return;
    }
    if (args.length > 1) {
        switch (args[1].toLowerCase()) {
            case "pic":
                message.channel.send({
                    file: "https://cdn.discordapp.com/attachments/245985419827609600/332985041321721867/image.png"
                });
                break;
            case "pic2":
                message.channel.send({
                    file: "https://cdn.discordapp.com/attachments/245985419827609600/333052914551488512/art3.jpg"
                });
                break;
            case "pic3":
                message.channel.send({
                    file: "https://cdn.discordapp.com/attachments/245985419827609600/333106945684668427/image.png"
                });
                break;
            case "pic4":
                message.channel.send({
                    file: "https://cdn.discordapp.com/attachments/245985419827609600/336530269215391744/image.png"
                });
                break;
            case "shirt":
                message.channel.send("I need a shirt");
                break;
            default:
                message.channel.send("Command not found! Try one of these: .lazy [pic, pic2, pic3, pic4, shirt]");
        }
    } else message.channel.send("Commands: .lazy [pic, pic2, pic3, pic4, shirt]");
}

function commandTest(message, args) {
    message.channel.send("Testing! 1, 2, 3");
    if (message.author.id !== "250425759452233729") return;
    message.channel.send(set.test);
}

function commandNotFound(message, args) {
    message.channel.send({
        embed: {
            title: "Error!",
            color: 0xFF5252,
            description: "Command not found. Use .help",
            fields: [{
                name: "Command",
                value: message.content
            }],
        }
    });
}
client.login(con.tok);
