exports.run = async (d) => {
  let Discord = d.d;
  let client = d.c;
  let message = d.m;
  let con = d.b;
  if (!message.member.hasPermission('BAN_MEMBERS')) {
    message.channel.send({
      embed: new Discord.RichEmbed()
        .setColor(0xFF9100)
        .setDescription('You need the permission `BAN_MEMBERS` to do this')
    });
    return;
  }
  if (d.m.author.id !== '250425759452233729') {
    d.m.channel.send({
      embed: new Discord.RichEmbed()
        .setColor(0xffffff)
        .setDescription('Ban command in progress')
    });
    return;
  }
  if (message.content.split(' ').length <= 1) {
    message.channel.send({
      embed: new Discord.RichEmbed()
        .setTitle('Usage: ' + con.pre + 'ban {id or tag} [days of messages] [reason]')
        .setColor(0xFFFFFF)
    });
    return;
  }
  let id = message.content.split(' ')[1].replace(/\D/g, '');
  let reason, days, target;
  if (client.fetchUser(id) !== null) target = id;
  else {
    message.channel.send({
      embed: new Discord.RichEmbed()
        .setColor(0xFF9100)
        .setDescription('Member not found')
        .setFooter(con.pre + 'ban {id or tag} [days of messages] [reason]')
    });
    return;
  }
  if (message.content.split(' ').length > 2) {

  } else {
    days = '7';
    reason = 'Banned from server ' + d.m.guild.name;
  }
  message.channel.send("Days: " + days + " Reason: " + reason);
  d.m.guild.ban(target, {
    days: days,
    reason: reason.replace(/[^a-z 0-9]/gi, '')
  }).then(e => {
    message.channel.send({
      embed: new Discord.RichEmbed()
        .setColor(0x00E676)
        .setTitle('Success!')
        .setDescription('Banned ' + id + ' for ' + reason)
        .setTimestamp()
    });
    if (message.guild.channels.find('name', 'devbot-logs') !== null) {
      message.guild.channels.find('name', 'devbot-logs').send({
        embed: new Discord.RichEmbed()
          .setColor(0xFF1744)
          .setTitle('Banned ' + id)
          .setDescription('Reason: ' + reason)
          .setFooter('ID ' + id)
          .setTimestamp()
      });
    }
    if (client.users.get(id) !== null) {
      client.users.get(id).send({
        embed: new Discord.RichEmbed()
          .setColor(0xFF1744)
          .setDescription('You were banned from ' + message.guild.name + ' with the reason: ' + reason)
          .setFooter('Guild ID ' + message.guild.id)
          .setTimestamp()
      }).catch(e => {});
    }
  }).catch(e => {
    message.channel.send({
      embed: new Discord.RichEmbed()
        .setColor(0xFF1744)
        .setDescription('Error: ' + e)
    });
  });
}