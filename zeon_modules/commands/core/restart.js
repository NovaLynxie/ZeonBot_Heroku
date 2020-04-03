const { Command } = require('discord.js-commando');
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
            .then(_msg => this.client.login(process.env.botToken))
            .then(console.log("[Zeon] System restarted successfully!"))
            .then(_msg => this.client.user.setActivity('with Commando'));
    }
}