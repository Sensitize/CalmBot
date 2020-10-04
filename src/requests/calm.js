const request = require('request');

function sendChatMessage(message, cb) {
  if (typeof message !== 'string') {
    cb('message doesnt exist', null);
  } else {
    request.post({ json: true, url: `http://54.83.148.230:8080/chat?key=${process.env.CALM_API_KEY}&message=/gc ${message}` }, (err, res, body) => {
      if (err) {
        cb('request failed', null);
      } else if (body.message !== 'OK') {
        cb(body.message, null);
      } else if (body.success) {
        cb(null, 'OK');
      }
    });
  }
}

module.exports = { sendChatMessage };
