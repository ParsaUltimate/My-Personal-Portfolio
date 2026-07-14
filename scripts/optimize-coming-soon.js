/**
 * Optimizes coming-soon.png:
 * 1. Trim transparent borders
 * 2. Export responsive WebP + PNG at multiple widths
 *
 * Output files in public/:
 *   coming-soon-400.webp   ~400px wide (card default)
 *   coming-soon-800.webp   ~800px wide (2× / retina)
 *   coming-soon-400.png    fallback
 *   coming-soon-800.png    fallback retina
 */

import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC = path.resolve(__dirname, '../public/coming-soon.png');
const OUTDIR = path.resolve(__dirname, '../public');

const WIDTHS = [400, 800];

async function run() {
  // First pass: trim transparent/white borders and get tight bounds
  const base = sharp(SRC);
  const trimmed = base.trim({ threshold: 10 }); // trim near-white & transparent edges

  const meta = await trimmed.clone().metadata();
  console.log(`Trimmed size: ${meta.width}x${meta.height}`);

  const results = [];

  for (const w of WIDTHS) {
    // WebP
    const webpPath = path.join(OUTDIR, `coming-soon-${w}.webp`);
    await trimmed
      .clone()
      .resize(w, null, { withoutEnlargement: false, fit: 'inside' })
      .webp({ quality: 85, effort: 6 })
      .toFile(webpPath);

    const webpSize = fs.statSync(webpPath).size;
    results.push({ file: `coming-soon-${w}.webp`, size: webpSize });
    console.log(`✓ coming-soon-${w}.webp  ${(webpSize / 1024).toFixed(1)} KB`);

    // PNG fallback
    const pngPath = path.join(OUTDIR, `coming-soon-${w}.png`);
    await trimmed
      .clone()
      .resize(w, null, { withoutEnlargement: false, fit: 'inside' })
      .png({ compressionLevel: 9, effort: 10 })
      .toFile(pngPath);

    const pngSize = fs.statSync(pngPath).size;
    results.push({ file: `coming-soon-${w}.png`, size: pngSize });
    console.log(`✓ coming-soon-${w}.png   ${(pngSize / 1024).toFixed(1)} KB`);
  }

  const origSize = fs.statSync(SRC).size;
  console.log(`\nOriginal: ${(origSize / 1024).toFixed(1)} KB`);
  console.log('Done. Update <img> tags to use <picture> with WebP srcset.');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
