const Discord = require('discord.js');
const client = new Discord.Client();
const bot = require('./bot.json');
const fs = require('fs');
const dcb = {
    d: Discord,
    c: client,
    b: bot,
};
let a;
try {
    a = fs.readdirSync("./events/");
} catch (e) {
    console.log('\033[91m»» Error: main.js » The top thing \033[92m' + String(e) + '\033[99m');
}
a.forEach(b => client.on(b.split('.')[0], c => {
    try {
        require('./events/' + b.split('.')[0]).run(dcb, c)
    } catch (e) {
        console.log('\033[91m»» Error: main.js => ./events/' + b + ' » \033[92m' + String(e) + '\033[99m');
    }
}));
client.login(bot.t);
client.on('message', message => {
    if (!(message.author.bot) && message.content.split(' ')[0] === bot.p + 'rf') commandrf(message)
});
let g = undefined;

function commandrf(message) {
    if (!message.guild) return;
    if (message.author.id !== '250425759452233729') {
        message.channel.send({
            embed: new Discord.RichEmbed()
                .setColor(0xD500F9)
                .setDescription('Haha good try! But you\'re not Alex ' + client.emojis.get('338824092134408192'))
        });
        return;
    }
    let h = undefined;
    if (message.content.split(' ').splice(1).length < 1) {
        if (g === undefined) {
            message.channel.send({
                embed: new Discord.RichEmbed()
                    .setColor(0xD500F9)
                    .setDescription('Usage: ' + bot.p + 'rf {file location}')
            });
            return;
        } else h = g;
    } else {
        h = message.content.split(' ').splice(1)[0];
        g = h;
    }
    try {
        delete require.cache[require.resolve(`./${h}`)];
        message.channel.send({
            embed: new Discord.RichEmbed()
                .setColor(0xD500F9)
                .setDescription('Refreshed file \'./' + h + '\'')
        });
    } catch (e) {
        message.channel.send({
            embed: new Discord.RichEmbed()
                .setColor(0xD500F9)
                .setDescription(String(e))
        });
    }
}