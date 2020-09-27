const request = require('request');

async function getPlayer(name, cb) {
  if (typeof name !== 'string') {
    cb('please provide a name', null);
  } else {
    request({ json: true, url: `https://api.hypixel.net/player?key=${process.env.HYPIXEL_API_KEY}&name=${name}` }, (err, res, body) => {
      if (err) {
        cb('request error', null);
      } else if (!body.success) {
        console.log(body);
        cb('invalid api key', null);
      } else if (!body.player) {
        cb('player doesnt exist', null);
      } else {
        cb(null, body.player);
      }
    });
  }
}

module.exports = { getPlayer };
