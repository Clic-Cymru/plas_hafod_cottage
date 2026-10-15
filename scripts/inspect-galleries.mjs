import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('./scripts/wp-all-pages.json', 'utf8'));

['reviews', 'local-area', 'bryn-bugeiliaid-bach'].forEach(pageKey => {
  const c = pages[pageKey].content;
  console.log(`\n=== IMAGES FOR ${pageKey} ===`);
  const imgs = [...new Set([...c.matchAll(/https:\/\/[^"'\s]+\.(?:jpg|jpeg|png|webp)/gi)].map(m => m[0]))];
  imgs.forEach(img => console.log(img));
});
