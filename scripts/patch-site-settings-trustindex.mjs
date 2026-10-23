import fs from 'fs';

const envText = fs.readFileSync('.env.local', 'utf8');
const tokenMatch = envText.match(/SANITY_API_WRITE_TOKEN=(.*)/);
const token = tokenMatch ? tokenMatch[1].trim() : '';
const projectId = 'iji5mij0';
const dataset = 'production';
const url = `https://${projectId}.api.sanity.io/v2024-01-01/data/mutate/${dataset}`;

const mutations = [
  {
    patch: {
      id: 'siteSettings',
      set: {
        trustindexEnabled: true,
        trustindexScriptUrl: 'https://cdn.trustindex.io/loader.js?4a4d3e0840a425233b16403d1a0',
      },
    },
  },
];

async function run() {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ mutations }),
  });
  const data = await res.json();
  console.log('Patch result:', JSON.stringify(data, null, 2));
}

run();
