# NecoBot
This is a repository for my discord bot, NecoBot, mainly coded in javascript. This bot was created on the 24th of August 2022, and originally was meant for a small server. As of recently I've began to use this bot again, this time for trying out different sorts of things with a new language I'm not familiar with yet. Here's a breakdown of the whole project so far:

## main.js
This is the file I execute to put NecoBot online. This is also where very command is imported, that way all of them can be available.

## commands
This is where I put small commands that do simple things. puffice.js sends an emoji, charles.js sends an image, and quote.js sends a random quote among random quotes that are stored in randomMessages.js, outside the commands folder. Those commands are available to everyone everywhere.
The dm.js command is only available to me, and it sends a dm of my choice to anyone that shares a server with NecoBot.

## stats.js
This file uses gdbrowser's API to display the statistics of a given player on Geometry Dash (stars, moons, demons, coins, creator points, and global ranking). For now this command is only available to myself.
