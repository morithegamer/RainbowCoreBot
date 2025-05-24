const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../data/theories.json');

function loadTheories() {
  try {
    return JSON.parse(fs.readFileSync(dbPath, 'utf8')) || {};
  } catch (error) {
    return {};
  }
}

function saveTheory(theoryId, text) {
  const theories = loadTheories();
  theories[theoryId] = { text, votes: 0 };
  fs.writeFileSync(dbPath, JSON.stringify(theories, null, 2));
}

function getTopTheories(limit = 3) {
  const theories = loadTheories();
  return Object.entries(theories)
    .sort((a, b) => b[1].votes - a[1].votes)
    .slice(0, limit);
}

module.exports = { loadTheories, saveTheory, getTopTheories };