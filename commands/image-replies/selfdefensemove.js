module.exports = {
	name: 'self defense move',
	description: 'The most powerful defense.',
	execute(message, args) {
    message.channel.messages.fetch({limit: 3}).then(res => {
      let m1 = res.array()[0];
      let m2 = res.array()[1];
      let m3 = res.array()[2];
      
      if( (m2.author.username !== m1.author.username) ) 
        toReply = m2.author;
      else if( m3.author.username !== m1.author.username)
        toReply = m3.author;
      else
        toReply = 'hey buddy';
      
      console.log("\nSelf defense move used");
      console.log("m3: "+m3.author.username);
      console.log("m2: "+m2.author.username);
      console.log("me: "+m1.author.username);
      console.log(`targetting @${toReply.username}`);
      console.log("------------------------\n");
      // Send a random react image
      var rating = Math.floor(Math.random() * 2) + 1;
      message.channel.send(`${toReply}`,{files:['./images/selfdefensemove'+rating+'.jpg']});
    });
  }
}
