import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { LiveSiteNavbar } from '@/components/navigation/LiveSiteNavbar';
import { LiveSiteSisterPropertyAndAccreditations } from '@/components/cottage/LiveSiteSisterPropertyAndAccreditations';
import { Compass, ExternalLink, Mountain, ShieldAlert, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Local Area & Snowdonia Guide - Bwthyn Plas Hafod Cottage',
  description:
    'Explore Snowdonia / Eryri from Plas Hafod Cottage. Discover local walks, Mount Snowdon trails, castles, steam railways, beaches, and attractions.',
};

const attractions = [
  {
    title: 'Sygun Copper Mine, Near Beddgelert',
    description:
      'Another remarkable underground experience. Abandoned in 1903 but now reopened to visitors, Sygun tells the story of Victorian miners. Nowadays, it’s hard to believe that such industrial heritage exists surrounded by so much natural beauty. Take a self-guided tour of the old workings on foot. See stalactites and stalagmites as well as copper ore veins containing traces of silver and gold.',
    url: 'https://www.syguncoppermine.co.uk/',
    category: 'Heritage & Cave Tour',
  },
  {
    title: 'Caernarfon Castle',
    description:
      "Mighty Caernarfon is possibly the most famous of Wales's castles. Its sheer scale and commanding presence easily set it apart from the rest, and to this day, still trumpet in no uncertain terms the intention of its builder Edward I. Begun in 1283 as the definitive chapter in his conquest of Wales, Caernarfon was constructed not only as a military stronghold but also as a seat of government and royal palace.",
    url: 'https://cadw.gov.wales/visit/places-to-visit/caernarfon-castle',
    category: 'UNESCO World Heritage',
  },
  {
    title: 'Welsh Slate Museum, Llanberis',
    description:
      'This is the national slate museum, which traces the history of the slate industry in the Dinorwig and Llanberis area. The museum is situated in Padarn Country Park in Llanberis. The park has a pay and display car park, which is free to visitors who are Blue Badge holders.',
    url: 'https://museum.wales/slate/',
    category: 'National Museum',
  },
  {
    title: 'Bodnant Gardens, Tal y Cafn',
    description:
      'These world-famous gardens are the property of the National Trust, and they stand majestically above the river Conwy. There are designated parking spaces for disabled visitors, and parking is free to National Trust members.',
    url: 'https://www.nationaltrust.org.uk/bodnant-garden',
    category: 'National Trust Garden',
  },
  {
    title: 'Padarn Country Park, Llanberis',
    description:
      'Here, you will be able to enjoy accessible lakeside paths and beautiful views of the forestry at the foot of Elidir Fawr. An accessible path leads to the historic quarry hospital visitor centre. From here, it is also possible to visit Llanberis Lake Railway.',
    url: 'https://www.visitsnowdonia.info/padarn-country-park',
    category: 'Country Park & Walks',
  },
  {
    title: 'Rib Ride, Menai Bridge',
    description:
      'Rib Ride sail from Menai Bridge and Holyhead to explore the stunning coastline of North Wales. Experience the tranquility of the Menai Straits, its stately homes, ferocious tides and whirlpools or travel seaward to Llanddwyn Island, a rocky peninsula of outstanding beauty.',
    url: 'https://www.ribride.co.uk/',
    category: 'Adventure Boat Tour',
  },
  {
    title: 'Pant Du Vineyard & Cafe, Penygroes',
    description:
      'Planted in 2005, Pant Du lies in the former quarrying valley of the Nantlle Vale, in the village of Penygroes. The vineyard has been in production since 2009, clustered near the Menai Straits producing Welsh wines, ciders, and apple juices with a lovely on-site cafe.',
    url: 'https://www.pantdu.co.uk/',
    category: 'Local Vineyard & Cafe',
  },
  {
    title: 'Portmeirion Village, Minffordd',
    description:
      'Clough Williams-Ellis is the architect behind the wonderful Italianate Portmeirion village. He began the building of the village in 1925. Portmeirion is a truly beautiful village, with colorful pastel buildings, subtropical woodlands, and stunning coastal sandy estuary views.',
    url: 'https://portmeirion.cymru/',
    category: 'Italianate Coastal Village',
  },
  {
    title: 'Adventure Smart Wales',
    description:
      "AdventureSmart Wales is a national safety initiative funded by the Welsh Government's Tourism Product Innovation Fund, Snowdonia National Park Authority, and British Mountaineering Council, encouraging safe and enjoyable outdoor adventures in Eryri.",
    url: 'https://www.adventuresmart.uk/',
    category: 'Mountain Safety',
  },
  {
    title: 'Ffestiniog and Welsh Highland Railways',
    description:
      'Two separate railways, little in gauge, large in appeal. The Ffestiniog carries passengers from Porthmadog to Blaenau Ffestiniog. The Welsh Highland travels from Caernarfon through the Aberglaslyn Pass to Porthmadog — Britain’s longest heritage railway with unforgettable scenery.',
    url: 'https://www.festrail.co.uk/',
    category: 'Steam Heritage Railway',
  },
  {
    title: 'Glynllifon Country Park',
    description:
      'A great day out for the whole family at Glynllifon’s historic grade I listed gardens and expansive parkland. Featuring rare tree collections, folly architecture, workshops, and woodland walks.',
    url: 'https://www.visitsnowdonia.info/parc-glynllifon',
    category: 'Historic Parkland',
  },
  {
    title: 'Caernarfon Airport & Aviation Museum, Dinas Dinlle',
    description:
      "Visit the Air Museum featuring local aviation history, Welsh flying V.C.'s, the first RAF Mountain Rescue service, flight school, and cafe. Adjoins the award-winning sandy beach of Dinas Dinlle just a short drive from Plas Hafod.",
    url: 'http://www.caernarfonairport.com/',
    category: 'Aviation & Coast',
  },
  {
    title: 'Snowdon Mountain Railway, Llanberis',
    description:
      'The UK’s only rack-and-pinion railway travelling from Llanberis to the summit of Yr Wyddfa / Snowdon. Experience breathtaking views over lakes and mountain ridges all the way to the Hafod Eryri visitor centre at 1,085m.',
    url: 'https://snowdonrailway.co.uk/',
    category: 'Mountain Railway',
  },
  {
    title: 'Bragdy Lleu Microbrewery, Penygroes',
    description:
      'Established in 2013, Bragdy Lleu is our local artisan microbrewery in nearby Penygroes. They produce a delicious range of Welsh craft ales inspired by Mabinogi legends, with an on-site taproom bar and bottle shop.',
    url: 'https://www.pantdu.co.uk/',
    category: 'Local Craft Brewery',
  },
  {
    title: 'Eryri National Park (Snowdonia)',
    description:
      'Covering a total of 823 square miles, Eryri is Wales’ largest National Park. Home to rugged mountain peaks, crystal rivers, ancient oak woodlands, and vibrant Welsh-speaking communities where history and nature harmonize.',
    url: 'https://eryri.gov.wales/',
    category: 'National Park',
  },
];

const snowdonPaths = [
  {
    name: 'PYG Track',
    distance: '3.25 miles each way',
    start: 'Pen-y-Pass Youth Hostel car park',
    description:
      'The classic and popular mountain path. Contours gently around the dramatic glacial cwm before rising up to Bwlch Glas and the final ridge to the summit.',
  },
  {
    name: 'Watkin Path',
    distance: '3.5 miles each way',
    start: 'Car park beyond Llyn Gwynant / Nant Gwynant',
    description:
      'The hardest and most demanding climb with the greatest vertical ascent, passing beautiful waterfalls and Victorian copper workings before a steep final scree section.',
  },
  {
    name: 'Snowdon Ranger Path',
    distance: '3.75 miles each way',
    start: 'Car park at Llyn Cwellyn',
    description:
      'One of the oldest recorded paths to the peak. A steady, rewarding path offering superb open panoramas over Moel Hebog and the Nantlle Ridge.',
  },
  {
    name: 'Rhyd Ddu Path',
    distance: '3.75 miles each way',
    start: 'Car park at Rhyd Ddu village',
    description:
      'Easy to follow along broad grassy tracks initially, then narrows along the dramatic Bwlch Main ridge with breathtaking drops on either side.',
  },
  {
    name: 'Miners Track',
    distance: '3.75 miles each way',
    start: 'Pen-y-Pass car park',
    description:
      'Follows a wide, gentle historical cart track past Llyn Teyrn and Llyn Llydaw before climbing steeply past Glaslyn to join the PYG Track.',
  },
  {
    name: 'Llanberis Path',
    distance: '5 miles each way',
    start: 'Llanberis village',
    description:
      'The longest but gradual route, running parallel to the Snowdon Mountain Railway. Popular and easy to navigate with several cafe stops along the route.',
  },
];

export default function LocalAreaPage() {
  return (
    <div className="min-h-screen bg-[#fbfbfd] text-[#333333] flex flex-col font-sans selection:bg-[#efda07]/30 selection:text-stone-900">
      <LiveSiteNavbar currentPath="/local-area" isCymraeg={false} />

      <main className="flex-1 pt-24 sm:pt-28">
        {/* Page Hero Banner */}
        <section className="relative py-16 sm:py-24 bg-gradient-to-b from-stone-900 via-stone-800 to-stone-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-25">
            <Image
              src="/images/wp/snowdon.jpg"
              alt="Snowdonia mountain range"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-architects uppercase tracking-wider text-white mb-4">
              EXPLORE <span className="text-[#99a0c1]">SNOWDONIA / ERYRI</span>
            </h1>
            <div className="w-24 h-1 bg-[#efda07] mx-auto mb-6" />
            <p className="max-w-3xl mx-auto text-base sm:text-lg text-stone-200 font-sans leading-relaxed">
              Our portfolio of information on local events, activities and tourist attractions will
              help you decide where to go and what to see during your stay at Plas Hafod.
              Situated off the beaten track in the hamlet of Nebo, Plas Hafod is within easy reach
              of Dinas Dinlle beach, the mountain trails of Snowdon, Caernarfon Castle, the Welsh Highland
              Railway, and Portmeirion.
            </p>
          </div>
        </section>

        {/* Attractions Grid */}
        <section className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-architects uppercase tracking-wide text-stone-900">
              DISCOVER LOCAL <span className="text-[#99a0c1]">ATTRACTIONS</span>
            </h2>
            <div className="w-16 h-1 bg-[#efda07] mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {attractions.map((attraction, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#99a0c1] bg-[#99a0c1]/10 px-3 py-1 rounded-full">
                      {attraction.category}
                    </span>
                    <Compass className="w-5 h-5 text-stone-400 group-hover:text-[#99a0c1] transition" />
                  </div>
                  <h3 className="text-xl font-architects text-stone-900 mb-3 group-hover:text-[#99a0c1] transition">
                    {attraction.title}
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed mb-6 font-sans">
                    {attraction.description}
                  </p>
                </div>

                <a
                  href={attraction.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl font-semibold text-xs tracking-wider uppercase bg-stone-100 hover:bg-[#efda07] text-stone-800 transition duration-200"
                >
                  LEARN MORE <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Yr Wyddfa / Mount Snowdon Walking Routes */}
        <section className="bg-white border-y border-stone-200 py-16 sm:py-20">
          <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-architects uppercase tracking-wide text-stone-900">
                YR WYDDFA / <span className="text-[#99a0c1]">MOUNT SNOWDON</span>
              </h2>
              <div className="w-16 h-1 bg-[#efda07] mx-auto mt-3 mb-4" />
              <p className="max-w-2xl mx-auto text-stone-600 text-sm sm:text-base">
                Standing at 3,560 ft (1,085m), Yr Wyddfa is the highest peak in Wales and England.
                There are six primary walking routes to the summit, each offering unique challenges and views.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {snowdonPaths.map((path, idx) => (
                <div
                  key={idx}
                  className="bg-[#fbfbfd] rounded-2xl p-6 border border-stone-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-[#99a0c1]">
                      <Mountain className="w-5 h-5" />
                      <span className="font-architects text-lg font-bold text-stone-900">
                        {path.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-stone-500 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-stone-400" />
                      <span>{path.start}</span>
                    </div>
                    <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                      {path.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-stone-200 text-xs font-semibold text-stone-800">
                    Distance: <span className="text-stone-600 font-normal">{path.distance}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Mountain Safety Notice */}
            <div className="bg-amber-50 border-2 border-[#efda07] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start gap-4">
              <ShieldAlert className="w-8 h-8 text-amber-600 shrink-0 mt-1" />
              <div>
                <h3 className="font-architects text-lg sm:text-xl font-bold text-stone-900 uppercase mb-2">
                  Mountain Safety Advice
                </h3>
                <p className="text-stone-700 text-sm leading-relaxed">
                  Obtain a reliable local weather forecast before setting off and plan a route suitable to
                  conditions. Check your equipment before leaving: take waterproofs, warm spare clothing,
                  hat, gloves, food, plenty of water, a map, a compass and survival bag. Learn basic mountaineering
                  navigation skills. If weather conditions deteriorate, turn back. Do not rely entirely on mobile phones,
                  as mountain signals can be intermittent.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sister property & Accreditations */}
        <LiveSiteSisterPropertyAndAccreditations isCymraeg={false} />
      </main>
    </div>
  );
}
