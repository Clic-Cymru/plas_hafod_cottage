import fs from 'fs';

const pages = JSON.parse(fs.readFileSync('./scripts/wp-all-pages.json', 'utf8'));
const c = pages['local-area'].content;

const flipBoxes = c.split(/class="[^"]*elementor-widget-flip-box[^"]*"/g).slice(1);
const attractions = [];

for (const box of flipBoxes) {
  const titleMatch = box.match(/elementor-flip-box__layer__title">\s*([\s\S]*?)\s*<\/h3>/i);
  const descMatch = box.match(/elementor-flip-box__layer__description">\s*([\s\S]*?)\s*<\/div>/i);
  const linkMatch = box.match(/<a[^>]*href="([^"]+)"[^>]*>/i);

  if (titleMatch && descMatch) {
    const rawTitle = titleMatch[1].replace(/<br\s*[\/]?>/gi, ' ').replace(/<[^>]+>/g, '').trim();
    const rawDesc = descMatch[1].replace(/<[^>]+>/g, '').trim();
    const url = linkMatch ? linkMatch[1] : '#';

    if (!attractions.some(a => a.title === rawTitle)) {
      attractions.push({
        title: rawTitle,
        description: rawDesc,
        url
      });
    }
  }
}

console.log(`Found ${attractions.length} attractions:`);
attractions.forEach(a => console.log(`- ${a.title} -> ${a.url}`));
fs.writeFileSync('./scripts/attractions.json', JSON.stringify(attractions, null, 2));
