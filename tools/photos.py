#!/usr/bin/env python3
"""Cuts the photographs in photos-src/ into the sizes the site uses.

    python3 tools/photos.py      (needs Pillow: pip install pillow)
    node build.mjs

To swap a photo, replace the file in photos-src/ (keep the name), run the two
commands above, commit and push. FOCUS says which part of each picture must
survive when it is cropped to a tall or square frame: 0 is the left or top
edge, 1 is the right or bottom edge.
"""
import json
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'photos-src'
OUT = ROOT / 'site' / 'assets' / 'photos'

FOCUS = {
    'hero': (0.50, 0.55), 'semi': (0.55, 0.5), 'keys': (0.42, 0.5), 'terrace': (0.68, 0.5),
    'living': (0.30, 0.5), 'kitchen': (0.62, 0.5), 'wisteria': (0.52, 0.5), 'postbox': (0.50, 0.5),
    'park': (0.62, 0.5), 'bay': (0.55, 0.5), 'model': (0.52, 0.5),
}
# shape name -> (height / width, candidate pixel widths)
SHAPES = {
    'tall': (1.25, [420, 640, 840, 1080]),
    'wide': (0.8, [480, 720, 960, 1280]),
    'square': (1.0, [320, 480, 640, 960]),
}


def crop_to(im, ratio, focus):
    w, h = im.size
    cw, ch = (w, round(w * ratio)) if w * ratio <= h else (round(h / ratio), h)
    x = min(max(round(focus[0] * w - cw / 2), 0), w - cw)
    y = min(max(round(focus[1] * h - ch / 2), 0), h - ch)
    return im.crop((x, y, x + cw, y + ch))


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for old in OUT.glob('*.webp'):
        old.unlink()
    manifest = {}
    for src in sorted(SRC.glob('*.jpg')):
        key = src.stem
        im = Image.open(src).convert('RGB')
        manifest[key] = {}
        for shape, (ratio, candidates) in SHAPES.items():
            cropped = crop_to(im, ratio, FOCUS.get(key, (0.5, 0.5)))
            widths = [w for w in candidates if w <= cropped.width]
            if not widths or cropped.width > widths[-1] * 1.12:
                widths.append(cropped.width)
            for w in widths:
                cropped.resize((w, round(w * ratio)), Image.LANCZOS).save(OUT / f'{key}-{shape}-{w}.webp', quality=80, method=6)
            manifest[key][shape] = widths
    (ROOT / 'src' / 'photos.json').write_text(json.dumps(manifest, indent=1) + '\n')
    total = sum(f.stat().st_size for f in OUT.glob('*.webp'))
    print(f'{len(manifest)} photos, {len(list(OUT.glob("*.webp")))} files, {total // 1024} KB')


if __name__ == '__main__':
    main()
