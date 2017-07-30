exports.run = (d) => {
    const embed = new d.d.RichEmbed()
        .setTitle('DevBot')
        .setColor(0x03A9F4)
        .setDescription('For help use `,help`, info use `,info`')
        .setThumbnail(d.c.user.avatarURL)
        .setAuthor('Coded by Alex', d.c.users.get('250425759452233729').avatarURL);
    d.m.channel.send({
        embed
    });
}