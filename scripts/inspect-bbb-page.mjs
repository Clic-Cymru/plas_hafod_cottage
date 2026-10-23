import fs from 'fs';

async function run() {
  const res = await fetch('https://plashafodcottage.co.uk/bryn-bugeiliaid-bach/');
  const html = await res.text();
  fs.writeFileSync('scripts/page-bbb-raw.html', html);

  const imgRegex = /<img[^>]+src=["']([^"']+)["']/g;
  let m;
  const imgs = [];
  while ((m = imgRegex.exec(html)) !== null) {
    imgs.push(m[1]);
  }
  console.log('Total BBB images:', imgs.length);
  imgs.forEach((img, idx) => console.log(`${idx + 1}: ${img}`));

  // Check gallery or carousels
  const galleryRegex = /gallery-item|wp-block-image|elementor-image|elementor-gallery/g;
  console.log('Gallery matches:', (html.match(galleryRegex) || []).length);
}

run();
