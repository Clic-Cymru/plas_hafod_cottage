import fs from 'fs';
import path from 'path';

const outDir = './public/images/wp';

const heroSlides = [
  { url: 'https://plashafodcottage.co.uk/wp-content/uploads/2022/10/7_6.jpg', name: 'hero-slide-1.jpg' },
  { url: 'https://plashafodcottage.co.uk/wp-content/uploads/2022/10/1_5-scaled.jpg', name: 'hero-slide-2.jpg' },
  { url: 'https://plashafodcottage.co.uk/wp-content/uploads/2022/10/3_1-1-scaled.jpg', name: 'hero-slide-3.jpg' }
];

async function run() {
  for (const item of heroSlides) {
    const target = path.join(outDir, item.name);
    console.log(`Downloading ${item.url} -> ${item.name}...`);
    try {
      const res = await fetch(item.url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (!res.ok) {
        console.warn(`Failed ${res.status}: ${item.url}`);
        continue;
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(target, buffer);
      console.log(`Saved ${item.name} (${buffer.length} bytes)`);
    } catch (e) {
      console.error(`Error downloading ${item.name}:`, e.message);
    }
  }
}

run();
