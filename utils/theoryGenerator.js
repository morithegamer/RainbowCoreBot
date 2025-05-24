const OpenAI = require('openai');
require('dotenv').config();

const database = {
  topics: ['SpongeBob', 'Toontown', 'Docker'],
  eras: ['1990s', '2000s', '2010s'],
  genres: ['political', 'creepy', 'silly'],
  tropes: ['NASA experiment', 'CIA cover-up', 'Y2K bug', 'digital coup'],
  artifacts: ['MiniDV tape', 'VCD', 'Betamax', '.swf file'],
  platforms: ['Napster', 'Kazaa', 'Geocities', 'LimeWire'],
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function generateTheory(topic, era, genre) {
  const trope = database.tropes[Math.floor(Math.random() * database.tropes.length)];
  const artifact = database.artifacts[Math.floor(Math.random() * database.artifacts.length)];
  const platform = database.platforms[Math.floor(Math.random() * database.platforms.length)];
  const title = `Lost ${topic}: ${generateTitle(genre)}`;

  let theoryText = `
    **Lost Media: ${title}**
    In ${era}, ${topic} starred in a secret cartoon tied to a ${trope}. Only a ${artifact}, traded on a ${platform}, survives. NASA's "Docker${genre.charAt(0).toUpperCase() + genre.slice(1)} AI" used container tech to [control minds/rig votes/spy], sparking a fictional [dystopia/coup]. A leaked frame shows SpongeBob in a container, joined by a pink cat fish (heart-shaped sunglasses!). Fans say it was buried by [NASA/CIA] to hide [agenda]. Theorists hunt for a lost [platform] clue. Is Docker the key?
  `;

  if (process.env.OPENAI_API_KEY) {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a 2000s conspiracy theorist. Generate a 300-word SpongeBob cartoon theory about Docker and NASA set in [era], genre [genre]. Include a lost media artifact, a political science experiment, and a 2000s internet vibe.' },
          { role: 'user', content: `Topic: ${topic}, Era: ${era}, Genre: ${genre}` },
        ],
        max_tokens: 400,
      });
      theoryText = response.choices[0].message.content;
    } catch (error) {
      console.log('OpenAI API error, using template:', error);
    }
  }

  return { title, text: theoryText };
}

function generateTitle(genre) {
  const titles = {
    political: ['DockerGrid Coup', 'Container Vote', 'OrbitDock Tyranny'],
    creepy: ['DockerMist Matrix', 'Container Abyss', 'Red Mist Dock'],
    silly: ['Docker Krab Kaper', 'Container Cat Chaos', 'Pink Fish Hack'],
  };
  return titles[genre][Math.floor(Math.random() * titles[genre].length)];
}

module.exports = { generateTheory };


module.exports = { generateTheory };
