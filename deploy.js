await rest.put(
  Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
  { body: [] } // ← This deletes all slash commands in the guild
);
