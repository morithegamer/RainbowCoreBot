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
    .setName('compare')
    .setDescription('Compare Steam game counts with another user.')
    .addUserOption(option => option.setName('user').setDescription('User to compare with').setRequired(true)),
  async execute(interaction) {
    const users = loadSteamUsers();
    const user1 = interaction.user;
    const user2 = interaction.options.getUser('user');

    const steamId1 = users[user1.id];
    const steamId2 = users[user2.id];

    if (!steamId1 || !steamId2) {
      await interaction.reply({ content: 'Both users must be registered with /registersteam.', ephemeral: true });
      return;
    }

    try {
      const apiKey = process.env.STEAM_API_KEY;
      const fetchGames = async (steamId) => {
        const url = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${apiKey}&steamid=${steamId}`;
        const response = await fetch(url);
        const data = await response.json();
        return data.response.game_count || 0;
      };

      const [count1, count2] = await Promise.all([fetchGames(steamId1), fetchGames(steamId2)]);

      await interaction.reply(`🎮 **${user1.username}** owns ${count1} games.\n🎮 **${user2.username}** owns ${count2} games.`);
    } catch (err) {
      console.error(err);
      await interaction.reply({ content: 'Comparison failed.', ephemeral: true });
    }
  },
};