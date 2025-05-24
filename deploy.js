require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const CLIENT_ID = '1178851034832064592';
const GUILD_ID = '555148516708712479';
const TOKEN = process.env.BOT_TOKEN;

const rest = new REST({ version: '10' }).setToken(TOKEN);

// Load new commands
const commands = [];
const commandFolders = fs.readdirSync(path.join(__dirname, 'commands'));
for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(path.join(__dirname, 'commands', folder)).filter(file => file.endsWith('.js'));
  for (const file of commandFiles) {
    const filePath = path.join(__dirname, 'commands', folder, file);
    const command = require(filePath);
    if (command.data) {
      commands.push(command.data.toJSON());
    }
  }
}

(async () => {
  try {
    console.log('🧨 Deleting ALL existing guild slash commands...');
    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: [] } // 💥 Wipe them all
    );

    console.log('🚀 Deploying fresh commands...');
    await rest.put(
      Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
      { body: commands }
    );

    console.log(`✅ Successfully cleaned and redeployed ${commands.length} command(s).`);
  } catch (error) {
    console.error('❌ Something went wrong during slash deploy:', error);
  }
})();
