const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const moment = require("moment");
const db = require('quick.hook');
const weather = require("weather-js");
const eco = require("discord-eco");
const ms = require("ms");
const WS = require("./ws/ws")
const request = require("request");
const NowTime = (`${moment().format("YYYY-MM-DD HH:mm:ss")}`);
const botsettings = require('./botsettings.json');
const https = ["https://", "www.", ".net", ".nl", ".org", ".com"];
const Linter = require('eslint').Linter;
const linter = new Linter();
const newUsers = [];

client.commands = new Discord.Collection();

const package = require("./package.json");

var ws = new WS(process.env.WEBTOKEN, process.env.WEBPORT, client)

client.commands = new Discord.Collection();

client.on("ready", () => {
    client.user.setStatus('dnd', 'Made by KwinkyWolf') 
      setInterval(game, 2500);
      function game() {
          var random = Math.floor((Math.random() * 4) + 1);
          if (random === 1) client.user.setActivity(`Use ${botsettings.prefix}help`);
      }
  });


fs.readdir('./commands/', (err, files) => {
    if(err) console.log(err);

    var jsfiles = files.filter(f => f.split('.').pop() === 'js');
    if (jsfiles.length <= 0) { return console.log('No commands found...')}
    else { console.log(jsfiles.length + ' commands found.') }

    jsfiles.forEach((f, i) => {
        var cmds = require(`./commands/${f}`);
        console.log(`Command ${f} loading...`);
        client.commands.set(cmds.config.command, cmds);
    })



})

client.on("guildMemberAdd", (member) => {
	const role = member.guild.roles.find("name", "Gebruiker");
	member.addRole(role);
});

client.on('message', async message => {
    var sender = message.author;
    var msg = message.content.toUpperCase();

    var cont = message.content.slice(botsettings.prefix.length).split(" ");
    var args = cont.slice(1);

    if (!message.content.startsWith(botsettings.prefix)) return;

    var cmd = client.commands.get(cont[0])
    if (cmd) cmd.run(client, message, args);

    if (message.channel.type != 'text') return message.channel.send('Please use commands in the server!');

    if (msg === botsettings.prefix + 'RELOAD') {
               client.destroy();
               client.login(botsettings.token);
			   console.log("Reloaded in: " + message.guild.name)
			   console.log("Reloaded by: " + message.author.id)
             message.channel.send("Reloaded");
    }
    var lol = require("./botsettings.json").prefix;

if (message.channel.type === "dm") { //if the channel is a DM channel
    var args = message.content.split(" ").slice(0)
    var args = args.slice(0).join(" ") //create the args

    if (message.content.startsWith(lol + "idk")) return message.channel.send(":x: Please use commands in real server! :x:") //if the message is a command
    message.channel.send("This message has been send to the staff! :incoming_envelope:");
    if (message.content.startsWith(lol + "idk")) return
    if (args.length > 256) return message.reply("Your message content too many characters :/") //if the message contnt more than 256 character, what fields do not allow
    var embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle("New request in DM!")
        .addField(args, "Send by: " + message.author.username + " with the ID: " + message.author.id)
    client.guilds.get("603967860921991200").channels.get("603993853145382914").send(embed) //send the embed in a specific channel
}


if (message.content.startsWith(lol + "reply")) {
    if (message.author.id !== "603921225424568322") return message.reply('You cannot use that!')
    var args = message.content.split(" ").slice(0)
    var Rargs = message.content.split(" ").slice(2).join(" ")
    var userID = args[1]
    if (isNaN(args[1])) return message.reply("This is not an ID!") //if args is Not A Number!
    var embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setTitle("A Staff Answerd You!")
        .addField("Message: " + Rargs)
		.addField("By: " + message.author.username)
        .setFooter("Send by: " + message.author.username + "")
	client.users.get(userID).send(embed)
    message.channel.send("The reply has been send to: " + "<@" + userID + ">").catch(console.error)
    //it may be that if the user has blocked your bot that it does not work
}
});

client.login(process.env.TOKEN);