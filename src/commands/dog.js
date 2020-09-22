const urls = require('../data/img/dog.json');

const dog = (client, message) => {
  const img = urls[Math.floor(Math.random() * urls.length)];
  message.channel.send(img);
};

module.exports = dog;
