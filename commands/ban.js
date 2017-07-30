exports.run = (d) => {
    let Discord = d.d;
    let client = d.c;
    let message = d.m;
    let con = d.s;
    const embed = new Discord.RichEmbed()
        .setTitle('Ban command is in progress')
        .setColor(0xFFFFFF)
    message.channel.send({
        embed
    });
    if (message.author.id !== '250425759452233729') return;
    if (!message.guild) {
        message.channel.send({
            embed: {
                title: 'Error!',
                color: 0xFF5252,
                description: 'You need to use this command in a server',
            }
        });
        return;
    }
    if (!message.channel.permissionsFor(message.member).has('BAN_MEMBERS')) {
        message.channel.send({
            embed: {
                title: 'Error! @' + message.author.username,
                color: 0xFF5252,
                description: 'Lacking permission',
                fields: [{
                    name: 'You need the permission',
                    value: '`BAN_MEMBERS`'
                }],
            }
        });
        return;
    }
}