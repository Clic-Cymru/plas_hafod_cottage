import fs from 'fs';

const pages = [
  { slug: 'home', id: 99 },
  { slug: 'bwthyn-plas-hafod-cymraeg', id: 978 },
  { slug: 'local-area', id: 505 },
  { slug: 'reviews', id: 834 },
  { slug: 'bryn-bugeiliaid-bach', id: 1387 },
  { slug: 'terms', id: 738 },
];

async function fetchAllPages() {
  const output = {};
  for (const p of pages) {
    try {
      const res = await fetch(`https://plashafodcottage.co.uk/wp-json/wp/v2/pages/${p.id}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      output[p.slug] = {
        id: data.id,
        slug: data.slug,
        title: data.title?.rendered,
        content: data.content?.rendered,
        excerpt: data.excerpt?.rendered,
      };
      console.log(`✓ Fetched ${p.slug}`);
    } catch (err) {
      console.error(`✗ Error fetching ${p.slug}:`, err.message);
    }
  }

  fs.writeFileSync('scripts/wp-all-pages.json', JSON.stringify(output, null, 2));
  console.log('Saved all pages to scripts/wp-all-pages.json');
}

fetchAllPages();
