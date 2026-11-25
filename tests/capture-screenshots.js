const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function captureAllLatestScreenshots() {
  const screenshotsDir = path.join(__dirname, '..', 'report', 'screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log('[Capture] Launching Chrome browser for high-res screenshots...');
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1.5 // 1.5x scale for sharp print quality
  });
  const page = await context.newPage();

  async function snap(url, filename, actions = null) {
    console.log(`[Capture] Navigating to ${url} -> ${filename}...`);
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(800);

      if (actions) {
        await actions(page);
        await page.waitForTimeout(800);
      }

      const savePath = path.join(screenshotsDir, filename);
      await page.screenshot({ path: savePath, fullPage: false });
      console.log(`  ✓ Saved: ${filename}`);
    } catch (e) {
      console.error(`  ✗ Failed ${filename}:`, e.message);
    }
  }

  try {
    // -------------------------------------------------------------
    // Exp 1: Personal Portfolio
    // -------------------------------------------------------------
    await snap('http://localhost:3000/exp1', 'exp01-1.png', async (p) => {
      await p.evaluate(() => window.scrollTo(0, 0));
    });
    await snap('http://localhost:3000/exp1', 'exp01-2.png', async (p) => {
      await p.evaluate(() => window.scrollTo(0, 1100));
    });
    fs.copyFileSync(path.join(screenshotsDir, 'exp01-1.png'), path.join(screenshotsDir, 'exp01.png'));

    // -------------------------------------------------------------
    // Exp 2: Bootstrap Landing Page
    // -------------------------------------------------------------
    await snap('http://localhost:3000/exp2', 'exp02-1.png', async (p) => {
      await p.evaluate(() => window.scrollTo(0, 0));
    });
    await snap('http://localhost:3000/exp2', 'exp02-2.png', async (p) => {
      await p.evaluate(() => window.scrollTo(0, 1050));
    });
    fs.copyFileSync(path.join(screenshotsDir, 'exp02-1.png'), path.join(screenshotsDir, 'exp02.png'));

    // -------------------------------------------------------------
    // Exp 3: Interactive DOM Lab
    // -------------------------------------------------------------
    await snap('http://localhost:3000/exp3', 'exp03-1.png', async (p) => {
      await p.evaluate(() => window.scrollTo(0, 150));
    });
    await snap('http://localhost:3000/exp3', 'exp03-2.png', async (p) => {
      const modalBtn = await p.$('button:has-text("Open Interactive Modal")');
      if (modalBtn) await modalBtn.click();
    });
    fs.copyFileSync(path.join(screenshotsDir, 'exp03-1.png'), path.join(screenshotsDir, 'exp03.png'));

    // -------------------------------------------------------------
    // Exp 4: Multi-Page Website
    // -------------------------------------------------------------
    await snap('http://localhost:3000/exp4', 'exp04-1.png', async (p) => {
      await p.evaluate(() => window.scrollTo(0, 0));
    });
    await snap('http://localhost:3000/exp4/services', 'exp04-2.png', async (p) => {
      await p.evaluate(() => window.scrollTo(0, 0));
    });
    await snap('http://localhost:3000/exp4/contact', 'exp04-3.png', async (p) => {
      await p.evaluate(() => window.scrollTo(0, 80));
    });
    fs.copyFileSync(path.join(screenshotsDir, 'exp04-1.png'), path.join(screenshotsDir, 'exp04.png'));

    // -------------------------------------------------------------
    // Exp 5: Task Manager CRUD
    // -------------------------------------------------------------
    await snap('http://localhost:3000/exp5', 'exp05-1.png', async (p) => {
      await p.evaluate(() => window.scrollTo(0, 0));
    });
    await snap('http://localhost:3000/exp5', 'exp05-2.png', async (p) => {
      const addBtn = await p.$('button:has-text("Create New Task"), button:has-text("+ Add Task")');
      if (addBtn) await addBtn.click();
    });
    fs.copyFileSync(path.join(screenshotsDir, 'exp05-1.png'), path.join(screenshotsDir, 'exp05.png'));

    // -------------------------------------------------------------
    // Exp 6: User Authentication
    // -------------------------------------------------------------
    await snap('http://localhost:3000/exp6', 'exp06-1.png', async (p) => {
      await p.evaluate(() => window.scrollTo(0, 0));
    });
    await snap('http://localhost:3000/exp6', 'exp06-2.png', async (p) => {
      const submitBtn = await p.$('button[type="submit"]');
      if (submitBtn) await submitBtn.click();
      await p.waitForTimeout(1000);
      const listBtn = await p.$('button:has-text("List Users"), button:has-text("Get Admin User List")');
      if (listBtn) await listBtn.click();
    });
    fs.copyFileSync(path.join(screenshotsDir, 'exp06-1.png'), path.join(screenshotsDir, 'exp06.png'));

    // -------------------------------------------------------------
    // Exp 7: RESTful APIs Tested with Swagger / Postman
    // -------------------------------------------------------------
    await snap('http://localhost:3000/exp7', 'exp07-1.png', async (p) => {
      const sendBtn = await p.$('button:has-text("Send Request"), button:has-text("Test API")');
      if (sendBtn) await sendBtn.click();
      await p.waitForTimeout(1000);
    });
    await snap('http://localhost:3000/exp7', 'exp07-2.png', async (p) => {
      await p.evaluate(() => window.scrollTo(0, 300));
    });
    fs.copyFileSync(path.join(screenshotsDir, 'exp07-1.png'), path.join(screenshotsDir, 'exp07.png'));

    // -------------------------------------------------------------
    // Exp 8: Student Management System
    // -------------------------------------------------------------
    await snap('http://localhost:3000/exp8', 'exp08-1.png', async (p) => {
      await p.evaluate(() => window.scrollTo(0, 0));
    });
    await snap('http://localhost:3000/exp8', 'exp08-2.png', async (p) => {
      const addBtn = await p.$('button:has-text("Register New Student"), button:has-text("Add Student")');
      if (addBtn) await addBtn.click();
    });
    fs.copyFileSync(path.join(screenshotsDir, 'exp08-1.png'), path.join(screenshotsDir, 'exp08.png'));

    // -------------------------------------------------------------
    // Exp 9: AI-Powered Text Generation Studio
    // -------------------------------------------------------------
    await snap('http://localhost:3000/exp9', 'exp09-1.png', async (p) => {
      await p.evaluate(() => window.scrollTo(0, 0));
    });
    await snap('http://localhost:3000/exp9', 'exp09-2.png', async (p) => {
      const genBtn = await p.$('button[type="submit"]');
      if (genBtn) await genBtn.click();
      await p.waitForTimeout(2000);
    });
    fs.copyFileSync(path.join(screenshotsDir, 'exp09-1.png'), path.join(screenshotsDir, 'exp09.png'));

    // -------------------------------------------------------------
    // Exp 10: AI Chatbot for College Website
    // -------------------------------------------------------------
    await snap('http://localhost:3000/exp10', 'exp10-1.png', async (p) => {
      await p.evaluate(() => window.scrollTo(0, 0));
    });
    await snap('http://localhost:3000/exp10', 'exp10-2.png', async (p) => {
      const chip = await p.$('button:has-text("How do I apply for B.Tech admission?")');
      if (chip) await chip.click();
      await p.waitForTimeout(2000);
    });
    fs.copyFileSync(path.join(screenshotsDir, 'exp10-1.png'), path.join(screenshotsDir, 'exp10.png'));

    // -------------------------------------------------------------
    // Exp 11: AI Content Generator
    // -------------------------------------------------------------
    await snap('http://localhost:3000/exp11', 'exp11-1.png', async (p) => {
      await p.evaluate(() => window.scrollTo(0, 0));
    });
    await snap('http://localhost:3000/exp11', 'exp11-2.png', async (p) => {
      const genBtn = await p.$('button[type="submit"]');
      if (genBtn) await genBtn.click();
      await p.waitForTimeout(2000);
    });
    fs.copyFileSync(path.join(screenshotsDir, 'exp11-1.png'), path.join(screenshotsDir, 'exp11.png'));

    // -------------------------------------------------------------
    // Exp 12: AI Image Studio & Captioning
    // -------------------------------------------------------------
    await snap('http://localhost:3000/exp12', 'exp12-1.png', async (p) => {
      await p.evaluate(() => window.scrollTo(0, 0));
    });
    await snap('http://localhost:3000/exp12', 'exp12-2.png', async (p) => {
      await p.evaluate(() => window.scrollTo(0, 450));
    });
    fs.copyFileSync(path.join(screenshotsDir, 'exp12-1.png'), path.join(screenshotsDir, 'exp12.png'));

    // -------------------------------------------------------------
    // Exp 13: Deployment Dashboard
    // -------------------------------------------------------------
    await snap('http://localhost:3000/exp13', 'exp13-1.png', async (p) => {
      await p.evaluate(() => window.scrollTo(0, 0));
    });
    await snap('http://localhost:3000/exp13', 'exp13-2.png', async (p) => {
      await p.evaluate(() => window.scrollTo(0, 350));
    });

    // -------------------------------------------------------------
    // Exp 14: Testing, Debugging & QA
    // -------------------------------------------------------------
    await snap('http://localhost:3000/exp14', 'exp14-1.png', async (p) => {
      const runBtn = await p.$('button:has-text("Run Automated Tests")');
      if (runBtn) await runBtn.click();
      await p.waitForTimeout(1000);
    });
    await snap('http://localhost:3000/exp14', 'exp14-2.png', async (p) => {
      await p.evaluate(() => window.scrollTo(0, 450));
    });
    fs.copyFileSync(path.join(screenshotsDir, 'exp14-1.png'), path.join(screenshotsDir, 'exp14.png'));

    // -------------------------------------------------------------
    // Exp 15: Capstone Full-Stack Application
    // -------------------------------------------------------------
    await snap('http://localhost:3000/exp15', 'exp15-1.png', async (p) => {
      await p.evaluate(() => window.scrollTo(0, 0));
    });
    await snap('http://localhost:3000/exp15', 'exp15-2.png', async (p) => {
      await p.evaluate(() => window.scrollTo(0, 450));
    });
    await snap('http://localhost:3000/exp15', 'exp15-3.png', async (p) => {
      const textTab = await p.$('button:has-text("AI Text Studio")');
      if (textTab) await textTab.click();
      await p.waitForTimeout(500);
      const synthBtn = await p.$('button:has-text("Synthesize Text")');
      if (synthBtn) await synthBtn.click();
      await p.waitForTimeout(1500);
      await p.evaluate(() => window.scrollTo(0, 300));
    });

    // Also sync screenshots to public/screenshots
    console.log('[Capture] Syncing latest screenshots to public/screenshots...');
    const publicScreenshotsDir = path.join(__dirname, '..', 'public', 'screenshots');
    if (fs.existsSync(publicScreenshotsDir)) {
      const files = fs.readdirSync(screenshotsDir);
      for (const file of files) {
        if (file.endsWith('.png')) {
          fs.copyFileSync(path.join(screenshotsDir, file), path.join(publicScreenshotsDir, file));
        }
      }
    }

    console.log('[Capture] All fresh screenshots captured and synchronized successfully!');
  } catch (err) {
    console.error('[Capture Error]:', err);
  } finally {
    await browser.close();
  }
}

captureAllLatestScreenshots();
