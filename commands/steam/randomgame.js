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
    .setName('randomgame')
    .setDescription('Pick a random game from your Steam library.'),
  async execute(interaction) {
    const users = loadSteamUsers();
    const steamId = users[interaction.user.id];

    if (!steamId) {
      await interaction.reply({ content: 'You haven’t registered a Steam ID. Use /registersteam first.', ephemeral: true });
      return;
    }

    try {
      const apiKey = process.env.STEAM_API_KEY;
      const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${apiKey}&steamid=${steamId}&include_appinfo=true`;
      const response = await fetch(url);
      const data = await response.json();
      const games = data.response.games;

      if (!games || games.length === 0) {
        await interaction.reply('No games found in your library.');
        return;
      }

      const game = games[Math.floor(Math.random() * games.length)];
      await interaction.reply(`🎮 Random Game: **${game.name}**`);
    } catch (err) {
      console.error(err);
      await interaction.reply({ content: 'Failed to fetch library.', ephemeral: true });
    }
  },
};