const config = require('./config.json');

const fs = require('fs');
const Discord = require('discord.js');
const { token } = require('./config.json');
const imageReaction = require('./commands/image-replies/imageReaction');
const prefix = "!";

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.images = new Discord.Collection();

const { cooldowns } = client;
const commandFolders = fs.readdirSync('./commands');
const imageFiles = fs.readdirSync('./images');

/* Get command names from js files in ./commands/ */
for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

/* Get image file names and save as command names */
for (const file of imageFiles) {
	client.images.set(file.substr(0, file.length-4), 1);
}

/* Get list of default responses from text file */


/* On message being sent */
client.on('message', message => {
  
  var commandName;
  var args;

  if( message.author === client.user) return; // Is the message is from this bot, ignore.
  
  if( message.mentions.users.first() === client.user) { // If the message mentions this bot
    args = message.content.trim().split(/ +/);
    if( args.length === 1) 
      commandName = 'defaultResponse';
    else 
      commandName = args[1].toLowerCase();
  }
  
  else if ( message.content.startsWith(prefix)) { // If the message starts with the set prefix
    args = message.content.slice(prefix.length).trim().split(/ +/);
    commandName = args.shift().toLowerCase();
  }

  // Get the command
  var command;
  if( client.images.has(commandName)) {
    command = client.commands.get('imageReaction');
  }
  else if( client.commands.has(commandName)) {
    command = client.commands.get(commandName);  
  }
  else {
    console.log(`no command detected, commandName: ${commandName}`);
    return;
  }

  // == Cooldown code start ==========================
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }
  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 0) * 1000;
  
  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
    }
  }
  // Delete the message after the cooldown expires
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
  // == Cooldown code end =============================

  if (command.args && !args.length) {
    let reply = `You didn't provide any arguments, ${message.author}!`;

    if (command.usage) {
      reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
    }
  
    return message.channel.send(reply);
  }  

	try {
    command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('Fatal Error: Self destructing.');
	}
});


function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}



client.on('ready', () => {
  console.log(`========================\nLogged in as ${client.user.tag}!`);
});

client.login(token);