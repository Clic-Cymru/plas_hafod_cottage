import fs from 'fs';

const envText = fs.readFileSync('.env.local', 'utf8');
const tokenMatch = envText.match(/SANITY_API_WRITE_TOKEN=(.*)/);
const token = tokenMatch ? tokenMatch[1].trim() : '';
const projectId = 'iji5mij0';
const dataset = 'production';
const url = `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}?query=*[_type=="siteSettings"][0]`;

async function run() {
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  const data = await res.json();
  console.log('SiteSettings in Sanity:', JSON.stringify(data.result, null, 2));
}

run();
