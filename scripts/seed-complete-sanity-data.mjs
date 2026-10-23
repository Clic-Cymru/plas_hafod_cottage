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

if (!projectId || !token) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN');
  process.exit(1);
}

const documentsToSeed = [
  // 1. Global Site Settings (Singleton)
  {
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteTitle: 'Bwthyn Plas Hafod Cottage & Bryn Bugeiliaid Bach',
    hostNames: 'Siwsan & Neil',
    email: 'info@plashafodcottage.co.uk',
    phone: '+44 (0) 1286 880 000',
    whatsapp: '+44 7900 000 000',
    address: 'Plas Hafod Cottage, Nebo, Caernarfon, Gwynedd, LL54 6EE',
    addressCy: 'Bwthyn Plas Hafod, Nebo, Caernarfon, Gwynedd, LL54 6EE',
    checkInTime: '4:00 PM',
    checkOutTime: '10:00 AM',
    bannerAnnouncementEn: 'BOOK DIRECT & SAVE 10% — BEST PRICE GUARANTEED ON ALL 2026 / 2027 DATES',
    bannerAnnouncementCy: 'ARCHEBWCH YN UNIONGYRCHOL AC ARBEDWCH 10% — PRIS GORAU WEDI’I WARANTU',
    bannerEnabled: true,
    facebookUrl: 'https://facebook.com/plashafodcottage',
    instagramUrl: 'https://instagram.com/plashafodcottage',
  },

  // 2. Plas Hafod Cottage Specs & Amenities
  {
    _id: 'property-plas-hafod',
    _type: 'propertyDetails',
    propertyId: 'plas-hafod',
    nameEn: 'Plas Hafod Cottage',
    nameCy: 'Bwthyn Plas Hafod',
    taglineEn: 'Cozy 5-Star Visit Wales Certified Holiday Cottage in Snowdonia',
    taglineCy: 'Bwthyn Gwyliau Clyd 5 Seren Croeso Cymru yn Eryri',
    sleeps: 4,
    bedrooms: 2,
    bathrooms: 1,
    petFriendly: true,
    shortDescriptionEn:
      'Nestled on the peaceful hillside of Nebo overlooking Dyffryn Nantlle and Caernarfon Bay. A traditional Welsh stone cottage with an inglenook log burner and panoramic Snowdonia vistas.',
    shortDescriptionCy:
      'Wedi’i nythu ar lethr heddychlon Nebo yn edrych dros Ddyffryn Nantlle a Bae Caernarfon. Bwthyn traddodiadol carreg Gymreig gyda stôf goed ac olygfeydd panoramig.',
    fullStoryEn:
      'Plas Hafod is a cherished stone-built cottage set in the dramatic countryside of North Wales on the doorstep of Snowdonia National Park. Lovingly renovated to 5-star luxury standards by Siwsan and Neil, the property preserves centuries of authentic Welsh character while providing modern comforts including super-fast broadband, underfloor warmth, and a fully equipped kitchen.',
    fullStoryCy:
      'Mae Plas Hafod yn fwthyn carreg annwyl wedi’i leoli yng nghefn gwlad dramatig Gogledd Cymru ar garreg drws Parc Cenedlaethol Eryri. Wedi’i adnewyddu’n ofalus i safonau moethus 5 seren gan Siwsan a Neil, mae’r eiddo’n cadw canrifoedd o gymeriad Cymreig dilys.',
    featuresEn: [
      'Sleeps 4 Guests (1 Super-King Master Bedroom, 1 Twin Bedroom)',
      'Official Visit Wales 5-Star Luxury Grading',
      'Traditional Inglenook Fireplace with Wood Burning Stove',
      'Panoramic Mountain and Irish Sea Sunsets',
      'Fully Enclosed Dog-Friendly Garden with Slate Patio',
      'High-Speed Wi-Fi and Smart HD Streaming TV',
      'Luxury Welcome Hamper featuring Local Welsh Cheeses & Goodies',
    ],
    featuresCy: [
      'Cwsg 4 Gwestai (1 Prif Wely Super-King, 1 Ystafell Welyau Twin)',
      'Graddfa Swyddogol 5 Seren Croeso Cymru',
      'Lle Tân Inglenook Traddodiadol gyda Stôf Llosgi Coed',
      'Golygfeydd Panoramig o’r Môr a Mynyddoedd Eryri',
      'Gardd Ddiogel Gyfeillgar i Gŵn gyda Phatio Llechen',
      'Wi-Fi Cyflym a Theledu Clyfar HD',
      'Basged Groeso Moethus gyda Chawsiau a Chynnyrch Cymreig',
    ],
  },

  // 3. Bryn Bugeiliaid Bach Specs & Amenities
  {
    _id: 'property-bryn-bugeiliaid-bach',
    _type: 'propertyDetails',
    propertyId: 'bryn-bugeiliaid-bach',
    nameEn: 'Bryn Bugeiliaid Bach (Annexe)',
    nameCy: 'Bryn Bugeiliaid Bach',
    taglineEn: 'Luxury Romantic Self-Contained Annexe with Conservatory & Mountain Views',
    taglineCy: 'Estyniad Moethus Hunangynhwysol gyda Chonsyfatori a Golygfeydd Mynydd',
    sleeps: 2,
    bedrooms: 1,
    bathrooms: 1,
    petFriendly: false,
    shortDescriptionEn:
      'A beautifully restored self-contained stone annexe featuring underfloor heating, a cozy log burner, and a private sunlit conservatory gazing across the peaks of Dyffryn Nantlle.',
    shortDescriptionCy:
      'Estyniad carreg hunangynhwysol wedi’i adnewyddu’n hyfryd gyda gwres o dan y llawr, stôf goed glyd, a chonsyfatori heulog preifat yn edrych dros gribau Dyffryn Nantlle.',
    fullStoryEn:
      'Bryn Bugeiliaid Bach offers an intimate, tranquil sanctuary tailored for couples seeking escape in the heart of Snowdonia. Every detail has been thoughtfully curated, from the glass-fronted conservatory offering uninterrupted views of changing mountain weather to the bespoke slate and oak appointments.',
    fullStoryCy:
      'Mae Bryn Bugeiliaid Bach yn cynnig noddfa heddychlon, agos-atoch ar gyfer cyplau sy’n chwilio am ddihangfa yng nghanol Eryri.',
    featuresEn: [
      'Sleeps 2 Guests (1 Luxury King Size Bedroom)',
      'Private Glass Conservatory with Panoramic Snowdonia Views',
      'Cozy Wood Burning Stove and Modern Underfloor Heating',
      'Private Slate Sun Terrace and Outdoor Dining Area',
      'Peaceful & Pet-Free Romantic Retreat',
      'Modern Kitchenette with Dishwasher and Nespresso Coffee Machine',
    ],
    featuresCy: [
      'Cwsg 2 Gwestai (1 Ystafell Wely King Size Moethus)',
      'Consyfatori Gwydr Preifat gyda Phanoramâu Mynydd Eryri',
      'Stôf Llosgi Coed Glyd a Gwres o dan y Llawr',
      'Teras Heulog Llechen Breifat a Man Bwyta Awyr Agored',
      'Heddychlon a Di-Anifeiliaid Anwes ar gyfer Dihangfa Ramantus',
      'Cegin Fodern gyda Peiriant Golchi Llestri a Pheiriant Coffi Nespresso',
    ],
  },

  // 4. Hero Slideshow Slides
  {
    _id: 'hero-slide-1',
    _type: 'heroSlide',
    title: 'Snowdonia Mountain & Irish Sea Panorama',
    customImageUrl: '/images/wp/hero-slide-1.jpg',
    altEn: 'Plas Hafod Cottage panoramic views over Snowdonia and Irish Sea',
    altCy: 'Golygfeydd panoramig Bwthyn Plas Hafod dros Eryri a Môr Iwerddon',
    order: 1,
    active: true,
  },
  {
    _id: 'hero-slide-2',
    _type: 'heroSlide',
    title: 'Snowdonia National Park Valley Setting',
    customImageUrl: '/images/wp/hero-slide-2.jpg',
    altEn: 'Plas Hafod mountain valley and Snowdonia National Park setting',
    altCy: 'Cwm mynydd Plas Hafod a lleoliad Parc Cenedlaethol Eryri',
    order: 2,
    active: true,
  },
  {
    _id: 'hero-slide-3',
    _type: 'heroSlide',
    title: 'Cottage Grounds and Nantlle Ridge Walkway',
    customImageUrl: '/images/wp/hero-slide-3.jpg',
    altEn: 'Plas Hafod cottage grounds and Nantlle Ridge walkway views',
    altCy: 'Tiroedd bwthyn Plas Hafod a golygfeydd llwybr Crib Nantlle',
    order: 3,
    active: true,
  },

  // 5. Snowdon Mountain Walking Routes
  {
    _id: 'snowdon-path-pyg',
    _type: 'snowdonPath',
    name: 'PYG Track',
    nameCy: 'Llwybr y PYG',
    distance: '3.25 miles each way',
    start: 'Pen-y-Pass Youth Hostel car park',
    startCy: 'Maes parcio Hostel Ieuenctid Pen-y-Pass',
    difficulty: 'Moderate',
    description:
      'The classic and popular mountain path. Contours gently around the dramatic glacial cwm before rising up to Bwlch Glas and the final ridge to the summit.',
    descriptionCy:
      'Y llwybr mynydd clasurol a phoblogaidd. Ymgiliodd yn ysgafn o amgylch y cwm rhewlifol dramatig cyn codi i Fwlch Glas a’r grib olaf i’r copa.',
    order: 1,
  },
  {
    _id: 'snowdon-path-watkin',
    _type: 'snowdonPath',
    name: 'Watkin Path',
    nameCy: 'Llwybr Watkin',
    distance: '3.5 miles each way',
    start: 'Car park beyond Llyn Gwynant / Nant Gwynant',
    startCy: 'Maes parcio tu hwnt i Lyn Gwynant / Nant Gwynant',
    difficulty: 'Hard',
    description:
      'The hardest and most demanding climb with the greatest vertical ascent, passing beautiful waterfalls and Victorian copper workings before a steep final scree section.',
    descriptionCy:
      'Y ddringfa galetaf a mwyaf heriol gyda’r esgyniad fertigol mwyaf, gan basio rhaeadrau hardd a hen weithfeydd copr cyn darn sgrí serth olaf.',
    order: 2,
  },
  {
    _id: 'snowdon-path-ranger',
    _type: 'snowdonPath',
    name: 'Snowdon Ranger Path',
    nameCy: 'Llwybr Ceidwad yr Wyddfa',
    distance: '3.75 miles each way',
    start: 'Car park at Llyn Cwellyn',
    startCy: 'Maes parcio ger Llyn Cwellyn',
    difficulty: 'Moderate',
    description:
      'One of the oldest recorded paths to the peak. A steady, rewarding path offering superb open panoramas over Moel Hebog and the Nantlle Ridge.',
    descriptionCy:
      'Un o’r llwybrau hynaf a gofnodwyd i’r copa. Llwybr cyson a gwerth chweil yn cynnig panoramâu agored gwych dros Foel Hebog a Chrib Nantlle.',
    order: 3,
  },
  {
    _id: 'snowdon-path-rhyd-ddu',
    _type: 'snowdonPath',
    name: 'Rhyd Ddu Path',
    nameCy: 'Llwybr Rhyd Ddu',
    distance: '3.75 miles each way',
    start: 'Car park at Rhyd Ddu village',
    startCy: 'Maes parcio ym mhentref Rhyd Ddu',
    difficulty: 'Moderate',
    description:
      'Easy to follow along broad grassy tracks initially, then narrows along the dramatic Bwlch Main ridge with breathtaking drops on either side.',
    descriptionCy:
      'Hawdd ei ddilyn ar hyd traciau gweunol llydan i ddechrau, yna’n culhau ar hyd crib ddramatig Bwlch Main gyda godre syfrdanol ar bob ochr.',
    order: 4,
  },
  {
    _id: 'snowdon-path-miners',
    _type: 'snowdonPath',
    name: 'Miners Track',
    nameCy: 'Llwybr y Mwynwyr',
    distance: '3.75 miles each way',
    start: 'Pen-y-Pass car park',
    startCy: 'Maes parcio Pen-y-Pass',
    difficulty: 'Moderate',
    description:
      'Follows a wide, gentle historical cart track past Llyn Teyrn and Llyn Llydaw before climbing steeply past Glaslyn to join the PYG Track.',
    descriptionCy:
      'Dilyn trac certiau hanesyddol llydan a thyner heibio Llyn Teyrn a Llyn Llydaw cyn dringo’n serth heibio Glaslyn i ymuno â Llwybr y PYG.',
    order: 5,
  },
  {
    _id: 'snowdon-path-llanberis',
    _type: 'snowdonPath',
    name: 'Llanberis Path',
    nameCy: 'Llwybr Llanberis',
    distance: '5 miles each way',
    start: 'Llanberis village',
    startCy: 'Pentref Llanberis',
    difficulty: 'Gentle',
    description:
      'The longest but gradual route, running parallel to the Snowdon Mountain Railway. Popular and easy to navigate with several cafe stops along the route.',
    descriptionCy:
      'Y llwybr hiraf ond mwyaf graddol, yn rhedeg yn gyfochrog â Rheilffordd yr Wyddfa. Poblogaidd a hawdd ei ddilyn gyda sawl man stopio.',
    order: 6,
  },

  // 6. Platform Reviews (Airbnb, Vrbo, TripAdvisor, Booking.com, Google)
  {
    _id: 'review-airbnb-luis',
    _type: 'review',
    author: 'Luis',
    source: 'Airbnb',
    property: 'plas-hafod',
    stars: 5,
    stayDate: 'July 2026',
    textEn:
      'We absolutely loved it! The place was very cozy, warm and extremely clean. The cottage has amazing sea views from the hill, and they left everything ready to light on the chimney which was very pleasant. We arrived very late and they were very kind leaving the heating and lights on to help us find the place. Siwsan is fantastic and made us feel at home, 100% we will visit again!',
    textCy:
      'Roeddem wrth ein boddau ag ef! Roedd y lle yn glyd iawn, yn gynnes ac yn hynod lân. Mae gan y bwthyn olygfeydd anhygoel o’r môr o’r bryn, ac roedd popeth yn barod i gynnau tân. Roedd Siwsan yn wych ac yn gwneud inni deimlo’n gartrefol iawn!',
    featured: true,
    order: 1,
  },
  {
    _id: 'review-vrbo-megan',
    _type: 'review',
    author: 'Megan',
    source: 'Vrbo',
    property: 'plas-hafod',
    stars: 5,
    stayDate: 'September 2026',
    textEn:
      'We had a fantastic stay at Plas Hafod. Such a beautiful location and the cottage had everything we needed. Siwsan and Neil were fantastic hosts and we will most certainly return!',
    textCy:
      'Cawsom arhosiad gwych ym Mhlas Hafod. Lleoliad mor hardd ac roedd gan y bwthyn bopeth yr oedd arnom ei angen. Roedd Siwsan a Neil yn lletywyr ffantastig a byddwn yn sicr yn dychwelyd!',
    featured: true,
    order: 2,
  },
  {
    _id: 'review-booking-elizabeth',
    _type: 'review',
    author: 'Elizabeth & Thomas',
    source: 'Booking.com',
    property: 'plas-hafod',
    stars: 5,
    stayDate: 'August 2026',
    textEn:
      'Exceptional in every way! The 10/10 rating is fully deserved. Spotless accommodation, breathtaking sunsets over Anglesey, and the Welsh welcome hamper was an absolute treat.',
    textCy:
      'Eithriadol ym mhob ffordd! Mae’r sgôr 10/10 yn gwbl haeddiannol. Llety di-fai, machlud haul syfrdanol dros Ynys Môn, ac roedd y fasged groeso Gymreig yn fendigedig.',
    featured: true,
    order: 3,
  },
  {
    _id: 'review-airbnb-andrew',
    _type: 'review',
    author: 'Andrew',
    source: 'Airbnb',
    property: 'plas-hafod',
    stars: 5,
    stayDate: 'October 2026',
    textEn:
      'The house felt new and very clean. It was perfect for our break. The views were amazing and Siwsan was an amazing host. We would definitely stay again.',
    textCy:
      'Roedd y tŷ yn teimlo’n newydd ac yn lân iawn. Roedd yn berffaith ar gyfer ein hegwyl. Roedd y golygfeydd yn anhygoel ac roedd Siwsan yn lletywr anhygoel.',
    featured: true,
    order: 5,
  },
  {
    _id: 'review-tripadvisor-rosie',
    _type: 'review',
    author: 'Rosie and Clive J.',
    source: 'TripAdvisor',
    property: 'plas-hafod',
    stars: 5,
    stayDate: 'August 2026',
    textEn:
      'Gorgeous views, peace and quiet and spotlessly clean and well equipped cottage, bed was super-king and blissfully comfortable.',
    textCy:
      'Golygfeydd hyfryd, heddwch a llonyddwch a bwthyn hynod lân ac offer da, roedd y gwely yn uwch-frenin ac yn hyfryd o gyfforddus.',
    featured: true,
    order: 6,
  },
  {
    _id: 'review-vrbo-simon',
    _type: 'review',
    author: 'Simon',
    source: 'Vrbo',
    property: 'plas-hafod',
    stars: 5,
    stayDate: 'September 2026',
    textEn:
      'Excellent property, in the hills surrounded by pure countryside. Modern living quarters with new amenities and stunning views. Garden was fenced in so dogs had free roam there.',
    textCy:
      'Eiddo rhagorol, yn y bryniau wedi’i amgylchynu gan gefn gwlad pur. Cartref modern gyda chyfleusterau newydd a golygfeydd godidog. Roedd yr ardd wedi’i ffensio ar gyfer cŵn.',
    featured: true,
    order: 7,
  },

  // 7. Booking Policies & Terms Sections
  {
    _id: 'policy-contract',
    _type: 'policySection',
    title: '1. Contract & Payment Schedule',
    titleCy: '1. Cytundeb ac Amserlen Dalu',
    icon: 'shield',
    leadParagraphEn:
      'A contract between the Guests and the Owner will come into existence when a deposit payment is received to secure the stay and a booking confirmation is issued showing confirmed holiday dates. The contract binds you and all members of your party.',
    leadParagraphCy:
      'Daw cytundeb i rym rhwng y Gwesteion a’r Perchennog pan dderbynnir blaendal i sicrhau’r arhosiad a phan roddir cadarnhad archeb sy’n dangos dyddiadau cadarnhau. Mae’r cytundeb yn eich rhwymo chi a phob aelod o’ch parti.',
    bulletsEn: [
      'A non-refundable £200 deposit (per week booked) is payable at the time of booking.',
      'The remaining balance of the rental fee must be paid 6 weeks prior to arrival date.',
      'Bookings made within 6 weeks of arrival must be paid in full at the time of booking.',
      'We accept bank transfer, debit/credit card via secure booking gateway.',
    ],
    bulletsCy: [
      'Mae blaendal na ellir ei ad-dalu o £200 (fesul wythnos) yn ddyledus ar adeg archebu.',
      'Rhaid talu gweddill y ffi llogi 6 wythnos cyn dyddiad cyrraedd.',
      'Rhaid talu archebion a wneir o fewn 6 wythnos i gyrraedd yn llawn ar unwaith.',
    ],
    order: 1,
  },
  {
    _id: 'policy-cancellation',
    _type: 'policySection',
    title: '2. Cancellation by Guest',
    titleCy: '2. Canslo gan y Gwestai',
    icon: 'alert',
    leadParagraphEn:
      'All cancellations must be notified immediately in writing via email. We strongly advise taking out comprehensive UK holiday travel insurance.',
    leadParagraphCy:
      'Rhaid hysbysu am bob canslo ar unwaith yn ysgrifenedig trwy e-bost. Rydym yn cynghori’n gryf i gymryd yswiriant teithio gwyliau cynhwysfawr.',
    bulletsEn: [
      'More than 6 weeks prior to arrival: Deposit is retained.',
      'Between 4 and 6 weeks prior to arrival: 50% of the total rental sum is refunded.',
      'Less than 4 weeks prior to arrival: The full rental sum is retained unless re-let.',
    ],
    bulletsCy: [
      'Mwy na 6 wythnos cyn cyrraedd: Cedwir y blaendal.',
      'Rhwng 4 a 6 wythnos cyn cyrraedd: Ad-delir 50% o gyfanswm y rhent.',
      'Llai na 4 wythnos cyn cyrraedd: Cedwir cyfanswm y rhent oni bai am ail-osod.',
    ],
    order: 2,
  },
  {
    _id: 'policy-pets',
    _type: 'policySection',
    title: '3. Dogs & Pets Policy',
    titleCy: '3. Polisi Cŵn ac Anifeiliaid Anwes',
    icon: 'dog',
    leadParagraphEn:
      'Plas Hafod warmly welcomes well-behaved dogs. Snowdonia is surrounded by active sheep farming, so specific guidelines must be respected. (Note: Bryn Bugeiliaid Bach is strictly pet-free).',
    leadParagraphCy:
      'Mae Plas Hafod yn croesawu cŵn sy’n ymddwyn yn dda. Mae ffermio defaid gweithredol o amgylch Eryri, felly rhaid parchu canllawiau. (Noder: Mae Bryn Bugeiliaid Bach yn ddi-anifeiliaid anwes).',
    bulletsEn: [
      'Up to 2 well-behaved dogs are welcome at Plas Hafod by prior arrangement.',
      'Dogs must not be left unattended in the cottage or garden at any time.',
      'Dogs must be kept on leads outside the enclosed cottage garden boundaries.',
      'Please do not permit dogs on furniture or beds. Bring your dog’s bed and towels.',
    ],
    bulletsCy: [
      'Croesewir hyd at 2 gi sy’n ymddwyn yn dda ym Mhlas Hafod trwy drefniant ymlaen llaw.',
      'Ni ddylid gadael cŵn ar eu pennau eu hunain yn y bwthyn na’r ardd ar unrhyw adeg.',
      'Rhaid cadw cŵn ar dennyn y tu allan i derfynau gardd y bwthyn.',
    ],
    order: 3,
  },
  {
    _id: 'policy-arrival-departure',
    _type: 'policySection',
    title: '4. Arrival & Departure Times',
    titleCy: '4. Amserau Cyrraedd a Gadael',
    icon: 'clock',
    leadParagraphEn: 'To allow for meticulous cleaning and preparation to 5-star luxury standards:',
    leadParagraphCy: 'Er mwyn caniatáu glanhau trylwyr a pharatoi i safonau moethus 5-seren:',
    bulletsEn: [
      'Check-in is from 4:00 PM on the day of arrival.',
      'Check-out is strictly by 10:00 AM on the day of departure.',
      'Key safe code instructions are emailed 7 days prior to your arrival.',
    ],
    bulletsCy: [
      'Mae cyrraedd o 4:00 PM ymlaen ar ddiwrnod cyrraedd.',
      'Rhaid gadael erbyn 10:00 AM ar ddiwrnod gadael.',
    ],
    order: 4,
  },
  {
    _id: 'policy-care',
    _type: 'policySection',
    title: '5. Care of Property & Damage Deposit',
    titleCy: '5. Gofal am yr Eiddo a Blaendal Niwed',
    icon: 'sparkles',
    leadParagraphEn: 'Guests are expected to treat the property with care and leave it in a clean and orderly condition.',
    leadParagraphCy: 'Disgwylir i westeion drin yr eiddo â gofal a’i adael mewn cyflwr glân a thaclus.',
    bulletsEn: [
      'Smoking / vaping is strictly prohibited inside all properties.',
      'Any accidental damage or breakages should be reported to Siwsan & Neil promptly.',
      'Electric vehicle charging is not permitted from standard domestic 3-pin sockets.',
    ],
    bulletsCy: [
      'Gwaherddir ysmygu y tu mewn i’r holl eiddo.',
      'Dylid rhoi gwybod i Siwsan a Neil am unrhyw ddifrod damweiniol yn brydlon.',
    ],
    order: 5,
  },
];

console.log(`Preparing to seed ${documentsToSeed.length} documents into Sanity (${projectId}/${dataset})...`);

const mutations = documentsToSeed.map((doc) => ({
  createOrReplace: doc,
}));

const postData = JSON.stringify({ mutations });
const options = {
  hostname: `${projectId}.api.sanity.io`,
  port: 443,
  path: `/v2024-01-01/data/mutate/${dataset}`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    'Content-Length': Buffer.byteLength(postData),
  },
};

const req = https.request(options, (res) => {
  let responseBody = '';
  res.on('data', (d) => (responseBody += d));
  res.on('end', () => {
    try {
      const parsed = JSON.parse(responseBody);
      if (res.statusCode >= 200 && res.statusCode < 300) {
        console.log('✓ Successfully seeded documents into Sanity!');
        console.log(`Results: ${parsed.results?.length} mutations applied.`);
      } else {
        console.error('Mutation error:', res.statusCode, parsed);
      }
    } catch (e) {
      console.error('Parse error:', e, responseBody);
    }
  });
});

req.on('error', (e) => {
  console.error('Request failed:', e);
});

req.write(postData);
req.end();
