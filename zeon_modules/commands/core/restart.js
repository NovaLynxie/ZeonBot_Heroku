const { Command } = require('discord.js-commando');
const config = require('../../config.json')
const { activitiesList } = require('../../zeon_modules/status/activities.json')
module.exports = class RestartCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'restart',
            aliases: ['reboot', 'reset'],
            group: 'core',
            memberName: 'restart',
            description: 'Restarts the bot.',
            ownerOnly: true
        });
    }
    run(message) {
        console.log("[Zeon] Restart command received!")
        console.log("[Warn] Status may be out of sync for a few minutes.")
        //message.channel.send("Good night... <:sleepycat:635163563878514688>")
        message.say("Restarting systems, standby.")
            .then(console.log("[Zeon] Resetting systems... One moment."))
            .then(_msg => this.client.destroy())
            .then(_msg => {
                try {
                    if (config.debug == true){
                        console.log("[Debug] Reloading config.json file...")
                        console.log(config)
                        console.log("[Debug] Reloading activities.json file...")
                        console.log(activitiesList)
                    }
                    if (config.cloud == true) return this.client.login(process.env.botToken)
                    if (config.cloud == false) return this.client.login(config.botToken)
                } catch {
                    console.log("[Warn] No 'cloud' setting found or undefined!")
                    console.log("[Warn] Falling back on LOCAL HOST mode.")
                }   return this.client.login(config.botToken)
            })
            .then(console.log("[Zeon] System restarted successfully!"))
            .then(_msg => this.client.user.setActivity('with Commando'));
    }
}