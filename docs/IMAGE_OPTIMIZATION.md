# Image Optimization Guide

## Current Issues
The hero images are extremely large and need optimization:
- `hero-bghero-bgupdarkpx-standard v2-1080h.png` - 8.5MB
- `hero-bgx2hero-bgupdarkpx-standard v2-2x.png` - 18MB
- `Untitled-1@2x.webp` - 578KB

## Required Actions

### 1. Compress Hero Portrait
The main portrait image needs compression:

```bash
# Using ImageMagick (if available)
convert public/Untitled-1@2x.webp -quality 85 -define webp:method=6 public/Untitled-1@2x-optimized.webp

# Or use online tools:
# - https://squoosh.app/
# - https://tinypng.com/
# Target: Reduce from 578KB to ~150-200KB
```

### 2. Remove Unused Hero Background Images
The following files are not used in the code and should be deleted:
- `public/hero-bghero-bgupdarkpx-standard v2-1080h.png` (8.5MB)
- `public/hero-bgx2hero-bgupdarkpx-standard v2-2x.png` (18MB)
- `public/hero-bg.png` (236KB)

```bash
rm "public/hero-bghero-bgupdarkpx-standard v2-1080h.png"
rm "public/hero-bgx2hero-bgupdarkpx-standard v2-2x.png"
rm "public/hero-bg.png"
```

### 3. Optimize Coming Soon Image
```bash
# Compress coming-soon.png (258KB)
convert public/coming-soon.png -quality 85 public/coming-soon.webp
# Target: ~80-100KB
```

### 4. Create Responsive Versions
For the hero portrait, create multiple sizes:

```bash
# Desktop version (current)
convert public/Untitled-1@2x.webp -resize 704x880 -quality 85 public/hero-portrait-desktop.webp

# Tablet version
convert public/Untitled-1@2x.webp -resize 528x660 -quality 85 public/hero-portrait-tablet.webp

# Mobile version
convert public/Untitled-1@2x.webp -resize 352x440 -quality 85 public/hero-portrait-mobile.webp
```

Then update Hero.tsx to use responsive images:
```tsx
<picture>
  <source media="(min-width: 1024px)" srcSet="/hero-portrait-desktop.webp" />
  <source media="(min-width: 640px)" srcSet="/hero-portrait-tablet.webp" />
  <img src="/hero-portrait-mobile.webp" alt="Parsa portrait" width="704" height="880" />
</picture>
```

## Expected Savings
- Hero backgrounds removal: ~26.7MB
- Portrait optimization: ~380KB
- Coming soon optimization: ~160KB
- **Total savings: ~27.2MB → ~773KB (as reported by Lighthouse)**

## Automation Option
Add to package.json:
```json
{
  "scripts": {
    "optimize-images": "node scripts/optimize-images.js"
  }
}
```

Create `scripts/optimize-images.js` to automate compression using sharp or imagemin.
