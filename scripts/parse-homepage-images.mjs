import fs from 'fs';

const html = fs.readFileSync('C:/Users/Bob/.gemini/antigravity-ide/brain/efc65871-a53c-44c4-b43d-76abdb78249f/.system_generated/steps/15/content.md', 'utf8');

// 1. All images
console.log('=== ALL <img> TAGS IN WP HOMEPAGE ===');
const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/g;
let match;
let count = 0;
while ((match = imgRegex.exec(html)) !== null) {
  count++;
  console.log(`${count}: ${match[1]}`);
}

// 2. All data-background in carousel
console.log('\n=== ALL CAROUSEL SLIDES ===');
const slideBlocks = html.match(/<div class="swiper-slide"[\s\S]*?<\/div>\s*(?:<\/a>\s*)?<\/div>/g) || [];
slideBlocks.forEach((block, idx) => {
  const bgMatch = block.match(/data-background=["']([^"']+)["']/);
  const hrefMatch = block.match(/href=["']([^"']+)["']/);
  const labelMatch = block.match(/aria-label=["']([^"']+)["']/);
  console.log(`${idx + 1}: bg=${bgMatch ? bgMatch[1] : 'none'} href=${hrefMatch ? hrefMatch[1] : 'none'} label=${labelMatch ? labelMatch[1] : ''}`);
});


// 3. Hero slideshow images
console.log('\n=== HERO SLIDESHOW IMAGES ===');
const heroRegex = /background_slideshow_gallery\\?":\[([\s\S]*?)\]/;
const hMatch = html.match(heroRegex);
if (hMatch) {
  console.log(hMatch[1].replace(/\\/g, ''));
}
