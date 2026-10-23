import fs from 'fs';

async function checkHeader(url) {
  const res = await fetch(url);
  const html = await res.text();
  const headerMatch = html.match(/<header[^>]*>([\s\S]*?)<\/header>/);
  if (headerMatch) {
    console.log(`\n=================== HEADER FOR ${url} ===================`);
    // Find section background settings
    const sectionMatch = headerMatch[0].match(/data-settings='([^']+)'|data-settings="([^"]+)"/);
    if (sectionMatch) {
      console.log('Header data-settings:', sectionMatch[1] || sectionMatch[2]);
    }
    // Check logos in header
    const imgs = [...headerMatch[0].matchAll(/<img[^>]+src=["']([^"']+)["']/g)].map(m => m[1]);
    console.log('Header images:', imgs);
  }
}

async function run() {
  await checkHeader('https://plashafodcottage.co.uk/');
  await checkHeader('https://plashafodcottage.co.uk/local-area/');
  await checkHeader('https://plashafodcottage.co.uk/reviews/');
  await checkHeader('https://plashafodcottage.co.uk/bryn-bugeiliaid-bach/');
}

run();
