import fs from 'fs';
import https from 'https';

const urls = [
  'https://raw.githubusercontent.com/tk120404/thirukkural/master/thirukkural.json',
  'https://raw.githubusercontent.com/veera-sivarajan/cli-thirukural/master/thirukkural.json',
  'https://raw.githubusercontent.com/narVidhai/Thirukkural-Lexicon/master/thirukkural.json',
  'https://raw.githubusercontent.com/vijayanandrp/Thirukkural-Tamil-Dataset/master/thirukkural.json'
];

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      if (res.statusCode !== 200) {
        return resolve({ url, error: `Status ${res.statusCode}` });
      }
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ url, json });
        } catch (e) {
          resolve({ url, error: `JSON Parse error: ${e.message}`, rawLength: data.length });
        }
      });
    }).on('error', err => resolve({ url, error: err.message }));
  });
}

async function main() {
  console.log('Testing sources...');
  for (const url of urls) {
    console.log(`Fetching ${url}...`);
    const res = await fetchUrl(url);
    if (res.json) {
      console.log(`SUCCESS from ${url}!`);
      if (Array.isArray(res.json)) {
        console.log(`Array length: ${res.json.length}`);
        fs.writeFileSync('./raw_dataset.json', JSON.stringify(res.json, null, 2));
      } else if (res.json.kural || res.json.kurals || res.json.detail) {
        const keys = Object.keys(res.json);
        console.log(`Object keys: ${keys.slice(0, 10).join(', ')}`);
        fs.writeFileSync('./raw_dataset.json', JSON.stringify(res.json, null, 2));
      }
      break;
    } else {
      console.log(`Failed: ${res.error}`);
    }
  }
}

main();
