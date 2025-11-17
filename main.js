const { Client, GatewayIntentBits, REST, Routes, Events } = require('discord.js');
const messages = require('./randomMessages.js');
const dmCommand = require('./commands/dm.js');
const charles = require('./commands/charles.js');
const puffice = require('./commands/puffice.js');
const quote = require('./commands/quote.js');

const stats = require('./stats.js');


require('dotenv').config();

// === SETUP ===
const TOKEN = process.env.DISCORD_TOKEN;
const CLIENT_ID = '1011785074603216926';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessages
  ],
  partials: ['CHANNEL'] // ts for dms and group dms?? i think
});

// === COMMAND DEFINITIONS ===
const commands = [
  puffice.data,
  quote.data,
  dmCommand.data,
  charles.data,
  stats.data,
];

// === REGISTER COMMANDS ===
const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log('registering of slash commands');
    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
    console.log('ring ding ding ding it worked');
  } catch (error) {
    console.error(error);
  }
})();

// === BOT EVENTS ===
client.once(Events.ClientReady, (c) => {
  console.log(`${c.user.tag} has woken up from her slumber`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return; // ts are all command interactions from the commands folder

  if (interaction.commandName === 'puffice') {
    await puffice.execute(interaction);
  }

  if (interaction.commandName === 'quote') {
    await quote.execute(interaction);
  }

  if (interaction.commandName === 'dm') {
    await dmCommand.execute(interaction);
  }

  if (interaction.commandName === 'charles') {
    await charles.execute(interaction);
  }

  if (interaction.commandName === 'stats') {
    await stats.execute(interaction);
  }
});

// === LOGIN ===
client.login(TOKEN);
