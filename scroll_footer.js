const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:8080/index.html');
  
  // Scroll to footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  
  // Take screenshot of footer
  await page.screenshot({ path: '/tmp/footer_index.png', fullPage: false });
  
  // Navigate to fotovideo page
  await page.goto('http://localhost:8080/fotovideo.html');
  
  // Scroll to footer
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  
  // Take screenshot of footer
  await page.screenshot({ path: '/tmp/footer_fotovideo.png', fullPage: false });
  
  await browser.close();
})();
