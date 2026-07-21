import fs from 'fs';
import path from 'path';

const sourceFile = `C:\\Users\\ELCOT\\.gemini\\antigravity\\brain\\e6d1c236-91b1-4083-9204-7a66c59ffc11\\.system_generated\\steps\\18\\content.md`;
const targetDirPublic = `./public`;
const targetDirSrc = `./src/data`;

if (!fs.existsSync(targetDirPublic)) {
  fs.mkdirSync(targetDirPublic, { recursive: true });
}
if (!fs.existsSync(targetDirSrc)) {
  fs.mkdirSync(targetDirSrc, { recursive: true });
}

const rawContent = fs.readFileSync(sourceFile, 'utf-8');
const jsonStartIndex = rawContent.indexOf('{');
if (jsonStartIndex === -1) {
  console.error('JSON start not found!');
  process.exit(1);
}

const jsonString = rawContent.slice(jsonStartIndex).trim();
try {
  const data = JSON.parse(jsonString);
  console.log(`Successfully parsed Thirukkural dataset!`);
  console.log(`Chapters count: ${data.chapters?.length}`);
  console.log(`Kurals count: ${data.kurals?.length}`);

  // Format check
  if (data.kurals.length === 1330) {
    console.log('100% complete 1330 Thirukkural dataset verified!');
  } else {
    console.warn(`Warning: Found ${data.kurals.length} kurals instead of 1330`);
  }

  // Save to public and src
  fs.writeFileSync('./public/thirukural.json', JSON.stringify(data, null, 2));
  console.log('Saved to ./public/thirukural.json');
} catch (err) {
  console.error('Error parsing JSON:', err.message);
}
