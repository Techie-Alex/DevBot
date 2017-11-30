temp1 = '';
temp2 = '';
temp3 = '';
exports.run = (d) => {
  let Discord = d.d;
  let client = d.c;
  let message = d.m;
  let con = d.b;
  if (d.m.author.id !== '250425759452233729') {
    d.m.channel.send({
      embed: new Discord.RichEmbed()
        .setColor(0x9C27B0)
        .setDescription('Haha good try! But you\'re not Alex ' + d.c.emojis.get('338824092134408192'))
    }).catch();
    return;
  }
  let input = message.content.split(' ').splice(1).join(' ');
  try {
    eval(input);
    message.react('✔').then(message.delete(1000).catch()).catch();
  } catch (e) {
    message.react('❌').then(message.delete(1000).catch()).catch();
  }
}