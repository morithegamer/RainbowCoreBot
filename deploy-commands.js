// Command deployment script
require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const commands = [];

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if (command.data) {
      commands.push(command.data.toJSON());
    }
  }
}

const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

// GUILD ONLY: fast and visible immediately
const CLIENT_ID = 'your_client_id_here';
const GUILD_ID = 'your_guild_id_here';

(async () => {
  try {
    console.log(`🔁 Refreshing ${commands.length} application (/) commands...`);

    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands }
    );

    console.log(`✅ Successfully registered ${commands.length} commands.`);
  } catch (error) {
    console.error('❌ Slash deploy failed:', error);
  }
})();
