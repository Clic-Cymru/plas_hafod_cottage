import fs from 'fs';
import path from 'path';

const OUTPUT_DIR = path.resolve('public/images/wp');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

const imagesToDownload = [
  // Logos
  { filename: 'logo-white.png', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2023/03/Plas-Hafod-New-Logo_white_trans_bwthyn-text.png' },
  { filename: 'logo-color.png', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2022/08/Plas-Hafod-logo_colour_transparent-background.png' },
  { filename: 'bbb-logo.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2023/03/Bryn-Bugeiliaid-Logo_v1_crp-1024x439.jpg' },
  
  // Hero & About
  { filename: 'hero-bg.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2022/10/cropped-1_12-scaled-1.jpg' },
  { filename: 'croeso-window.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2022/10/7_1-1024x1024.jpg' },

  // Gallery Images
  { filename: 'gallery-1.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2022/10/7_2-1024x768.jpg' },
  { filename: 'gallery-2.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2022/10/7_3-1024x768.jpg' },
  { filename: 'gallery-3.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2022/10/7_4-1024x768.jpg' },
  { filename: 'gallery-4.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2022/10/7_5-1024x768.jpg' },
  { filename: 'gallery-5.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2022/10/7_6-1024x768.jpg' },
  { filename: 'gallery-6.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2022/10/7_7-768x1024.jpg' },
  { filename: 'gallery-7.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2022/10/7_8-768x1024.jpg' },
  { filename: 'gallery-8.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2022/10/7_9-768x1024.jpg' },
  { filename: 'gallery-9.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2022/10/7_10-1024x768.jpg' },
  { filename: 'gallery-10.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2022/10/7_11-1024x745.jpg' },
  { filename: 'gallery-11.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2022/10/7_12-786x1024.jpg' },
  { filename: 'gallery-12.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2022/10/7_13-1024x768.jpg' },

  // Visit Wales 5-star rating sign
  { filename: 'visit-wales-sign.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2024/01/395692936_1500060530754646_5507334340433888238_n-1013x1024.jpg' },

  // Bryn Bugeiliaid Bach property
  { filename: 'bbb-living.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2023/02/7_12_crop-1024x964.jpg' },

  // Accreditations & Awards
  { filename: 'award-plastic-free.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2025/06/90116028-f815-42b5-bea9-07326a84d3ae-726x1024.jpg' },
  { filename: 'award-eryri-ambassador.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2026/03/eryri_ambassador-720x1024.jpg' },
  { filename: 'award-welsh-hospitality.jpeg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2026/04/Welsh_hospitality_finalist_2026-975x1024.jpeg' },
  { filename: 'award-superhost.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2024/04/att.NQP0tD1RDspY1Y4uicZPyuGjUZ8fJS9HtwIaOdmgpP4-665x1024.jpg' },
  { filename: 'award-best-north-wales.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2025/06/Plas_hafod_award_2025-1012x1024.jpg' },
  { filename: 'award-ph-5star.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2026/03/PH_5seren-740x1024.jpg' },
  { filename: 'croeso-cyclists.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2024/04/Cyclists-PORT-CMYK.jpg' },
  { filename: 'croeso-pets.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2024/04/Pets-PORT-CMYK.jpg' },
  { filename: 'croeso-tv.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2024/04/TV-PORT-CMYK.jpg' },
  { filename: 'croeso-walkers.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2024/04/Walkers-PORT-CMYK.jpg' },
  { filename: 'award-booking-2026.png', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2026/02/Plas-Hafod-booking-dot-com-award-2026.png' },
];

async function download() {
  console.log(`Downloading ${imagesToDownload.length} exact site assets...`);
  for (const item of imagesToDownload) {
    const dest = path.join(OUTPUT_DIR, item.filename);
    if (fs.existsSync(dest)) {
      console.log(`- Exists: ${item.filename}`);
      continue;
    }
    try {
      const res = await fetch(item.url);
      if (!res.ok) {
        console.error(`✗ HTTP ${res.status} for ${item.url}`);
        continue;
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      fs.writeFileSync(dest, buffer);
      console.log(`✓ Saved ${item.filename}`);
    } catch (e) {
      console.error(`✗ Failed ${item.filename}:`, e.message);
    }
  }
  console.log('Finished downloading assets.');
}

download();
