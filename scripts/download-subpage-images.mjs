import fs from 'fs';
import path from 'path';

const outDir = './public/images/wp';

const imagesToDownload = [
  // Local Area
  { url: 'https://plashafodcottage.co.uk/wp-content/uploads/2022/08/snowdon-1024x682.jpg', name: 'snowdon.jpg' },
  // Reviews platform logos
  { url: 'https://plashafodcottage.co.uk/wp-content/uploads/2022/09/Vrbo-150x150.png', name: 'logo-vrbo.png' },
  { url: 'https://plashafodcottage.co.uk/wp-content/uploads/2022/09/airbnb-logo-266x300-1-150x150.png', name: 'logo-airbnb.png' },
  { url: 'https://plashafodcottage.co.uk/wp-content/uploads/2022/09/tripadvisor_logo_icon_169414-150x150.png', name: 'logo-tripadvisor.png' },
  // BBB Logos & Awards
  { url: 'https://plashafodcottage.co.uk/wp-content/uploads/2023/02/Bryn-Bugeiliaid-Logo_white-1024x682.png', name: 'bbb-logo-white.png' },
  { url: 'https://plashafodcottage.co.uk/wp-content/uploads/2026/02/Digital-Award_TRA-2026-1024x720.png', name: 'bbb-award-tra.png' },
  { url: 'https://plashafodcottage.co.uk/wp-content/uploads/2026/03/BBB_5seren-733x1024.jpg', name: 'bbb-5seren.jpg' },
  { url: 'https://plashafodcottage.co.uk/wp-content/uploads/2025/04/ac5eee8a-2adb-4977-a9c9-9ec2df6c2831-1024x1024.jpeg', name: 'bbb-award-superhost.jpeg' },
  // BBB Photos
  { url: 'https://plashafodcottage.co.uk/wp-content/uploads/2023/02/Bryn_Bugeiliaid-Bach_002.jpg', name: 'bbb-gallery-1.jpg' },
  { url: 'https://plashafodcottage.co.uk/wp-content/uploads/2023/02/Bryn_Bugeiliaid-Bach_004.jpg', name: 'bbb-gallery-2.jpg' },
  { url: 'https://plashafodcottage.co.uk/wp-content/uploads/2023/02/Bryn_Bugeiliaid-Bach_006.jpg', name: 'bbb-gallery-3.jpg' },
  { url: 'https://plashafodcottage.co.uk/wp-content/uploads/2023/02/Bryn_Bugeiliaid-Bach_008.jpg', name: 'bbb-gallery-4.jpg' },
  { url: 'https://plashafodcottage.co.uk/wp-content/uploads/2023/02/Bryn_Bugeiliaid-Bach_012.jpg', name: 'bbb-gallery-5.jpg' },
  { url: 'https://plashafodcottage.co.uk/wp-content/uploads/2023/02/Bryn_Bugeiliaid-Bach_020.jpg', name: 'bbb-gallery-6.jpg' },
  { url: 'https://plashafodcottage.co.uk/wp-content/uploads/2023/02/Bryn_Bugeiliaid-Bach_028.jpg', name: 'bbb-gallery-7.jpg' },
  { url: 'https://plashafodcottage.co.uk/wp-content/uploads/2023/02/Bryn_Bugeiliaid-Bach_038.jpg', name: 'bbb-gallery-8.jpg' },
  // Review photo clips
  { url: 'https://plashafodcottage.co.uk/wp-content/uploads/2024/01/BBB_review_001.jpg', name: 'review-clip-1.jpg' },
  { url: 'https://plashafodcottage.co.uk/wp-content/uploads/2024/01/BBB_review_002.jpg', name: 'review-clip-2.jpg' },
  { url: 'https://plashafodcottage.co.uk/wp-content/uploads/2024/01/BBB_review_003.jpg', name: 'review-clip-3.jpg' },
  { url: 'https://plashafodcottage.co.uk/wp-content/uploads/2024/01/BBB_review_004.jpg', name: 'review-clip-4.jpg' },
  { url: 'https://plashafodcottage.co.uk/wp-content/uploads/2024/01/BBB_review_005.jpg', name: 'review-clip-5.jpg' },
  { url: 'https://plashafodcottage.co.uk/wp-content/uploads/2024/01/BBB_review_006.jpg', name: 'review-clip-6.jpg' },
];

async function run() {
  for (const item of imagesToDownload) {
    const target = path.join(outDir, item.name);
    if (fs.existsSync(target)) {
      console.log(`Already exists: ${item.name}`);
      continue;
    }
    try {
      console.log(`Downloading ${item.url} -> ${item.name}...`);
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
