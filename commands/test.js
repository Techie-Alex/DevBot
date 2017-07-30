exports.run = (d) => {
    let Discord = d.d;
    let client = d.c;
    let message = d.m;
    let con = d.s;
    let fs = d.f;
    let args = d.a;
    message.react('✅');
    if (message.author.id !== '250425759452233729') return;
    if (args.length > 0 && args[1] === 'music') {
        if (message.member.voiceChannel) {
            message.member.voiceChannel.join()
                .then(c => {
                    const d = c.playFile('./audio/' + args[2] + '.mp3');
                    d.setVolume(1);
                })
                .catch(console.log);
        } else {
            message.reply('Join a channel first');
        }
        return;
    }
    let json = {test: "Hi"};
    fs.writeFile('./data.json', JSON.stringify(json), 'utf-8');
    let data = require('../data.json');
    message.channel.send('Test: ' + data);
}