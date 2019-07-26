module.exports.run = async (client, message, args) => {
    const Discord = require('discord.js');
    const config = require('../botsettings.json');

    var random;
 
    random =
        [
            "#1d64b4",
            "#14dcb4",
            "#008000",
            "#ff8000",
            "#ff8000",
            "#40e0d0",
            "#028af1",
            "#dc143c",
            "#c3f6fe",
            "#ffb400",
            "#afff00",
            "#532cea",
            "#36d44a",
            "#6ff521",
            "#2441e2",
            "#7b72b6"
        ]
 
    var randomColor = random[Math.floor(Math.random() * random.length)]
 
    const use = new Discord.RichEmbed()
    .setTitle('**⚠️ ERROR**')
    .setDescription(`\n\nUse: **${config.prefix}help <moderator, general, settings, fun, music, advanced, botowner>**`)
    .setColor('#ff8000')
    if (args[0] === undefined) return message.channel.send(use);
 
    if (args[0] === `settings`) {
        let embed = new Discord.RichEmbed()
 
            .setAuthor('Settings help lijst van ' + message.guild.name + '')
            .setColor(randomColor)
            // .setDescription(`${config.prefix}settings setconfig.prefix <new_config.prefix> - **Verander de bot zijn config.prefix**\n\n${config.prefix}settings setlogkanaal <new_logkanaal> - **Verander het logkanaal**\n\n${config.prefix}settings setstaffrole <new_staffrole> - **Verander de staffrole**\n\n`)
            .setDescription(`${config.prefix}settings setconfig.prefix <config.prefix> - **COMING SOON!**\n\n${config.prefix}settings setlogchannel <channel> - **COMING SOON!**`)
            .setTimestamp()
            .setFooter('Settings')
 
        //\n\n${config.prefix}settings setbadwords <true, false> - **Verander het badwords status**\n\n${config.prefix}settings addbadword <new_badword> - **Add een badword**
 
        //\n\n${config.prefix}settings setlevelupkanaal <new_levelupkanaal> - **verander het levelup kanaal, hier komen de levelup messages in**
        message.channel.send('You recived the `settings` help list!')
        message.author.send(embed).catch(err => {
            message.channel.send(`Error: ` + err)
        });
    }
    if (args[0] === `general`) {
        let embed1 = new Discord.RichEmbed()
 
            .setAuthor('General help list of ' + message.guild.name + '')
            .setColor(randomColor)
            //.setDescription(`Eerst setup de bot!\n\nMet: ${config.prefix}setup <value> (adminrole)`)
            .setDescription('<> is obligated. [] is optional.')
            .addBlankField(true)
            .addField('Help:', `${config.prefix}help - Get help list`)
            .addField('info:', `${config.prefix}info - Get the info`)
            .addField('Ping:', `${config.prefix}ping - See the bot's his ping`)
			.addField('List:', `${config.prefix}list - Get a list in total of all users, and guilds`)
            .addField('Support:', `${config.prefix}support <text> - Request a ticket/support`)
			.addField('Version:', `${config.prefix}version - Get the bot's version`)
			.addField('Weather:', `${config.prefix}weather - Get the weather in a specify location`)
            .addField('Idea:', `${config.prefix}idea <idea (A detailed explanation of your hastebin / pastebin idea is also allowed)> - Send a idea`)
            .addField('Userinfo:', `${config.prefix}userinfo @<user> - COMING SOON!`)
            .addField('Botinfo:', `${config.prefix}botinfo - COMING SOON!`)
            .addField('Invite:', `${config.prefix}invite - COMING SOON!`)
            .addField('Serverinfo:', `${config.prefix}serverinfo - COMING SOON!`)
                message.channel.send('You recived the `general` help list!')
        message.author.send(embed1).catch(err => {
            message.channel.send(`Error: ` + err)
        });
    }
    if (args[0] === `moderator`) {
        let embed2 = new Discord.RichEmbed()
 
            .setAuthor('Moderator help list of ' + message.guild.name + '')
            .setColor(randomColor)
            //.setDescription(`Eerst setup de bot!\n\nMet: ${config.prefix}setup <value> (adminrole)`)
            .setDescription('<> is obligated. [] is optional.')
            .addBlankField(true)
            .addField('Warn:', `${config.prefix}warn @<user> <reason> - Warn a user`)
			.addField('Kick:', `${config.prefix}kick @<user> <reason> - Kick a user`)
			.addField('Ban:', `${config.prefix}ban @<user> <reason> - Ban a user`)
			.addField('Alert:', `${config.prefix}alert <reason> - Make a alert`)
			.addField('Announcement:', `${config.prefix}announcement <reason> - Make a announcement`)
            .addField("Say:", `${config.prefix}say <text> - Let the bot say something`)
            .addField("Purge:", `${config.prefix}clear <amount (1-100)> - Clear an amount of messages`)
        message.channel.send('You recived the `moderator` help list!')
        message.author.send(embed2).catch(err => {
            message.channel.send(`Error: ` + err)
        });
    }
    if (args[0] === `botowner`) {
        let embed3 = new Discord.RichEmbed()
 
            .setAuthor('Botowner help list of ' + message.guild.name + '')
            .setColor(randomColor)
            //.setDescription(`Eerst setup de bot!\n\nMet: ${config.prefix}setup <value> (adminrole)`)
            .setDescription('<> is obligated. [] is optional.')
            .addBlankField(true)
            .addField('Guildlist:', `${config.prefix}guildlist - COMING SOON!`)
            .addField('Eval:', `${config.prefix}eval - Execute a eval command.. :ghost:`)
            .addField('Restart:', `${config.prefix}restart - Restart the bot`)
            .addField('Setstatus:', `${config.prefix}playing <status ('playing', 'watching', 'listening')> - Change the bot his playing`)
        message.channel.send('You recived the `botowner` help list!')
        message.author.send(embed3).catch(err => {
            message.channel.send(`Error: ` + err)
        });
    }
    if (args[0] === `fun`) {
        let embed4 = new Discord.RichEmbed()
 
            .setAuthor('Fun help list of ' + message.guild.name + '')
            .setColor(randomColor)
            .setDescription('<> is obligated. [] is optional.')
            .addBlankField(true)
            .addField('8ball:', `${config.prefix}8ball <text> - Let the bot answer`)
            .addField('Mop:', `${config.prefix}mop - Let the bot tell you a joke | > Api is in dutch <`)
        message.channel.send('You recived the `fun` help list!')
        message.author.send(embed4).catch(err => {
            message.channel.send(`Error: ` + err)
        });
    }
	    if (args[0] === `advanced`) {
        let embed4 = new Discord.RichEmbed()
 
            .setAuthor('Fun help list of ' + message.guild.name + '')
            .setColor(randomColor)
            .setDescription('<> is obligated. [] is optional.')
            .addBlankField(true)
            .addField('npm:', `${config.prefix}npm <npm (name)package> - Get the info of a npm.`)
        message.channel.send('You recived the `advanced` help list!')
        message.author.send(embed4).catch(err => {
            message.channel.send(`Error: ` + err)
        });
    }
    if (args[0] === `music`) {
        let embed4 = new Discord.RichEmbed()
 
            .setAuthor('Music help list of ' + message.guild.name + '')
            .setColor('randomColor')
            .setDescription('<> is obligated. [] is optional.')
            .addBlankField(true)
            .addField('play:', `${config.prefix}play <muziek> - COMING SOON!`)
        message.channel.send('You recived the `music` help list!')
        message.author.send(embed4).catch(err => {
            message.channel.send(`Error: ` + err)
        });
    }
 
 
}
 

module.exports.config = {
    command: "help"
}