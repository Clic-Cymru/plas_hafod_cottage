import fs from 'fs';

const envText = fs.readFileSync('.env.local', 'utf8');
const tokenMatch = envText.match(/SANITY_API_WRITE_TOKEN=(.*)/);
const token = tokenMatch ? tokenMatch[1].trim() : '';
const projectId = 'iji5mij0';
const dataset = 'production';
const url = `https://${projectId}.api.sanity.io/v2024-01-01/data/mutate/${dataset}`;

async function main() {
  const mutations = [
    {
      createOrReplace: {
        _id: 'reviewSettings',
        _type: 'reviewSettings',
        trustindexEnabled: true,
        trustindexScriptUrl: 'https://cdn.trustindex.io/loader.js?4a4d3e0840a425233b16403d1a0',
        reviewHeadingEn: 'SEE WHAT OUR CUSTOMERS THINK',
        reviewHeadingCy: 'GWELWCH BETH MAE EIN CWSMERIAID YN EI FEDDWL',
        guestbookHeadingEn: 'WORDS FROM OUR VISITORS',
        guestbookHeadingCy: 'GEIRIAU GAN EIN HYMWELWYR',
        guestbookDescriptionEn:
          'Clippings taken directly from the handwritten guestbook located in the inglenook lounge of Plas Hafod Cottage.',
        guestbookDescriptionCy:
          'Toriadau a gymerwyd yn uniongyrchol o’r llyfr gwesteion llawysgrif sydd yn lolfa Plas Hafod.',
        showPlatformReviews: true,
        showGuestbookArchive: true,
      },
    },
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
  console.log('Seed reviewSettings result:', JSON.stringify(data, null, 2));
}

main();
