import fs from 'fs';

async function inspectHome() {
  const res = await fetch('https://plashafodcottage.co.uk/wp-json/wp/v2/pages/99');
  const page = await res.json();
  fs.writeFileSync('scripts/homepage-raw.json', JSON.stringify(page, null, 2));

  const html = page.content.rendered;
  const regex = /https:\/\/plashafodcottage\.co\.uk\/wp-content\/uploads\/[^\s"'>\)]+/g;
  const matches = [...new Set(html.match(regex) || [])];
  console.log(`Found ${matches.length} image URLs in home page content:`);
  matches.forEach(url => console.log(' -', url));
}

inspectHome();
