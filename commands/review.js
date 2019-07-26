module.exports.run = async (client, message, args) => {
const discord = require("discord.js");
 
    // Aantal sterren opvragen.
    const aantalSterren = args[0];
 
    // Nakijken als men een getal meegeeft, of als men een getal tussen 1 en 5 opgeeft.
    if (!aantalSterren || aantalSterren < 1 || aantalSterren > 5) return message.channel.send("Give an amount of stars! Choose from: 1 - 5.");
 
    // Nakijken als je een bericht hebt meegegeven.
    const bericht = args.splice(1, args.length).join(' ') || '**No message giving**';
 
    // Kanaal waar reviews inkomen opzoeken.
    var reviewChannel = message.guild.channels.find('name', 'review');
    // als kanaal niet is gevonden geef een bericht.
    if (!reviewChannel) return message.channel.send("Channel not found, make a channel called **review**");
 
    var sterren = "";
    // Voor ieder aantal sterren gaan we deze tekst aanmaken.
    for (var i = 0; i < aantalSterren; i++) {
 
        sterren += ":star: ";
 
    }
 
    // Verwijder het bestaande bericht.
    message.delete();
 
    // Maak de review aan met het aantal sterren en het berichtje.
    const review = new discord.RichEmbed()
        .setTitle(`Review from: ${message.author.username} :tada:`)
        .setColor("#00ff00")
        .setThumbnail("https://www.thebelgiumgames.be/afbeeldingen/jensHoofd.png")
        .addField("Stars:", `${sterren}`)
        .addField("Review:", `${bericht}`);
 
    // Zend bericht naar de gebruiker dat hij een review heeft aangemaakt.
    message.channel.send(":white_check_mark: Succesfully writing a review!");
    // Zend het bericht in het review kanaal.
    return reviewChannel.send(review);
 
}
 
module.exports.config = {
    command: "review"
}