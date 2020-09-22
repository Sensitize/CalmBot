const seedrandom = require("seedrandom");

const ship = (client, message) => {
  if (message.mentions.members.size) {
    return message.channel.send(
      "Don't mention people thats MEAN! Just say their name in text!"
    );
  }

  if (message.args.length < 2) {
    return message.channel.send(
      "Please include 2 arguments Ex `c!ship (person 1) (person 2)`"
    );
  }

  const args = message.args;

  let person1 = args[0];
  let person2 = args[1];

  const oldstring = person1 + person2;
  let str;

  str = oldstring.replace(/[0-9]/g, '');


  const date = new Date().getDate().toString();

  let filteredMessage = filter(str);
  const rng = Math.floor(
    seedrandom(stringValue(filteredMessage) * 41798 + date).quick() * 100
  );
  message.channel.send(`They are **${rng}%** compatible!`);
};

function stringValue(string) {
  let sValue = 0;
  for (let i = 0; i < string.length; i++) {
    let char = string[i];
    sValue += parseInt(alphabetPosition(char));
  }
  return sValue;
}

function alphabetPosition(text) {
  var result = "";
  for (var i = 0; i < text.length; i++) {
    var code = text.toUpperCase().charCodeAt(i);
    if (code > 64 && code < 91) result += code - 64 + " ";
  }

  return result.slice(0, result.length - 1);
}

function filter(text) {
  let desired = text.replace(/[^a-zA-Z0-9]/gi, "");
  return desired;
}

module.exports = ship;
