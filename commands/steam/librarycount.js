const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const steamDataPath = path.join(__dirname, '../../data/steam_users.json');

function loadSteamUsers() {
  try {
    return JSON.parse(fs.readFileSync(steamDataPath, 'utf8')) || {};
  } catch {
    return {};
  }
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName('librarycount')
    .setDescription('Show how many Steam games you own.'),
  async execute(interaction) {
    const users = loadSteamUsers();
    const steamId = users[interaction.user.id];

    if (!steamId) {
      await interaction.reply({ content: 'Register your Steam ID using /registersteam.', ephemeral: true });
      return;
    }

    try {
      const apiKey = process.env.STEAM_API_KEY;
      const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${apiKey}&steamid=${steamId}`;
      const response = await fetch(url);
      const data = await response.json();

      const count = data.response.game_count || 0;
      await interaction.reply(`📚 You own **${count}** Steam games.`);
    } catch (err) {
      console.error(err);
      await interaction.reply({ content: 'Failed to fetch game count.', ephemeral: true });
    }
  },
};