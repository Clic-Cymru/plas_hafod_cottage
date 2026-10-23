import fs from 'fs';

async function inspectPage(url, pageName) {
  try {
    const res = await fetch(url);
    const html = await res.text();
    
    // Find Elementor post CSS
    const postCssMatch = html.match(/href='([^']+\/post-(\d+)\.css[^']*)'/);
    let borderRules = [];
    if (postCssMatch) {
      const cssUrl = postCssMatch[1];
      const cssRes = await fetch(cssUrl);
      const css = await cssRes.text();
      css.split('}').forEach(r => {
        if (r.includes('border-radius') || r.includes('border-color')) {
          borderRules.push(r.trim() + '}');
        }
      });
    }

    // Find all images
    const imgRegex = /<img[^>]+src=["']([^"']+)["']/g;
    const images = [];
    let m;
    while ((m = imgRegex.exec(html)) !== null) {
      images.push(m[1]);
    }

    // Find carousel / swiper images
    const swiperRegex = /data-background=["']([^"']+)["']/g;
    const swiperImages = [];
    while ((m = swiperRegex.exec(html)) !== null) {
      swiperImages.push(m[1]);
    }

    console.log(`\n========================================`);
    console.log(`PAGE: ${pageName} (${url})`);
    console.log(`Elementor Post CSS: ${postCssMatch ? postCssMatch[1] : 'none'}`);
    console.log(`--- Border Rules (${borderRules.length}) ---`);
    borderRules.forEach(r => console.log('  ', r));
    console.log(`--- Swiper / Carousel Images (${swiperImages.length}) ---`);
    swiperImages.slice(0, 10).forEach(img => console.log('  ', img));
    if (swiperImages.length > 10) console.log(`   ... and ${swiperImages.length - 10} more`);
    console.log(`--- <img> Tags (${images.length}) ---`);
    images.slice(0, 10).forEach(img => console.log('  ', img));
    if (images.length > 10) console.log(`   ... and ${images.length - 10} more`);
  } catch (err) {
    console.error(`Error inspecting ${pageName}:`, err.message);
  }
}

async function run() {
  await inspectPage('https://plashafodcottage.co.uk/', 'Home (EN)');
  await inspectPage('https://plashafodcottage.co.uk/bwthyn-plas-hafod-cymraeg/', 'Home (CY)');
  await inspectPage('https://plashafodcottage.co.uk/bryn-bugeiliaid-bach/', 'Bryn Bugeiliaid Bach');
  await inspectPage('https://plashafodcottage.co.uk/local-area/', 'Local Area');
  await inspectPage('https://plashafodcottage.co.uk/reviews/', 'Reviews');
}

run();
