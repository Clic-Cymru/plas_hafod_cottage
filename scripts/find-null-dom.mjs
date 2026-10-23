import WebSocket from 'ws';

async function run() {
  const tabs = await (await fetch('http://localhost:9222/json')).json();
  const reviewTab = tabs.find((t) => t.url.includes('/reviews'));
  if (!reviewTab) return console.log('No review tab found');
  const ws = new WebSocket(reviewTab.webSocketDebuggerUrl);
  ws.on('open', () => {
    const expr = `
      (() => {
        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 100, clientY: 100 }));
        window.dispatchEvent(new Event('scroll'));
        const container = document.querySelector('.min-h-\\\\[120px\\\\]');
        return {
          innerHtml: container ? container.innerHTML : null,
          tiWidget: document.querySelector('.ti-widget')?.outerHTML?.substring(0, 300)
        };
      })()
    `;
    ws.send(JSON.stringify({ id: 1, method: 'Runtime.evaluate', params: { expression: expr, returnByValue: true } }));
  });
  ws.on('message', (data) => {
    const res = JSON.parse(data.toString());
    const val = res.result?.result?.value;
    console.log('Inspection Result:', JSON.stringify(val, null, 2));
    ws.close();
    process.exit(0);
  });
}

run();
