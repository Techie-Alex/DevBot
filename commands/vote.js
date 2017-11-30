exports.run = (d) => {
  // message.channel.messages.get('339835193550700545').reactions.forEach( e => {if (e.emoji.name ===  'sob') message.channel.send(e.count)})
  let Discord = d.d;
  let client = d.c;
  let message = d.m;
  let con = d.b;
  const embed2 = new Discord.RichEmbed()
    .setTitle('Vote command is in progress')
    .setColor(0xFFFFFF);
  message.channel.send({
    embed: embed2
  });
  if (message.author.id !== '250425759452233729') return;
  if (message.content.split(' ').length <= 2) {
    const embed = new Discord.RichEmbed()
      .setColor(0x212121)
      .setDescription('Usage: ' + d.b.pre + 'vote {seconds} {vote thing}');
    message.channel.send({
      embed
    });
    return;
  }
  let input = message.content.split(' ').splice(2).join(' ');
  const embed = new Discord.RichEmbed()
    .setAuthor(message.author.username + ' started a vote', message.author.avatarURL)
    .setColor(0xFFA726)
    .addField('Question:', input)
    .setFooter('🔵 React with your vote 🔵')
  message.channel.send({
      embed
    })
    .then(e => {
      e.react('\U0000274c').then(e.react('\U00002714'));
    })
    .catch(e => {
      const error = new Discord.RichEmbed()
        .setTitle('Error!')
        .setColor(0xFF5252)
        .setDescription('' + e);
      message.channel.send({
        embed: error
      });
    });
  return;
}
