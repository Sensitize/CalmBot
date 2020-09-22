// Evaluates javascript code
const eval = (client, message) => {
  // Checks if author's ID equals Owner's ID.
  if (message.author.id !== "438057670042320896") {
    return message.channel.send("Error! You are not my owner!"); // Return if false
  }

  // Borrowed some code from an-idiots-guide
  try {
    var code = message.args.join(" ");
    var evaluated = eval(code);

    if (typeof evaluated !== "string")
      evaluated = require("util").inspect(evaluated);

    const embed = new Discord.MessageEmbed()
      .setColor(0x00a2e8)
      .addField(":inbox_tray: Input: ", `\`\`\`${code}\`\`\``)
      .addField(
        ":outbox_tray: output: ",
        `\`\`\`js\n${clean(evaluated)}\n\`\`\``
      );
    message.channel.send({ embed });
  } catch (err) {
    const embed = new Discord.MessageEmbed()
      .setColor(0x00a2e8)
      .addField(":inbox_tray: Input: ", `\`\`\`${code}\`\`\``)
      .addField(":outbox_tray: output: ", `\`\`\`${clean(err)}\`\`\``);
    message.channel.send({ embed });
  }

  const clean = (text) => {
    if (typeof text === "string")
      return text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203));
    else return text;
  };
};

module.exports = eval;
