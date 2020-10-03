const { Command } = require('discord.js-commando');
const trivia = require('../../requests/trivia.js');

module.exports = class TriviaCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'trivia',
      group: 'fun',
      memberName: 'trivia',
      description: 'Trivia command',
      examples: [`${client.commandPrefix}trivia`],
      args: [
        {
          key: 'difficulty',
          prompt: 'What difficulty u want?',
          type: 'string',
          default: '',
          validate: (text) => {
            return !!['easy', 'medium', 'hard'].includes(text.toLowerCase());
          }
        }
      ]
    });
  }

  async run(message, { difficulty }) {
    trivia(difficulty.toLowerCase(), (err, res) => {
      if (err) {
        console.error(err);
      } else {
        const embed = {
          title: res.question,
          fields: [
            {
              name: 'Answers',
              value: `a) *${res.answers[0]}*\nb) *${res.answers[1]}*\nc) *${res.answers[2]}*\nd) *${res.answers[3]}*`,
            },
            {
              name: 'Difficulty',
              value: `\`${res.difficulty}\``,
              inline: true,
            },
            {
              name: 'Category',
              value: `\`${res.category}\``,
              inline: true,
            },
          ],
          footer: {
            text: `${message.author.username}, answer the question by reacting to the correct answer. \u000AYou have 30 seconds to answer.`,
          },
        };

        message.channel.send({embed}).then((sentEmbed) => {
          sentEmbed.react('🇦');
          sentEmbed.react('🇧');
          sentEmbed.react('🇨');
          sentEmbed.react('🇩');
        });
      };
    });
  }
}