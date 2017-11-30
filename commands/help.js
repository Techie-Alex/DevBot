exports.run = (d) => {
  let Discord = d.d;
  let message = d.m;
  message.channel.send({
    embed: new Discord.RichEmbed()
      .setTitle('Help is on the way!')
      .setColor(0x00E676)
      .setDescription('Check your direct messages ' + message.author + ' for a new message')
  }).then(e => setTimeout(function () {
    message.react('✅').catch(error => {});
    e.delete().catch(error => {})
  }, 10000)).catch(error => {});
  message.author.send({
    embed: new Discord.RichEmbed()
      .setTitle('Commands for DevBot')
      .setColor(0x03A9F4)
      .setDescription('{} = Required, [] = Optional Arguments, (ip) = In Progress')
      .addField('DevBot Related', '**,** » Bot prefix\n**,help** » Shows this embed\n' + '**,info bot** » Awesome information about this bot\n')
      .addField('Alex Only', '**,eval {javascript input}** » How I can run code in chat\n**,evals {javascript input}** » Same thing as ,eval with no output\n**,announce {message}** » Let all servers with DevBot logs channel know of an update\n**,rf {file location}** » Refresh a file from the node\n**,test** » My testing command! Testing 1, 2, 3\n')
      .addField('Server Managers | Permission `MANAGE_GUILD`', '(ip)**,bot** » Setup the bot to work with your server')
      .addField('Permission Based', '**,clear {amount}** » Clear chat 0 - 100 lines | Permission: `MANAGE_MESSAGES`\n**,kick {id or tag} [reason]** » Kick a player | Permission: `KICK_MEMBERS`\n(ip)**,ban {id or tag} [days of messages] [reason]** » Ban a player | Permission: `BAN_MEMBERS`\n')
      .addField('Utility', '**,info** » SUPER COMMAND! Type ,info for help\n(ip)**,vote {seconds} {input}** » Vote per channel with a time limit. Vote with reactions!\n')
      .addField('Fun', '**,8ball {question}** » Have the mystic 8-ball answer your wisest questions\n**,joke [ym, cn, ei]** » Have a random joke! [Yo Momma, Chuck Norris, Elizabethan Insult]\n')
      .addField('Music', '(ip)**,music play {song}** » Play song or add to queue\n(ip)**,music skip** » Skip to the next song in playlist\n(ip)**,music list** » The queue for songs')
  }).catch(error => {});
}