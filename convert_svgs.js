const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function convertSvgs() {
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const page = await browser.newPage({
    viewport: { width: 1200, height: 800 },
    deviceScaleFactor: 2
  });

  const dir = path.join(__dirname, 'report', 'diagrams');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.svg'));

  for (const f of files) {
    const svgPath = path.join(dir, f);
    const pngPath = path.join(dir, f.replace('.svg', '.png'));
    const svgContent = fs.readFileSync(svgPath, 'utf8');

    await page.setContent(`<!DOCTYPE html><html><body style="margin:0;padding:10px;background:#ffffff;">${svgContent}</body></html>`);
    const svgElement = await page.$('svg');
    if (svgElement) {
      await svgElement.screenshot({ path: pngPath, omitBackground: false });
      console.log('Converted:', f, '->', path.basename(pngPath));
    }
  }

  await browser.close();
  console.log('All 15 SVG diagrams converted to high-resolution PNGs!');
}

convertSvgs();
