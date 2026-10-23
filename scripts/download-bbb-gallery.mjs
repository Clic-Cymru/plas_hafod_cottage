import fs from 'fs';
import path from 'path';

const data = JSON.parse(fs.readFileSync('scripts/wp-all-pages.json', 'utf8'));
const bbb = data['bryn-bugeiliaid-bach'];
const s7Idx = bbb.content.indexOf('data-id="59688b87"');
const s8Idx = bbb.content.indexOf('data-id="4faa154c"');
const s7 = bbb.content.substring(s7Idx, s8Idx);
const urls = [...new Set([...s7.matchAll(/https?:\/\/[^"'\s\)]+\.(?:jpg|jpeg|png|webp)/gi)].map(m => m[0]))];

console.log(`Found ${urls.length} images in BBB gallery on WordPress`);

const outDir = 'public/images/wp/bbb';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function downloadAll() {
  const downloaded = [];
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const filename = `bbb-${String(i + 1).padStart(2, '0')}.jpg`;
    const dest = path.join(outDir, filename);

    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      console.log(`[${i+1}/${urls.length}] Already exists: ${filename}`);
      downloaded.push(`/images/wp/bbb/${filename}`);
      continue;
    }

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = await res.arrayBuffer();
      fs.writeFileSync(dest, Buffer.from(buf));
      console.log(`[${i+1}/${urls.length}] Downloaded ${filename} (${buf.byteLength} bytes) from ${url.split('/').pop()}`);
      downloaded.push(`/images/wp/bbb/${filename}`);
    } catch (err) {
      console.error(`Failed ${url}:`, err.message);
    }
  }

  fs.writeFileSync('scripts/bbb-images.json', JSON.stringify(downloaded, null, 2));
  console.log(`\nFinished downloading ${downloaded.length} images to ${outDir}`);
}

downloadAll();
