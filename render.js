const fs = require('fs');
const { chromium } = require('playwright-core');

(async () => {
  const sourceXml = fs.readFileSync('architecture.drawio', 'utf8');
  const diagramMatches = [...sourceXml.matchAll(/<diagram\b[^>]*>[\s\S]*?<\/diagram>/g)];

  const diagramsByName = new Map();
  for (const match of diagramMatches) {
    const diagramXml = match[0];
    const nameMatch = diagramXml.match(/name="([^"]+)"/);
    if (!nameMatch) {
      continue;
    }
    diagramsByName.set(nameMatch[1], diagramXml);
  }

  // Derive output filename from diagram name: lower-kebab-case + .png
  function diagramNameToFile(name) {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '.png';
  }

  if (diagramsByName.size === 0) {
    throw new Error('No named <diagram> elements found in architecture.drawio');
  }

  const browser = await chromium.launch({
    executablePath: '/home/dev/.cache/ms-playwright/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox'],
  });

  async function renderDiagram(diagramXml, outputPath) {
    const page = await browser.newPage({ viewport: { width: 1400, height: 1000 }, deviceScaleFactor: 2 });
    const xml = `<mxfile host="65bd71144e">${diagramXml}</mxfile>`;
    const xmlB64 = Buffer.from(xml, 'utf8').toString('base64');

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
    await page.waitForTimeout(8000);

    const el = await page.$('.mxgraph');
    await (el || page).screenshot({ path: outputPath });
    await page.close();
  }

  for (const [name, diagramXml] of diagramsByName) {
    const outputPath = diagramNameToFile(name);
    await renderDiagram(diagramXml, outputPath);
  }

  await browser.close();

  const outputFiles = [...diagramsByName.keys()].map(diagramNameToFile);
  console.log('done:', outputFiles.join(', '));
})().catch(e => { console.error(e); process.exit(1); });
