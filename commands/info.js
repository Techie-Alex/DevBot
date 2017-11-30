exports.run = async (d) => {
  let Discord = d.d;
  let client = d.c;
  let message = d.m;
  let con = d.b;
  let data = d.l;
  const em = new Discord.RichEmbed();
  let cmd;
  if (d.a == undefined) cmd = message.content.split(' ')[1]; else cmd = d.a;
  if (message.content.split(' ').length <= 1 && d.a == undefined) {
    const embed = new Discord.RichEmbed()
      .setTitle('Info command')
      .setDescription('How to use: `,info <tag, emoji, role, guild, server, command (below), users, ID for any listed`')
      .addField('Commands', 'bot, link, links, avatar, channel, guild, server, membercount, mc, roles, me, emojis, ping, owner')
      .addField('Examples', ',i 303548834074722304 » This is the official discord guild id\n,i channel » Info on the current channel\n,i LazyCraft » A guild DevBot is in\n,i general » If guild has a channel called general\n,i <@250425759452233729> » Tag people for info\n,i bot » Info about DevBot\n,i links » Links!')
      .setColor(0xFFFFFF);
    message.channel.send({
      embed
    });
    return;
  }
  switch (cmd.toLowerCase()) {
    case 'bot':
      cmdbot();
      break;
    case 'link':
      cmdlink();
      break;
    case 'links':
      cmdlinks();
      break;
    case 'channel':
      gchannel(message.channel.id);
      break;
    case 'guild':
      gserver(message.guild.id);
      break;
    case 'server':
      gserver(message.guild.id);
      break;
    case 'membercount':
      cmdmembercount();
      break;
    case 'mc':
      cmdmembercount();
      break;
    case 'roles':
      cmdroles();
      break;
    case 'me':
      guser(message.author.id);
      break;
    case 'emojis':
      cmdemojis();
      break;
    case 'ping':
      cmdping();
      break;
    case 'avatar':
      cmdavatar();
      break;
    case 'owner':
      guser(message.guild.ownerID);
      break;
    default:
      cmddefault();
      break;
  }
  return;

  function cmddefault() {
    let name = message.content.split(' ').splice(1).join(' ').replace(/["']/g, '');
    let id = message.content.split(' ')[1].replace(/\D/g, '');
    let type = undefined;
    let under = false;
    if (!name.match('^[0-9]*$') && message.guild.channels.find('name', name) !== null) {
      id = message.guild.channels.find('name', name).id;
      type = 'channel';
    } else if (!name.match('^[0-9]*$') && message.guild.emojis.find('name', name) !== null) {
      id = message.guild.emojis.find('name', name).id;
      type = 'emoji';
    } else if (!name.match('^[0-9]*$') && message.guild.roles.find('name', name) !== null) {
      id = message.guild.roles.find('name', name).id;
      type = 'role';
    } else if (!name.match('^[0-9]*$') && message.guild.members.find('username', name) !== null) {
      id = message.guild.members.find('username', name).id;
      type = 'user';
    } else if (!name.match('^[0-9]*$') && message.guild.members.find('nickname', name) !== null) {
      id = message.guild.members.find('nickname', name).id;
      type = 'user';
    } else if (!name.match('^[0-9]*$') && client.guilds.find('name', name) !== null) {
      id = client.guilds.find('name', name).id;
      type = 'guild';
    } else if (message.guild.members.find('discriminator', id) !== null) {
      id = message.guild.members.find('discriminator', id).id;
      type = 'user';
    } else if (client.users.find('discriminator', id) !== null) {
      id = client.users.find('discriminator', id).id;
      type = 'user';
    } else if (client.users.get(id) !== undefined) type = 'user';
    else if (message.guild.channels.get(id) !== undefined) type = 'channel';
    else if (message.guild.roles.get(id) !== undefined) type = 'role';
    else if (client.emojis.get(String(id).substring(id.length - 18, id.length)) !== undefined) type = 'emoji';
    else if (client.guilds.get(id) !== undefined) type = 'guild';
    else if (name.length < 4) under = true;
    else if (message.guild.channels.some(e => {
      if (String(e.name.toLowerCase()).includes(name.toLowerCase())) {
        id = e.id;
        type = 'channel';
        return;
      }
    }));
    if (type !== undefined) {
      switch (type) {
        case 'user':
          guser(id);
          break;
        case 'channel':
          gchannel(id);
          break;
        case 'role':
          grole(id);
          break;
        case 'emoji':
          gemoji(String(id).substring(id.length - 18, id.length));
          break;
        case 'guild':
          gserver(id);
          break;
      }
    } else {
      const embed = em
        .setColor(0xFF9100)
        .setDescription('The object you entered was not found, try `,info`' + (under ? '. To use name search use 4 or more characters' : ''));
      message.channel.send({
        embed
      })
    }
  }

  function guser(id) {
    let user = client.users.get(id);
    let game = null;
    let avatar = null;
    let status = null;
    let statusT = null;
    if (user.presence.game !== null) {
      let gm = user.presence.game.name;
      if (user.presence.game.streaming)
        game = 'Streaming ' + gm;
      else game = 'Playing ' + gm
    } else game = 'No Game';
    if (user.avatarURL.includes('?')) avatar = user.avatarURL.split('?')[0];
    else avatar = user.avatarURL;
    switch (user.presence.status) {
      case 'online':
        status = client.emojis.get('342105739575427073');
        statusT = 'Online';
        break;
      case 'offline':
        status = client.emojis.get('342106101464039434');
        statusT = 'Offline';
        break;
      case 'idle':
        status = client.emojis.get('342105880067833857');
        statusT = 'Idle';
        break;
      case 'dnd':
        status = client.emojis.get('342106090470768661');
        statusT = 'Do Not Disturb';
        break;
      default:
        status = client.emojis.get('342106101464039434');
        statusT = 'Unknown';
        break;
    };
    const embed = em
      .setColor(0x2979FF)
      .setAuthor('Info for user ' + user.username, avatar)
      .setThumbnail(avatar)
      .setDescription('User created account on: ' + user.createdAt)
      .addField('Bot?', user.bot ? '[:robot: Click to invite](https://discordapp.com/oauth2/authorize?client_id=' + user.id + '&scope=bot)' : ':no_good:', true)
      .addField('User ID', user.id, true)
      .addField('User', message.guild.members.has(user.id) ? user : user.username, true)
      .addField('Discriminator', '#' + user.discriminator, true)
      .addField('Status', status + ' ' + statusT, true)
      .addField('Current Game', game, true);
    if (user.presence.game !== null && user.presence.game.streaming)
      embed.addField('Streaming link', user.presence.game.url);
    if (message.guild.members.has(user.id)) embed.addField((message.author.id === user.id ? 'You joined on' : 'User joined server on'), message.guild.members.get(user.id).joinedAt);
    message.channel.send({
      embed
    });
  }

  function gemoji(id) {
    let emoji = client.emojis.get(id);
    const embed = em
      .setColor(0x2979FF)
      .setDescription('Guild ' + emoji.guild.name + '\nID ' + emoji.id + '\nName :' + emoji.name + ':')
      .setImage(emoji.url);
    message.channel.send({
      embed
    });
  }

  function grole(id) {
    let role = message.guild.roles.get(id);
    const embed = em
      .setColor(role.color)
      .setTitle('Info for role @' + role.name)
      .setThumbnail(message.guild.iconURL)
      .addField('Position', role.calculatedPosition + 1, true)
      .addField('Members', role.members.size, true)
      .addField('Role ID', role.id, true)
      .addField('Managed', role.managed ? 'Yes' : 'No', true)
      .addField('Name', '<@&' + role.id + '>', true)
      .addField('Color', role.hexColor, true);
    message.channel.send({
      embed
    });
  }

  function gchannel(id) {
    let ch = message.guild.channels.get(id);
    if (ch.type === 'text') {
      const embed = em
        .setColor(0x2979FF)
        .setTitle('Channel info for #' + ch.name)
        .setThumbnail(message.guild.iconURL)
        .setDescription(ch.topic === null || ch.topic === '' ? 'No topic' : ch.topic)
        .addField('Position', ch.calculatedPosition + 1, true)
        .addField('Name', '<#' + ch.id + '>', true)
        .addField('Members', ch.members.size, true)
        .addField('Messages', ch.messages.size === 200 ? ch.messages.size + '+' : ch.messages.size, true)
        .addField('NSFW?', ch.nsfw ? 'Send Nudes ;)' : 'Hide the nudes', true)
        .addField('Users typing', ch.typingCount, true);
      message.channel.send({
        embed
      });
    } else if (ch.type === 'voice') {
      const embed = em
        .setColor(0x2979FF)
        .setTitle('Channel info for voice ' + ch.name)
        .setThumbnail(message.guild.iconURL)
        .addField('Position', ch.calculatedPosition + 1, true)
        .addField('Deletable', ch.deletable ? 'Yes' : 'No', true)
        .addField('Members', ch.members.size + ' / ' + (ch.userLimit === 0 ? '∞' : ch.userLimit), true)
        .addField('Bitrate', ch.bitrate / 1000 + 'kbps', true)
        .addField('Full?', ch.full ? 'Don\'t join' : 'No', true)
        .addField('Name', ch.name, true);
      message.channel.send({
        embed
      });
    } else {
      const embed = em
        .setColor(0xFF9100)
        .setTitle('Uh oh')
        .setDescription('I can only do Text and Voice channels');
      message.channel.send({
        embed
      });
    }
  }

  function gserver(id) {
    let gu = client.guilds.get(id);
    let join = undefined;
    if (gu.members.has(message.author.id))
      join = gu.members.get(message.author.id).joinedAt;
    else join = 'I would tell you but... you\'re not in this guild :(';
    const embed = em
      .setColor(0x2979FF)
      .setAuthor('Server info for ' + gu.name, gu.iconURL)
      .setDescription('Server created on ' + gu.createdAt)
      .setThumbnail(gu.iconURL)
      .addField('AFK Channel', gu.channels.get(gu.afkChannelID) === undefined ? 'None' : gu.channels.get(gu.afkChannelID).name, true)
      .addField('AFK Timeout', gu.afkTimeout + ' seconds', true)
      .addField('Channels', gu.channels.size, true)
      .addField('Roles', gu.roles.size, true)
      .addField('Default Role', gu.defaultRole, true)
      .addField('Custom Emojis', gu.emojis.size, true)
      .addField('Content Filter', gu.explicitContentFilter, true)
      .addField('Server ID', gu.id, true)
      .addField('Large Server? 250+ users', gu.large ? 'Yes :sunglasses:' : 'No', true)
      .addField('Members', gu.memberCount, true)
      .addField('Region', gu.region, true)
      .addField('Owner', gu.owner, true)
      .addField('You joined on', join + '\n\nFor a more detailed member count use **,i mc**')
      .setFooter(message.author.username, message.author.avatarURL);
    message.channel.send({
      embed
    });
  }

  async function cmdroles() {
    let a = 'Member count » Role\n', b = message.guild.roles.sort(function (d, e) { return e.position - d.position; }), c;
    await b.map(e => a += e.members.size + ' » ' + e + (message.member.roles.has(e.id) ? ' `✅`' : '') + '\n');
    a += '\nTotal roles: ' + message.guild.roles.size;
    await b.some(e => { if (e.color) { c = e.color; return true } });
    message.channel.send(new Discord.RichEmbed()
      .setColor(c || 0x2979FF)
      .setThumbnail(message.guild.iconURL)
      .setTitle('Roles for ' + message.guild.name)
      .setDescription(a)
      .setFooter((message.member.nickname ? message.member.nickname : message.author.username) + ' | ✅ = You have', message.author.avatarURL)
    );
    /*
    let rf = '';
    message.guild.roles.forEach(e => rf = rf + e.members.size + ' » ' + e + (message.member.roles.has(e.id) ? '`✅`' : '') + '\n');
    if (rf.length > 2000) rf = rf.substring(0, 2000) + '\n**You have passed 2000 characters**';
    const embed = em
      .setColor(0x2979FF)
      .setTitle('Roles for ' + message.guild.name)
      .setDescription('Members » Role\n' + rf + 'Total roles: ' + message.guild.roles.size)
      .setThumbnail(message.guild.iconURL)
      .setFooter(message.author.username + ' | ✅ = You have', message.author.avatarURL);
    message.channel.send({
      embed
    });
    */
  }

  function cmdping() {
    let time = Date.now();
    const embed = em
      .setColor(0xFF9100)
      .setTitle('Ping')
      .setDescription('Sending a ping...');
    message.channel.send({
      embed
    }).then(e => {
      embed.setDescription('Done! Took ' + (Date.now() - time) + 'ms').setColor(0x00E676);
      e.edit({
        embed
      })
    });
  }

  function cmdlink() {
    const embed = em
      .setColor(0x2979FF)
      .setAuthor('Invite DevBot', client.user.avatarURL)
      .setThumbnail(client.user.avatarURL)
      .setDescription('\n >>              [🐣](https://discordapp.com/oauth2/authorize?client_id=330825119582650368&scope=bot&permissions=37088350)             <<\n\nClick the magical chicken');
    message.channel.send({
      embed
    });
  }

  function cmdemojis() {
    if (!message.guild) {
      const embed = em
        .setColor(0xFF9100)
        .setTitle('I can\'t let you do this')
        .setDescription('You can only use this command in a guild');
      message.channel.send({
        embed
      })
      return;
    }
    let fe = '';
    let fe2 = '';
    let fe3 = '';
    let count = 0;
    message.guild.emojis.forEach(e => {
      count++;
      if (count <= 25) fe += e + ' = ' + '`:' + e.name + ':`\n';
      else if (count <= 50) fe2 += e + ' = ' + '`:' + e.name + ':`\n'
      else fe3 += e + ' = ' + '`:' + e.name + ':`\n';
    });
    const embed = em
      .setColor(0x2979FF)
      .setTitle(message.guild.name + ' custom emojis | Page 1/' + (count <= 25 ? '1' : count <= 50 ? '2' : '3'))
      .setThumbnail(message.guild.iconURL)
      .setDescription(fe === '' ? 'No custom emojis :scream:' : String(fe));
    message.channel.send({
      embed
    });
    if (String(fe2) !== '') {
      const embed2 = new Discord.RichEmbed()
        .setColor(0x2979FF)
        .setTitle(message.guild.name + ' custom emojis | Page 2/' + (count <= 25 ? '1' : count <= 50 ? '2' : '3'))
        .setThumbnail(message.guild.iconURL)
        .setDescription(String(fe2));
      message.channel.send({
        embed: embed2
      });
    }
    if (String(fe3) !== '') {
      const embed3 = new Discord.RichEmbed()
        .setColor(0x2979FF)
        .setTitle(message.guild.name + ' custom emojis | Page 3/' + (count <= 25 ? '1' : count <= 50 ? '2' : '3'))
        .setThumbnail(message.guild.iconURL)
        .setDescription(String(fe3));
      message.channel.send({
        embed: embed3
      });
    }

  }

  function cmdavatar() {
    let avatar = undefined;
    if (message.author.avatarURL.includes('?')) avatar = message.author.avatarURL.split('?')[0];
    else avatar = message.author.avatarURL;
    const embed = em
      .setColor(0x2979FF)
      .setDescription('Avatar for <@' + message.author.id + '>')
      .setImage(avatar)
    message.channel.send({
      embed
    })
  }

  function cmdlinks() {
    const embed = em
      .setColor(0x2979FF)
      .setAuthor('Links for DevBot', client.user.avatarURL)
      .setThumbnail(client.user.avatarURL)
      .addField('Invite DevBot', 'https://discordapp.com/oauth2/authorize?client_id=330825119582650368&scope=bot&permissions=37088350')
      .addField('Official Discord', 'https://discord.gg/wukpVMm');
    message.channel.send({
      embed
    });
  }

  function cmdmembercount() {
    if (!message.guild) {
      const embed = em
        .setColor(0xFF9100)
        .setTitle('I can\'t let you do this')
        .setDescription('You can only use this command in a guild');
      message.channel.send({
        embed
      })
      return;
    }
    let conline = 0;
    let cusers = 0;
    let cbots = 0;
    let cbotso = 0;
    message.guild.members.forEach(e => {
      if (!e.user.bot) cusers++;
      if (e.user.bot) cbots++;
      if (e.presence.status !== 'offline' && !e.user.bot) conline++;
      if (e.presence.status !== 'offline' && e.user.bot) cbotso++;

    });
    let time = Date.now();
    const embed = em
      .setColor(0x2979FF)
      .setAuthor('Member count for ' + message.guild.name, message.guild.iconURL)
      .setThumbnail(message.guild.iconURL)
      .addField('Bots', cbots, true)
      .addField('Bots Online', cbotso, true)
      .addField('Users', cusers, true)
      .addField('Users Online', conline, true)
      .addField('Total in server', message.guild.memberCount)
      .setTimestamp();
    message.channel.send({
      embed
    });
  }

  function cmdbot() {
    let game = null;
    if (client.user.presence.game !== null) {
      let gm = client.user.presence.game.name;
      if (client.user.presence.game.streaming)
        game = 'Streaming ' + gm;
      else game = 'Playing ' + gm
    } else game = 'No Game'
    let uptime = new Date(null, null, null, null, null, null, d.c.uptime);
    const embed = em
      .setColor(0x2979FF)
      .setTitle('Info on DevBot')
      .setThumbnail(client.user.avatarURL)
      .addField('About', 'Started coding this bot on July 5th in JavaScript from scratch to learn js. API is Discord.js')
      .addField('Channels', client.channels.size, true)
      .addField('Emojis', client.emojis.size, true)
      .addField('Guilds', client.guilds.size, true)
      .addField('Shard ID', client.options.shardId, true)
      .addField('Ping', Math.round(client.ping), true)
      .addField('Status', client.user.presence.status, true)
      .addField('Voice Users', client.voiceConnections.size, true)
      .addField('Up Time', (uptime.getHours() >= 1 ? uptime.getHours() + (uptime.getHours() === 1 ? ' hour' : ' hours') + ' and ' : '') + uptime.getMinutes() + (uptime.getMinutes() === 1 ? ' minute' : ' minutes'), true)
      .addField('Users', client.users.size, true)
      .addField('Current Game', game, true)
      .setFooter('Created by ' + client.users.get('250425759452233729').username + '#' + client.users.get('250425759452233729').discriminator, client.users.get('250425759452233729').avatarURL);
    message.channel.send({
      embed
    });
  }
}
