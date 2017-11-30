exports.run = async(dcb, channel) => {
    if (channel.type === 'text' && channel.name === 'devbot-logs' && channel.guild.channels.findAll('name', 'devbot-logs').length === 0)
        if (channel.guild.channels.find('name', 'general') !== null) channel.guild.channels.find('name', 'general').send({
            embed: new dcb.d.RichEmbed().setColor(0xD500F9).setDescription('The DevBots logging channel `devbot-logs` was deleted. You will no longer recieve logs from DevBot. To undo simply type `' + dcb.b.pre + 'setup channel`')
        }).catch();
}
