const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
const { stripIndents } = require('common-tags');
module.exports = class BotInfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'statsinfo-legacy',
            aliases: ['stats-legacy'],
            group: 'dev',
            memberName: 'statsinfo-legacy',
            description: 'Displays some information about the bot.',
        });
    }
    run(message) {
        const servers = this.client.guilds.cache.size
        const users = this.client.users.cache.filter(user => !user.bot).size
        const embed = new MessageEmbed()
            .setTitle("Bot Statistics")
            .setColor(0x154360)
            .addField("Servers", "Connected to " + servers + " servers")
            .addField("Users", "Managing " + users + " users" )
            .setFooter("Built on Node.js using Discord.js with Commando.")
            .setThumbnail(this.client.user.displayAvatarURL({ formant: 'png'}))
        return message.embed(embed);
    }
};
