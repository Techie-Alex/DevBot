// https://discordapp.com/oauth2/authorize?client_id=330825119582650368&scope=bot&permissions=2146958591
const Discord = require("discord.js");
const client = new Discord.Client();
const con = require("./config.json");
var request = require('request');
client.login(con.tok);
client.on("ready", () => {
    client.user.setStatus("online");
    client.user.setGame("🔵 >help 🔵");
    console.log(" \\/ DevBot loaded \\/ ");
});
client.on("message", message => {
    if (message.author.bot || !message.content.startsWith(con.pre)) return;
    console.log("// " + (message.channel.type === "dm" ? "DM" : message.guild.name) + " // " + message.channel.name + " // " + message.author.username + " // " + message.content);
    var args = message.content.split(" ");
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
        case con.pre + "8ball":
            command8Ball(message, args);
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
/*
// Commands //
*/
function commandPrefix(message, args) {
    message.channel.send({
        embed: {
            title: "About this bot",
            author: {
                name: "Coded by Alex",
                icon_url: "https://images-ext-2.discordapp.net/external/wQBnSsNXEVsyC0AsgxyaENVPwTkT1USRvEF4CYkQa8I/%3Fsize%3D2048/https/cdn.discordapp.com/avatars/250425759452233729/837f040609032ac18094ad8bad0a7faa.png"
            },
            thumbnail: {
                url: client.user.avatarURL
            },
            color: 0x03A9F4,
            description: "There is no real purpose to this bot but rather than to learn JavaScript from scratch. So don't expect this to be public!",
            fields: [{
                    name: "For help use",
                    value: con.pre + "help"
                }
                , {
                    name: "Info and stats about bot",
                    value: con.pre + "info"
                }],
        }
    });
}

function commandHelp(message, args) {
    message.author.send({
        embed: {
            title: "Commands for DevBot",
            description: "{} = Required, [] = Optional Arguments",
            color: 0x03A9F4,
            fields: [
                {
                    name: "Helpful",
                    value: "> » Bot creator\n" + ">help » Shows the commands for the bot\n" + ">info » Awesome information about this bot\n"
        }
                , {
                    name: "Staff",
                    value: ">clear {amount} » Clear chat 3 - 100 lines\n"
        }
                , {
                    name: "Fun",
                    value: "(in progress) >joke [ym, cn] » Have a random joke! [Yo Momma, Chuck Norris]\n" + ">8ball {question} » Have the mystic 8-ball answer your wisest questions\n" + ">lazy » Command dedicated to LazyCraft\n"
        }, {
                    name: "Test",
                    value: ">test » This is my testing command :P No need\n"
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
    var uptime = (Math.round(client.uptime / 1000 / 60));
    message.channel.send({
        embed: {
            url: "https://discordapp.com/oauth2/authorize?client_id=330825119582650368&scope=bot&permissions=2146958591",
            author: {
                name: "Info about DevBot (click to invite)",
                icon_url: client.user.avatarURL
            },
            color: 0x03A9F4,
            fields: [
                {
                    name: "Stats",
                    value: "Helping " + client.guilds.size + " servers\n" + "In " + client.channels.size + " channels\n" + "Ping is " + Math.round(client.ping) + "ms\n" + "and " + client.users.size + " users can use this bot\n"
        }
                , {
                    name: "Info",
                    value: "Help command: `>help`\n" + "Coder: <@250425759452233729> or Alex\n" + "Uptime: " + uptime + " " + (uptime === 1 ? "minute" : "minutes") + "\n"
        }],
            timestamp: new Date(),
        }
    });
}

function command8Ball(message, args) {
    if (args.length > 1) {
        var responseg = ["It is certain", "It is decidedly so", "Without a doubt", "Yes definitely", "You may rely on it", "As I see it, yes", "Most likely", "Outlook good", "Yes", "Signs point to yes"];
        var responseo = ["Reply hazy try again", "Ask again later", "Better not tell you now", "Cannot predict now", "Concentrate and ask again"];
        var responseb = ["Don't count on it", "My reply is no", "My sources say no", "Outlook not so good", "Very doubtful"];
        var choice = Math.floor(Math.random() * 3);
        var color = null;
        var response = null;
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
                    value: String(message.content).replace(">8ball ", "")
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

function commandClear(message, args) {
    if (message.channel.type === "dm") {
        message.channel.send({
            embed: {
                title: "Error!",
                color: 0xFF5252,
                description: "You need to use this command in a server",
            }
        });
        return;
    }
    if (!message.channel.permissionsFor(message.member).hasPermission("MANAGE_MESSAGES")) {
        message.channel.send({
            embed: {
                title: "Error!",
                color: 0xFF5252,
                description: "Lacking permission",
                fields: [{
                    name: "Permission needed",
                    value: "`MANAGE_MESSAGES`"
                }],
            }
        });
        return;
    }
    if (args.length > 1 && args[1].match("^[0-9]*$") && args[1] <= 100 && args[1] >= 3) {
        message.channel.bulkDelete(args[1]);
        message.channel.send({
            embed: {
                title: "Success!",
                color: 0x00E676,
                description: "Cleared " + args[1] + " messages",
            }
        });
        return;
    }
    message.channel.send({
        embed: {
            title: "Usage: " + con.pre + "clear {amount 3 - 100}",
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
}

function commandLazy(message, args) {
    if (message.channel.type === "dm" || message.guild.id !== "245984809933996032") {
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
                message.channel.send("Command not found! Try one of these: >lazy [pic, pic2, pic3, pic4, shirt]");
        }
    } else message.channel.send("Commands: >lazy [pic, pic2, pic3, pic4, shirt]");
}

function commandTest(message, args) {
    message.channel.send("Testing! 1, 2, 3");
}

function commandNotFound(message, args) {
    message.channel.send({
        embed: {
            title: "Error!",
            color: 0xFF5252,
            description: "Command not found. Use >help",
            fields: [{
                name: "Command",
                value: message.content
                }],
        }
    });
}
