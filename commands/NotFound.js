exports.run = (d) => {
    let cmd = '';
    if (d.m.content.length > 10) cmd = d.m.content.substring(0, 10) + '...';
    else cmd = d.m.content;
    const embed = new d.d.RichEmbed()
        .setTitle('Error!')
        .setColor(0xFF5252)
        .setDescription('Command `' + cmd + '` not found. Use .help');
    d.m.channel.send({
        embed
    });
}