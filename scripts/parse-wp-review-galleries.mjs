import fs from 'fs';

async function main() {
  const res = await fetch('https://plashafodcottage.co.uk/reviews/', {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
  });
  const html = await res.text();

  // Find headings
  console.log('Headings in reviews page:');
  const hMatches = [...html.matchAll(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi)].map((m) =>
    m[1].replace(/<[^>]+>/g, '').trim()
  );
  console.log(hMatches);

  // Look for sections: "PLAS HAFOD GUESTBOOK COMMENTS" and "BRYN BUGEILIAID BACH GUESTBOOK COMMENTS"
  const phIdx = html.indexOf('PLAS HAFOD');
  const bbbIdx = html.indexOf('BRYN BUGEILIAID BACH');

  console.log({ phIdx, bbbIdx });

  // Extract images under Plas Hafod Guestbook
  const phSection = html.slice(phIdx, bbbIdx > phIdx ? bbbIdx : undefined);
  const phImgs = [...phSection.matchAll(/https?:\/\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp)/gi)]
    .map((m) => m[0])
    .filter((url) => !url.includes('Logo') && !url.includes('-300x') && !url.includes('-150x') && !url.includes('-1024x') && !url.includes('elementor'));
  console.log('Plas Hafod Guestbook Images (Full size):', [...new Set(phImgs)]);

  // Extract images under BBB Guestbook
  const bbbSection = html.slice(bbbIdx);
  const bbbImgs = [...bbbSection.matchAll(/https?:\/\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp)/gi)]
    .map((m) => m[0])
    .filter((url) => url.includes('BBB_review') && !url.includes('-300x'));
  console.log('BBB Guestbook Images (Full size):', [...new Set(bbbImgs)]);
}

main();
