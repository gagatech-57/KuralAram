import fs from 'fs';

const data = JSON.parse(fs.readFileSync('./src/data/thirukural.json', 'utf-8'));

data.kurals.forEach((k) => {
  const l1Words = k.line1.trim().split(/\s+/);
  const l2Words = k.line2.trim().split(/\s+/);
  if (l1Words.length !== 4 || l2Words.length !== 3) {
    console.log(`Kural #${k.number}: Line 1 (${l1Words.length} words): "${k.line1}" | Line 2 (${l2Words.length} words): "${k.line2}"`);
  }
});
