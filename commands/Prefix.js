exports.run = (d) => {
  d.m.channel.send({
    embed: new d.d.RichEmbed()
    .setTitle('DevBot')
    .setColor(0x03A9F4)
    .setDescription('For help use `' + d.b.p + 'help`')
    .setThumbnail(d.c.user.avatarURL)
    .setAuthor('Coded by ' + d.c.users.get('250425759452233729').username + '#' + d.c.users.get('250425759452233729').discriminator, d.c.users.get('250425759452233729').avatarURL)
  }).catch(error => {});
}
