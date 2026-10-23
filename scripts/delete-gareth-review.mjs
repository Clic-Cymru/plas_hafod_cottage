import fs from 'fs';

const envText = fs.readFileSync('.env.local', 'utf8');
const tokenMatch = envText.match(/SANITY_API_WRITE_TOKEN=(.*)/);
const token = tokenMatch ? tokenMatch[1].trim() : '';
const projectId = 'iji5mij0';
const dataset = 'production';
const url = `https://${projectId}.api.sanity.io/v2024-01-01/data/mutate/${dataset}`;

async function main() {
  const mutations = [
    { delete: { id: 'review-google-gareth' } },
    { delete: { id: 'drafts.review-google-gareth' } },
  ];

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ mutations }),
  });
  const data = await res.json();
  console.log('Delete result:', JSON.stringify(data, null, 2));
}

main();
