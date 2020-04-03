const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
module.exports = class InfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'info-old',
            //aliases: ['i'], //disabled as depreciated
            group: 'dev',
            memberName: 'info-old',
            description: 'Displays some information about the bot.',
            ownerOnly: true
        });
    }
    
    run(message) {
        const args = message.content.split(' ');
        console.log(this.client)
        if (!args[1]) {
            var embed = new MessageEmbed()
                .setTitle("Core Info Help")
                .setColor(0x00FFFF)
                //.setThumbnail(bot.user.avatarURL())
                .addField("You seem lost... \n Need some help? ", "`bot` tells you a bit about myself, Cora the AI. \n`owner` tells you some information about my owner, Novie x3 \n Command usage is `>info <args> [bot, owner]`.")
                .setFooter("Created by NovaLynxie#9765, coded in Discord.JS v11.5.1")
            message.channel.send(embed);
            return;
        } else {
            message.say(" I'm sorry but this command has been depreciated due to its code functions breaking while rewriting to Commando. \nThis has been replaced with the `about` command.")
        }/*} else if (args[1]==='bot'){
            var embed = new MessageEmbed()
                .setTitle("Bot Information <a:pawingcat:635163464905523221>")
                .setColor(0x00FFFF)
                .setThumbnail(bot.user.avatarURL())
                .addField("Name & TagID:",bot.user.username+' ('+bot.user.tag+')')
                .addField("Created:",bot.user.createdAt)
                .addField("About Me", "I am Nova's Personal bot. I am mostly used for testing features and stuff.") 
                .setFooter("Created by NovaLynxie#9765, coded in Discord.JS v12.0.6")
            message.channel.send(embed);
            return;
        } else if (args[1]==='owner'){
            var ownerID = '234356998836191232'
            let ownerData = message.guild.member(message.guild.members.get(ownerID))
            var embed = new MessageEmbed()
                .setTitle("My Owner's Info")
                .setColor(0x00FFFF)
                .setThumbnail(ownerData.user.avatarURL) //"https://cdn.discordapp.com/avatars/234356998836191232/3bcf8aa8fabdab92bf753d61db00e548.png?size=2048"
                .addField("Date Joined", ownerData.user.createdAt)
                .addField("About Me", "My name is Nova Lynxie, I am sometimes shy meeting other people but can be quite friendly once you get to know me. Programming is one hobby I do enjoy, especially if it involves fixing problems and finding solutions. I am glad to have brought Cora back after many years of being stowed away and left with obsolete code, now renewed and brought back to life! \nLets hope it will stay that way this time X3")
                .addField("Social Links", "Twitch: https://www.twitch.tv/novalynxie \nMixer: https://mixer.com/NovaLynxie")
                .setFooter("Created by NovaLynxie#9765, coded in Discord.JS v11.5.1")
            message.channel.send(embed);
            return;
        } else {
            var embed = new MessageEmbed()
                .setTitle("Invalid Command!")
                .setColor(0x00FFFF)
                .setThumbnail(bot.user.avatarURL())
                .addField("Did you enter the command correctly?", "Check you entered the command correctly, \nCommand usage is `>info <args> [bot, owner]`.")
                .setFooter("Created by NovaLynxie#9765, coded in Discord.JS v11.5.1")
            message.channel.send(embed);
            return;
        }*/
    }
}