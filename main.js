// https://discordapp.com/oauth2/authorize?client_id=330825119582650368&scope=bot&permissions=2146958591
/* Scripts
npm install --save discord.js
npm install --save fs
npm install --save ffmpeg
npm install --save ffmpeg-binaries
npm install --save opusscript
*/
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const con = require('./c.json');
const cmds = ['help', 'info', 'eval', 'announce', 'test', 'clear', 'kick', 'ban', 'vote', 'uinfo', 'sinfo', 'cinfo', '8ball', 'joke', 'setup', 'bot'];

client.on('ready', () => {
    client.user.setStatus('online');
    let a = 0;
    setInterval(function () {
        const b = ['🌀 ' + con.pre + 'help | ' + Math.round(client.ping) + 'ms ping 🌀', '🌀 ' + con.pre + 'help | ' + client.guilds.size + ' guilds 🌀', '🌀 ' + con.pre + 'help | ' + client.users.size + ' users 🌀'];
        client.user.setGame(b[a], 'https://www.twitch.tv/#');
        if (a >= b.length - 1) a = 0;
        else a++;
    }, 15000);
    console.log(' | DevBot ,loaded | ');
});
client.on('message', message => {
    if (message.author.bot) return;
    let z = message.content.split(' ');
    let a = z.splice(1);
    let b = null;
    let c = z[0].replace(con.pre, '').toLowerCase();
    let d = {
        d: Discord,
        c: client,
        m: message,
        s: con,
        f: fs,
        a: a
    };
    try {
        require(`./events/message.js`).run(d, message);
    } catch (e) {
        const f = new Discord.RichEmbed()
            .setTitle('Error:')
            .setColor(0x9C27B0)
            .setDescription(String(e))
            .setFooter('main.js => ./events/message.js');
        message.channel.send({
            embed: f
        });
    }
    if (!message.content.startsWith(con.pre)) return;
    if (cmds.includes(c)) b = c;
    else
        switch (z[0].toLowerCase()) {
            case con.pre:
                b = 'Prefix';
                break;
            case con.pre + 'rf':
                commandrf(d);
                console.log('»» ' + message.author.username + ' (' + message.author.id + ')' + ' » ' + message.content);
                break;
        };
    if (b !== null)
        try {
            require(`./commands/${b}.js`).run(d);
        } catch (e) {
            const f = new Discord.RichEmbed()
                .setTitle('Error:')
                .setColor(0x9C27B0)
                .setDescription(String(e))
                .setFooter('main.js => ./commands/' + b + '.js');
            message.channel.send({
                embed: f
            });
        } finally {
            console.log('» ' + (message.channel.type === 'dm' ? 'DM' : message.guild.name) + ' » ' + message.channel.name + ' » ' + message.author.username + ' » ' + message.content);
        }
});
client.on('guildMemberAdd', guildmember => {
    try {
        require(`./events/guildMemberAdd.js`).run(guildmember);
    } catch (e) {
        const f = new Discord.RichEmbed()
            .setTitle('Error:')
            .setColor(0x9C27B0)
            .setDescription(String(e))
            .setFooter('main.js => ./events/guildMemberAdd.js');
        message.channel.send({
            embed: f
        });
    }
    if (guildmember.guild.id !== '303548834074722304') return;
    let x = null;
    if (guildmember.guild.channels.find('name', 'general') !== null)
        x = guildmember.guild.channels.find('name', 'general')
    else if (guildmember.guild.channels.find('name', 'devbot-logs') !== null)
        x = guildmember.guild.channels.find('name', 'devbot-logs')
    else x = guildmember.guild.defaultChannel;
    if (x !== null) {
        const embed = new Discord.RichEmbed()
            .setColor(0x00B0FF)
            .setAuthor(guildmember.user.username + ' joined', guildmember.user.avatarURL)
            .setTimestamp();
        x.send({
            embed
        });
    }
});
client.on('guildMemberRemove', guildmember => {
    if (guildmember.guild.id !== '303548834074722304') return;
    let x = null;
    if (guildmember.guild.channels.find('name', 'general') !== null)
        x = guildmember.guild.channels.find('name', 'general')
    else if (guildmember.guild.channels.find('name', 'devbot-logs') !== null)
        x = guildmember.guild.channels.find('name', 'devbot-logs')
    else x = guildmember.guild.defaultChannel;
    if (x !== null) {
        const embed = new Discord.RichEmbed()
            .setColor(0x2979FF)
            .setAuthor(guildmember.user.username + ' left', guildmember.user.avatarURL)
            .setTimestamp();
        x.send({
            embed
        });
    }
});
client.on('guildCreate', guild => {
    const embed = new Discord.RichEmbed()
        .setColor(0xD500F9)
        .setDescription('Hello! I am DevBot and just joined! Let me do a small 1-line sentence introduction of myself, I am created by Alex and I don\'t do much so feel free to see what I can do with `,help`. I see you made it to the end of reading this... Everything should be setup!');
    guild.defaultChannel.send({
        embed
    });
    if (guild.channels.find('name', 'devbot-logs') === null)
        guild.createChannel('devbot-logs', 'text')
        .catch(e => {
            const e2 = new Discord.RichEmbed()
                .setColor(0xFF1744)
                .setDescription('Uh oh! This is\'nt a good start... I seem to have failed to create my logging channel called `devbot-logs`. Here\'s my error: ' + String(e));
            guild.defaultChannel.send({
                embed: e2
            });
        });
    else {
        const e3 = new Discord.RichEmbed()
            .setColor(0xD500F9)
            .setDescription('An old logging channel was found already. Will resume logs to this channel');
        guild.channels.find('name', 'devbot-logs').send({
            embed: e3
        });
    }
    const e4 = new Discord.RichEmbed()
        .setColor(0x00E676)
        .setTitle(':smile: Joined a server called ' + guild.name)
        .setThumbnail(guild.iconURL)
        .addField('Owner', guild.owner + ' | ' + guild.owner.user.username)
        .addField('Members', guild.members.size)
        .addField('Total Channels', guild.channels.size)
        .addField('Region', guild.region)
        .setTimestamp();
    client.guilds.get('303548834074722304').channels.get('336695177009954827').send({
        embed: e4
    });
});
client.on('guildDelete', guild => {
    const embed = new Discord.RichEmbed()
        .setColor(0xFF9100)
        .setTitle(':frowning: Left server called ' + guild.name)
        .setThumbnail(guild.iconURL)
        .addField('Owner', guild.owner + ' | ' + guild.owner.user.username)
        .setTimestamp();
    client.guilds.get('303548834074722304').channels.get('336695177009954827').send({
        embed
    });
});
client.on('channelCreate', channel => {
    if (channel.type === 'text' && channel.name === 'devbot-logs' && channel.guild.channels.findAll('name', 'devbot-logs').length === 1) {
        const embed = new Discord.RichEmbed()
            .setColor(0xD500F9)
            .setDescription('DevBot will now hook into this channel for logging');
        channel.send({
            embed
        });
        channel.overwritePermissions(channel.guild.defaultRole, {
                SEND_MESSAGES: false,
                READ_MESSAGES: true,
                READ_MESSAGE_HISTORY: true
            })
            .then(e => {
                const e2 = new Discord.RichEmbed()
                    .setColor(0xD500F9)
                    .setDescription('DevBot has set 3 perms for this channel: \n1. SEND_MESSAGES: false\n2. READ_MESSAGES: true\n3. READ_MESSAGE_HISTORY: true');
                channel.send({
                    embed: e2
                });
            })
            .catch(e => {
                const e2 = new Discord.RichEmbed()
                    .setColor(0xFF1744)
                    .setDescription('Error setting perms! Here\'s my error: ' + String(e));
                channel.send({
                    embed: e2
                });
            });
    };
});
client.on('channelDelete', channel => {
    if (channel.type === 'text' && channel.name === 'devbot-logs' && channel.guild.channels.findAll('name', 'devbot-logs').length === 0) {
        const embed = new Discord.RichEmbed()
            .setColor(0xD500F9)
            .setDescription('The channel `devbot-logs` was deleted. You will no longer recieve logs from DevBot. To undo simply type `,setup channel`');
        channel.guild.defaultChannel.send({
            embed
        });
    }
});
client.login(con.tok);


// Functions
function ld(guild, what) {
    const a = guild.channels.find('name', 'devbot-logs');
    if (a !== null) a.send(what);
    else return false;
}
let lfile = null;

function commandrf(d) {
    if (d.m.author.id !== '250425759452233729') {
        const embed = new Discord.RichEmbed()
            .setColor(0x9C27B0)
            .setDescription('You must be Alex for this');
        d.m.channel.send({
            embed
        });
        return;
    }
    let file = null;
    if (d.a.length < 1) {
        if (lfile === null) {
            const embed = new Discord.RichEmbed()
                .setColor(0x9C27B0)
                .setDescription('Usage: ' + con.pre + 'rf {file location}');
            d.m.channel.send({
                embed
            });
            return;
        } else file = lfile;
    } else {
        file = d.a[0];
        lfile = d.a[0];
    }
    try {
        delete require.cache[require.resolve(`./${file}`)];
        const embed = new Discord.RichEmbed()
            .setColor(0x9C27B0)
            .setDescription('Refreshed file \'./' + file + '\'');
        d.m.channel.send({
            embed
        });
    } catch (e) {
        const embed = new Discord.RichEmbed()
            .setColor(0x9C27B0)
            .setDescription(String(e));
        d.m.channel.send({
            embed
        });
    }
}