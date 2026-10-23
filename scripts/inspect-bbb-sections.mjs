import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scripts/wp-all-pages.json', 'utf8'));
const bbb = data['bryn-bugeiliaid-bach'];

// Look for Section 5 (Accreditations) in full
const s5Idx = bbb.content.indexOf('data-id="08f886d"');
const s6Idx = bbb.content.indexOf('data-id="28acd6d"');
console.log('=== FULL SECTION 5 (Accreditations) ===');
console.log(bbb.content.substring(s5Idx, s6Idx));

// Look for Section 7 (Carousel / Slides) in full
const s7Idx = bbb.content.indexOf('data-id="59688b87"');
const s8Idx = bbb.content.indexOf('data-id="4faa154c"');
console.log('\n=== FULL SECTION 7 (Carousel) ===');
const s7 = bbb.content.substring(s7Idx, s8Idx);
// Find all images or slide data
const urls = [...s7.matchAll(/https?:\/\/[^"'\s\)]+\.(?:jpg|jpeg|png|webp)/gi)].map(m => m[0]);
console.log('Images in carousel:', [...new Set(urls)]);
