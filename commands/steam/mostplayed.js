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
    .setName('mostplayed')
    .setDescription('Show your top 3 most played Steam games.'),
  async execute(interaction) {
    const users = loadSteamUsers();
    const steamId = users[interaction.user.id];

    if (!steamId) {
      await interaction.reply({ content: 'Register your Steam ID using /registersteam.', ephemeral: true });
      return;
    }

    try {
      const apiKey = process.env.STEAM_API_KEY;
      const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${apiKey}&steamid=${steamId}&include_appinfo=true`;
      const response = await fetch(url);
      const data = await response.json();
      const games = data.response.games;

      if (!games || games.length === 0) {
        await interaction.reply('No games found.');
        return;
      }

      const topGames = games.sort((a, b) => b.playtime_forever - a.playtime_forever).slice(0, 3);
      const formatted = topGames.map(g => `**${g.name}** – ${(g.playtime_forever / 60).toFixed(1)} hours`).join('\n');

      await interaction.reply(`🔥 Your Top 3 Games:\n${formatted}`);
    } catch (err) {
      console.error(err);
      await interaction.reply({ content: 'Failed to fetch games.', ephemeral: true });
    }
  },
};