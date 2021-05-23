module.exports = {
	name: 'tweet',
	description: 'Send a tweet to ( CAT PICS ONLY ) twitter account.',
    cooldown: 3600,
	execute(message, args) {
        // If not in cat-pics-only or testing channel
        if (message.channel.id !== '843006930787631124' || message.channel.id !== '843022241158922243') {
            return;
        }

        message.reply("Tweet request detected.");
	},
};



/*

  // If cat-pics-only or test channel
  if (message.channel.id === '843006930787631124' || message.channel.id === '843022241158922243') {
    // Check for tweet command
    if (message.content.startsWith("!tweet")) {
      // Get tweet content

      message.reply("Tweet request detected.");

      tweetText = message.content.split("!tweet ")[1];
      // If image attached
      if (message.attachments.size > 0) {

        message.reply("Number of attachments: "+message.attachments.size);

        for (i = 0; i < message.attachments.size; i++) {
          message.attachments[0].save("image"+i+".jpg");
        }

        // Loop through images
        if (message.attachments.every(attachIsImage)){
            // tweet text + all images
            message.reply('found image');

            
        }
      }
    }
  }

  */