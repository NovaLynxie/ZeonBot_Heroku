const { CommandoClient } = require('discord.js-commando');
const { Structures } = require('discord.js');
const path = require('path');

const { activitiesList } = require('./zeon_modules/status/activities.json');
const { prefix, ownerIDs, cloud, debug, botToken } = require('./config.json');

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
    //commandPrefix: prefix
    commandPrefix: prefix,
    //owner: '234356998836191232',
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
        path.join(__dirname, 'zeon_cmds')
    );

client.once('ready', () => {
    if (debug === true){
        console.log("[Debug] Dev Mode Active! Verbose logging enabled.");
        console.log('[Debug] AutoDump SelfTest START')
        console.log(client)
        console.log('[Debug] AutoDump SelfTest END')
        console.log("[Debug] ActivitiesList Array SelfTest START");
        console.log(activitiesList);//Debug console prompt to print all activity status messages to console.
        console.log("[Debug] ActivitiesList Array SelfTest END");
    }
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
      if (debug == true) (console.log("[Debug] internal.trigger => bot.statusUpdate(index=" + index + ")"));
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

if (cloud == true) {
    console.log('[Init] System starting in CLOUD HOST mode.')
    console.log('[Init] Detecting settings from cloud host enviroment variables.')
    client.login(process.env.botToken)
} else if (cloud == false) {
    console.log('[Init] System starting in LOCAL HOST mode.')
    console.log('[Init] Loading settings from the config.json file.')
    client.login(botToken);
} else {
    console.log(`[Error] Cannot read 'cloud' setting or missing config! Check the file exists and reload the app again.`)
}

//client.login(botToken); //disabled as replaced with a cloud config loader.