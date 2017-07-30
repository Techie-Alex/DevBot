exports.run = (d) => {
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
    let input = message.content.split(' ').splice(1).join(' ');
    let color = 0xFFFFFF;
    let output = 'No output was defined';
    if (input === '') input = '"None"';
    try {
        output = eval(input);
        color = 0x00E676;
    } catch (error) {
        output = error;
        color = 0xFF5252;
    }
    const embed = new Discord.RichEmbed()
        .setAuthor(message.author.username + ' eval', message.author.avatarURL)
        .setColor(color)
        .addField('Input', '```' + input + '```')
        .addField((color === 0xFF5252 ? 'Error' : 'Output'), '```' + output + '```');
    message.channel.send({
        embed
    });
}