
module.exports.run = async (client, message, cont) => {

  const Discord = require('discord.js')
  const webhooksend = require("quick.hook")
  const modRole = message.guild.roles.find("name", "Staff");
  if (!modRole){
    console.error("Role don't exist in: " + message.guild.name + "!")
    message.channel.send("Role don't exist, make sure u have a role called: **Staff**")
  }

if (!message.member.roles.has(modRole.id))
return message.reply("Sorry, you don't have permissions to use this! :no_entry_sign: ");

  let infoText = cont.join(" ");
  message.guild.members.get(client.user.id).setNickname(infoText);
  const embed = new Discord.RichEmbed()
  .setTitle("Nickname Information")
  .setColor('#36393E')
  .setDescription(`Nickname changed to: **${infoText}**`)
  .setFooter("© 2019-2020 iDevelopment | All Rights Reserved")
  .setTimestamp()
message.channel.send({embed});
}

module.exports.config = {
  command: "nick"
}
