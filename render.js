const fs = require('fs');
const { chromium } = require('playwright-core');

(async () => {
  const xml = fs.readFileSync('architecture.drawio', 'utf8');
  const xmlB64 = Buffer.from(xml, 'utf8').toString('base64');

  const browser = await chromium.launch({
    executablePath: '/home/dev/.cache/ms-playwright/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage({ viewport: { width: 1400, height: 1000 }, deviceScaleFactor: 2 });

  const html = '<!DOCTYPE html><html><head><meta charset="utf-8"></head>'
    + '<body style="margin:0;background:#ffffff"><div id="host"></div>'
    + '<script src="https://viewer.diagrams.net/js/viewer-static.min.js"></script></body></html>';

  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.evaluate((b64) => {
    const xml = decodeURIComponent(escape(atob(b64)));
    const div = document.createElement('div');
    div.className = 'mxgraph';
    div.setAttribute('data-mxgraph', JSON.stringify({ highlight: '#0000ff', nav: false, resize: true, xml }));
    document.getElementById('host').appendChild(div);
    // eslint-disable-next-line no-undef
    GraphViewer.processElements();
  }, xmlB64);
  await page.waitForTimeout(4000);
  const el = await page.$('.mxgraph');
  await (el || page).screenshot({ path: 'architecture.png' });
  await browser.close();
  console.log('done');
})().catch(e => { console.error(e); process.exit(1); });
