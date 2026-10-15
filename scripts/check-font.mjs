const r = await fetch('http://localhost:3000');
const html = await r.text();
console.log('HTML html tag:', html.match(/<html[^>]*>/i)?.[0]);
console.log('Class names with font:', html.match(/class="[^"]*font-[^"]*"/gi)?.slice(0, 5));

const cssLinks = [...html.matchAll(/<link[^>]*href="([^"]+\.css[^"]*)"/gi)].map(m => m[1]);
console.log('CSS links:', cssLinks);

for (const href of cssLinks) {
  const cssUrl = href.startsWith('http') ? href : `http://localhost:3000${href}`;
  const cssRes = await fetch(cssUrl);
  const css = await cssRes.text();
  console.log(`CSS from ${href} length:`, css.length);
  console.log('Has architects in CSS:', css.includes('architects') || css.includes('Architects'));
  const fontMatches = css.match(/font-family:[^;]+;/gi)?.slice(0, 10);
  console.log('Font family rules:', fontMatches);
}
