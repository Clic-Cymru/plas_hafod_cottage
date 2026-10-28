export interface FaqEntry {
  id: string;
  question: string;
  answer: string;
  icon?: string;
}

export const defaultFaqsEn: FaqEntry[] = [
  {
    id: 'location',
    icon: 'pin',
    question: 'Where are Plas Hafod Cottage and Bryn Bugeiliaid Bach located?',
    answer:
      'Both properties are nestled on the peaceful slopes of the hamlet of Nebo (postcode LL54 6EB) above Dyffryn Nantlle on the edge of Snowdonia National Park (Parc Cenedlaethol Eryri), North Wales. The nearest village and local hub is Penygroes (approximately 2.5 miles / 5 minutes drive), with the historic town of Caernarfon just 8 miles north.',
  },
  {
    id: 'amenities',
    icon: 'shopping',
    question: 'What shops, supermarkets, and amenities are in the nearest village, Penygroes?',
    answer:
      'Penygroes provides everything you need for self-catering: a Co-op Food supermarket, traditional family butcher, pharmacy, post office, local cafes, and takeaways. Major supermarkets (Tesco, Asda, Sainsbury’s, Morrisons) also deliver groceries directly to our cottage door in Nebo.',
  },
  {
    id: 'nantlle-ridge',
    icon: 'mountain',
    question: 'Can I walk the famous Nantlle Ridge directly from the cottage?',
    answer:
      'Yes! The walking trail for the renowned Nantlle Ridge begins just yards from our gated entrance in Nebo, allowing walkers and climbing enthusiasts to step right onto the mountain path without needing to drive.',
  },
  {
    id: 'snowdon-beaches',
    icon: 'compass',
    question: 'How close are Yr Wyddfa (Mount Snowdon) and local beaches?',
    answer:
      'The Rhyd Ddu and Snowdon Ranger paths to the summit of Yr Wyddfa are a scenic 15–20 minute drive away, with Llanberis approximately 25 minutes. For coastal walks, the golden sands of Dinas Dinlle beach are only 15 minutes (7 miles) away.',
  },
  {
    id: 'property-difference',
    icon: 'home',
    question: 'What is the difference between Plas Hafod Cottage and Bryn Bugeiliaid Bach?',
    answer:
      'Plas Hafod Cottage is an 18th-century stone cottage sleeping 4–6 with 2 bedrooms, 2 bathrooms, an inglenook wood fireplace, and is dog-friendly. Bryn Bugeiliaid Bach is a luxury 2-bedroom self-contained annexe sleeping 2–4 with underfloor heating, log burner, and a panoramic conservatory designed as a peaceful retreat (no pets).',
  },
  {
    id: 'pets',
    icon: 'dog',
    question: 'Are dogs welcome at the properties?',
    answer:
      'Dogs are warmly welcomed at Plas Hafod Cottage (up to 2 well-behaved dogs), with enclosed grounds and endless mountain trails directly outside. Bryn Bugeiliaid Bach remains strictly pet-free.',
  },
  {
    id: 'parking-directions',
    icon: 'car',
    question: 'Is there private parking and how do we get there?',
    answer:
      'Yes, both properties have free, secure private off-road parking directly on site. From the A487, take the turn for Penygroes and follow the scenic country lane climbing into Nebo up to our private gated entrance.',
  },
];

export const defaultFaqsCy: FaqEntry[] = [
  {
    id: 'location',
    icon: 'pin',
    question: 'Ble mae Bwthyn Plas Hafod a Bryn Bugeiliaid Bach wedi’u lleoli?',
    answer:
      'Mae’r ddwy eiddo wedi’u lleoli ar lethrau heddychlon pentrefan Nebo (cod post LL54 6EB) uwchben Dyffryn Nantlle ar ymyl Parc Cenedlaethol Eryri. Y pentref a’r ganolfan agosaf yw Pen-y-groes (tua 2.5 milltir / 5 munud mewn car), gyda thref hanesyddol Caernarfon dim ond 8 milltir i’r gogledd.',
  },
  {
    id: 'amenities',
    icon: 'shopping',
    question: 'Pa siopau, archfarchnadoedd ac amwynderau sydd ym Mhen-y-groes?',
    answer:
      'Mae Pen-y-groes yn cynnig popeth sydd ei angen ar gyfer eich arhosiad hunan-ddarpar: archfarchnad Co-op, cigydd traddodiadol, fferyllfa, swyddfa bost, caffis lleol a thecawês. Mae prif archfarchnadoedd hefyd yn dosbarthu bwydydd yn uniongyrchol i ddrws y bwthyn yn Nebo.',
  },
  {
    id: 'nantlle-ridge',
    icon: 'mountain',
    question: 'A allaf gerdded Crib Nantlle yn uniongyrchol o’r bwthyn?',
    answer:
      'Gallwch! Mae’r llwybr cerdded ar gyfer Crib Nantlle yn dechrau ychydig lathenni o’n mynedfa â gatiau yn Nebo, sy’n golygu y gall selogion cerdded gamu’n syth ar y llwybr mynydd heb orfod gyrru.',
  },
  {
    id: 'snowdon-beaches',
    icon: 'compass',
    question: 'Pa mor agos yw Yr Wyddfa a thraethau lleol?',
    answer:
      'Mae llwybrau Rhyd Ddu a Snowdon Ranger i gopa’r Wyddfa tua 15–20 munud i ffwrdd mewn car, a Llanberis tua 25 munud. Ar gyfer teithiau arfordirol, mae traeth Dinas Dinlle dim ond 15 munud (7 milltir) i ffwrdd.',
  },
  {
    id: 'property-difference',
    icon: 'home',
    question: 'Beth yw’r gwahaniaeth rhwng Bwthyn Plas Hafod a Bryn Bugeiliaid Bach?',
    answer:
      'Mae Bwthyn Plas Hafod yn fwthyn carreg o’r 18fed ganrif sy’n cysgu 4–6 gyda 2 ystafell wely, 2 ystafell ymolchi, lle tân agored, ac mae croeso i gŵn. Mae Bryn Bugeiliaid Bach yn anecs moethus hunangynhwysol 2 wely sy’n cysgu 2–4 gyda gwres dan lawr, llosgwr coed, ac ystafell wydr banoramig (dim anifeiliaid anwes).',
  },
  {
    id: 'pets',
    icon: 'dog',
    question: 'A oes croeso i gŵn?',
    answer:
      'Mae croeso cynnes i gŵn yn Bwthyn Plas Hafod (hyd at 2 gi sy’n ymddwyn yn dda), gyda thir caeedig a llwybrau mynydd ar stepen y drws. Mae Bryn Bugeiliaid Bach yn aros yn ddi-anifeiliaid anwes.',
  },
  {
    id: 'parking-directions',
    icon: 'car',
    question: 'A oes parcio preifat a sut rydym yn cyrraedd yno?',
    answer:
      'Oes, mae gan y ddwy eiddo barcio preifat diogel, rhad ac am ddim ar y safle. O’r A487, trowch am Ben-y-groes a dilynwch y lôn wledig i fyny i Nebo at ein mynedfa breifat â gatiau.',
  },
];
