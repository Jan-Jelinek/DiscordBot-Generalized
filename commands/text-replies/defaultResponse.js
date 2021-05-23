module.exports = {
	name: 'defaultResponse',
	execute(message, args) {

        var reponse;
        var num = Math.floor(Math.random() * 17) + 1;
        switch( num) {
            case 1:
                response = "Meow";
                break;
            case 2:
                response = "Hi";
                break;
            case 3:
                response = "Hello";
                break;
            case 4:
                response = "The Industrial Revolution and its consequences have been a disaster for the human race.";
                break;
            case 5:
                response = "ReferenceError:\n"+
                "at Client.<anonymous> (C:...\\index.js:30:7)at Client.emit (events.js:315:20)"+
                "at MessageCreateAction.handle (C:...\\node_modules\\discord.js\\src\\client\\actionsMessageCreate.js:31:14)\n"+
                "at Object.module.exports [as MESSAGE_CREATE] (C:...\\node_modules\\discord.js\\src\\client\\websocket\\handlers\\MESSAGE_CREATE.js:4:32)\n"+
                "at WebSocketManager.handlePacket (C:...\\node_modules\\discord.js\\src\\client\\websocket\\WebSocketManager.js:384:31)\n"+
                "at WebSocketShard.onPacket (C:...\\node_modules\\discord.js\\src\\client\\websocket\\WebSocketShard.js:444:22)\n"+
                "at WebSocketShard.onMessage (C:...\\node_modules\\discord.js\\src\\client\\websocket\\WebSocketShard.js:301:10)\n"+
                "at WebSocket.onMessage (C:...\\node_modules\\ws\\lib\\event-target.js:132:16)\n"+
                "at WebSocket.emit (events.js:315:20)\n"
                "at Receiver.receiverOnMessage (C:...\\node_modules\\ws\\lib\\websocket.js:835:20)";
                break;
            case 6:
                response = "Hey";
                break;
            case 7:
                response = "PROJECT Micka > g.a.r.y.";
                break;
            case 8:
                response = "No.";
                break;
            case 9:
                response = "From each according to his ability, to each according to his needs";
                break;
            case 10:
                response = "When I give food to the poor, they call me a saint. When I ask why the poor have no food, they call me a Communist";
                break;
            case 11:
                response = "Let the ruling classes tremble at a Communist revolution. The proletarians have nothing to lose but their chains. They have a world to win. Workers of the world, unite!";
                break;
            case 12:
                response = "Democracy is indispensable to socialism.";
                break;
            case 13:
                response = "Struggles of masses and ideas. An epic that will be carried forward by our peoples, mistreated and scorned by imperialism; our people, unreckoned with until today, who are now beginning to shake off their slumber. Imperialism considered us a weak and submissive flock; and now it begins to be terrified of that flock...";
                break;
            case 14:
                response = "We must have faith in the masses and we must have faith in the Party. These are two cardinal principles. If we doubt these principles, we shall accomplish nothing.";
                break;
            case 15:
                response = "You are pitiful isolated individuals; you are bankrupts; your role is played out. Go where you belong from now on -- into the dustbin of history!";
                break;
            case 16:
                response = "The devotion of such titans of spirit as Lenin to an Ideal must bear fruit. The nobility of his selflessness will be an example through centuries to come, and his Ideal will reach perfection.";
                break;
            case 17:
                response = "All our progress, every slightly significant achievement we have made in socialist construction, has been the expression and result of our domestic class struggle.";
                break;
            default:
                response = "";
            }
        message.reply(response);
    }
}
// ("<:emoji name:emoji id>")
// 