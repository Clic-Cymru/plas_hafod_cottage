import fs from 'fs';

const res = await fetch('https://plashafodcottage.co.uk/bryn-bugeiliaid-bach/');
const html = await res.text();

const idx = html.indexOf('<form class="hb-booking-search-form"');
if (idx !== -1) {
  console.log(html.substring(idx, idx + 2500));
}
