const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function captureAllScreenshots() {
  const screenshotsDir = path.join(__dirname, '..', 'report', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log('[Capture] Launching Chrome browser...');
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5 // Sharp crisp rendering for print
  });
  const page = await context.newPage();

  // Helper function to capture screenshot
  async function snap(url, filename, actions = null) {
    console.log(`[Capture] Navigating to ${url} -> ${filename}...`);
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1000); // Allow animations & fonts to settle

    if (actions) {
      await actions(page);
      await page.waitForTimeout(1000);
    }

    const savePath = path.join(screenshotsDir, filename);
    await page.screenshot({ path: savePath, fullPage: false });
    console.log(`[Capture] Saved: ${filename}`);
  }

  try {
    // Exp 1: Personal Portfolio
    await snap('http://localhost:3000/exp1', 'exp01.png', async (p) => {
      await p.evaluate(() => window.scrollTo(0, 0));
    });

    // Exp 2: Bootstrap Landing Page
    await snap('http://localhost:3000/exp2', 'exp02.png', async (p) => {
      await p.evaluate(() => window.scrollTo(0, 0));
    });

    // Exp 3: Interactive DOM Lab
    await snap('http://localhost:3000/exp3', 'exp03.png', async (p) => {
      await p.evaluate(() => window.scrollTo(0, 200));
    });

    // Exp 4: Multi-page Contact
    await snap('http://localhost:3000/exp4/contact', 'exp04.png', async (p) => {
      await p.evaluate(() => window.scrollTo(0, 100));
    });

    // Exp 5: Task Manager CRUD
    await snap('http://localhost:3000/exp5', 'exp05.png');

    // Exp 6: User Authentication & Admin
    await snap('http://localhost:3000/exp6', 'exp06.png', async (p) => {
      // Click sign in
      const submitBtn = await p.$('button[type="submit"]');
      if (submitBtn) await submitBtn.click();
      await p.waitForTimeout(1000);
      // Click list users if admin
      const listBtn = await p.$('button:has-text("List Users")');
      if (listBtn) await listBtn.click();
    });

    // Exp 7: RESTful APIs
    await snap('http://localhost:3000/exp7', 'exp07.png', async (p) => {
      const sendBtn = await p.$('button:has-text("Send Request")');
      if (sendBtn) await sendBtn.click();
      await p.waitForTimeout(1200);
    });

    // Exp 8: Student Management System
    await snap('http://localhost:3000/exp8', 'exp08.png');

    // Exp 9: AI Text Studio
    await snap('http://localhost:3000/exp9', 'exp09.png', async (p) => {
      const genBtn = await p.$('button[type="submit"]');
      if (genBtn) await genBtn.click();
      await p.waitForTimeout(2000);
    });

    // Exp 10: College Chatbot
    await snap('http://localhost:3000/exp10', 'exp10.png', async (p) => {
      const chip = await p.$('button:has-text("How do I apply for B.Tech admission?")');
      if (chip) await chip.click();
      await p.waitForTimeout(2000);
    });

    // Exp 11: AI Content Generator
    await snap('http://localhost:3000/exp11', 'exp11.png', async (p) => {
      const genBtn = await p.$('button[type="submit"]');
      if (genBtn) await genBtn.click();
      await p.waitForTimeout(2000);
    });

    // Exp 12: AI Image Studio
    await snap('http://localhost:3000/exp12', 'exp12.png', async (p) => {
      await p.waitForTimeout(2500); // Allow sample image to load
    });

    // Exp 13: Deployment Dashboard (two screenshots)
    await snap('http://localhost:3000/exp13', 'exp13-1.png', async (p) => {
      await p.evaluate(() => window.scrollTo(0, 0));
    });
    await snap('http://localhost:3000/exp13', 'exp13-2.png', async (p) => {
      await p.evaluate(() => window.scrollTo(0, 400));
    });

    // Exp 14: Quality Assurance & Testing
    await snap('http://localhost:3000/exp14', 'exp14.png', async (p) => {
      const runBtn = await p.$('button:has-text("Run Automated Tests")');
      if (runBtn) await runBtn.click();
      await p.waitForTimeout(1000);
    });

    // Exp 15: Capstone Application (two screenshots)
    await snap('http://localhost:3000/exp15', 'exp15-1.png', async (p) => {
      await p.evaluate(() => window.scrollTo(0, 0));
    });
    await snap('http://localhost:3000/exp15', 'exp15-2.png', async (p) => {
      await p.evaluate(() => window.scrollTo(0, 300));
    });

    console.log('[Capture] All 17 screenshots captured successfully!');
  } catch (err) {
    console.error('[Capture Error]:', err);
  } finally {
    await browser.close();
  }
}

captureAllScreenshots();
