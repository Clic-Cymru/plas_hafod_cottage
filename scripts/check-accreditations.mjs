import fs from 'fs';
import https from 'https';

const envContent = fs.readFileSync('.env.local', 'utf8');
const env = {};
envContent.split('\n').forEach((line) => {
  const trimmed = line.trim();
  if (trimmed && !trimmed.startsWith('#')) {
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx !== -1) {
      env[trimmed.substring(0, eqIdx).trim()] = trimmed.substring(eqIdx + 1).trim();
    }
  }
});

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = env.NEXT_PUBLIC_SANITY_DATASET;
const token = env.SANITY_API_WRITE_TOKEN;

const q = encodeURIComponent('*[_type == "accreditation"] | order(order asc) {_id, title, titleCy, property, order, badge, score}');
const url = `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}?query=${q}`;

https.get(url, { headers: { Authorization: `Bearer ${token}` } }, (res) => {
  let body = '';
  res.on('data', (c) => (body += c));
  res.on('end', () => {
    const data = JSON.parse(body);
    console.log('Result count:', data.result?.length);
    console.log(JSON.stringify(data.result, null, 2));
  });
});
