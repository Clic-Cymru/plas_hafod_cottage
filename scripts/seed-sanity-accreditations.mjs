import fs from 'fs';
import path from 'path';
import https from 'https';

// Read .env.local
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

if (!projectId || !dataset || !token) {
  console.error('Missing Sanity credentials in .env.local');
  process.exit(1);
}

const items = [
  // --- PLAS HAFOD & JOINT AWARDS ---
  {
    id: 'ph-5-seren',
    title: 'Visit Wales 5-Star Self-Catering',
    titleCy: 'Croeso Cymru 5 Seren Hunan-Ddarpar',
    source: 'Visit Wales / Croeso Cymru',
    badge: 'Official 5-Star',
    badgeColor: 'bg-[#efda07] text-stone-900',
    score: 'Highest 5-Star Standard',
    scoreCy: 'Safon Uchaf 5 Seren',
    description:
      'Certified 5-star quality and luxury standards verified by the official Welsh Government tourism assessment scheme for Plas Hafod.',
    descriptionCy:
      'Safonau moethus ac ansawdd uchaf ardystiedig a ddilyswyd gan gynllun graddio twristiaeth cenedlaethol Llywodraeth Cymru ar gyfer Plas Hafod.',
    imageFile: 'public/images/wp/award-ph-5seren.jpg',
    property: 'plas-hafod',
    year: '2026',
    order: 1,
    featured: true,
  },
  {
    id: 'ph-booking-2026',
    title: 'Traveller Review Award 2026',
    titleCy: 'Gwobr Adolygu Teithwyr 2026',
    source: 'Booking.com',
    badge: '2026 Winner',
    badgeColor: 'bg-blue-600 text-white',
    score: '9.6 / 10 Exceptional Score',
    scoreCy: '9.6 / 10 Sgôr Eithriadol',
    description:
      'Awarded for exceptional guest feedback, immaculate cleanliness, and heartfelt Welsh hospitality at Bwthyn Plas Hafod.',
    descriptionCy:
      'Dyfarnwyd am adolygiadau eithriadol gan westeion, glendid di-nam, a lletygarwch cynnes ym Mwthyn Plas Hafod.',
    imageFile: 'public/images/wp/award-booking-2026.png',
    property: 'plas-hafod',
    year: '2026',
    order: 2,
    featured: true,
  },
  {
    id: 'ph-plastic-free',
    title: 'Plastic Free Business Copa Award',
    titleCy: 'Busnes Di-Blastig Gwobr Copa (Aur)',
    source: 'Snowdonia National Park Authority',
    badge: 'Gold Copa Award',
    badgeColor: 'bg-amber-500 text-stone-900',
    score: 'Copa (Gold) Standard',
    scoreCy: 'Safon Copa (Aur)',
    description:
      'Prestigious Gold Copa awarded by Snowdonia National Park Authority for exceptional sustainable practices and eliminating single-use plastics.',
    descriptionCy:
      'Gwobr Copa Aur fawreddog a ddyfarnwyd gan Awdurdod Parc Cenedlaethol Eryri am arferion cynaliadwy rhagorol a dileu plastigau untro.',
    imageFile: 'public/images/wp/award-plastic-free.jpg',
    property: 'both',
    year: '2026',
    order: 3,
    featured: true,
  },
  {
    id: 'ph-eryri-ambassador',
    title: 'Eryri Ambassador 2026',
    titleCy: 'Llysgennad Eryri 2026',
    source: 'Eryri National Park',
    badge: '2026 Accredited',
    badgeColor: 'bg-emerald-600 text-white',
    score: 'Official Eryri Ambassador',
    scoreCy: 'Llysgennad Swyddogol Eryri',
    description:
      'Accredited ambassadors passionate about protecting, celebrating, and sharing Eryri’s distinct culture, natural heritage, and Welsh language.',
    descriptionCy:
      'Llysgenhadon achrededig sydd ag angerdd dros warchod, dathlu, a rhannu diwylliant unigryw, treftadaeth naturiol, a’r iaith Gymraeg yn Eryri.',
    imageFile: 'public/images/wp/award-eryri-ambassador.jpg',
    property: 'both',
    year: '2026',
    order: 4,
    featured: true,
  },
  {
    id: 'ph-welsh-hospitality',
    title: 'Best of Welsh Hospitality Awards',
    titleCy: 'Gwobrau Gorau o Letygarwch Cymreig',
    source: 'Welsh Hospitality Awards',
    badge: '2026 Finalist',
    badgeColor: 'bg-[#99A0C1] text-white',
    score: 'Official National Finalist',
    scoreCy: 'Cystadleuydd Cenedlaethol Swyddogol',
    description:
      'Shortlisted among premier holiday cottages and boutique hospitality destinations across Wales for delivering memorable guest experiences.',
    descriptionCy:
      'Ar y rhestr fer ymhlith y bythynnod gwyliau a chyrchfannau lletygarwch mwyaf blaenllaw ledled Cymru am ddarparu profiadau bythgofiadwy.',
    imageFile: 'public/images/wp/award-welsh-hospitality.jpeg',
    property: 'both',
    year: '2026',
    order: 5,
    featured: true,
  },
  {
    id: 'ph-superhost',
    title: 'Airbnb Superhost Status',
    titleCy: 'Statws Uwch-westeiwr Airbnb',
    source: 'Airbnb',
    badge: 'Top-Rated Host',
    badgeColor: 'bg-[#FF5A5F] text-white',
    score: '4.95+ Star Rating',
    scoreCy: 'Sgôr 4.95+ Seren',
    description:
      'Consistently recognized for stellar 5-star ratings, extraordinary guest feedback, reliability, and dedicated customer care.',
    descriptionCy:
      'Cydnabyddir yn gyson am sgoriau 5 seren rhagorol, adborth eithriadol gan westeion, dibynadwyedd, a gofal cwsmeriaid ymroddedig.',
    imageFile: 'public/images/wp/award-superhost.jpg',
    property: 'both',
    year: '2026',
    order: 6,
    featured: true,
  },
  {
    id: 'ph-best-north-wales',
    title: 'Best of North Wales Award',
    titleCy: 'Gwobr Gorau o Ogledd Cymru',
    source: 'North Wales Tourism',
    badge: '2025 Winner',
    badgeColor: 'bg-stone-800 text-white',
    score: 'Regional Tourism Winner',
    scoreCy: 'Enillydd Twristiaeth Rhanbarthol',
    description:
      'Celebrating outstanding self-catering accommodation, breathtaking mountain vistas, and quality hospitality in the heart of Snowdonia.',
    descriptionCy:
      'Dathlu llety hunan-ddarpar rhagorol, golygfeydd mynydd syfrdanol, a lletygarwch o safon yng nghanol Eryri.',
    imageFile: 'public/images/wp/award-best-north-wales.jpg',
    property: 'both',
    year: '2025',
    order: 7,
    featured: true,
  },
  {
    id: 'ph-gwynedd-silver',
    title: 'Gwynedd Ambassador (Arian / Silver)',
    titleCy: 'Llysgennad Gwynedd (Arian)',
    source: 'Cyngor Gwynedd Council',
    badge: 'Silver Award',
    badgeColor: 'bg-slate-500 text-white',
    score: 'Silver Ambassador Accreditation',
    scoreCy: 'Achrediad Llysgennad Arian',
    description:
      'Certified regional knowledge and tourism excellence celebrating Gwynedd’s unique landscapes, slate history, and welcoming local culture.',
    descriptionCy:
      'Gwybodaeth ranbarthol ardystiedig a rhagoriaeth twristiaeth yn dathlu tirweddau unigryw Gwynedd, hanes llechi, a diwylliant croesawgar lleol.',
    imageFile: 'public/images/wp/award-gwynedd-silver.jpg',
    property: 'both',
    year: '2026',
    order: 8,
    featured: true,
  },
  {
    id: 'ph-welcome-charters',
    title: 'Visit Wales Official Welcome Charters',
    titleCy: 'Siarteri Croeso Swyddogol Croeso Cymru',
    source: 'Visit Wales / Croeso Cymru',
    badge: 'Certified Welcome',
    badgeColor: 'bg-amber-600 text-white',
    score: '4 Official Charter Accreditations',
    scoreCy: '4 Achrediad Siarter Swyddogol',
    description:
      'Officially audited and accredited across all 4 specialist Visit Wales charters: Pet Welcome 🐾, Cyclists Welcome 🚴‍♂️, Walkers Welcome 🚶‍♀️, and TV/Film Crew Welcome 🎥.',
    descriptionCy:
      'Wedi’i archwilio a’i achredu’n swyddogol ar draws pob un o 4 siarter arbenigol Croeso Cymru: Croeso i Anifeiliaid Anwes 🐾, Beicwyr 🚴‍♂️, Cerddwyr 🚶‍♀️, a Chriwiau Ffilm/Teledu 🎥.',
    imageFile: 'public/images/wp/award-vw-5star.png',
    property: 'plas-hafod',
    year: '2026',
    order: 9,
    featured: true,
  },

  // --- BRYN BUGEILIAID BACH AWARDS ---
  {
    id: 'bbb-tra-2026',
    title: 'Traveller Review Award 2026',
    titleCy: 'Gwobr Adolygu Teithwyr 2026',
    source: 'Booking.com',
    badge: '2026 Winner',
    badgeColor: 'bg-blue-600 text-white',
    score: '10 / 10 Exceptional Score',
    scoreCy: '10 / 10 Sgôr Eithriadol',
    description:
      'Awarded for exceptional guest feedback, immaculate cleanliness, and heartfelt hospitality at Bryn Bugeiliaid Bach.',
    descriptionCy:
      'Dyfarnwyd am adolygiadau eithriadol gan westeion, glendid rhagorol, a lletygarwch cynnes ym Mryn Bugeiliaid Bach.',
    imageFile: 'public/images/wp/bbb-award-tra.png',
    property: 'bryn-bugeiliaid-bach',
    year: '2026',
    order: 10,
    featured: true,
  },
  {
    id: 'bbb-5-seren',
    title: 'Visit Wales 5-Star Grading',
    titleCy: 'Graddio 5 Seren Croeso Cymru',
    source: 'Visit Wales / Croeso Cymru',
    badge: 'Official Grading',
    badgeColor: 'bg-[#efda07] text-stone-900',
    score: 'Official 5-Star Luxury Standard',
    scoreCy: 'Safon 5 Seren Swyddogol',
    description:
      'Certified 5-star quality and luxury standards verified by the official Welsh Government tourism assessment scheme.',
    descriptionCy:
      'Safonau moethus ac ansawdd uchaf ardystiedig a ddilyswyd gan gynllun graddio twristiaeth cenedlaethol Cymru.',
    imageFile: 'public/images/wp/bbb-5seren.jpg',
    property: 'bryn-bugeiliaid-bach',
    year: '2026',
    order: 11,
    featured: true,
  },
  {
    id: 'bbb-tra-2025',
    title: 'Traveller Review Award 2025',
    titleCy: 'Gwobr Adolygu Teithwyr 2025',
    source: 'Booking.com',
    badge: 'Consecutive Excellence',
    badgeColor: 'bg-stone-800 text-white',
    score: '10 / 10 Exceptional Score',
    scoreCy: '10 / 10 Sgôr Eithriadol',
    description:
      'Consecutive years of unbroken 10/10 guest satisfaction and memorable self-catering escapes in Snowdonia.',
    descriptionCy:
      'Cydnabyddiaeth flynyddol am ddarparu profiadau gwyliau o\'r radd flaenaf i westeion o bob cwr o\'r byd.',
    imageFile: 'public/images/wp/bbb-award-superhost.jpeg',
    property: 'bryn-bugeiliaid-bach',
    year: '2025',
    order: 12,
    featured: true,
  },
];

// Helper to upload an image buffer to Sanity Assets API
function uploadAsset(filePath) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(filePath)) {
      console.warn('File not found:', filePath);
      return resolve(null);
    }

    const fileData = fs.readFileSync(filePath);
    const filename = path.basename(filePath);
    const contentType = filename.endsWith('.png')
      ? 'image/png'
      : filename.endsWith('.jpeg') || filename.endsWith('.jpg')
      ? 'image/jpeg'
      : 'application/octet-stream';

    const req = https.request(
      {
        hostname: `${projectId}.api.sanity.io`,
        path: `/v2024-01-01/assets/images/${dataset}?filename=${encodeURIComponent(filename)}`,
        method: 'POST',
        headers: {
          'Content-Type': contentType,
          'Content-Length': fileData.length,
          Authorization: `Bearer ${token}`,
        },
      },
      (res) => {
        let respBody = '';
        res.on('data', (chunk) => (respBody += chunk));
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            try {
              const parsed = JSON.parse(respBody);
              resolve(parsed.document?._id || null);
            } catch (e) {
              reject(e);
            }
          } else {
            console.error(`Upload failed (${res.statusCode}):`, respBody);
            resolve(null);
          }
        });
      }
    );

    req.on('error', reject);
    req.write(fileData);
    req.end();
  });
}

// Helper to mutate documents in Sanity
function mutateDocuments(mutations) {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({ mutations });
    const req = https.request(
      {
        hostname: `${projectId}.api.sanity.io`,
        path: `/v2024-01-01/data/mutate/${dataset}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData),
          Authorization: `Bearer ${token}`,
        },
      },
      (res) => {
        let respBody = '';
        res.on('data', (chunk) => (respBody += chunk));
        res.on('end', () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(JSON.parse(respBody));
          } else {
            reject(new Error(`Mutation failed (${res.statusCode}): ${respBody}`));
          }
        });
      }
    );

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function run() {
  console.log(`Uploading images & seeding 12 accreditations into Sanity [${projectId}:${dataset}]...`);

  const mutations = [];

  for (const item of items) {
    console.log(`Processing image for: ${item.title}...`);
    const assetId = await uploadAsset(item.imageFile);
    console.log(`  -> Asset ID: ${assetId || 'none'}`);

    const doc = {
      _id: `accreditation-${item.id}`,
      _type: 'accreditation',
      title: item.title,
      titleCy: item.titleCy,
      source: item.source,
      badge: item.badge,
      badgeColor: item.badgeColor,
      score: item.score,
      scoreCy: item.scoreCy,
      description: item.description,
      descriptionCy: item.descriptionCy,
      property: item.property,
      year: item.year,
      order: item.order,
      featured: item.featured ?? true,
      customImageUrl: `/${item.imageFile.replace(/^public\//, '')}`,
    };

    if (assetId) {
      doc.image = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: assetId,
        },
      };
    }

    mutations.push({ createOrReplace: doc });
  }

  console.log('Sending mutations to Sanity...');
  const result = await mutateDocuments(mutations);
  console.log('Successfully created/updated accreditation documents in Sanity! Count:', result.results?.length);
}

run().catch(console.error);
