exports.run = (d) => {
  let Discord = d.d;
  let client = d.c;
  let bot = d.b;
  let message = d.m;
  if (!message.channel.permissionsFor(message.member).has('MANAGE_GUILD')) {
    message.channel.send({
      embed: new Discord.RichEmbed()
        .setColor(0xFF9100)
        .setDescription('You need the permission `MANAGE_GUILD` to do this')
    });
    return;
  }
  if (message.content.split(' ').length < 1) {
    message.channel.send({
      embed: new Discord.RichEmbed()
        .setColor(0x212121)
        .setDescription('In progress')
    });
    return;
  }

}