const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require('common-tags');
const moment = require('moment');
//const username = require('../../proto_modules/models/Username');

module.exports = class UserInfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'userinfo-legacy',
            group: 'dev',
            aliases: ['whois-legacy'],
            memberName: 'userinfo-legacy',
            description: 'Gets information about a user. (Currently not implemented)',
            details: `Allows you to get detailed information on the specified user.`,
            guildOnly: true,
            ownerOnly: true,
            throttling: {
                usages: 3,
                duration: 3
            },
            args: [
                {
                    key: 'user',
                    prompt: 'Who would you like information about?',
                    type: 'user',
                    default: 'message.author'
                }
            ]
        });
    }
    async run(message, args) {
        const member = args.member || message.member;
        const {user} = member;
        console.log('[DEBUG] print(user)')
        console.log(member)
        const userInfo = new MessageEmbed()
            .setTitle('User Information v1.0')
            .setColor(0x154360)
            .setDescription('Provides detailed information about any users in a guild.')
            .addFields(
                {
                    name: '> Member Information',
                    value: stripIndents`
                            Username: ${user.username}#${user.discriminator}
                            Nickname: ${member.nickname ? member.nickname : "N/A"}
                            Joined: ${moment.utc(member.joinedTimestamp).format('dddd, MMMM Do YYYY, HH:mm:ss Z')}
                            Roles: ${member.roles.cache ? member.roles.cache.map(role => `${role.name}`).join(', ') : "N/A"}
                    `
                },
                {
                    name: '> User Information',
                    value: stripIndents`
                            Bot Acc: ${user.bot}
                            Created: ${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss Z')}
                            Status: ${user.presence.status}
                            Game: ${user.presence.game ? user.presence.game.name : 'None'}

                    `
                }
            )
            .setThumbnail(user.displayAvatarURL({ format: 'png' }))
        return message.embed(userInfo)
        /*
        console.log('[WARN] Experimental command executed, may break or cause problems.')
        const member = args.member || message.member;
        const { user } = member;
        const usernames = await username.findAll({ where: { userID: user.id} });
        const embed = new MessageEmbed()
            .setTitle('User Information Prompt v1.0')
            .setDescription('Additional member information on request.')
            .addFields([
                {
                    name: '> Member Details',
                    value: stripIndents`
                            ${member.nickname !== null ? ` - Nickname: ${member.nickname}` : '- No Nickname'}
                            - Roles: ${member.roles.map(roles => `\`${roles.name}\``).join(' ')}
                            - Joined at: ${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss ZZ')}
                    `
                },
                {
                    name: '> User Details',
                    value: stripIndents`
                            - Created at: ${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss ZZ')}${user.bot ? '\n- Bot Account':''}
                            - Aliases: ${usernames.length ? usernames.map(uName => uName.username).join(', ') : user.username}
                            - Status: ${user.presence.status}
                            - Game: ${user.presence.game ? user.presence.game.name : 'None'}
                    `
                }
            ])
            .setThumbnail(user.displayAvatarURL({ format: 'png' }))
        return message.embed(embed)
        /*
        return msg.embed({
			color: 3447003,
			fields: [
				{
					name: '❯ Member Details',
					value: stripIndents`
						${member.nickname !== null ? ` • Nickname: ${member.nickname}` : '• No nickname'}
						• Roles: ${member.roles.map(roles => `\`${roles.name}\``).join(' ')}
						• Joined at: ${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss ZZ')}
					`
				},
				{
					name: '❯ User Details',
					// eslint-disable max-len
					value: stripIndents`
                    • Created at: ${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss ZZ')}${user.bot ? '\n• Is a bot account' : ''}
                    • Aliases: ${usernames.length ? usernames.map(uName => uName.username).join(', ') : user.username}
                    • Status: ${user.presence.status}
                    • Game: ${user.presence.game ? user.presence.game.name : 'None'}
                `
                // eslint-enable max-len
                }
            ],
            thumbnail: { url: user.displayAvatarURL({ format: 'png' }) }
        });
        */
    }
};