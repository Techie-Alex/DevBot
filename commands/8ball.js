exports.run = async (d) => {
  let Discord = d.d;
  let message = d.m;
  if (message.content.split(' ').length <= 1) {
    const embed = new Discord.RichEmbed()
      .setColor(0x212121)
      .setDescription('Usage: ' + d.b.pre + '8ball {question}');
    message.channel.send({
      embed
    });
    return;
  }
  const responseg = ['It is certain', 'It is decidedly so', 'Without a doubt', 'Yes definitely', 'You may rely on it', 'As I see it, yes', 'Most likely', 'Outlook good', 'Yes', 'Signs point to yes'];
  const responseo = ['Reply hazy try again', 'Ask again later', 'Better not tell you now', 'Cannot predict now', 'Concentrate and ask again'];
  const responseb = ['Don\'t count on it', 'My reply is no', 'My sources say no', 'Outlook not so good', 'Very doubtful'];
  let question = message.content.split(' ').splice(1).join(' ');
  let choice = Math.floor(Math.random() * 3);
  let color = null;
  let response = null;
  switch (choice) {
    case 0:
      color = 0x00E676;
      response = responseg[Math.floor(Math.random() * responseg.length)]
      break;
    case 1:
      color = 0xFF9100;
      response = responseo[Math.floor(Math.random() * responseo.length)]
      break;
    case 2:
      color = 0xFF1744;
      response = responseb[Math.floor(Math.random() * responseb.length)]
      break;
  }
  message.channel.send({
    embed: new Discord.RichEmbed()
      .setColor(color)
      .setAuthor(message.author.username + ' asked', message.author.avatarURL)
      .setThumbnail('http://i.imgur.com/G453vy5.gif')
      .setFooter(',8ball {question}')
      .addField('Question', question)
      .addField('8 Ball says...', response)
  });
  return;
}
