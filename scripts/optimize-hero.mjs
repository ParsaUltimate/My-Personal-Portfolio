/**
 * Hero Image Optimization Script
 * Generates responsive WebP images from the source PNG for optimal SEO & performance.
 *
 * Output sizes:
 *   - 480w  → mobile portrait
 *   - 768w  → mobile landscape / small tablet
 *   - 1024w → tablet
 *   - 1440w → laptop / desktop
 *   - 1920w → full-HD desktop / retina fallback
 *
 * All outputs keep the alpha channel (transparent background).
 */

import sharp from 'sharp';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// Source: the uploaded high-res PNG
const SOURCE = resolve(ROOT, 'public', 'hero-portrait-source.png');
// Output directory
const OUT_DIR = resolve(ROOT, 'public');

const WIDTHS = [480, 768, 1024, 1440, 1920];
const QUALITY = 82; // WebP quality (good balance for portraits with transparency)

async function optimize() {
  if (!existsSync(SOURCE)) {
    console.error(`❌ Source not found: ${SOURCE}`);
    process.exit(1);
  }

  const meta = await sharp(SOURCE).metadata();
  console.log(`📷 Source: ${meta.width}×${meta.height}, format: ${meta.format}, size: ${(meta.size / 1024).toFixed(0)}KB`);

  for (const w of WIDTHS) {
    // Skip if source is narrower than target
    if (meta.width && w > meta.width) {
      console.log(`⏩ Skipping ${w}w (source is only ${meta.width}w)`);
      continue;
    }

    const outPath = resolve(OUT_DIR, `hero-portrait-${w}w.webp`);

    await sharp(SOURCE)
      .resize(w, null, { withoutEnlargement: true })
      .webp({ quality: QUALITY, alphaQuality: 90, effort: 6 })
      .toFile(outPath);

    const { size } = await sharp(outPath).metadata();
    // Get actual file size
    const fs = await import('fs');
    const stat = fs.statSync(outPath);
    console.log(`✅ ${w}w → ${outPath} (${(stat.size / 1024).toFixed(1)}KB)`);
  }

  // Also generate a default/fallback at 1024w
  const fallbackPath = resolve(OUT_DIR, 'hero-portrait.webp');
  await sharp(SOURCE)
    .resize(1024, null, { withoutEnlargement: true })
    .webp({ quality: QUALITY, alphaQuality: 90, effort: 6 })
    .toFile(fallbackPath);

  const fs = await import('fs');
  const fallbackStat = fs.statSync(fallbackPath);
  console.log(`\n🎯 Fallback: hero-portrait.webp (${(fallbackStat.size / 1024).toFixed(1)}KB)`);
  console.log('\n🏁 Done! Update Hero.tsx to use responsive <img> with srcSet.');
}

optimize().catch(console.error);
