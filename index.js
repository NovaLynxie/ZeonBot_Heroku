/**
 * @author Anish Shobith
 * @license MIT
 * @file index.js
 */

// Requring the packages and modules required
// All the methods used here are destructing.
//const { Client, Collection } = require("discord.js");
const Client = require("./zeon_modules/zeon.runtime/client.js")
const { readdirSync } = require("fs");
const { sep } = require("path");
const { success, error, warning } = require("log-symbols"); // npm i log-symbols or yarn add log-symbols
// we require the config file
const config = require("./config");

// Creating a instance of Client.
const bot = new Client();

// Attaching Config to bot so it can be accessed anywhere.
bot.config = config;

// Creating command and aliases collection.
//["commands", "aliases"].forEach(x => bot[x] = new Collection());

// A function to load all the commands.
const load = (dir = "./zeon_modules/zeon.cmds/") => {

	readdirSync(dir).forEach(dirs => {
	// we read the commands directory for sub folders and filter the files with name with extension .js
		const commands = readdirSync(`${dir}${sep}${dirs}${sep}`).filter(files => files.endsWith(".js"));

		// we use for loop in order to get all the commands in sub directory
		for (const file of commands) {
		// We make a pull to that file so we can add it the bot.commands collection
			const pull = require(`${dir}/${dirs}/${file}`);
			// we check here if the command name or command category is a string or not or check if they exist
			if (pull.help && typeof (pull.help.name) === "string" && typeof (pull.help.category) === "string") {
				if (bot.commands.get(pull.help.name)) return console.warn(`${warning} Two or more commands have the same name ${pull.help.name}.`);
				// we add the the comamnd to the collection, Map.prototype.set() for more info
				bot.commands.set(pull.help.name, pull);
				// we log if the command was loaded.
				console.log(`${success} Successfully loaded command ${pull.help.name}.`);

			}
			else {
			// we check if the command is loaded else throw a error saying there was command it didn't load
				console.log(`${error} Error loading command ${file} in ${dir}${dirs}. Missing help.name/help.category or malformed command file.`);
				// we use continue to load other commands or else it will stop here
				continue;
			}
			// we check if the command has aliases, is so we add it to the collection
			if (pull.help.aliases && typeof (pull.help.aliases) === "object") {
				pull.help.aliases.forEach(alias => {
					// we check if there is a conflict with any other aliases which have same name
					if (bot.aliases.get(alias)) return console.warn(`${warning} Multiple commands have conflicting aliases:'${alias}'`);
					bot.aliases.set(alias, pull.help.name);
				});
			}
		}

	});
};

// we call the function to all the commands.
load();
//console.log(bot.commands)
/**
 * Ready event
 * @description Event is triggred when bot enters ready state.
 */
bot.on("ready", () => {
	console.log("[ZeonBot] Systems Online.");
});
// Process Error Handler - Catches any errors and attempt to prevent a bot crash.
process.on('unhandledRejection', error => console.error('[NodeJS] UncaughtPromiseRejection Error!', error));
/**
 * Message event
 * @param message - The message parameter for this event.
 */
bot.on("message", async message => {
	// Adding a Queue propery to message.client - Broken, do not use! 
	//message.client.queue = new Map();

	const prefix = bot.config.prefix;
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const cmd = args.shift().toLowerCase();
	//console.log(cmd)

	let command;

	if (message.author.bot || !message.guild) return;
	
	// If the message.member is uncached, message.member might return null.
	// This prevents that from happening.
	// eslint-disable-next-line require-atomic-updates
	if (!message.member) message.member = await message.guild.fetchMember(message.author);

	if (!message.content.startsWith(prefix)) return;

	if (cmd.length === 0) return;
	if (bot.commands.has(cmd)) command = bot.commands.get(cmd);
	else if (bot.aliases.has(cmd)) command = bot.commands.get(bot.aliases.get(cmd));

	if (command) command.run(bot, message, args);
});

// Here we login the bot with the porvided token in the config file, as login() returns a Promise we catch the error.
bot.login(process.env.token).catch(console.error());