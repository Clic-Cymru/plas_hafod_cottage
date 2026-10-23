async function checkCss() {
  const res = await fetch('https://plashafodcottage.co.uk/bryn-bugeiliaid-bach/');
  const html = await res.text();

  // Find all stylesheet URLs
  const cssLinks = [...html.matchAll(/<link[^>]+rel=['"]stylesheet['"][^>]+href=['"]([^'"]+)['"]/gi)].map(m => m[1]);
  console.log('Found CSS links:', cssLinks.length);

  for (const link of cssLinks) {
    if (link.includes('post-1387') || link.includes('elementor')) {
      console.log('Fetching CSS:', link);
      const cssRes = await fetch(link);
      const css = await cssRes.text();
      // Look for 360a2460
      const match = css.match(/\.elementor-element-360a2460[^{]*\{[^}]*\}/gi);
      if (match) {
        console.log('MATCH FOR 360a2460:', match);
      }
      // Also look for any background-image in this css
      const bgImages = [...css.matchAll(/background(?:-image)?:\s*url\(([^)]+)\)/gi)].map(m => m[1]);
      if (bgImages.length) {
        console.log('Background images in', link, ':', bgImages);
      }
    }
  }
}

checkCss();
