const { CommandoClient } = require('discord.js-commando');
const { Structures } = require('discord.js');
const path = require('path');
console.log('[Init] Loading activities list from activities.json...')
const { activitiesList } = require('./zeon_modules/internal/activities.json');
console.log('[Init] Detecting settings from cloud host enviroment variables.')
const prefix = process.env.prefix;
const botToken = process.env.botToken;
const ownerIDs = process.env.ownerIDs;

Structures.extend('Guild', Guild => {
    class MusicGuild extends Guild {
        constructor(bot, data){
            super(bot, data);
            this.musicData = {
                queue: [],
                isPlaying: false,
                nowPlaying: null,
                songDispatcher: null,
                volume: 1
            };
            // Music Trivia Excluded
            // No trivia commands implemented.
        }
    }
    return MusicGuild;
});


const client = new CommandoClient({
    commandPrefix: prefix,
    owner: ownerIDs,
    invite: '',
});

client.registry
    .registerDefaultTypes()
    .registerGroups([
        ['admin', 'Admin'],
        ['core', 'Core'],
        ['dev', 'Developer'],
        ['info', 'Information'],
        ['misc', 'Miscelaneous'],
        ['music', 'Music'],
        ['utils', 'Utility (Extra)'],
    ])
    .registerDefaultGroups()
    .registerDefaultCommands({
        //help: false,
    })
    .registerCommandsIn(
        path.join(__dirname, './zeon_modules/commands')
    );

client.once('ready', () => {
    console.log(`[Zeon] Logged in as ${client.user.tag}! (${client.user.id})`);
    client.user.setActivity('with Commando');
});

client.on('ready', () => {
    setInterval(() => {
      const index = Math.floor(Math.random() * (activitiesList.length - 1) + 1);
      //if (index == 0); 
      if (index >= 0 && index <= 1) {
        var statusType = 1 // 1 - Playing
      };
      if (index >= 2 && index <= 3) {
        var statusType = 2 // 2 - Listening
      };
      if (index >= 4 && index <= 5) {
        var statusType = 3 // 3 - Watching
      };
      client.user.setActivity(activitiesList[index], {type: statusType});
    }, 300000);
})

process.on('unhandledRejection', error => {
    console.error('[NodeJS] Uncaught Promise Rejection!', error)
})

client.on('guildMemberUpdate', (oldMember, newMember) => {
    const removedRoles = oldMember.roles.cache.filter(role => !newMember.roles.cache.has(role.id));
    if (removedRoles.size > 0) console.log(`[Zeon] Role ${removedRoles.map(r=>r.name)} removed from ${oldMember.displayName}.`)
    const addedRoles = newMember.roles.cache.filter(role=>!oldMember.roles.cache.has(role.id));
    if (addedRoles.size > 0) console.log(`[Zeon] Role ${addedRoles.map(r=>r.name)} added to ${oldMember.displayName}.`)
})

client.on('error', error => {
    console.error('[Zeon]', error)
})

client.login(botToken);