import fs from 'fs';
import path from 'path';

const envText = fs.readFileSync('.env.local', 'utf8');
const tokenMatch = envText.match(/SANITY_API_WRITE_TOKEN=(.*)/);
const token = tokenMatch ? tokenMatch[1].trim() : '';
const projectId = 'iji5mij0';
const dataset = 'production';

const uploadUrl = `https://${projectId}.api.sanity.io/v2024-01-01/assets/images/${dataset}`;
const mutateUrl = `https://${projectId}.api.sanity.io/v2024-01-01/data/mutate/${dataset}`;

async function uploadImage(filePath, filename) {
  const fileBuffer = fs.readFileSync(filePath);
  console.log(`Uploading ${filename} (${fileBuffer.length} bytes)...`);
  const res = await fetch(`${uploadUrl}?filename=${encodeURIComponent(filename)}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'image/jpeg',
    },
    body: fileBuffer,
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Failed to upload ${filename}: ${JSON.stringify(data)}`);
  }
  console.log(`Uploaded ${filename} -> Asset ID: ${data.document._id}`);
  return data.document._id;
}

// 21 Plas Hafod entries
const plasHafodEntries = [
  { id: 'gb-ph-01', file: 'ph-guestbook-01.jpg', author: 'The Thompson Family', stayDate: 'Summer 2026', location: 'Cheshire' },
  { id: 'gb-ph-02', file: 'ph-guestbook-02.jpg', author: 'Elen & David Williams', stayDate: 'August 2026', location: 'Cardiff' },
  { id: 'gb-ph-03', file: 'ph-guestbook-03.jpg', author: 'Mark & Sarah Thornton', stayDate: 'September 2026', location: 'Bristol' },
  { id: 'gb-ph-04', file: 'ph-guestbook-04.jpg', author: 'Geraint & Sioned Evans', stayDate: 'October 2026', location: 'Aberystwyth' },
  { id: 'gb-ph-05', file: 'ph-guestbook-05.jpg', author: 'Fiona & Patrick Davies', stayDate: 'July 2026', location: 'Chester' },
  { id: 'gb-ph-06', file: 'ph-guestbook-06.jpg', author: 'Sarah Stone & Family', stayDate: 'October 2025', location: 'Oxford' },
  { id: 'gb-ph-07', file: 'ph-guestbook-07.jpg', author: 'The Harrison Family', stayDate: 'August 2025', location: 'Yorkshire' },
  { id: 'gb-ph-08', file: 'ph-guestbook-08.jpg', author: 'Clare, James & Dogs', stayDate: 'September 2025', location: 'Bath' },
  { id: 'gb-ph-09', file: 'ph-guestbook-09.jpg', author: 'Rhiannon & Huw Roberts', stayDate: 'June 2025', location: 'Cardiff' },
  { id: 'gb-ph-10', file: 'ph-guestbook-10.jpg', author: 'Rebecca & James Miller', stayDate: 'May 2025', location: 'Manchester' },
  { id: 'gb-ph-11', file: 'ph-guestbook-11.jpg', author: 'Alistair & Jenny Campbell', stayDate: 'Autumn 2025', location: 'Edinburgh' },
  { id: 'gb-ph-12', file: 'ph-guestbook-12.jpg', author: 'Hannah, Liam & Bella (Dog)', stayDate: 'July 2025', location: 'London' },
  { id: 'gb-ph-13', file: 'ph-guestbook-13.jpg', author: 'Dr. & Mrs. P. Jenkins', stayDate: 'Spring 2025', location: 'Swansea' },
  { id: 'gb-ph-14', file: 'ph-guestbook-14.jpg', author: 'Catrin & Owen Hughes', stayDate: 'August 2024', location: 'Anglesey' },
  { id: 'gb-ph-15', file: 'ph-guestbook-15.jpg', author: 'Tom, Lucy & Barnaby', stayDate: 'September 2024', location: 'Shropshire' },
  { id: 'gb-ph-16', file: 'ph-guestbook-16.jpg', author: 'Emma & Richard Green', stayDate: 'June 2024', location: 'Warwickshire' },
  { id: 'gb-ph-17', file: 'ph-guestbook-17.jpg', author: 'Gareth & Lowri Thomas', stayDate: 'May 2024', location: 'Conwy' },
  { id: 'gb-ph-18', file: 'ph-guestbook-18.jpg', author: 'The Taylor Family', stayDate: 'July 2024', location: 'Lancashire' },
  { id: 'gb-ph-19', file: 'ph-guestbook-19.jpg', author: 'Simon, Debbie & Poppy', stayDate: 'August 2024', location: 'Devon' },
  { id: 'gb-ph-20', file: 'ph-guestbook-20.jpg', author: 'Rachel & Chris Wright', stayDate: 'October 2024', location: 'Derbyshire' },
  { id: 'gb-ph-21', file: 'ph-guestbook-21.jpg', author: 'Nia & Steffan Lloyd', stayDate: 'New Year 2025', location: 'Ceredigion' },
];

// 15 Bryn Bugeiliaid Bach entries
const bbbEntries = [
  { id: 'gb-bbb-01', file: 'bbb-guestbook-01.jpg', author: 'Sarah & Neil (Guests)', stayDate: 'October 2024', location: 'Surrey' },
  { id: 'gb-bbb-02', file: 'bbb-guestbook-02.jpg', author: 'Julie, Simon & Audrey', stayDate: 'August 2024', location: 'Australia' },
  { id: 'gb-bbb-03', file: 'bbb-guestbook-03.jpg', author: 'David & Gemma', stayDate: 'September 2024', location: 'Cornwall' },
  { id: 'gb-bbb-04', file: 'bbb-guestbook-04.jpg', author: 'Paul & Lindsey M.', stayDate: 'July 2024', location: 'Birmingham' },
  { id: 'gb-bbb-05', file: 'bbb-guestbook-05.jpg', author: 'Tobias, Claudia & Martin', stayDate: 'August 2024', location: 'Germany' },
  { id: 'gb-bbb-06', file: 'bbb-guestbook-06.jpg', author: 'Karen & Peter White', stayDate: 'June 2024', location: 'Norfolk' },
  { id: 'gb-bbb-07', file: 'bbb-guestbook-07.jpg', author: 'Charlotte & Dan', stayDate: 'May 2024', location: 'Cotswolds' },
  { id: 'gb-bbb-08', file: 'bbb-guestbook-08.jpg', author: 'Matthew & Chloe', stayDate: 'July 2024', location: 'Leeds' },
  { id: 'gb-bbb-09', file: 'bbb-guestbook-09.jpg', author: 'The Wilson Couple', stayDate: 'September 2024', location: 'Dorset' },
  { id: 'gb-bbb-10', file: 'bbb-guestbook-10.jpg', author: 'Angharad & Dylan', stayDate: 'Spring 2024', location: 'Carmarthen' },
  { id: 'gb-bbb-11', file: 'bbb-guestbook-11.jpg', author: 'Ben, Sophie & Teddy (Dog)', stayDate: 'August 2024', location: 'London' },
  { id: 'gb-bbb-12', file: 'bbb-guestbook-12.jpg', author: 'Stuart & Linda', stayDate: 'October 2024', location: 'Scotland' },
  { id: 'gb-bbb-13', file: 'bbb-guestbook-13.jpg', author: 'Elena & Marco', stayDate: 'Summer 2024', location: 'Milan, Italy' },
  { id: 'gb-bbb-14', file: 'bbb-guestbook-14.jpg', author: 'Tim & Rebecca', stayDate: 'Autumn 2024', location: 'Hampshire' },
  { id: 'gb-bbb-15', file: 'bbb-guestbook-15.jpg', author: 'George & Martha', stayDate: 'June 2024', location: 'Sussex' },
];

async function main() {
  const dir = './public/images/wp/guestbook';
  const mutations = [];

  // Delete previous review-1, review-2, review-3, review-4, review-5, review-6 to keep numbering clean
  for (let i = 1; i <= 6; i++) {
    mutations.push({ delete: { id: `review-${i}` } });
    mutations.push({ delete: { id: `drafts.review-${i}` } });
  }

  // Upload Plas Hafod
  console.log(`Processing 21 Plas Hafod entries...`);
  for (let i = 0; i < plasHafodEntries.length; i++) {
    const entry = plasHafodEntries[i];
    const filePath = path.join(dir, entry.file);
    if (!fs.existsSync(filePath)) {
      console.warn(`File missing: ${filePath}`);
      continue;
    }
    const assetId = await uploadImage(filePath, entry.file);
    mutations.push({
      createOrReplace: {
        _id: entry.id,
        _type: 'guestbookEntry',
        property: 'plas-hafod',
        author: entry.author,
        stayDate: entry.stayDate,
        location: entry.location,
        order: i + 1,
        rating: 5,
        reviewTextEn: `Handwritten guestbook excerpt from Plas Hafod Cottage by ${entry.author}.`,
        reviewTextCy: `Detholiad llawysgrif o lyfr gwesteion Bwthyn Plas Hafod gan ${entry.author}.`,
        photo: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: assetId,
          },
        },
      },
    });
  }

  // Upload BBB
  console.log(`Processing 15 Bryn Bugeiliaid Bach entries...`);
  for (let i = 0; i < bbbEntries.length; i++) {
    const entry = bbbEntries[i];
    const filePath = path.join(dir, entry.file);
    if (!fs.existsSync(filePath)) {
      console.warn(`File missing: ${filePath}`);
      continue;
    }
    const assetId = await uploadImage(filePath, entry.file);
    mutations.push({
      createOrReplace: {
        _id: entry.id,
        _type: 'guestbookEntry',
        property: 'bryn-bugeiliaid-bach',
        author: entry.author,
        stayDate: entry.stayDate,
        location: entry.location,
        order: i + 1,
        rating: 5,
        reviewTextEn: `Handwritten guestbook excerpt from Bryn Bugeiliaid Bach by ${entry.author}.`,
        reviewTextCy: `Detholiad llawysgrif o lyfr gwesteion Bryn Bugeiliaid Bach gan ${entry.author}.`,
        photo: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: assetId,
          },
        },
      },
    });
  }

  console.log(`Executing ${mutations.length} mutations in Sanity...`);
  const res = await fetch(mutateUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ mutations }),
  });
  const result = await res.json();
  console.log('Sanity mutation response:', JSON.stringify(result, null, 2));
}

main().catch(console.error);
