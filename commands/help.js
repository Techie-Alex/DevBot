exports.run = (d) => {
    let Discord = d.d;
    let client = d.c;
    let message = d.m;
    let con = d.s;
    const embed = new Discord.RichEmbed()
        .setTitle('Help is on the way!')
        .setColor(0x00E676)
        .setDescription('Check your direct messages ' + message.author + ' for a new message');
    message.channel.send({
        embed
    });
    const embed2 = new Discord.RichEmbed()
        .setTitle('Commands for DevBot')
        .setColor(0x03A9F4)
        .setDescription('{} = Required, [] = Optional Arguments, (ip) = In Progress')
        .addField('DevBot Related', '**,** » Bot creator\n**,help** » Shows this embed\n' + '**,info** » Awesome information about this bot\n')
        .addField('Alex Only', '**,eval {javascript input}** » How I can run code in chat\n**,announce {message}** » Let all servers with DevBot logs channel know of a update\n**,test** » My testing command! Testing 1, 2, 3\n')
        .addField('Permission Based', '**,clear {amount}** » Clear chat 1 - 100 lines | Permission: `MANAGE_MESSAGES`\n(ip)**,kick {id or tag} [reason]** » Kick a player | Permission: `KICK_MEMBERS`\n(ip)**,ban {id or tag} [reason]** » Ban a player | Permission: `BAN_MEMBERS`\n')
        .addField('Utility', '(ip)**,vote {seconds} {input}** » Vote per channel with a time limit. Vote with reactions!\n**,uinfo [user]** » Shows info about you or someone else on discord!\n**,sinfo** » Server Info\n**,cinfo** » Channel Info\n')
        .addField('Fun', '**,8ball {question}** » Have the mystic 8-ball answer your wisest questions\n(ip)**,joke [ym, cn]** » Have a random joke! [Yo Momma, Chuck Norris]\n')
        .addField('Music (**IN NEW DEVELOPMENT**)', '**,play {song}** » Play song or add to queue\n**,skip** » Skip to the next song in playlist\n**,songlist** » The queue for songs');
    message.author.send({
        embed: embed2
    });
}