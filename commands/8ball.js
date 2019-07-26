exports.run = async (bot, message, args, color, prefix) => {
const Discord = module.require('discord.js');

var fortunes = [
    "yes",
    "no",
    "maybe",
    "idk, try again"
];

if(!args[0]){
  return message.channel.send(":x: " + "| Enter a question.")
}
if (args[0]) message.channel.send(fortunes[Math.floor(Math.random() * fortunes.length)]);
else message.channel.send(":x: " + "| I wasn't able to see the chat :(");
}
  module.exports.config = {
  command: "8ball"
}