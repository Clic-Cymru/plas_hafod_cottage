import fs from 'fs';
import path from 'path';

const CAROUSEL_DIR = path.resolve('public/images/wp/carousel');
const WP_DIR = path.resolve('public/images/wp');

if (!fs.existsSync(CAROUSEL_DIR)) {
  fs.mkdirSync(CAROUSEL_DIR, { recursive: true });
}
if (!fs.existsSync(WP_DIR)) {
  fs.mkdirSync(WP_DIR, { recursive: true });
}

async function downloadFile(url, destPath) {
  if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1000) {
    console.log(`- Exists: ${path.basename(destPath)}`);
    return destPath;
  }
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(destPath, buf);
    console.log(`✓ Downloaded: ${path.basename(destPath)} (${(buf.length / 1024).toFixed(1)} KB)`);
    return destPath;
  } catch (err) {
    console.error(`✗ Error downloading ${url}:`, err.message);
    return null;
  }
}

async function run() {
  const html = fs.readFileSync('C:/Users/Bob/.gemini/antigravity-ide/brain/efc65871-a53c-44c4-b43d-76abdb78249f/.system_generated/steps/15/content.md', 'utf8');

  // 1. Download Key Featured Images
  console.log('\n--- Downloading Featured Page Images ---');
  await downloadFile('https://plashafodcottage.co.uk/wp-content/uploads/2022/08/Plas_Hafod_006-768x1024.jpg', path.join(WP_DIR, 'plas-hafod-welcome.jpg'));
  await downloadFile('https://plashafodcottage.co.uk/wp-content/uploads/2023/02/7_12_crop-1024x964.jpg', path.join(WP_DIR, 'plas-hafod-visit-wales.jpg'));
  await downloadFile('https://plashafodcottage.co.uk/wp-content/uploads/2023/02/Bryn-Bugeiliaid-Logo_v1.jpg', path.join(WP_DIR, 'bbb-logo-full.jpg'));
  await downloadFile('https://plashafodcottage.co.uk/wp-content/uploads/2024/01/VW_5.png', path.join(WP_DIR, 'award-vw-5star.png'));
  await downloadFile('https://plashafodcottage.co.uk/wp-content/uploads/2025/06/GwyneddAmbassadorArian.jpg', path.join(WP_DIR, 'award-gwynedd-silver.jpg'));

  // BBB Sister Property Slider Images
  const bbbSlides = [
    { name: 'bbb-slide-1.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2023/02/Bryn_Bugeiliaid-Bach_049-scaled.jpg' },
    { name: 'bbb-slide-2.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2023/02/Bryn_Bugeiliaid-Bach_033-scaled.jpg' },
    { name: 'bbb-slide-3.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2023/02/Bryn_Bugeiliaid-Bach_015-scaled.jpg' },
    { name: 'bbb-slide-4.jpg', url: 'https://plashafodcottage.co.uk/wp-content/uploads/2023/02/Bryn_Bugeiliaid-Bach_034-scaled.jpg' },
  ];
  for (const s of bbbSlides) {
    await downloadFile(s.url, path.join(WP_DIR, s.name));
  }

  // 2. Parse Carousel Slides
  console.log('\n--- Downloading 44 Carousel Slides ---');
  // Match the swiper slides within media-carousel
  const carouselSectionMatch = html.match(/elementor-widget-media-carousel[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/);
  const carouselHtml = carouselSectionMatch ? carouselSectionMatch[0] : html;

  const slideRegex = /<div class="swiper-slide"[\s\S]*?<\/div>\s*(?:<\/a>\s*)?<\/div>/g;
  const slideBlocks = carouselHtml.match(slideRegex) || [];
  console.log(`Found ${slideBlocks.length} carousel slides.`);

  const carouselData = [];

  for (let i = 0; i < slideBlocks.length; i++) {
    const block = slideBlocks[i];
    const bgMatch = block.match(/data-background=["']([^"']+)["']/);
    const hrefMatch = block.match(/href=["']([^"']+)["']/);
    const labelMatch = block.match(/aria-label=["']([^"']+)["']/);

    const downloadUrl = hrefMatch ? hrefMatch[1] : (bgMatch ? bgMatch[1] : null);
    const displayUrl = bgMatch ? bgMatch[1] : (hrefMatch ? hrefMatch[1] : null);
    const label = labelMatch ? labelMatch[1] : `Plas Hafod Slide ${i + 1}`;

    if (!downloadUrl) {
      console.warn(`Slide ${i + 1} has no URL!`);
      continue;
    }

    const ext = path.extname(new URL(downloadUrl).pathname) || '.jpg';
    const filename = `slide-${String(i + 1).padStart(2, '0')}${ext}`;
    const dest = path.join(CAROUSEL_DIR, filename);

    // Download optimal image
    await downloadFile(displayUrl || downloadUrl, dest);

    carouselData.push({
      id: i + 1,
      src: `/images/wp/carousel/${filename}`,
      originalUrl: downloadUrl,
      alt: label === 'PF - 040' ? 'Plas Hafod Cottage Interior' : (label.startsWith('2024') ? 'Plas Hafod Grounds & Countryside' : `Plas Hafod Cottage - ${label}`),
      label: label
    });
  }

  // Save generated metadata for Next.js
  const tsContent = `// Auto-generated 44 carousel images from the live WordPress site
export interface CarouselSlide {
  id: number;
  src: string;
  originalUrl: string;
  alt: string;
  label: string;
}

export const liveCarouselImages: CarouselSlide[] = ${JSON.stringify(carouselData, null, 2)};
`;

  const tsPath = path.resolve('src/data/carouselImages.ts');
  const tsDir = path.dirname(tsPath);
  if (!fs.existsSync(tsDir)) fs.mkdirSync(tsDir, { recursive: true });
  fs.writeFileSync(tsPath, tsContent);
  console.log(`\n✓ Generated ${tsPath} with ${carouselData.length} carousel slides.`);
}

run();
