import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('./scripts/wp-all-pages.json', 'utf8'));

for (const [key, page] of Object.entries(pages)) {
  const cleanText = page.content
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<\/p>/gi, '\n')
    .replace(/<br\s*[\/]?>/gi, '\n')
    .replace(/<\/h[1-6]>/gi, '\n\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, "–")
    .replace(/&#8230;/g, "...")
    .replace(/&amp;/g, "&")
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .trim();

  fs.writeFileSync(`./scripts/page-${key}.txt`, cleanText);
  console.log(`Saved scripts/page-${key}.txt (${cleanText.length} chars)`);
}
