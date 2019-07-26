exports.run = async (bot, message, args, color, prefix) => {
    const botsettings = require("../botsettings.json");
	const config = require("../botsettings.json");
    const Discord = require('discord.js');
    const client = new Discord.Client()
	
	const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
	
    if(message.author.id !== botsettings.ownerID) return;
    try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
}
  module.exports.config = {
  command: "eval"
}