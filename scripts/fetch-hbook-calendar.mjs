const res1 = await fetch('https://plashafodcottage.co.uk/');
const html1 = await res1.text();
const res2 = await fetch('https://plashafodcottage.co.uk/bryn-bugeiliaid-bach/');
const html2 = await res2.text();

console.log('Homepage HBook script matches:');
const matches1 = html1.match(/var hb_[^;]+;/g);
console.log(matches1);

console.log('BBB HBook script matches:');
const matches2 = html2.match(/var hb_[^;]+;/g);
console.log(matches2);

// Check for dates in HBook calendar html
const occupied1 = [...html1.matchAll(/hb-day-occupied[^\"]*data-date=\"([^\"]+)\"/g)].map(m => m[1]);
console.log('Occupied dates Plas Hafod:', occupied1.length, occupied1.slice(0, 10));

const occupied2 = [...html2.matchAll(/hb-day-occupied[^\"]*data-date=\"([^\"]+)\"/g)].map(m => m[1]);
console.log('Occupied dates BBB:', occupied2.length, occupied2.slice(0, 10));
