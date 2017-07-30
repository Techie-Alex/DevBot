exports.run = (d) => {
    let Discord = d.d;
    let client = d.c;
    let message = d.m;
    let con = d.s;
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
    if (!message.channel.permissionsFor(message.member).has('MANAGE_MESSAGES')) {
        const embed = new Discord.RichEmbed()
            .setTitle('Error! ' + message.author.username)
            .setColor(0xFF5252)
            .setDescription('Lacking Permission')
            .addField('Permission needed', '`MANAGE_MESSAGES`');
        message.channel.send({
            embed
        });
        return;
    }
    let args = message.content.split(' ');
    if (args.length > 1 && args[1].match('^[0-9]*$') && args[1] <= 100 && args[1] >= 1) {
        if (args[1] == 1) {
            message.delete().then(e => {
                if (message.guild.channels.find('name', 'devbot-logs') !== null) message.guild.channels.find('name', 'devbot-logs').send('.clear | ' + message.author.username + ' | Cleared ' + args[1] + ' messages in ' + message.channel.name);
                message.channel.send({
                    embed: {
                        title: 'Success!',
                        color: 0x00E676,
                        description: 'Cleared 1 message',
                    }
                }).then(m => {
                    m.delete(5000)
                });
            }).catch(e => {
                message.channel.send({
                    embed: {
                        title: 'Error!',
                        color: 0xFF5252,
                        description: '' + e,
                    }
                });
            });
        } else {
            message.channel.bulkDelete(args[1]).then(e => {
                if (message.guild.channels.find('name', 'devbot-logs') !== null) message.guild.channels.find('name', 'devbot-logs').send('.clear | ' + message.author.username + ' | Cleared ' + e.size + ' messages in ' + message.channel.name);
                message.channel.send({
                    embed: {
                        title: 'Success!',
                        color: 0x00E676,
                        description: 'Cleared ' + e.size + ' messages',
                    }
                }).then(m => {
                    m.delete(5000)
                });
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
        return;
    }
    message.channel.send({
        embed: {
            title: 'Usage: ' + con.pre + 'clear {amount 1 - 100}',
            color: 0xFFFFFF,
        }
    });
}