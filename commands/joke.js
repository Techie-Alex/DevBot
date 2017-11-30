let getJSON = require('get-json');
let usd = {};
let usdt = [];
exports.run = async (d) => {
  if (usd[d.m.author.id] && usd[d.m.author.id] - new Date().getTime() > 1) {
    if (!usdt.includes(d.m.author.id)) {
      usdt.push(d.m.author.id);
      let utl = new Date(null, null, null, null, null, null, usd[d.m.author.id] - new Date().getTime());
      d.m.channel.send({
        embed: new d.d.RichEmbed().setDescription('There\'s a delay! Wait another ' + utl.getSeconds() + ' seconds')
      }).then(m => m.delete(3000)); // Delete message after this amount of time
      setTimeout(function() {usdt.splice(usdt.indexOf(d.m.author.id))}, 1000) // Time until next delay message shows
    }
    return;
  } else {
    usd[d.m.author.id] = new Date().getTime() + 3000; // Match below, Time until user can run command again
    setTimeout(function() {if (usd[d.m.author.id]) delete usd[d.m.author.id]}, 3000); // Match above, when time does run out delete from list
  }
  let chosen = null;
  if (d.m.content.split(' ').length > 1) {
    switch (d.m.content.split(' ')[1].toLowerCase()) {
      case 'cn':
        chosen = 0
        break;
      case 'ym':
        chosen = 1
        break;
      case 'ei':
        chosen = 2
        break;
      default:
        d.m.channel.send({
          embed: new d.d.RichEmbed()
            .setColor(0xFF9100)
            .setDescription('The joke catagory wasn\'t found. You can choose between these:\n - cn = Chuck Norris\n - ym = Yo Momma\n\n - ei = Elizabethan Insult\nUsage: ' + d.b.p + 'joke [catagory]')
        });
        return;
        break;
    }
  } else chosen = Math.floor(Math.random() * 2);
  switch (chosen) {
    case 0:
      getJSON('http://api.icndb.com/jokes/random?escape=javascript', function (error, response) {
        if (!error) submit(0xc00000, 'Chuck Norris', 'http://i.imgur.com/oOe6FIm.gif', response.value.joke)
        else submit(0xff1744, 'Chuck Norris - API Down', 'http://i.imgur.com/oOe6FIm.gif', "*Chuck norris took down his API, there may never be another pun...*")
      });
      break;
    case 1:
      getJSON('http://api.yomomma.info/', function (error, response) {
        if (!error) submit(0xff66ff, 'Yo Momma', 'http://i.imgur.com/PN7DFva.gif', response.joke)
        else submit(0xff1744, 'Yo Momma - API Down', 'http://i.imgur.com/PN7DFva.gif', "*Yo momma so fat she broke the API. Try this again later*")
      });
      break;
    case 2:
      getJSON('http://quandyfactory.com/insult/json', function (error, response) {
        if (!error) submit(0xb3b3b3, 'Elizabethan Insult', 'http://i.imgur.com/6vEP25C.png', response.insult)
        else submit(0xff1744, 'Elizabethan Insult - API Down', 'http://i.imgur.com/6vEP25C.png', "*The Elizabethan API is down right now, BE GONE and try again later...*")
      });
      break;
  }
  function submit(color, title, image, joke) {
    d.m.channel.send({
      embed: new d.d.RichEmbed()
        .setColor(color)
        .setAuthor(title, image)
        .setDescription(joke)
        .setFooter(d.b.p + 'joke [catagory]')
    });
  }
}