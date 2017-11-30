exports.run = async(dcb, guild) => {
    dcb.c.guilds.get('303548834074722304').channels.get('366574537338388492').send({
        embed: new dcb.d.RichEmbed()
            .setColor(0x00E676)
            .setTitle(':smile: Joined a server called ' + guild.name)
            .setThumbnail(guild.iconURL)
            .addField('Owner', guild.owner + ' | ' + guild.owner.user.username)
            .addField('Members', guild.memberCount)
            .addField('Total Channels', guild.channels.size)
            .addField('Region', guild.region)
            .setTimestamp()
    });
}