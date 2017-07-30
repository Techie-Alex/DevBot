exports.run = (d) => {
    let Discord = d.d;
    let client = d.c;
    let message = d.m;
    let con = d.s;
    if (message.content.split(' ').length <= 1) {
        const embed = new Discord.RichEmbed()
            .setTitle('Usage: ' + con.pre + '8ball {question}')
            .setColor(0xFFFFFF)
        message.channel.send({
            embed
        });
        return;
    }
    const responseg = ['It is certain', 'It is decidedly so', 'Without a doubt', 'Yes definitely', 'You may rely on it', 'As I see it, yes', 'Most likely', 'Outlook good', 'Yes', 'Signs point to yes'];
    const responseo = ['Reply hazy try again', 'Ask again later', 'Better not tell you now', 'Cannot predict now', 'Concentrate and ask again'];
    const responseb = ['Don\'t count on it', 'My reply is no', 'My sources say no', 'Outlook not so good', 'Very doubtful'];
    const fresponseg = ['As Jesus once said. Yes.', 'You\'re God Damn Right', 'You win!', 'Answer this... Is Alex a stupid Nigger?'];
    const fresponseo = ['Your such a stupid fellow, ask again later!', 'Why are you asking such a stupid question?'];
    const fresponseb = ['Hell nah fam', 'Stop it and get some help', 'You need Jesus', '(You) :gun::boom:'];
    let question = message.content.split(' ').splice(1).join(' ');
    let choice = Math.floor(Math.random() * 3);
    let color = null;
    let response = null;
    if (message.content.includes(' -f')) {
        question = question.replace(' -f', '');
        switch (choice) {
            case 0:
                color = 0x00E676;
                response = fresponseg[Math.floor(Math.random() * fresponseg.length)]
                break;
            case 1:
                color = 0xFFFF00;
                response = fresponseo[Math.floor(Math.random() * fresponseo.length)]
                break;
            case 2:
                color = 0xFF5252;
                response = fresponseb[Math.floor(Math.random() * fresponseb.length)]
                break;

        }
    } else {
        switch (choice) {
            case 0:
                color = 0x00E676;
                response = responseg[Math.floor(Math.random() * responseg.length)]
                break;
            case 1:
                color = 0xFFFF00;
                response = responseo[Math.floor(Math.random() * responseo.length)]
                break;
            case 2:
                color = 0xFF5252;
                response = responseb[Math.floor(Math.random() * responseb.length)]
                break;
        }
    }
    const embed = new Discord.RichEmbed()
        .setColor(color)
        .setAuthor(message.author.username + ' asked', message.author.avatarURL)
        .setThumbnail('http://i.imgur.com/0MayFz0.png')
        .addField('Question', question)
        .addField('8 Ball says...', response);
    message.channel.send({
        embed
    });
    return;
}