exports.run = (d) => {
    let Discord = d.d;
    let client = d.c;
    let message = d.m;
    let con = d.s;
    let uptime = (Math.round(client.uptime / 1000 / 60));
    
}
/*
const embed = new Discord.RichEmbed()
        .setURL('https://discordapp.com/oauth2/authorize?client_id=330825119582650368&scope=bot&permissions=2146958591')
        .setColor(0x03A9F4)
        .setAuthor('Info about DevBot (click to invite)', client.user.avatarURL, 'https://discordapp.com/oauth2/authorize?client_id=330825119582650368&scope=bot&permissions=2146958591')
        .addField('Stats', 'Helping ' + client.channels.size + ' channels\n' + 'In ' + client.guilds.size + ' servers\n' + 'with ' + client.users.size + ' users using this bot\n' + 'Ping is ' + Math.round(client.ping) + 'ms\n')
        .addField('Info', 'Help command: `.help`\n' + 'Coder: <@250425759452233729> or Alex\n' + 'Uptime: ' + uptime + ' ' + (uptime === 1 ? 'minute' : 'minutes') + '\n')
        .addField('Reason', 'There is no real purpose to this bot but rather than to learn JavaScript from scratch. So don\'t expect this to be public!')
        .setTimestamp();
    message.channel.send({
        embed
    });
    */