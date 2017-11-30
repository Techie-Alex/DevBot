exports.run = (d) => {
  let Discord = d.d;
  let client = d.c;
  let message = d.m;
  let con = d.b;
  if (!message.guild) {
    const embed = em
      .setColor(0xFF9100)
      .setTitle('I can\'t let you do this')
      .setDescription('You can only use this command in a guild');
    message.channel.send({
      embed
    });
    return;
  }
  if (!message.channel.permissionsFor(message.member).has('MANAGE_MESSAGES')) {
    const embed = new Discord.RichEmbed()
      .setColor(0xFF9100)
      .setDescription('You need the permission `MANAGE_MESSAGES` to do this');
    message.channel.send({
      embed
    });
    return;
  }
  if (!(message.content.split(' ').length > 1 && message.content.split(' ')[1].match('^[0-9]*$') && message.content.split(' ')[1] <= 100 && message.content.split(' ')[1] >= 0)) {
    message.channel.send({
      embed: new Discord.RichEmbed()
      .setColor(0x212121)
      .setDescription('Usage: ' + d.b.pre + 'clear {amount 0-100}')
    });
    return;
  }
  if (message.content.split(' ')[1] == 0) {
    message.delete().then(e => {
      message.channel.send({
        embed: new Discord.RichEmbed()
        .setColor(0x00E676)
        .setTitle('Success!')
        .setDescription('Cleared your message')
      }).then(m => m.delete(5000));
    }).catch(e => {
      message.channel.send({
        embed: new Discord.RichEmbed()
          .setColor(0xFF1744)
          .setDescription('Error: ' + e)
      });
    });
  } else if (message.content.split(' ')[1] == 1) {
    message.delete().catch(error => {}).then(
      setTimeout(function () {
        message.channel.messages.last(2)[1].delete().catch(error => {}).then(e => {
          message.channel.send({
            embed: new Discord.RichEmbed()
              .setColor(0x00E676)
              .setTitle('Success!')
              .setDescription('Cleared 1 message')
          }).then(m => m.delete(5000).catch());
        }).catch(e => {
          message.channel.send({
            embed: new Discord.RichEmbed()
              .setColor(0xFF1744)
              .setDescription('Error: ' + e)
          }).catch(e => {});
        });
      }, 500)
    );
  } else {
    message.delete().then(
      setTimeout(function () {
        message.channel.bulkDelete(message.content.split(' ')[1]).then(e => {
          message.channel.send({
            embed: new Discord.RichEmbed()
              .setColor(0x00E676)
              .setTitle('Success!')
              .setDescription('Cleared ' + e.size + ' messages')
          }).then(m => m.delete(5000).catch());
        }).catch(e => {
          message.channel.send({
            embed: new Discord.RichEmbed()
              .setColor(0xFF1744)
              .setDescription('Error: ' + e)
          }).catch();
        });
      }, 500)
    );
  }
}