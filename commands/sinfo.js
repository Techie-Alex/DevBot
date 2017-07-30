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
    const embed = new Discord.RichEmbed()
        .setColor(0xffffff)
        .setAuthor(message.guild.name + ' info', message.guild.iconURL)
        .setThumbnail(message.guild.iconURL)
        .addField('Icon', '[Click for link](' + message.guild.iconURL + ')', true)
        .addField('Large?', (message.guild.large ? 'Yep (Nice)' : 'Nope'), true)
        .addField('Name', message.guild.name, true)
        .addField('Custom Emoji Count', message.guild.emojis.size, true)
        .addField('Verification Level', message.guild.verificationLevel, true)
        .addField('Region', message.guild.region, true)
        .addField('Roles', message.guild.roles.size, true)
        .addField('ID', message.guild.id, true)
        .addField('Members', message.guild.members.size, true)
        .addField('Channels', message.guild.channels.size, true)
        .addField('Default Channel', message.guild.defaultChannel, true)
        .addField('Default Role', message.guild.defaultRole, true)
        .addField('Server Created on', message.guild.createdAt);
    message.channel.send({
        embed
    });
}