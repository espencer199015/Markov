class MarkovMachine {
  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    this.chain = {};
    for (let i = 0; i < this.words.length - 1; i++) {
      const currentWord = this.words[i];
      const nextWord = this.words[i + 1];
      if (!this.chain[currentWord]) {
        this.chain[currentWord] = [];
      }
      this.chain[currentWord].push(nextWord);
    }
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let currentWord = this.words[Math.floor(Math.random() * this.words.length)];
    const output = [currentWord];

    while (output.length < numWords && this.chain[currentWord]) {
      const nextWord = this.chain[currentWord][Math.floor(Math.random() * this.chain[currentWord].length)];
      output.push(nextWord);
      currentWord = nextWord;
    }

    return output.join(" ");
  }
}

// Example usage
const sourceText = "the cat in the hat is in the hat";
const markovMachine = new MarkovMachine(sourceText);
const generatedText = markovMachine.makeText();
console.log(generatedText);