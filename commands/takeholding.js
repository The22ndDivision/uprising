const { games } = require("../models");

function execute(message, args, user) {
  if (message.channel.id in games) {
    if (
      args.length > 0 &&
      parseInt(args[0]) < games[message.channel.id].holding
    ) {
      let person = message.author;
      if (message.mentions.members.first()) {
        person = message.mentions.members.first().user;
      }
      const player = games[message.channel.id].players.find(
        (element) => element.user === person
      );
      if (player) {
        player.tokens = player.tokens + parseInt(args[0]);
        games[message.channel.id].holding =
          games[message.channel.id].holding - parseInt(args[0]);
        if (parseInt(args[0]) >= 0) {
          return message.channel.send(
            `<@${player.id}> recieved **${args[0]} token(s)** from the Holding Area and now has **${player.tokens}**.`
          );
        } else {
          return message.channel.send(
            `<@${player.id}> paid **${-parseInt(
              args[0]
            )} token(s)** into the Holding Area and now has **${
              player.tokens
            }**.`
          );
        }
      } else {
        return message.channel.send("User not a player in game.");
      }
    } else {
      return message.channel.send("Incorrect parameters.");
    }
  } else {
    return message.channel.send("No game to add tokens within.");
  }
}

module.exports = {
  name: "takeholding",
  aliases: ["th", "holding"],
  execute,
};
