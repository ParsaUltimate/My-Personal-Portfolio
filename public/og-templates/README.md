# Open Graph Image Templates

این فولدر شامل HTML template های Open Graph برای سایت است.

## فایل‌ها:
- `portfolio-og.html` - کارت OG برای دامنه اصلی (parsaghaei.dev)

## نحوه تولید تصاویر:

### روش 1: استفاده از مرورگر (ساده‌ترین)
1. فایل HTML را در مرورگر باز کنید
2. Developer Tools را باز کنید (F12)
3. Device Toolbar را فعال کنید (Ctrl+Shift+M)
4. ابعاد را روی 1200x630 تنظیم کنید
5. Screenshot بگیرید

### روش 2: استفاده از Puppeteer (خودکار)
```bash
npm install -D puppeteer

# ایجاد اسکریپت
cat > scripts/generate-og-images.js << 'SCRIPT'
const puppeteer = require('puppeteer');
const path = require('path');

async function generateOGImage(htmlFile, outputFile) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1200, height: 630 });
  await page.goto(`file://${path.resolve(__dirname, '../public/og-templates', htmlFile)}`);
  await page.screenshot({ path: path.resolve(__dirname, '../public', outputFile) });
  
  await browser.close();
  console.log(`✓ Generated ${outputFile}`);
}

(async () => {
  await generateOGImage('portfolio-og.html', 'og-portfolio.png');
})();
SCRIPT

# اجرا
node scripts/generate-og-images.js
```

### روش 3: استفاده از سرویس آنلاین
- https://www.screenshotmachine.com/
- https://htmlcsstoimage.com/
- https://www.bannerbear.com/

- `/public/og-portfolio.png` (1200x630)

## تست کردن:
بعد از تولید تصاویر، می‌توانید با این ابزارها تست کنید:
- https://www.opengraph.xyz/
- https://cards-dev.twitter.com/validator
- https://developers.facebook.com/tools/debug/
