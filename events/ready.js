exports.run = async(dcb) => {
    require('get-json');
    require('fs');
    dcb.c.user.setStatus('online');
    dcb.c.user.setGame('🌀 ' + dcb.b.pre + 'help 🌀', 'https://www.twitch.tv/#');
    let a = 0;
    setInterval(function () {
        const b = ['🌀 ' + dcb.b.pre + 'help | ' + dcb.c.guilds.size + ' guilds 🌀', '🌀 ' + dcb.b.pre + 'help | ' + dcb.c.users.size + ' users 🌀'];
        dcb.c.user.setGame(b[a], 'https://www.twitch.tv/#');
        if (a >= b.length - 1) a = 0;
        else a++;
    }, 60000);
    console.log(' | ' + dcb.b.pre + 'DevBot loaded logged in as ' + dcb.c.user.tag + ' | ');
}
