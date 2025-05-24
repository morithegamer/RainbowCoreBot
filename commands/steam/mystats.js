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
    .setName('mystats')
    .setDescription('Fetch your Steam profile and game count.'),
  async execute(interaction) {
    const users = loadSteamUsers();
    const userId = interaction.user.id;
    const steamId = users[userId];

    if (!steamId) {
      await interaction.reply({ content: 'You haven’t registered a Steam ID. Use /registersteam first.', ephemeral: true });
      return;
    }

    try {
      const apiKey = process.env.STEAM_API_KEY;
      const url = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=${apiKey}&steamids=${steamId}`;
      const response = await fetch(url);
      const data = await response.json();

      const player = data.response.players[0];
      if (!player) {
        await interaction.reply({ content: 'Steam profile not found.', ephemeral: true });
        return;
      }

      await interaction.reply({
        content: `**Steam Stats for ${player.personaname}**\n🕹️ Games Owned: ??? (add /library command next!)\n🌐 Profile: ${player.profileurl}`
      });
    } catch (err) {
      console.error(err);
      await interaction.reply({ content: 'Error fetching stats. Try again later.', ephemeral: true });
    }
  },
};