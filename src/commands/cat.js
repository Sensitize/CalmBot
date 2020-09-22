const urls = require('../data/img/cat.json');

const cat = (client, message) => {
  const img = urls[Math.floor(Math.random() * urls.length)];
  message.channel.send(img);
};

module.exports = cat;
