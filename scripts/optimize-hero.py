"""
Hero Portrait Optimization Script
Generates responsive WebP images from source PNG for optimal SEO & performance.

Output sizes (by width, maintaining aspect ratio):
  - 320w  → small mobile
  - 480w  → mobile portrait
  - 640w  → mobile landscape / small tablet
  - 733w  → full resolution (original width)

All outputs preserve the alpha channel (transparent background).
"""

import os
import shutil
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SOURCE = os.path.join(
    os.path.expanduser('~'),
    '.gemini', 'antigravity-ide', 'brain',
    '86695110-5ef2-4a70-bdf8-4520e941f93f',
    'media__1783693745564.png'
)
OUT_DIR = os.path.join(ROOT, 'public')

# Since source is 733px wide, these are the sensible breakpoints
WIDTHS = [320, 480, 640, 733]
WEBP_QUALITY = 82


def optimize():
    if not os.path.exists(SOURCE):
        print(f"❌ Source not found: {SOURCE}")
        return

    img = Image.open(SOURCE)
    w, h = img.size
    src_kb = os.path.getsize(SOURCE) / 1024
    print(f"📷 Source: {w}×{h}, mode: {img.mode}, size: {src_kb:.0f}KB")

    # Ensure RGBA for transparency
    if img.mode != 'RGBA':
        img = img.convert('RGBA')

    generated = []

    for target_w in WIDTHS:
        if target_w > w:
            print(f"⏩ Skipping {target_w}w (source is only {w}w)")
            continue

        ratio = target_w / w
        target_h = int(h * ratio)

        resized = img.resize((target_w, target_h), Image.LANCZOS)
        out_path = os.path.join(OUT_DIR, f'hero-portrait-{target_w}w.webp')
        resized.save(out_path, 'WEBP', quality=WEBP_QUALITY, method=6)

        out_kb = os.path.getsize(out_path) / 1024
        print(f"✅ {target_w}×{target_h} → hero-portrait-{target_w}w.webp ({out_kb:.1f}KB)")
        generated.append((target_w, target_h, out_path))

    # Also save a full-resolution copy as the default fallback
    fallback_path = os.path.join(OUT_DIR, 'hero-portrait.webp')
    img.save(fallback_path, 'WEBP', quality=WEBP_QUALITY, method=6)
    fallback_kb = os.path.getsize(fallback_path) / 1024
    print(f"\n🎯 Fallback (full-res): hero-portrait.webp ({fallback_kb:.1f}KB)")

    # Also keep source PNG in public for reference
    source_copy = os.path.join(OUT_DIR, 'hero-portrait-source.png')
    shutil.copy2(SOURCE, source_copy)
    print(f"📋 Source copied to: hero-portrait-source.png")

    # Summary
    print(f"\n📊 Compression summary:")
    print(f"   Original PNG: {src_kb:.0f}KB")
    for tw, th, op in generated:
        ok = os.path.getsize(op) / 1024
        reduction = (1 - ok / src_kb) * 100
        print(f"   {tw}×{th} WebP: {ok:.1f}KB (↓{reduction:.0f}%)")
    print(f"   Full-res WebP: {fallback_kb:.1f}KB (↓{(1-fallback_kb/src_kb)*100:.0f}%)")

    # Print srcSet for React
    srcset_parts = []
    for tw, th, op in generated:
        fname = os.path.basename(op)
        srcset_parts.append(f"/{fname} {tw}w")

    print(f"\n🔧 React srcSet value:")
    print(f'   srcSet="{", ".join(srcset_parts)}"')
    print(f'   sizes="(max-width: 640px) 480px, (max-width: 1024px) 640px, 733px"')
    print(f'   src="/hero-portrait.webp"')

    print("\n🏁 Done!")


if __name__ == '__main__':
    optimize()
