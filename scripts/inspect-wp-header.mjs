import fs from 'fs';

async function checkSubpageHeader() {
  const res = await fetch('https://plashafodcottage.co.uk/reviews/');
  const html = await res.text();
  
  // Find header section in reviews
  const headerMatch = html.match(/<header[\s\S]*?<\/header>/);
  if (headerMatch) {
    fs.writeFileSync('scripts/wp-reviews-header.html', headerMatch[0]);
    console.log('Reviews header saved. Length:', headerMatch[0].length);
  }

  // Find post css
  const postCssMatch = html.match(/href='([^']+\/post-(\d+)\.css[^']*)'/);
  if (postCssMatch) {
    const cssRes = await fetch(postCssMatch[1]);
    const css = await cssRes.text();
    fs.writeFileSync('scripts/wp-reviews-post.css', css);
    console.log('Reviews CSS saved. Length:', css.length);
  }
}

checkSubpageHeader();
