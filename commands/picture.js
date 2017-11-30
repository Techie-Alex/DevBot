exports.run = (d) => {
  let Discord = d.d;
  let client = d.c;
  let message = d.m;
  let con = d.b;
  const embed = new Discord.RichEmbed()
    .setTitle('Picture command is in progress')
    .setColor(0xFFFFFF)
  message.channel.send({
    embed
  });
  if (message.author.id !== '250425759452233729') return;
}
