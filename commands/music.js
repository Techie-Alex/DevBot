exports.run = (d) => {
  let Discord = d.d;
  let client = d.c;
  let message = d.m;
  let con = d.b;
  const ytdl = require('ytdl-core');
  if (message.author.id !== '250425759452233729') {
    const embed = new Discord.RichEmbed()
      .setTitle(',music command is in progress')
      .setColor(0xFFFFFF);
    message.channel.send({
      embed
    });
    return;
  }
  let voice = null;
  if (!message.member.voiceChannel) {
    const embed = new Discord.RichEmbed()
      .setDescription('Join a voice chat first')
      .setColor(0xFFFFFF);
    message.channel.send({
      embed
    });
    return;
  }
  message.member.voiceChannel.join()
    .then(connection => {
      const dispatcher = connection.playFile('./audio/' + message.content.split(' ')[1] + '.mp3');
      dispatcher.setVolume(1);
      dispatcher.on('end', () => {
        message.member.voiceChannel.leave();
      });
    });
}
/*
message.member.voiceChannel.join()
    .then(connection => {
        const dispatcher = connection.playFile('./audio/' + message.content.split(' ')[1] + '.mp3');
        dispatcher.setVolume(1);
        dispatcher.on('end', () => {
            message.member.voiceChannel.leave();
        });
    });
    */
