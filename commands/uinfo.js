exports.run = (d) => {
    let Discord = d.d;
    let client = d.c;
    let message = d.m;
    let con = d.s;
    let a = null;
    if (message.content.split(' ').length > 1) {
        let id = message.content.split(' ')[1].replace('>', '').replace('<', '').replace('@', '').replace('!', '');
        if (client.users.find('id', id) !== null) a = client.users.get(id);
        else if (message.guild.members.find('id', id) !== null) a = message.guild.members.get(id);
        else {
            const embed2 = new Discord.RichEmbed()
                .setTitle('Error!')
                .setColor(0xFF5252)
                .setDescription('Member not found');
            message.channel.send({
                embed: embed2
            });
            return;
        }
    } else a = message.author;
    const embed = new Discord.RichEmbed()
        .setColor(0xffffff)
        .setAuthor(a.username + ' info', a.avatarURL)
        .setThumbnail(a.avatarURL)
        .addField('Avatar', '[Click for link](' + a.avatarURL + ')', true)
        .addField('Name', a.username, true)
        .addField('Current Game', (a.presence.game === null ? 'None' : a.presence.game.name), true)
        .addField('Bot Note', (a.note === null ? 'None' : a.note), true)
        .addField('Discriminator', a.discriminator, true)
        .addField('ID', a.id, true)
        .addField('Bot?', (a.bot ? 'Beep (Yes)' : 'Beep boop (No)'), true)
        .addField('Status', a.presence.status, true)
        .addField('User joined this server on', a.joinedAt)
        .addField('Account created on', a.createdAt);
    message.channel.send({
        embed
    });
}