const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generateOGImage(htmlFile, outputFile) {
  console.log(`Generating ${outputFile}...`);
  
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Set viewport to OG image size
  await page.setViewport({ 
    width: 1200, 
    height: 630,
    deviceScaleFactor: 2 // For better quality
  });
  
  // Load HTML file
  const htmlPath = path.resolve(__dirname, '../public/og-templates', htmlFile);
  await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle0' });
  
  // Wait a bit for fonts to load
  await page.waitForTimeout(500);
  
  // Take screenshot
  const outputPath = path.resolve(__dirname, '../public', outputFile);
  await page.screenshot({ 
    path: outputPath,
    type: 'png'
  });
  
  await browser.close();
  
  // Check file size
  const stats = fs.statSync(outputPath);
  const fileSizeInKB = (stats.size / 1024).toFixed(2);
  
  console.log(`✓ Generated ${outputFile} (${fileSizeInKB} KB)`);
}

(async () => {
  try {
    console.log('🎨 Generating Open Graph images...\n');
    
    await generateOGImage('portfolio-og.html', 'og-portfolio.png');
    
    console.log('\n✅ All OG images generated successfully!');
    console.log('\nNext steps:');
    console.log('1. Check the images in /public/');
    console.log('2. Test with: https://www.opengraph.xyz/');
    console.log('3. Deploy and verify on social platforms');
  } catch (error) {
    console.error('❌ Error generating OG images:', error);
    process.exit(1);
  }
})();
