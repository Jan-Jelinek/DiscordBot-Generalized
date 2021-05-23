module.exports = {
	name: `confused`,
	description: 'When someone being confusing.',
	execute(message, args) {

        message.channel.messages.fetch({limit: 3}).then(res => {
            let m1 = res.array()[0];
            let m2 = res.array()[1];
            let m3 = res.array()[2];
      
            if( m2.author.username !== m1.author.username)
              toReply = m2.author;
              //message.channel.send(`${toReply}`,{files:['./images/selfdefense.jpg']});
            else if( m3.author.username !== m1.author.username)
              toReply = m3.author;
            else
              toReply = 'hey buddy';
            var rating = Math.floor(Math.random() * 3) + 1;
            message.channel.send(`${toReply}`,{files:['./images/confused.jpg']});
    	});
    }
}
