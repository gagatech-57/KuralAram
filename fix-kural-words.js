import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./src/data/thirukural.json', 'utf-8'));

data.kurals.forEach((k) => {
  const allWords = `${k.line1} ${k.line2}`.trim().split(/\s+/);
  if (allWords.length === 7) {
    // We can perfectly split into first 4 words for Line 1, and last 3 words for Line 2!
    k.line1 = allWords.slice(0, 4).join(' ');
    k.line2 = allWords.slice(4, 7).join(' ');
  } else {
    console.log(`Kural #${k.number} has ${allWords.length} words total: "${allWords.join(' ')}"`);
  }
});

let non4Count = 0;
let non3Count = 0;

data.kurals.forEach((k) => {
  const l1 = k.line1.trim().split(/\s+/);
  const l2 = k.line2.trim().split(/\s+/);
  if (l1.length !== 4) non4Count++;
  if (l2.length !== 3) non3Count++;
});

console.log(`AFTER 4+3 SPLIT FIX:`);
console.log(`Line 1 not 4 words: ${non4Count}`);
console.log(`Line 2 not 3 words: ${non3Count}`);
