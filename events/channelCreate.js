exports.run = async(dcb, channel) => {
    if (channel.type === 'text' && channel.name === 'devbot-logs') {
        if (channel.guild.channels.findAll('name', 'devbot-logs').length === 1) {
            channel.send({
                embed: new dcb.d.RichEmbed().setColor(0xD500F9).setDescription('DevBot will now hook into this channel for logging')
            });
        }
        channel.overwritePermissions(channel.guild.defaultRole, {
            SEND_MESSAGES: false
        }).then(e => {
            if (!channel.permissionOverwrites.has('330825119582650368')) channel.overwritePermissions(dcb.c.user, {
                SEND_MESSAGES: true,
                READ_MESSAGES: true,
                EMBED_LINKS: true,
                ATTACH_FILES: true,
                USE_EXTERNAL_EMOJIS: true
            });
        }).then(e => {
            channel.send({
                embed: new dcb.d.RichEmbed().setColor(0xD500F9).setTitle('DevBot has set 6 permissions for this channel:').addField('@everyone perms', 'SEND_MESSAGES: false').addField('Bot perms', 'SEND_MESSAGES: true\nREAD_MESSAGES: true\nEMBED_LINKS: true\nATTACH_FILES: true\nUSE_EXTERNAL_EMOJIS: true')
            });
        }).catch(e => {
            channel.send({
                embed: new dcb.d.RichEmbed().setColor(0xFFEA00).setDescription('Error setting perms! Here\'s my error: ' + String(e))
            });
        });
    };
}
