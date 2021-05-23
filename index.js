const config = require('./config.json');

const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const { cooldowns } = client;
const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

client.on('message', message => {

  var commandName;
  var args;

  if( message.author === client.user) return;

  if( message.mentions.users.first() === client.user) {
    args = message.content.trim().split(/ +/);
    if( args.length === 1) 
      commandName = 'defaultResponse';
    else 
      commandName = args[1].toLowerCase();
  }
  else if ( message.content.startsWith(prefix)) {
    args = message.content.slice(prefix.length).trim().split(/ +/);
    commandName = args.shift().toLowerCase();
  }
  else {
    commandName = message.content;
  }

  if (!client.commands.has(commandName)) return;
  const command = client.commands.get(commandName);

  // ========================== Cooldown code start ==========================
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
  // ========================= Cooldown code end =============================

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

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(token);


/*
const MyID = '127913239148232705';
var chaos = false;


client.on('message', message => {

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();


  if( (message.author.id === MyID) && (command === 'chaos')) {
    chaos = true;
    message.channel.send('Chaos is unleashed. Let the Gods be at war. <@843015017267855380>');
  }

  if( command === 'order') {
    chaos = true;
    message.channel.send('Chaos is unleashed. Let the Gods be at war. <@843015017267855380>');
  }
  

});
*/

/*


  if( (message.author.id === MyID) && (message.content.toLowerCase().startsWith('order'))) {
    chaos = false;
    console.log(`\nchaos resigns: chaoas: ${chaos}\n`);
    message.channel.send('Now ignoring g.a.r.y');
  }

  // If message starts with '@m.i.c.k.a'
  if( (message.content.startsWith('@<843017220207935538>')) && chaos) {
    console.log(`\nthe cycle of chaos continues: ${chaos}\n`);
    message.channel.send('<@843015017267855380>');
  }
  


  if( message.content === 'green rat smoking') {
    message.channel.send('https://cdn.discordapp.com/attachments/117884949171798016/839721140095418378/album_1f4vv4hvh.gif');
  }

  if (message.content === 'micka!') {
    message.reply('hi!');
  }
  if (message.content === 'micka?') {
    message.reply('hi?');
  }
  if (message.content === 'micka!!') {
    message.reply('hi!!');
  }
  if (message.content === 'micka.') {
    message.reply('hi.');
  }
});

function attachIsImage(messageAttach) {
  var url = messageAttach.url;
  //True if this url is a png or jpg image.
  // start with https://cdn.discordapp.com/attachments/ 
  return (url.indexOf("png", url.length - "png".length) !== -1) || (url.indexOf("jpg", url.length - "jpg".length) !== -1);
}
*/

/**
 * !tweet ... + attachment
 * Tweet sent. < link to tweet >
 * 
 * Goal: Tweet attached image
 * 
 * TODO:
 *  - Tweet multiple images
 *  - Set max 1 tweet per hour
 *  - multiple users can constuct tweets at the same time
 * 
 * !createTweet *message*
 * -image 1-
 * -image 2-
 * -image 3-
 * !send / !sendTweet
 * > Tweet has been sent! < link to tweet >
 * 
 * edge cases:
 *  - if images sent > 4. "Can only tweet max 4 images"
 *  - timeout if 2 minutes pass after !createTweet. "Timeout - remember to use !sendTweet"
 *  - cancell if two tweets are being created at the same time
 * 
 */