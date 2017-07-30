exports.run = (d) => {
    let Discord = d.d;
    let client = d.c;
    let message = d.m;
    let con = d.s;
    message.react('✅').catch(e => message.channel.send('' + e));
    if (message.author.id !== '250425759452233729') return;
}