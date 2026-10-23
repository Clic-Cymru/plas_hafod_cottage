import fs from 'fs';

async function main() {
  console.log('Checking wp-all-pages.json...');
  try {
    const pages = JSON.parse(fs.readFileSync('scripts/wp-all-pages.json', 'utf8'));
    const reviewPage = pages.find((p) => p.slug === 'reviews' || p.link?.includes('reviews'));
    if (reviewPage) {
      const content = reviewPage.content?.rendered || '';
      const imgMatches = [...content.matchAll(/https?:\/\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp)/gi)].map(
        (m) => m[0]
      );
      console.log('Images in wp-all-pages.json reviews page:');
      console.log(JSON.stringify([...new Set(imgMatches)], null, 2));
    }
  } catch (e) {
    console.error('Error reading wp-all-pages:', e.message);
  }

  console.log('\nFetching live https://plashafodcottage.co.uk/reviews/ ...');
  try {
    const res = await fetch('https://plashafodcottage.co.uk/reviews/', {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });
    const html = await res.text();
    const liveImgMatches = [...html.matchAll(/https?:\/\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp)/gi)].map(
      (m) => m[0]
    );
    console.log('Live reviews page images:');
    const unique = [...new Set(liveImgMatches)].filter((url) =>
      url.includes('upload') || url.includes('review') || url.includes('BBB') || url.includes('Hafod')
    );
    console.log(JSON.stringify(unique, null, 2));
  } catch (e) {
    console.error('Error fetching live reviews:', e.message);
  }
}

main();
