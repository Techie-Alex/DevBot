temp1 = '';
temp2 = '';
temp3 = '';
exports.run = (d) => {
  let Discord = d.d;
  let client = d.c;
  let message = d.m;
  if (d.m.author.id !== '250425759452233729') {
    d.m.channel.send({
      embed: new Discord.RichEmbed()
        .setColor(0x9C27B0)
        .setDescription('Haha good try! But you\'re not Alex ' + d.c.emojis.get('338824092134408192'))
    });
    return;
  }
  let input = message.content.split(' ').splice(1).join(' ');
  let output, color;
  if (input === '') input = '"None"';
  try {
    output = eval(input);
    color = 0x00E676;
  } catch (error) {
    output = error;
    color = 0xFF5252;
  } finally {
    message.channel.send({
      embed: new Discord.RichEmbed()
        .setColor(color)
        .addField('Input', '```js\n' + input + '\n```', true)
        .addField((color === 0xFF5252 ? 'Error' : 'Output'), '```js\n' + output + '\n```', true)
    });
  }
}