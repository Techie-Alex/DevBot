const g = ['help', 'info', 'eval', 'evals', 'announce', 'test', 'bot', 'clear', 'kick', 'ban', '8ball', 'joke'];
const h = ['confirm', 'music', 'vote'];
exports.run = async (dcb, message) => {
    if (!message.content.startsWith(dcb.b.p) || message.author.bot) return;
    let a = g;
    let b = message.content.split(' ');
    let c = null;
    let d = {
        d: dcb.d,
        c: dcb.c,
        b: dcb.b,
        m: message,
        a: undefined
    };
    let e = b[0].replace(dcb.b.p, '').toLowerCase();
    if (message.author.id == '250425759452233729') a = a.concat(h);
    if (a.includes(e)) c = e;
    else switch (b[0].toLowerCase()) {
        case dcb.b.p:
            c = 'Prefix';
            break;
        case dcb.b.p + 'i':
            c = 'info';
            break;
        case dcb.b.p + 'm':
            c = 'music';
            break;
        case dcb.b.p + 'cat':
            c = 'picture';
            d.a = 'cat';
            break;
        case dcb.b.p + 'dog':
            c = 'picture';
            d.a = 'dog';
            break;
        case dcb.b.p + 'ping':
            c = 'info';
            d.a = 'ping';
            break;
        case dcb.b.p + 'invite':
            c = 'info';
            d.a = 'link';
            break;
    };
    if (c !== null) {
        if (!message.guild) {
            message.channel.send({
                embed: new dcb.d.RichEmbed().setColor(0xFF9100).setTitle('I can\'t let you do this').setDescription('You must use DevBot in a guild. Need one? https://discord.gg/wukpVMm')
            });
            return;
        }
        try {
            await require(`../commands/${c}.js`).run(d);
        } catch (f) {
            message.channel.send({
                embed: new dcb.d.RichEmbed().setTitle('Error:').setColor(0xD500F9).setDescription(String(f)).setFooter('main.js => ../commands/' + c + '.js')
            });
        } finally {
            if (message.author.id !== '250425759452233729') console.log('» ' + message.guild.name + ' » ' + message.channel.name + ' » ' + message.content);
        };
    }
};