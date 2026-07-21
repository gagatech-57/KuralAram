import fs from 'fs';

const raw = JSON.parse(fs.readFileSync('./raw_dataset.json', 'utf-8'));

console.log('Top keys in raw dataset:', Object.keys(raw));
if (raw.kural) {
  console.log('kural length:', raw.kural.length);
  console.log('Sample kural 0:', JSON.stringify(raw.kural[0], null, 2));
  console.log('Sample kural 1329:', JSON.stringify(raw.kural[1329], null, 2));
}
