import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scripts/wp-all-pages.json', 'utf8'));
const bbb = data['bryn-bugeiliaid-bach'];

// Look at Section 3 and Section 4 in full
const s3Idx = bbb.content.indexOf('data-id="324922a"');
const s5Idx = bbb.content.indexOf('data-id="08f886d"');
console.log('=== SECTION 3 & 4 (Overview) ===');
console.log(bbb.content.substring(s3Idx, s5Idx));
