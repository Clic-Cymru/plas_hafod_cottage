import WebSocket from 'ws';

async function run() {
  const tabs = await (await fetch('http://localhost:9222/json')).json();
  const reviewTab = tabs.find((t) => t.url.includes('/reviews'));
  if (!reviewTab) return console.log('No review tab found');
  const ws = new WebSocket(reviewTab.webSocketDebuggerUrl);
  ws.on('open', () => {
    const expr = `
      (async () => {
        const id = '4a4d3e0840a425233b16403d1a0';
        const url = 'https://cdn.trustindex.io/widgets/' + id.substring(0, 2) + '/' + id + '/content.html';
        const res = await fetch(url);
        const html = await res.text();
        const container = document.querySelector('.min-h-\\\\[120px\\\\]');
        if (container) {
          container.innerHTML = html;
          // Load css
          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = 'https://cdn.trustindex.io/assets/widget-presetted-css/v2/79-drop-shadow.css';
          document.head.appendChild(link);
          return { success: true, length: html.length };
        }
        return { success: false, reason: 'no container' };
      })()
    `;
    ws.send(JSON.stringify({ id: 1, method: 'Runtime.evaluate', params: { expression: expr, awaitPromise: true, returnByValue: true } }));
  });
  ws.on('message', (data) => {
    const res = JSON.parse(data.toString());
    console.log('Result:', JSON.stringify(res.result?.result?.value, null, 2));
    ws.close();
    process.exit(0);
  });
}

run();
