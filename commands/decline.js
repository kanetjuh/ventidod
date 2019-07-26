exports.run = (client, message, cont) => {
  const Discord = require("discord.js");
  const webhook = require("../ws/webhook/index.js")
  const modRole = message.guild.roles.find("name", "Tester")

  if(!message.member.roles.has(modRole.id)) return message.reply("You don't have permission to do this, u need to have the role **Tester**")

  let msgid = cont[0];
  if(!cont[0]) return message.reply("Please provide a message ID.")
  const emoji = message.guild.emojis.find("name", "decline")

  const channel = message.guild.channels.find("id", "603993853145382914")
  let msg = channel.fetchMessage(msgid).then((i) => {
    i.clearReactions()
    function addemoji() {
      i.react(emoji)
    }
    setTimeout(addemoji, 500)
  })

}

module.exports.config = {
  command: "decline"
}
