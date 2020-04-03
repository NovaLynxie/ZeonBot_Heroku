const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class AvatarEmbedCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'avatarembed',
            aliases: ['aembed','avem'],
            group: 'dev',
            memberName: 'avatarembed',
            description: 'Attempts to push image of avatar.',
            examples: ['avatarembed <@user>'],
            ownerOnly: true
        });
    }

    run(message) {
        try{
            if (!message.mentions.users.first()) return message.reply("you have not mentioned anyone! Aborting command.")
            const data = message.mentions.users.first() //|| message.author;
            console.log('debug -> console datadump')
            console.log(data)

            const embed = new MessageEmbed()
                //.setImage(data.displayAvatarURL())
                .setImage(data.avatarURL())
                //.setImage('https://cdn.discordapp.com/avatars/'+data.id+'/'+data.avatar+'.png?size=128') // A bit hacky but works.
                .setColor(0x154360)
                //.setThumbnail('https://cdn.discordapp.com/avatars/644467072432340992/dd7ba59d687e4f01b3e6b1c595cb9254.png?size=128')
                .setTimestamp();
            return message.embed(embed);
            
        } catch (err) {
            console.error(err)
            message.reply('An error has occured. Please try again.')
        }
    }
};
