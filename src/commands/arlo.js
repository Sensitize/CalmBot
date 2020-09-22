const urls = require('../data/img/arlo.json');

const arlo = (client, message) => {
  if (message.args[0]?.toLowerCase() === 'breed'){
    message.channel.send('https://cdn.discordapp.com/attachments/501501905508237315/756487167152357376/image0.png');
  } else {
    const img = urls[Math.floor(Math.random() * urls.length)];
    message.channel.send(img);
  }
};

module.exports = arlo;
