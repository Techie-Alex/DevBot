exports.run = async(dcb, guildmember) => {
    let days = Math.round(Math.abs(new Date().getTime() - guildmember.joinedTimestamp) / (1000 * 3600 * 24));
    if (guildmember.guild.channels.find('name', 'devbot-logs') !== null) guildmember.guild.channels.find('name', 'devbot-logs').send({
        embed: new dcb.d.RichEmbed()
            .setAuthor(guildmember.user.username + ' left', guildmember.user.avatarURL)
            .setDescription(guildmember + ' ' + (guildmember.user.bot ? dcb.c.emojis.get('342101758895456256') : '') + ' was in the server for ' + days + ' ' + (days == 1 ? 'day' : 'days'))
            .setFooter('ID ' + guildmember.id)
            .setTimestamp()
            .setColor(0x2979FF)
    });
}