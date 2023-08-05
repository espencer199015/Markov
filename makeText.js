/** Command-line tool to generate Markov text. */
require('dotenv').config();
const fs = require('fs');
const axios = require('axios');
const MarkovMachine = require('./markov-machine');

async function readSourceText(source) {
  try {
    if (source.startsWith('http://') || source.startsWith('https://')) {
      const response = await axios.get(source);
      return response.data;
    } else {
      return fs.readFileSync(source, 'utf-8');
    }
  } catch (error) {
    throw new Error(`Error reading the source: ${error.message}`);
  }
}

async function makeText() {
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    console.error('Usage: node makeText.js [file|url] [source]');
    process.exit(1);
  }

  const sourceType = args[0];
  const source = args[1];

  try {
    const text = await readSourceText(source);
    const markovMachine = new MarkovMachine(text);
    const generatedText = markovMachine.makeText();
    console.log(generatedText);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

makeText();

