exports.run = async (d) => {
    if (d.m.author.id !== '250425759452233729') return;
    const Discord = d.d;
    const client = d.c;
    const message = d.m;
    await d.m.react('✅');
    await d.m.react('342116690433277953');
    await d.m.react('337078611569934349');
    await d.m.react('342115414051913728');
    const collector = message.createReactionCollector((reaction, user) => ['✅'].contains(reaction) && reaction.remove(user), {time: 50000});
    collector.on('collect', emoji => console.log(`Collected ${emoji.emoji.name}`));
    collector.on('end', collected => d.m.channel.send('test'));
}
/*
roles = ["374255669995503616", "374322117518557204"];
    let role = message.content.split(' ')[1];
    let name = message.content.split(' ').splice(1).join(' ');
    let nrole = undefined;
    if (message.guild.roles.find('name', name) !== null) {nrole = message.guild.roles.find('name', name)};
    if (nrole == undefined) {
        await message.guild.roles.some(e => {
        if (e.name.toLowerCase().includes(name.toLowerCase()) && roles.includes(e.id)) {
            nrole = e;
        }
        return;
    })
    }
    if (nrole != undefined) {
        if (message.member.roles.has(nrole.id)) {
            message.member.removeRole(nrole, "Role is self-assigned").then(e => message.channel.send({
                embed: new Discord.RichEmbed().setDescription("Removed role " + nrole.name + " from " + message.author.username)
            })).catch(e => message.channel.send({
                embed: new Discord.RichEmbed().setDescription("Error: " + e)
            }));
        } else {
            message.member.addRole(nrole, "Role is self-assigned").then(e => message.channel.send({
                embed: new Discord.RichEmbed().setDescription("Added role " + nrole.name + " to " + message.author.username)
            })).catch(e => message.channel.send({
                embed: new Discord.RichEmbed().setDescription("Error: " + e)
            }));
        }
    }
*/
/*
usd = {};
usdt = [];
  if (usd[message.author.id] && usd[message.author.id] - new Date().getTime() > 1) {
    if (!usdt.includes(message.author.id)) {
      usdt.push(message.author.id);
      let utl = new Date(null, null, null, null, null, null, usd[message.author.id] - new Date().getTime());
      message.channel.send({
        embed: new Discord.RichEmbed().setDescription('There\'s a delay! Wait another ' + utl.getSeconds() + ' seconds')
      }).then(m => m.delete(5000));
      setTimeout(function() {usdt.splice(usdt.indexOf(message.author.id))}, 3000)
    }
    return;
  } else {
    usd[message.author.id] = new Date().getTime() + 50000;
    setTimeout(function() {if (usd[message.author.id]) delete usd[message.author.id]}, 50000);
  }

  function count(obj) {
     var count=0;
     for(var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
           ++count;
        }
     }
     return count;
  }
  message.reply('Hi, ' + usdt.length + ' | ' + count(usd));
  */
/*
if (message.content.split(' ').length > 0 && message.content.split(' ')[1] === 'setup') {
        let o = message.guild.id;
        let setup = {o: {logJoinLeave: message.content.split(' ')[2]}}
        fs.writeFile("./data.json", JSON.stringify(setup), (e) => {});
        return;
    }
    if (data[message.guild.id] && data[message.guild.id].logJoinLeave && message.guild.get(data[message.guild.id].logJoinLeave) !== undefined) {
        message.guild.get(data[message.guild.id].logJoinLeave).send('Works');
    }
*/
/*
if (usd[message.author.id] && usd[message.author.id] - new Date().getTime() > 1) {
        let utl = new Date(null, null, null, null, null, null, usd[message.author.id] - new Date().getTime());
        message.reply('Time left: ' + utl.getSeconds() + ' seconds');
        return;
    } else {
        usd[message.author.id] = new Date().getTime() + 30000;
    }
    message.channel.send('Command reached')
*/
/*
        const fs = require("fs");
        let data = JSON.parse(fs.readFileSync("./data.json", "utf8"));
        if (!data[message.author.id]) data[message.author.id] = {
            points: 0
        };
        data[message.author.id].points++;
        fs.writeFile("./data.json", JSON.stringify(data), (err) => {
            if (err) console.error(err)
        });
        message.channel.send('File Count: ' + data[message.author.id].points);
        message.react('✅');
*/