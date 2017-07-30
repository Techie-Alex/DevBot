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
        .setAuthor(message.channel.name + ' info', message.guild.iconURL)
        .addField('Members', message.channel.members.size, true)
        .addField('NSFW?', (message.channel.nsfw ? 'Send Nudes ;)' : 'Nope :('), true)
        .addField('Deletable', (message.channel.deletable ? 'Yes' : 'No'), true)
        .addField('Channel Position', message.channel.position + 1, true)
        .addField('Members Typing', message.channel.typingCount, true)
        .addField('Name', message.channel.name, true)
        .addField('Topic', (message.channel.topic === '' ? 'None' : message.channel.topic));
    message.channel.send({
        embed
    });
}