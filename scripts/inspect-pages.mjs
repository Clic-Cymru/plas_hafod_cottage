import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('./scripts/wp-all-pages.json', 'utf8'));

for (const [key, page] of Object.entries(pages)) {
  console.log(`\n================== PAGE: ${key} (${page.title}) ==================`);
  console.log(`Length: ${page.content.length}`);
  
  // Extract headings
  const headings = [...page.content.matchAll(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
  console.log('Headings:', headings);

  // Extract images
  const imgs = [...page.content.matchAll(/src="([^"]+)"/gi)].map(m => m[1]);
  console.log(`Images count: ${imgs.length}`);
  if (imgs.length > 0) {
    console.log('Sample images:', imgs.slice(0, 5));
  }
}
