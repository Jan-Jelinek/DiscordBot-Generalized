const { Console } = require("console");
const fs = require('fs');

module.exports = {
	name: 'defaultResponse',
	execute(message, args) {
        
        try {
            var responses = fs.readFileSync("./texts/defaultResponse.json");
            var jsonResponses = JSON.parse(responses);
        }
        catch (err) {
            console.log("Error: defaultResponse.json not found");
            return;
        }
        // Find a random number between 1 and the length of the list squared
        const ranNumSquared = Math.floor(Math.random() * (jsonResponses.length**2) + 1 );
        // Take the ceiling of the square root. i.e. if 3 reponses and you get 7 then ceil(sqrt(7)) = 3, so pick response 2.
        // Then flip the number so the higher the response the more likely it is to be picked.
        const ranNumFinal = (jsonResponses.length - 1) - Math.ceil(Math.sqrt(ranNumSquared) - 1 );
        message.reply(`${jsonResponses[ranNumFinal]}`);
        
        // Optionally log the sending of the message
        //console.log(`(${new Date().toLocaleString()}) Default reponse called. Sending reponse ${ranNumFinal}.`);
    }
}