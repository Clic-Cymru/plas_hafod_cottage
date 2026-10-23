import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scripts/wp-all-pages.json', 'utf8'));
const bbb = data['bryn-bugeiliaid-bach'];
const s7Idx = bbb.content.indexOf('data-id="59688b87"');
const s8Idx = bbb.content.indexOf('data-id="4faa154c"');
const s7 = bbb.content.substring(s7Idx, s8Idx);
const urls = [...new Set([...s7.matchAll(/https?:\/\/[^"'\s\)]+\.(?:jpg|jpeg|png|webp)/gi)].map(m => m[0]))];

urls.forEach((u, i) => {
  const file = u.split('/').pop();
  console.log(`{ id: ${i + 1}, src: '/images/wp/bbb/bbb-${String(i + 1).padStart(2, '0')}.jpg', file: '${file}' },`);
});
