const express = require("express")
const cookieParser = require('cookie-parser');
const hbs = require("express-handlebars")
const bodyParser = require("body-parser")
const path = require("path")
const Discord = require("discord.js")
const config = require('./config.json');
const fs = require('fs');
const webhook = require("./webhook/index.js");

class WebSocket {

  constructor(token, port, client) {
    this.token = token
    this.client = client

    this.app = express()
    this.app.use(cookieParser())
/*
    if(config.backgroundtype === "1"){
      this.app.engine('hbs', hbs({
        extname: 'hbs',
        defaultLayout: 'layout',
        layoutsDir: __dirname + "/layouts"
      }))
    }
    else{
      this.app.engine('hbs', hbs({
        extname: 'hbs',
        defaultLayout: 'standard',
        layoutsDir: __dirname + "/layouts"
      }))
    }*/

    this.app.set('views', path.join(__dirname, "views"))
    this.app.set('view engine', 'hbs')
    this.app.use(express.static(path.join(__dirname, "public")))
    this.app.use(bodyParser.urlencoded({ extended: false }))
    this.app.use(bodyParser.json())

    this.registerRoots()

    this.server = this.app.listen(port, () => {
      console.log(`Websocket listening on: ${this.server.address().port}`)
    })
  }

  checkToken(_token) {
    return (_token == this.token)
  }

  registerRoots() {
    this.app.get("/", (req, res) => {
      var _token = req.query.token

      if(config.backgroundtype === "1"){
        this.app.engine('hbs', hbs({
          extname: 'hbs',
          defaultLayout: 'layout',
          layoutsDir: __dirname + "/layouts"
        }))
      }
      else{
        this.app.engine('hbs', hbs({
          extname: 'hbs',
          defaultLayout: 'standard',
          layoutsDir: __dirname + "/layouts"
        }))
      }

      if(!this.checkToken(_token) && !this.checkToken(req.cookies["TOKEN"])) {
        res.render('notoken', { title: "ERROR", errtype: "INVALID TOKEN"})
        return;
      }
      res.cookie("TOKEN", _token, { expires: new Date(Date.now() + 259200000)});

      var chans = []
      this.client.guilds.first().channels
        .filter(c => c.type === "text")
        .forEach(c => {
          chans.push({ id: c.id, name: c.name })
        })
        var users = []
        this.client.guilds.first().members
          .forEach(u => {
            users.push({ id: u.id, name: u.user.username })
          })
          //console.log(users);

      res.render('index', {title: "Starcraft Admin Panel", token: _token, chans, users})
    })

    this.app.post('/sendMessage', (req, res) => {
      var _token = req.body.token
      var text = req.body.text
      var channelid = req.body.channelid
      if(!this.checkToken(_token) && !this.checkToken(req.cookies["TOKEN"])) {
        res.render('notoken', { title: "ERROR", errtype: "INVALID TOKEN"})
        return;
      }
      var chan = this.client.guilds.first().channels.get(channelid)

      if(chan) {
        chan.send(text)
      }
    })

  this.app.post('/sendAnnouncement', (req, res) => {
    var _token = req.body.token
    var text = req.body.text
    var mention = req.body.mention
    var channelid = "453811492769366019"

    if(!this.checkToken(_token) && !this.checkToken(req.cookies["TOKEN"])) {
      res.render('notoken', { title: "ERROR", errtype: "INVALID TOKEN"})
      return;
    }
    var guild = this.client.guilds.find("id", "453219882918608897")
    var chan = guild.channels.get(channelid)
    var role = guild.roles.find("name", "User")
    var roleID = role.id

    if(chan) {
      if(mention == "yes"){
        let msg = new Discord.RichEmbed()
          .setTitle("Announcement:")
          .setDescription(`${text}`)
          .setFooter("© Starcraft 2018 | All Rights Reserved")
        chan.send(`<@&${roleID}>\n`)
        chan.send(msg)
      }
      else{
          let msg = new Discord.RichEmbed()
            .setTitle("Announcement:")
            .setDescription(text)
            .setFooter("© Starcraft 2018 | All Rights Reserved")
          chan.send(msg)
      }
    }
  })

//Data change
  this.app.post('/auth', (req, res) => {
    var _token = req.body.token
    if(!this.checkToken(_token) && !this.checkToken(req.cookies["TOKEN"])) {
      res.render('notoken', { title: "ERROR", errtype: "INVALID TOKEN"})
      return;
    }
    res.render(`/?token=${_token}`)
  })

  this.app.post('/changebackground', (req,res) =>{
    var _token = req.body.token;
    var _background = req.body.background;

    if(_background === "1"){
      config.backgroundtype = "1";
      return fs.writeFile("./ws/config.json", JSON.stringify(config), (err) => console.error);
    }

    else if(_background === "2"){
      config.backgroundtype = "2";
      return fs.writeFile("./ws/config.json", JSON.stringify(config), (err) => console.error);
    }
  })

  //Moderation
  this.app.post('/kickUser', (req, res) => {
    var _token = req.body.token
    var reason = req.body.text
    var user = req.body.userid
    const logChannel = this.client.guilds.first().channels.find("id", "498734364973334538");
    const botRole = this.client.guilds.first().roles.find("id", "489147648197132288")
    const modRole = this.client.guilds.first().roles.find("id", "489152597639430145");

    if(!this.checkToken(_token) && !this.checkToken(req.cookies["TOKEN"])) {
      res.render('notoken', { title: "ERROR", errtype: "INVALID TOKEN"})
      return;
    }

    let member = this.client.guilds.first().members.find("id", user);
    member.send(`You have been kicked in Starcraft for: ${reason}`)
    member.kick(reason);

    let logEmbed = new Discord.RichEmbed()
        .setColor("#1bafba")
        .setTitle("Logs")
        .setDescription(`${member} has been kicked!`)
        .addField(`Kicked by:`, `Webpanel`)
        .addField(`Reason:`, `${reason}`)
        .setFooter(`Copyright 2018 Starcraft | All Rights Reserved`, "https://gamemaster2030.github.io/Starcraft.png")
    webhook(logChannel, logEmbed, {
      "name": "Logs",
      "icon": "https://gamemaster2030.github.io/Logs.png"
    })

  })

  this.app.post('/banUser', (req, res) => {
    var _token = req.body.token
    var reason = req.body.text
    var user = req.body.userid
    const logChannel = this.client.guilds.first().channels.find("id", "498734364973334538");
    const botRole = this.client.guilds.first().roles.find("id", "489147648197132288")
    const modRole = this.client.guilds.first().roles.find("id", "489152597639430145");

    if(!this.checkToken(_token) && !this.checkToken(req.cookies["TOKEN"])) {
      res.render('notoken', { title: "ERROR", errtype: "INVALID TOKEN"})
      return;
    }

    let member = this.client.guilds.first().members.find("id", user);
    member.send(`You have been banned in Starcraft for: ${reason}`)
    member.ban(reason);

    let logEmbed = new Discord.RichEmbed()
        .setColor("#1bafba")
        .setTitle("Logs")
        .setDescription(`${member} has been banned!`)
        .addField(`Banned by:`, `Webpanel`)
        .addField(`Reason:`, `${reason}`)
        .setFooter(`Copyright 2018 Starcraft | All Rights Reserved`, "https://gamemaster2030.github.io/Starcraft.png")
    webhook(logChannel, logEmbed, {
      "name": "Logs",
      "icon": "https://gamemaster2030.github.io/Logs.png"
    })
  })

  this.app.post('/warnUser', (req, res) => {
    var _token = req.body.token
    var reason = req.body.text
    var user = req.body.userid
    const logChannel = this.client.guilds.first().channels.find("name", "logs");
    const botRole = this.client.guilds.first().roles.find("name", "Bot")
    const modRole = this.client.guilds.first().roles.find("name", "Staff");

    if(!this.checkToken(_token) && !this.checkToken(req.cookies["TOKEN"])) {
      res.render('notoken', { title: "ERROR", errtype: "INVALID TOKEN"})
      return;
    }

    let member = this.client.guilds.first().members.find("id", user);
    member.send(`You have been warned in Starcraft for: ${reason}`);

    let logEmbed = new Discord.RichEmbed()
        .setColor("#1bafba")
        .setTitle("Logs")
        .setDescription(`${member} has been warned!`)
        .addField(`Warned by:`, `Webpanel`)
        .addField(`Reason:`, `${reason}`)
        .setFooter(`Copyright 2018 Starcraft | All Rights Reserved`, "https://gamemaster2030.github.io/Starcraft.png")
    webhook(logChannel, logEmbed, {
      "name": "Logs",
      "icon": "https://gamemaster2030.github.io/Logs.png"
    })

  })




}
}

module.exports = WebSocket
