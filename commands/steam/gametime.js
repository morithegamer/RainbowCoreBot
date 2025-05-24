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
    .setName('gametime')
    .setDescription('Check how long you’ve played a game.')
    .addStringOption(option =>
      option.setName('title')
        .setDescription('Game title to check')
        .setRequired(true)),
  async execute(interaction) {
    const title = interaction.options.getString('title');
    const users = loadSteamUsers();
    const steamId = users[interaction.user.id];

    if (!steamId) {
      await interaction.reply({ content: 'Use /registersteam first.', ephemeral: true });
      return;
    }

    try {
      const apiKey = process.env.STEAM_API_KEY;
      const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${apiKey}&steamid=${steamId}&include_appinfo=true`;
      const response = await fetch(url);
      const data = await response.json();
      const games = data.response.games || [];

      const game = games.find(g => g.name.toLowerCase().includes(title.toLowerCase()));

      if (!game) {
        await interaction.reply(`🎮 No game found matching "${title}".`);
        return;
      }

      await interaction.reply(`⏱️ You've played **${game.name}** for ${(game.playtime_forever / 60).toFixed(1)} hours.`);
    } catch (err) {
      console.error(err);
      await interaction.reply({ content: 'Error fetching game time.', ephemeral: true });
    }
  },
};