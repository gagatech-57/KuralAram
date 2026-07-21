import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./src/data/thirukural.json', 'utf-8'));

let invalidLine1Count = 0;
let invalidLine2Count = 0;

data.kurals.forEach((k) => {
  const line1Words = k.line1.trim().split(/\s+/);
  const line2Words = k.line2.trim().split(/\s+/);

  if (line1Words.length !== 4) {
    invalidLine1Count++;
  }
  if (line2Words.length !== 3) {
    invalidLine2Count++;
  }
});

console.log(`Total Kurals: ${data.kurals.length}`);
console.log(`Kurals where line 1 is NOT 4 words: ${invalidLine1Count}`);
console.log(`Kurals where line 2 is NOT 3 words: ${invalidLine2Count}`);

// Let's inspect sample kurals if any are not 4 + 3 words
data.kurals.slice(0, 10).forEach((k) => {
  const l1 = k.line1.trim().split(/\s+/);
  const l2 = k.line2.trim().split(/\s+/);
  console.log(`Kural #${k.number}: Line 1 (${l1.length} words): "${k.line1}" | Line 2 (${l2.length} words): "${k.line2}"`);
});
