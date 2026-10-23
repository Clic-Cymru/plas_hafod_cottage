import fs from 'fs';
import path from 'path';

const outDir = './public/images/wp/guestbook';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const phImages = [
  'https://plashafodcottage.co.uk/wp-content/uploads/2022/09/307369794_803307887689506_4673365818413325457_n-scaled.jpg',
  'https://plashafodcottage.co.uk/wp-content/uploads/2022/09/307381237_604071758052875_9109345119307160296_n-scaled.jpg',
  'https://plashafodcottage.co.uk/wp-content/uploads/2022/09/306300887_489200829727407_1403567988358003444_n-scaled.jpg',
  'https://plashafodcottage.co.uk/wp-content/uploads/2022/09/307440401_482073406918472_1096585743004866744_n-scaled.jpg',
  'https://plashafodcottage.co.uk/wp-content/uploads/2022/09/307209223_2046345145576321_3428173026549923077_n-scaled.jpg',
  'https://plashafodcottage.co.uk/wp-content/uploads/2022/09/307182248_1709368282781679_8130418706201565579_n-scaled.jpg',
  'https://plashafodcottage.co.uk/wp-content/uploads/2022/09/307177039_1473096483213175_2950396901474011482_n-scaled.jpg',
  'https://plashafodcottage.co.uk/wp-content/uploads/2022/09/307870954_1124363758175790_2672832394258038220_n-scaled.jpg',
  'https://plashafodcottage.co.uk/wp-content/uploads/2022/09/307292300_827009358473898_8077936823853802272_n-scaled.jpg',
  'https://plashafodcottage.co.uk/wp-content/uploads/2022/09/307460291_5223874671043606_8552689101894730697_n-scaled.jpg',
  'https://plashafodcottage.co.uk/wp-content/uploads/2022/09/307150305_3231227610523770_5427228090564080390_n-scaled.jpg',
  'https://plashafodcottage.co.uk/wp-content/uploads/2022/09/307539260_444466890853523_1415326625865591687_n-scaled.jpg',
  'https://plashafodcottage.co.uk/wp-content/uploads/2022/09/307228393_797720051651765_6146912222481148162_n-scaled.jpg',
  'https://plashafodcottage.co.uk/wp-content/uploads/2022/09/307724582_613375316962824_2266267736108869416_n-scaled.jpg',
  'https://plashafodcottage.co.uk/wp-content/uploads/2022/09/307186939_493262652276470_717262230868364663_n-scaled.jpg',
  'https://plashafodcottage.co.uk/wp-content/uploads/2022/09/307073347_1306568073481708_7323566962152466446_n-scaled.jpg',
  'https://plashafodcottage.co.uk/wp-content/uploads/2022/09/307016835_824293068572368_355101250254995971_n-scaled.jpg',
  'https://plashafodcottage.co.uk/wp-content/uploads/2022/09/306931028_446084067504486_2636294835430838762_n-scaled.jpg',
  'https://plashafodcottage.co.uk/wp-content/uploads/2022/09/307177039_818148946197908_9102336179778928174_n-scaled.jpg',
  'https://plashafodcottage.co.uk/wp-content/uploads/2022/09/307235486_755334309100415_6593126370262165046_n.jpg',
  'https://plashafodcottage.co.uk/wp-content/uploads/2022/09/307635047_1759046814454871_321134986641729321_n.jpg',
];

const bbbImages = [
  'https://plashafodcottage.co.uk/wp-content/uploads/2024/01/BBB_review_001.jpg',
  'https://plashafodcottage.co.uk/wp-content/uploads/2024/01/BBB_review_002.jpg',
  'https://plashafodcottage.co.uk/wp-content/uploads/2024/01/BBB_review_003.jpg',
  'https://plashafodcottage.co.uk/wp-content/uploads/2024/01/BBB_review_004.jpg',
  'https://plashafodcottage.co.uk/wp-content/uploads/2024/01/BBB_review_005.jpg',
  'https://plashafodcottage.co.uk/wp-content/uploads/2024/01/BBB_review_006.jpg',
  'https://plashafodcottage.co.uk/wp-content/uploads/2024/01/BBB_review_007.jpg',
  'https://plashafodcottage.co.uk/wp-content/uploads/2024/01/BBB_review_008.jpg',
  'https://plashafodcottage.co.uk/wp-content/uploads/2024/01/BBB_review_009.jpg',
  'https://plashafodcottage.co.uk/wp-content/uploads/2024/01/BBB_review_010.jpg',
  'https://plashafodcottage.co.uk/wp-content/uploads/2024/01/BBB_review_011.jpg',
  'https://plashafodcottage.co.uk/wp-content/uploads/2024/01/BBB_review_012.jpg',
  'https://plashafodcottage.co.uk/wp-content/uploads/2024/01/BBB_review_013.jpg',
  'https://plashafodcottage.co.uk/wp-content/uploads/2024/01/BBB_review_014.jpg',
  'https://plashafodcottage.co.uk/wp-content/uploads/2024/01/BBB_review_015.jpg',
];

async function download(url, filename) {
  const dest = path.join(outDir, filename);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
    console.log(`Already have ${filename}`);
    return;
  }
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });
    if (!res.ok) {
      console.warn(`Failed ${res.status}: ${url}`);
      return;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buf);
    console.log(`Saved ${filename} (${buf.length} bytes)`);
  } catch (err) {
    console.error(`Error saving ${filename}:`, err.message);
  }
}

async function main() {
  console.log(`Starting download of 21 Plas Hafod images...`);
  for (let i = 0; i < phImages.length; i++) {
    const num = String(i + 1).padStart(2, '0');
    await download(phImages[i], `ph-guestbook-${num}.jpg`);
  }

  console.log(`Starting download of 15 BBB images...`);
  for (let i = 0; i < bbbImages.length; i++) {
    const num = String(i + 1).padStart(2, '0');
    await download(bbbImages[i], `bbb-guestbook-${num}.jpg`);
  }

  console.log('Finished downloading all guestbook images!');
}

main();
