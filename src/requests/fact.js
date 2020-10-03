const request = require('request');

module.exports = async function randomFact(cb = () => {}) {
  const url = 'https://uselessfacts.jsph.pl/random.json?language=en';
  request({ json: true, url }, (err, res, body) => {
    if (err) {
      cb(err, null);
    } else if(!body.text) {
      cb('API error', null);
    } else {
      cb(null, body.text.replace(/`/g, "'"));
    };
  });
}