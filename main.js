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
    case con.pre + "clear":
      commandClear(message, args);
      break;
    case con.pre + "test":
      commandTest(message, args);
      break;
    case con.pre + "joke":
      commandJoke(message, args);
      break;
    case con.pre + "8ball":
      command8Ball(message, args);
      break;
    case con.pre + "lazy":
      commandLazy(message, args);
      break;
    default:
      commandNone(message, args);
  }
});






// Chat Tools //
function errorembed(errormessage) {
  return {
    embed: {
      color: 0xff1a1a,
      title: "Error!",
      description: errormessage
    }
  };
}

// Commands //
function commandPrefix(message, args) {
  message.channel.send({
    embed: {
      author: {
        name: "Coded by Alex",
        icon_url: "https://cdn.discordapp.com/avatars/250425759452233729/5427bdf6fda62f2dc8644b9db98e0c96.png?size=2048"
      },
      thumbnail: {
        url: client.user.avatarURL
      },
      title: "About this bot",
      color: 0x03A9F4,
      description: "There is no real purpose to this bot but rather than to learn JavaScript from scratch. So don't expect this to be public!",
      fields: [{
        name: "For help use",
        value: ">help"
      }]
    }
  });
}

function commandNone(message, args) {
  message.channel.send(errorembed("Command not found, try `>help`"));
}

function commandHelp(message, args) {
  message.author.send({
    embed: {
      color: 0x03A9F4,
      author: {
        name: "Commands for DevBot",
        icon_url: client.user.avatarURL
      },
      fields: [
        {
          name: "Helpful",
          value:
          "> » Bot creator\n"
          + ">help » Show's the commands for the bot\n"
        },
        {
          name: "Staff",
          value:
          ">clear (amount) » Clear chat 3 - 100 lines\n"
        },
        {
          name: "Fun",
          value:
          ">joke [ym, cn, random] » Have a random joke! [Yo Momma, Chuck Norris, Random]\n"
          + ">8ball (question) » Have the mystic 8-ball answer your wisest questions\n"
          + ">lazy » Command dedicated to LazyCraft\n"
        }, {
          name: "Test",
          value:
          ">test » This is my testing command :P No need\n"
        }],
    }
  });
  message.channel.send({
    embed: {
      color: 0x03A9F4,
      author: {
        name: "Hey, " + message.author.username + "!",
        icon_url: message.author.avatarURL
      },
      description: "Check your DM inbox for help!"
    }
  });
}

function commandClear(message, args) {
  if (message.channel.type === "dm") {
    message.channel.send(errorembed("You must use this in a server"));
    return;
  }
  if (message.channel.permissionsFor(message.member).hasPermission("MANAGE_MESSAGES")) {
    if (args.length > 1 && args[1].match("^[0-9]*$") && args[1] <= 100 && args[1] >= 2) {
      message.channel.bulkDelete(args[1])
      message.channel.send("Cleared " + args[1] + " messages!");
      return;
    }
    message.channel.send("Use `>clear 'amount'` | Amount must be 3 - 100");
  } else {
    message.channel.send(errorembed("You don't have permission! Need: `MANAGE_MESSAGES`"));
  }
}

function commandInfo(message, args) {
  message.channel.send({
    embed: {
      color: 0x03A9F4,
      author: {
        name: "Hey, info about DevBot",
        icon_url: client.user.avatarURL
      },
      fields: [
        {
          name: "Stats",
          value:
          "Helping " + client.guilds.size + " servers\n"
          + "In " + client.channels.size + " channels\n"
          + "Ping is: " + Math.round(client.ping) + "ms\n"
          + "and " + client.users.size + " total users can use this bot\n"
        },
        {
          name: "Info",
          value:
          "Help command: `>help`\n"
          + "Coder: <@250425759452233729> or Alex\n"
          + "Uptime: " + (Math.round(client.uptime / 1000 / 60)) + " minutes\n"
        }],
    }
  });
}

function commandTest(message, args) {
  message.channel.send(message.author.avatarURL);
}

function commandJoke(message, args) {
  var number;
  if (args.length > 1) {
    switch (args[1].toLowerCase()) {
      case "ym":
        number = 1;
        break;
      case "cn":
        number = 2;
        break;
      default:
        message.channel.send(errorembed("Argument not found, try `>help`"));
        return;
    }
  } else number = Math.floor(Math.random() * 2) + 1;
  switch (number) {
    case 1:
      message.channel.send(errorembed("YO momma so fat she took down the jokes when she sat down. Try again later :("));
      /*
        request({
          url: "http://api.yomomma.info",
          json: true
        }, function callback(error, response, body) {
          message.channel.send({
            embed: {
              author: {
                name: "Yo Momma",
                icon_url: "http://i.imgur.com/nDzfuc4.png"
              },
              color: 0xff66ff,
              description: body.joke,
            }
          });
        })
      */
      break;
    case 2:
      request({
        url: "https://api.icndb.com/jokes/random?escape=javascript",
        json: true
      }, function callback(error, response, body) {
        message.channel.send({
          embed: {
            author: {
              name: "Chuck Norris",
              icon_url: "http://i.imgur.com/kVtJzwW.png"
            },
            color: 0xcc66ff,
            description: body.value.joke,
          }
        });
      })
      break;
    default:
      message.channel.send(errorembed("Oh noooo! Someone broke the system :( Try again"));
      break;
  }
}

function command8Ball(message, args) {
  var responses = ["It is certain", "It is decidedly so", "Without a doubt", "Yes definitely", "You may rely on it", "As I see it, yes", "Most likely", "Outlook good", "Yes", "Signs point to yes", "Reply hazy try again", "Ask again later", "Better not tell you now", "Cannot predict now", "Concentrate and ask again", "Don't count on it", "My reply is no", "My resources say no", "Outlook not so good", "Very doubtful"];
  var responseg = [];
  var responseo = [];
  var responseb = [];
  var responses2 = (responseg + responseo + responseb);
  
  if (args.length > 1) {
    message.channel.send({
      embed: {
        author: {
          name: message.author.username + " asked",
          icon_url: message.author.avatarURL
        },
        thumbnail: {
          url: "http://i.imgur.com/0MayFz0.png"
        },
        color: 0xffffff,
        fields: [{
          name: "Question",
          value: String(message.content).replace(">8ball ", "")
        },
        {
          name: "8 Ball says...",
          value: responses[Math.floor(Math.random() * responses.length)]
        }],
      }
    });
    return;
  }
  message.channel.send("Usage: `>8ball (question)`");
}

function commandLazy(message, args) {
  if (message.channel.type !== "dm" && message.guild.id === "245984809933996032") {
    if (args.length > 1) {
      if (args[1].toLowerCase() === "pic") {
        message.channel.send({ file: "https://cdn.discordapp.com/attachments/245985419827609600/332985041321721867/image.png" });
        return;
      }
      if (args[1].toLowerCase() === "pic2") {
        message.channel.send({ file: "https://cdn.discordapp.com/attachments/245985419827609600/333052914551488512/art3.jpg" });
        return;
      }
      if (args[1].toLowerCase() === "pic3") {
        message.channel.send({ file: "https://cdn.discordapp.com/attachments/245985419827609600/333106945684668427/image.png" });
        return;
      }
      if (args[1].toLowerCase() === "pic4") {
        message.channel.send({ file: "https://cdn.discordapp.com/attachments/245985419827609600/336530269215391744/image.png" });
        return;
      }
      if (args[1].toLowerCase() === "shirt") {
        message.channel.send("I need a shirt");
        return;
      }
    }
    message.channel.send("Commands: >lazy [pic, pic2, pic3, shirt]");
  } else {
    message.channel.send(errorembed("You must use this command on LazyCraft server, here's a link: https://discord.gg/wv5Qce4"))
  }
}