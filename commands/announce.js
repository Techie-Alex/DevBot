exports.run = (d) => {
  let Discord = d.d;
  let client = d.c;
  let message = d.m;
  if (d.m.author.id !== '250425759452233729') {
    const embed = new Discord.RichEmbed()
      .setColor(0x9C27B0)
      .setDescription('Haha good try! But you\'re not Alex ' + d.c.emojis.get('338824092134408192'));
    d.m.channel.send({
      embed
    });
    return;
  }
  if (message.content.split(' ').length <= 1) {
    const embed = new Discord.RichEmbed()
      .setColor(0x212121)
      .setDescription('Usage: ' + d.b.pre + 'announce {what}');
    message.channel.send({
      embed
    });
    return;
  }
  let reply = message.content.split(' ').splice(1).join(' ');
  let count = 0;
  client.guilds.forEach(e => {
    if (e.channels.find('name', 'devbot-logs') !== null) {
      const embed = new Discord.RichEmbed()
        .setColor(0xD500F9)
        .setTitle('Announcement')
        .setDescription(reply);
      e.channels.find('name', 'devbot-logs').send({
        embed
      });
      count++;
    }
  });
  message.channel.send('Sent to ' + count + ' guilds');
}
