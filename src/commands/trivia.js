const request = require('request');

const trivia = (client, message) => {
  let url = 'https://opentdb.com/api.php?amount=1&type=multiple&encode=url3986';

  if (message.args[0]) {
    const difficulty = message.args[0].toLowerCase();

    if (difficulty === 'easy') {
      url += '&difficulty=easy';
    } else if (difficulty === 'medium') {
      url += '&difficulty=medium';
    } else if (difficulty === 'hard') {
      url += '&difficulty=hard';
    }
  }

  request({ json: true, url }, (err, res, body) => {
    if (err) {
      return message.channel.send('Request error');
    }

    if (!body?.results[0]) {
      return message.channel.send('API Error');
    }

    const result = body.results[0];
    const category = decodeURIComponent(result.category);
    const question = decodeURIComponent(result.question);
    const correct = decodeURIComponent(result.correct_answer);
    const incorrects = result.incorrect_answers;
    const difficulty = result.difficulty.toUpperCase();

    const answers = [correct, decodeURIComponent(incorrects[0]), decodeURIComponent(incorrects[1]), decodeURIComponent(incorrects[2])];
    shuffle(answers);

    const embed = {
      title: question,
      fields: [
        {
          name: 'Answers',
          value: `a) *${answers[0]}*\nb) *${answers[1]}*\nc) *${answers[2]}*\nd) *${answers[3]}*`,
        },
        {
          name: 'Difficulty',
          value: `\`${difficulty}\``,
          inline: true,
        },
        {
          name: 'Category',
          value: `\`${category}\``,
          inline: true,
        },
      ],
      footer: {
        text: `${message.author.username}, answer the question by reacting to the correct answer. \u000AYou have 30 seconds to answer.`,
      },
    };

    message.channel.send({ embed }).then(sentEmbed => {
      sentEmbed.react("🇦")
      sentEmbed.react("🇧")
      sentEmbed.react("🇨")
      sentEmbed.react("🇩")
    });
  });
};

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

module.exports = trivia;
