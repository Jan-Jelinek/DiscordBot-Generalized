# Discord Bot

An easy to use, generalized version of my discord bot.

To use: 
1. Install discord.js
2. Add your token to config.json
3. Customize to fit your needs

## Replies

### Default Response

<img src="https://user-images.githubusercontent.com/47360894/120554732-55274300-c3b7-11eb-8200-3e627a4e738c.png" width="67%">

When mentioned with no additional message the bot will response with a response from a json file in ./texts/defaultResponses.json
The higher the response, the more likely it is to be chosen.

The probability of any command being chosen is (1+2x)/n^2 where x is the position in the list from the bottom (starting at 0) and n is the number of elements in the list.

Example with 3 commands:

>This is the most likely response   *(chance of being chosen: 5/9)*
>
>This is an uncommon response       *(chance of being chosen: 3/9)*
>
>This is the rarest response        *(chance of being chosen: 1/9)*

<img src="https://user-images.githubusercontent.com/47360894/120380138-048fe700-c2de-11eb-9561-bb126a5388ed.png" width="40%">

## Work In Progress 

### Image Response Commands
All images in ./images are automatically converted to commands. If the image ends in a number, then the bot will randomly select from all images which have the same name but different number.

### Tweet
A command which will be able to construct and post tweets.

--------------------------------------
