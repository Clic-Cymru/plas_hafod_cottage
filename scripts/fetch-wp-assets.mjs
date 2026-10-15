import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://plashafodcottage.co.uk';
const OUTPUT_DIR = path.resolve('public/images/wp');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function downloadFile(url, filename) {
  const dest = path.join(OUTPUT_DIR, filename);
  if (fs.existsSync(dest)) {
    return dest;
  }
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    const buffer = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buffer);
    console.log(`✓ Downloaded ${filename}`);
    return dest;
  } catch (err) {
    console.error(`✗ Error downloading ${url}:`, err.message);
    return null;
  }
}

async function run() {
  console.log('Fetching media list from WordPress REST API...');
  let allMedia = [];
  let page = 1;

  while (page <= 3) {
    const res = await fetch(`${SITE_URL}/wp-json/wp/v2/media?per_page=100&page=${page}`);
    if (!res.ok) break;
    const items = await res.json();
    if (!items || items.length === 0) break;
    allMedia = allMedia.concat(items);
    page++;
  }

  console.log(`Retrieved ${allMedia.length} media metadata items.`);
  fs.writeFileSync('public/images/wp/media-manifest.json', JSON.stringify(allMedia.map(m => ({
    id: m.id,
    title: m.title?.rendered,
    source_url: m.source_url,
    mime_type: m.mime_type,
    media_details: {
      width: m.media_details?.width,
      height: m.media_details?.height,
    }
  })), null, 2));

  // Key priority images to download immediately for homepage replication
  const priorityAssets = [
    { name: 'logo-white.png', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2023/03/Plas-Hafod-New-Logo_white_trans_bwthyn-text.png' },
    { name: 'logo-color.png', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2022/08/Plas-Hafod-logo_colour_transparent-background.png' },
    { name: 'hero-bg.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2022/10/cropped-1_12-scaled-1.jpg' },
    { name: 'bbb-logo.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2023/03/Bryn-Bugeiliaid-Logo_v1_crp-1024x439.jpg' },
    { name: 'award-welsh-hospitality.jpeg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2026/04/Welsh_hospitality_finalist_2026.jpeg' },
    { name: 'award-eryri-ambassador.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2026/03/eryri_ambassador-scaled.jpg' },
    { name: 'award-bbb-5seren.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2026/03/BBB_5seren-scaled.jpg' },
    { name: 'award-ph-5seren.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2026/03/PH_5seren-scaled.jpg' },
    { name: 'award-booking-2026.png', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2026/02/Plas-Hafod-booking-dot-com-award-2026.png' },
    { name: 'award-plastic-free.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2025/06/90116028-f815-42b5-bea9-07326a84d3ae.jpg' },
    { name: 'award-superhost.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2025/06/Plas_hafod_award_2025.jpg' },
    { name: 'award-north-wales.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2025/06/GwyneddAmbassadorArian.jpg' },
    { name: 'croeso-beicwyr.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2023/04/Croeso-Beicwyr-scaled.jpg' },
    { name: 'croeso-anifeiliaid.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2023/04/Croeso-Anifeiliaid-Anwes-scaled.jpg' },
    { name: 'croeso-criwiau.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2023/04/Croeso-Criwiau-Teledu_Ffilm-scaled.jpg' },
    { name: 'croeso-cerddwyr.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2023/04/Croeso-Cerddwyr-scaled.jpg' },
  ];

  for (const asset of priorityAssets) {
    await downloadFile(asset.url, asset.name);
  }

  console.log('Priority assets downloaded successfully.');
}

run();
