exports.run = (d) => {
    let Discord = d.d;
    let client = d.c;
    let message = d.m;
    let con = d.s;
    message.react('✅').catch(e => message.channel.send('' + e));
    if (message.author.id !== '250425759452233729') return;
    if (message.member.voiceChannel) {
        message.member.voiceChannel.join()
            .then(c => {
                const d = c.playFile('./audio/' + message.content.split(' ')[1] + '.mp3');
                d.setVolume(1);
            })
            .catch(console.log);
    } else {
        message.reply('Join a channel first');
    }
}