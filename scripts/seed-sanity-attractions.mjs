import { defaultAttractions } from '../src/data/defaultAttractions.ts';

/**
 * Script to optionally seed default attractions into a live Sanity project.
 * Usage:
 *   SANITY_API_WRITE_TOKEN="your_token" node scripts/seed-sanity-attractions.mjs
 */
async function seed() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!projectId || projectId === 'demo-project' || !token) {
    console.log('Skipping remote Sanity seeding: SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN not provided.');
    console.log('The Next.js site automatically uses all 16 default attractions with authentic images as fallback.');
    return;
  }

  const endpoint = `https://${projectId}.api.sanity.io/v2024-01-01/data/mutate/${dataset}`;

  const mutations = defaultAttractions.map((attr, idx) => ({
    createOrReplace: {
      _id: `attraction-${attr.id}`,
      _type: 'localAttraction',
      title: attr.title,
      titleCy: attr.titleCy,
      slug: { _type: 'slug', current: attr.id },
      category: attr.category,
      categoryCy: attr.categoryCy,
      customImageUrl: attr.imageUrl,
      description: attr.description,
      descriptionCy: attr.descriptionCy,
      url: attr.url,
      distance: attr.distance,
      order: attr.order || idx + 1,
      featured: attr.featured || false,
    },
  }));

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ mutations }),
    });

    const data = await res.json();
    console.log('Seeded attractions to Sanity:', data);
  } catch (err) {
    console.error('Failed to seed attractions to Sanity:', err);
  }
}

seed();
