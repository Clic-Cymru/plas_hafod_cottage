import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scripts/wp-all-pages.json', 'utf8'));
const bbb = data['bryn-bugeiliaid-bach'];

// Find gallery widget or image carousel widget or images around "IMAGES OF BRYN BUGEILIAID BACH"
const idx = bbb.content.indexOf('IMAGES OF BRYN BUGEILIAID BACH');
console.log('Index of heading:', idx);
if (idx !== -1) {
  const slice = bbb.content.substring(idx - 200, idx + 4000);
  console.log('--- GALLERY SLICE ---');
  console.log(slice);
}
