import https from 'https';
import fs from 'fs';
import path from 'path';

const outDir = 'public/images/wp/local-area';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const items = [
  { slug: 'sygun-copper-mine', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2022/08/sygun.jpg' },
  { slug: 'caernarfon-castle', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2022/08/castell-cfon1.jpg' },
  { slug: 'welsh-slate-museum', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2022/08/national-slate-museum.jpg' },
  { slug: 'bodnant-gardens', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2022/08/Bodnant-Gardens.jpg' },
  { slug: 'padarn-country-park', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2022/08/padarn-tree.jpg' },
  { slug: 'rib-ride', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2022/08/rib-ride.jpg' },
  { slug: 'pant-du-vineyard', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2022/08/pant-du.jpeg' },
  { slug: 'portmeirion', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2022/08/portmeirion.jpg' },
  { slug: 'adventure-smart-wales', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2025/04/Adventure-Smart-1.jpg' },
  { slug: 'ffestiniog-welsh-highland-railways', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2022/08/Festiniog-Railway.jpeg' },
  { slug: 'glynllifon-country-park', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2022/08/35071-parc-glynllifon-caernarfon-01.jpg' },
  { slug: 'caernarfon-airport', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2022/08/cfon-airport.jpg' },
  { slug: 'snowdon-mountain-railway', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2025/04/Snowdon_Image_9.jpg' },
  { slug: 'visit-snowdonia', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2025/04/Visit-snowdonia.jpg' },
  { slug: 'eryri-national-park', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2025/04/parceryri.jpg' },
  { slug: 'bragdy-lleu-brewery', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2025/04/bragdy-lleu-logo.jpg' }
];

function download(item) {
  return new Promise((resolve, reject) => {
    const ext = path.extname(item.url) || '.jpg';
    const filePath = path.join(outDir, `${item.slug}${ext}`);
    const file = fs.createWriteStream(filePath);

    https.get(item.url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          const stats = fs.statSync(filePath);
          console.log(`Saved ${item.slug}${ext} (${stats.size} bytes)`);
          resolve({ slug: item.slug, file: `/images/wp/local-area/${item.slug}${ext}`, size: stats.size });
        });
      } else {
        console.error(`Failed ${item.slug}: HTTP ${res.statusCode}`);
        reject(new Error(`HTTP ${res.statusCode}`));
      }
    }).on('error', err => {
      console.error(`Error downloading ${item.slug}:`, err.message);
      reject(err);
    });
  });
}

async function run() {
  for (const item of items) {
    try {
      await download(item);
    } catch (e) {
      console.error(e);
    }
  }
}

run();
