exports.run = async(dcb, guildmember) => {
    if (guildmember.guild.channels.find('name', 'devbot-logs') !== null) guildmember.guild.channels.find('name', 'devbot-logs').send({
        embed: new dcb.d.RichEmbed().setAuthor(guildmember.user.username + ' joined', guildmember.user.avatarURL)
            .setDescription(guildmember + ' ' + (guildmember.user.bot ? dcb.c.emojis.get('342101758895456256') : '') + ' account created ' + guildmember.user.createdAt.toDateString())
            .setFooter('ID ' + guildmember.id)
            .setTimestamp()
            .setColor(0x00B0FF)
    });
    if (guildmember.guild.id === '303548834074722304' && guildmember.user.bot) {
        guildmember.addRole('341996153077891092');
        guildmember.guild.channels.find('name', 'devbot-logs').send({
            embed: {
                color: 0x00E676,
                description: 'Set ' + guildmember.user.username + ' as a Test-Bot'
            }
        });
    }
}