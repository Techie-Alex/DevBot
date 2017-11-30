exports.run = (d) => {
  let Discord = d.d;
  let client = d.c;
  let message = d.m;
  let con = d.b;
  if (!message.channel.permissionsFor(message.member).has('KICK_MEMBERS')) {
    const embed = new Discord.RichEmbed()
      .setColor(0xFF9100)
      .setDescription('You need the permission `KICK_MEMBERS` to do this');
    message.channel.send({
      embed
    });
    return;
  }
  if (message.content.split(' ').length < 2) {
    const embed = new Discord.RichEmbed()
      .setColor(0x212121)
      .setDescription('Usage: ' + d.b.pre + 'kick {id or tag} [reason]');
    message.channel.send({
      embed
    });
    return;
  }
  let id = message.content.split(' ')[1].replace(/\D/g, '');
  let msg = '';
  let target = null;
  if (message.content.split(' ').length > 2) msg = message.content.split(' ').slice(2).join(' ');
  else msg = 'Kicked from server ' + message.guild.name;
  if (message.guild.members.get(id) !== undefined) target = message.guild.members.get(id);
  else {
    message.channel.send({
      embed: new Discord.RichEmbed()
        .setColor(0xFF9100)
        .setDescription('Member not found')
        .setFooter(con.pre + 'kick {id or tag} [reason]')
    });
    return;
  }
  target.kick(msg.match(/[a-zA-Z]+/g).join(' ')).then(e => {
    const e1 = new Discord.RichEmbed()
      .setColor(0x00E676)
      .setTitle('Success!')
      .setDescription('Kicked ' + target.user.username + ' for ' + msg)
      .setTimestamp();
    message.channel.send({
      embed: e1
    });
    if (message.guild.channels.find('name', 'devbot-logs') !== null) {
      const e2 = new Discord.RichEmbed()
        .setColor(0xFF9100)
        .setTitle('Kicked ' + target.user.username)
        .setDescription('Reason: ' + msg)
        .addField('Who kicked user', message.author + ' » ' + message.author.id)
        .setFooter('Target ID ' + target.id)
        .setTimestamp();
      message.guild.channels.find('name', 'devbot-logs').send({
        embed: e2
      });
    }
    if (client.users.get(target.id) !== null) {
      const e3 = new Discord.RichEmbed()
        .setColor(0xFF9100)
        .setDescription('You were kicked from ' + message.guild.name + ' with the reason: ' + msg)
        .setFooter('Guild ID ' + message.guild.id)
        .setTimestamp();
      client.users.get(id).send({
        embed: e3
      }).catch(e => {});
    }
  }).catch(e => {
    const embed = new Discord.RichEmbed()
      .setColor(0xFF1744)
      .setDescription('Error: ' + e);
    message.channel.send({
      embed
    });
  });
}