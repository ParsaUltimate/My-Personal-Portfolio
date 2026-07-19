import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  await new Promise(r => setTimeout(r, 500));
  
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
    
    // Output directly to og-image.jpg or png, whichever the user prefers
    // README.md uses og-image.jpg, we can save it as og-image.png and let it be
    await generateOGImage('portfolio-og.html', 'og-image.png');
    
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
