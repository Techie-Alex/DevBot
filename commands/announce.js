exports.run = (d) => {
    // client.guilds.forEach(e => {if (e.channels.find('name', 'devbot-logs') !== null) e.channels.find('name', 'devbot-logs').send('DevBot is going to be under development tomorrow and tonight')})
    let Discord = d.d;
    let client = d.c;
    let message = d.m;
    let con = d.s;
    if (message.author.id !== '250425759452233729') {
        const embed = new Discord.RichEmbed()
            .setTitle('Error!')
            .setColor(0xFF5252)
            .setDescription('You must be Alex for this');
        message.channel.send({
            embed
        });
        return;
    }
    if (message.content.split(' ').length <= 1) {
        const embed = new Discord.RichEmbed()
            .setTitle('Usage: ' + con.pre + 'announce {type} {message}')
            .setColor(0xFFFFFF)
        message.channel.send({
            embed
        });
        return;
    }
    client.guilds.forEach(e => {
        if (e.channels.find('name', 'devbot-logs') !== null) {
            const embed = new Discord.RichEmbed()
                .setColor(0xD500F9)
                .setTitle('Announcement')
                .setDescription(d.a.join(' '));
            e.channels.find('name', 'devbot-logs').send({ embed });
        }
    });
    message.channel.send('Sent to ' + client.guilds.size + ' guilds');
}