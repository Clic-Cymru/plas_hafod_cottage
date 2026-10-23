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

const entriesData = [
  {
    id: 'review-1',
    author: 'Elen & David Williams',
    location: 'Cardiff',
    stayDate: 'August 2026',
    rating: 5,
    order: 1,
    imageFile: 'review-clip-1.jpg',
    reviewTextEn:
      'Plas Hafod is pure magic. Sitting by the crackling inglenook fire after hiking the ridges of Eryri was sublime. The views across the valley will stay with us forever.',
    reviewTextCy:
      'Mae Plas Hafod yn hud pur. Roedd eistedd wrth y tân agored ar ôl cerdded cribau Eryri yn fendigedig. Bydd yr olygfeydd dros y cwm yn aros gyda ni am byth.',
    isFeatured: true,
  },
  {
    id: 'review-2',
    author: 'Sarah & Mark Thornton',
    location: 'Bristol',
    stayDate: 'September 2026',
    rating: 5,
    order: 2,
    imageFile: 'review-clip-2.jpg',
    reviewTextEn:
      'One of the most authentic, luxurious holiday cottages we have ever stayed in. Spotlessly clean, wonderfully peaceful, and the Welsh welcome hamper was delicious!',
    reviewTextCy:
      'Un o’r bythynnod gwyliau mwyaf dilys a moethus rydym erioed wedi aros ynddo. Hynod lân, heddychlon iawn, ac roedd y fasged groeso Gymreig yn flasus!',
    isFeatured: true,
  },
  {
    id: 'review-3',
    author: 'Geraint & Sioned Evans',
    location: 'Aberystwyth',
    stayDate: 'October 2026',
    rating: 5,
    order: 3,
    imageFile: 'review-clip-3.jpg',
    reviewTextEn:
      'The perfect romantic getaway. The bed was exceptionally comfortable, the kitchen well-appointed, and gazing at the dark starlit skies was unforgettable.',
    reviewTextCy:
      'Y dihangfa ramantus berffaith. Roedd y gwely yn hynod gyfforddus, y gegin wedi’i threfnu’n wych, a gwylio’r awyr serog yn fythgofiadwy.',
    isFeatured: true,
  },
  {
    id: 'review-4',
    author: 'Fiona & Patrick Davies',
    location: 'Chester',
    stayDate: 'July 2026',
    rating: 5,
    order: 4,
    imageFile: 'review-clip-4.jpg',
    reviewTextEn:
      'A truly peaceful retreat in the Welsh mountains. The views are astonishing and the welcome basket was lovely.',
    reviewTextCy:
      'Dihangfa wirioneddol heddychlon ym mynyddoedd Cymru. Mae’r golygfeydd yn syfrdanol ac roedd y fasged groeso’n hyfryd.',
    isFeatured: false,
  },
  {
    id: 'review-5',
    author: 'Rhiannon & Huw Roberts',
    location: 'Caerdydd',
    stayDate: 'June 2026',
    rating: 5,
    order: 5,
    imageFile: 'review-clip-5.jpg',
    reviewTextEn:
      'We loved our time at Plas Hafod. The cottage has so much character and warmth. We cannot wait to return next year!',
    reviewTextCy:
      'Roeddem wrth ein boddau gyda’n hamser ym Mhlas Hafod. Mae gan y bwthyn gymaint o gymeriad a chynhesrwydd. Ni allwn aros i ddychwelyd y flwyddyn nesaf!',
    isFeatured: false,
  },
  {
    id: 'review-6',
    author: 'Rebecca & James Miller',
    location: 'Manchester',
    stayDate: 'May 2026',
    rating: 5,
    order: 6,
    imageFile: 'review-clip-6.jpg',
    reviewTextEn:
      'Beautiful cottage, pristine cleanliness and breathtaking views. Walking the Snowdon trails right from the doorstep was ideal.',
    reviewTextCy:
      'Bwthyn hardd, glendid perffaith a golygfeydd syfrdanol. Roedd cerdded llwybrau’r Wyddfa yn union o’r drws yn ddelfrydol.',
    isFeatured: false,
  },
];

async function main() {
  const mutations = [];

  for (const item of entriesData) {
    const localImgPath = path.join('./public/images/wp', item.imageFile);
    if (!fs.existsSync(localImgPath)) {
      console.warn(`File not found: ${localImgPath}`);
      continue;
    }

    const assetId = await uploadImage(localImgPath, item.imageFile);

    mutations.push({
      createOrReplace: {
        _id: item.id,
        _type: 'guestbookEntry',
        author: item.author,
        location: item.location,
        stayDate: item.stayDate,
        rating: item.rating,
        order: item.order,
        reviewTextEn: item.reviewTextEn,
        reviewTextCy: item.reviewTextCy,
        isFeatured: item.isFeatured,
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

  console.log(`Writing ${mutations.length} guestbook documents with images to Sanity...`);
  const res = await fetch(mutateUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ mutations }),
  });
  const data = await res.json();
  console.log('Guestbook mutation result:', JSON.stringify(data, null, 2));
}

main().catch((err) => {
  console.error('Fatal error:', err);
});
