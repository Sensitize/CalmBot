const request = require('request');

const factoid = (client, message) => {
  request({ json: true, url: 'https://uselessfacts.jsph.pl/random.json?language=en' }, (err, res, body) => {
    if (!body?.text) {
      message.channel.send('API error');
    } else {
      message.channel.send(`**FACT:** ${body.text}`);
    }
  });
};

module.exports = factoid;
