import WebSocket from 'ws';

async function run() {
  const tabs = await (await fetch('http://localhost:9222/json')).json();
  const reviewTab = tabs.find((t) => t.url.includes('/reviews'));
  if (!reviewTab) return console.log('No review tab found');
  const ws = new WebSocket(reviewTab.webSocketDebuggerUrl);
  ws.on('open', () => {
    const expr = `
      (() => {
        const id = '4a4d3e0840a425233b16403d1a0';
        const container = document.querySelector('.min-h-\\\\[120px\\\\]');
        if (container) {
          container.innerHTML = '<iframe src=\"https://cdn.trustindex.io/amp-widget.html#' + id + '\" width=\"100%\" height=\"600\" frameborder=\"0\" scrolling=\"no\" style=\"border:none;overflow:hidden;width:100%;min-height:500px;\"></iframe>';
          return { success: true };
        }
        return { success: false };
      })()
    `;
    ws.send(JSON.stringify({ id: 1, method: 'Runtime.evaluate', params: { expression: expr, returnByValue: true } }));
  });
  ws.on('message', (data) => {
    const res = JSON.parse(data.toString());
    console.log('Result:', JSON.stringify(res.result?.result?.value, null, 2));
    ws.close();
    process.exit(0);
  });
}

run();
