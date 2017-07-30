exports.run = (d) => {
    let Discord = d.d;
    let client = d.c;
    let message = d.m;
    let con = d.s;
    const embed = new Discord.RichEmbed()
        .setTitle('Kick command is in progress')
        .setColor(0xFFFFFF)
    message.channel.send({
        embed
    });
    let args = message.content.split(' ');
    if (!message.guild) {
        const embed = new Discord.RichEmbed()
            .setTitle('Error!')
            .setColor(0xFF5252)
            .setDescription('You need to use this command in a server')
        message.channel.send({
            embed
        });
        return;
    }
    if (!message.channel.permissionsFor(message.member).has('KICK_MEMBERS')) {
        const embed = new Discord.RichEmbed()
            .setTitle('Error! ' + message.author.username)
            .setColor(0xFF5252)
            .setDescription('Lacking Permission')
            .addField('Permission needed', '`KICK_MEMBERS`');
        message.channel.send({
            embed
        });
        return;
    }
    if (args.length < 2) {
        const embed = new Discord.RichEmbed()
            .setTitle('Usage: ' + con.pre + 'kick {id or tag} [reason]')
            .setColor(0xFFFFFF)
        message.channel.send({
            embed
        });
        return;
    }
    let targetid = args[1].replace('>', '').replace('<', '').replace('@', '').replace('!', '');
    let kickmsg = '';
    let target = null;
    if (args.length > 2)
        for (let i = 2; i < args.length; i++) kickmsg = kickmsg + args[i] + ' ';
    else kickmsg = 'Kicked! Ouch...';
    if (message.guild.members.find('id', targetid) !== null) target = message.guild.members.get(targetid);
    else {
        message.channel.send({
            embed: {
                title: 'Error!',
                color: 0xFF5252,
                description: 'Member not found',
            }
        });
        return;
    }
    target.kick(kickmsg).then(e => {
        message.channel.send({
            embed: {
                title: 'Success!',
                color: 0x00E676,
                description: 'Kicked ' + target.user.username + ' with kick message `' + kickmsg + '`',
            }
        });
        if (message.guild.channels.find('name', 'devbot-logs') !== null) message.guild.channels.find('name', 'devbot-logs').send(' ❗ Kicked ' + target.user.username + ' with kick message `' + kickmsg + '`');
        client.users.get(targetid).send('You were kicked from ' + message.guild.name + ' with the reason `' + kickmsg + '`');
    }).catch(e => {
        message.channel.send({
            embed: {
                title: 'Error!',
                color: 0xFF5252,
                description: '' + e,
            }
        });
    });
}