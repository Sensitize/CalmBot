const request = require('request');

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

module.exports = async function trivia(difficulty, cb) {
  let url = 'https://opentdb.com/api.php?amount=1&type=multiple&encode=url3986';
  if (difficulty) url += `&difficulty=${difficulty}`;

  request({ json: true, url }, (err, res, body) => {
    if (err) {
      cb(err, null);
    } else if (!body.results[0]) {
      cb('API error', null);
    } else {
      const result = body.results[0];
      const category = decodeURIComponent(result.category);
      const question = decodeURIComponent(result.question);
      const correct = decodeURIComponent(result.correct_answer);
      const incorrects = result.incorrect_answers;
      const difficulty = result.difficulty.toUpperCase();

      const answers = [correct, decodeURIComponent(incorrects[0]), decodeURIComponent(incorrects[1]), decodeURIComponent(incorrects[2])];
      shuffle(answers);

      cb(null, { category, question, difficulty, answers, correct });
    }
  });
};
