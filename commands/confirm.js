c_confirm_list = {};
exports.run = (d) => {
  if (c_confirm_list[d.m.author.id] !== undefined) {
    eval(c_confirm_list[d.m.author.id]).then(d.m.reply("Ran")).catch(e => {d.m.send('Uh oh there was a error: ' + e)})
    c_confirm_list[d.m.author.id] = null;
  } else {d.m.reply('You don\'t have a confirmation waiting...')}
}
