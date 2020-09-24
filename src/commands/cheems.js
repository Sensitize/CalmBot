const urls = require('../data/img/cheems.json');

const cheems = (client, message) => {
  const img = urls[Math.floor(Math.random() * urls.length)];
  message.channel.send(img);
};

module.exports = cheems;
