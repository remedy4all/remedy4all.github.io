#!/usr/bin/env python3
# /// script
# requires-python = ">=3.12"
# dependencies = ["pillow>=10"]
# ///
"""Derive the site's brand assets from the source artwork in brand/source/.

The Proposal 4 SVGs are a whole PDF page cropped by viewBox. The logo inside each view is an
embedded, opaque PNG with its background colour baked in. This script:

- picks the embedded PNG placed inside each SVG's viewBox,
- crops it to the artwork (non-background pixels plus a margin), keeping every pixel unchanged,
- writes public/brand/remedy-logo-light.png and remedy-logo-dark.png,
- copies CSSA's logo to public/brand/cssa-logo.png,
- derives the favicons from the "r" of the dark logo, padded with its own navy,
- derives the Open Graph image: the dark logo centred on a 1200 x 630 canvas of its own navy,
- prints each logo's background colour, which the CSS must match exactly.

Nothing is redrawn or recoloured. Run from the repository root:
    uv run --script scripts/build-brand-assets.py
"""

import base64
import io
import re
import shutil
from pathlib import Path

from PIL import Image

SRC = Path("brand/source")
OUT = Path("public/brand")
PUBLIC = Path("public")
MARGIN = 24  # source pixels kept around the artwork
DIFF = 24  # a pixel differing from the background by more than this (any channel) is artwork


def embedded_logo(svg_path: Path) -> Image.Image:
    """The embedded PNG whose placement falls inside the SVG's viewBox."""
    svg = svg_path.read_text(encoding="utf-8")
    vx, vy, vw, vh = map(float, re.search(r'viewBox="([^"]+)"', svg).group(1).split())
    images = {
        m.group(1): m.group(2)
        for m in re.finditer(r'<image id="([^"]+)"[^>]*base64,([^"]+)"', svg)
    }
    for m in re.finditer(r'<use xlink:href="#([^"]+)" transform="matrix\(([^)]+)\)"', svg):
        if m.group(1) not in images:
            continue
        _, _, _, _, e, f = map(float, m.group(2).split(","))
        if vx <= e < vx + vw and vy <= f < vy + vh:
            return Image.open(io.BytesIO(base64.b64decode(images[m.group(1)]))).convert("RGB")
    raise SystemExit(f"No embedded logo inside the viewBox of {svg_path}")


def artwork_box(img: Image.Image, bg: tuple[int, int, int]) -> tuple[int, int, int, int]:
    px = img.load()
    w, h = img.size
    xs, ys = [], []
    for y in range(h):
        for x in range(w):
            if max(abs(a - b) for a, b in zip(px[x, y], bg)) > DIFF:
                xs.append(x)
                ys.append(y)
    return (
        max(min(xs) - MARGIN, 0),
        max(min(ys) - MARGIN, 0),
        min(max(xs) + 1 + MARGIN, w),
        min(max(ys) + 1 + MARGIN, h),
    )


def first_glyph(img: Image.Image, bg: tuple[int, int, int]) -> Image.Image:
    """The first glyph of the light-on-dark word: the 'r' of «remedy» in the dark logo."""
    px = img.load()
    w, h = img.size
    is_white = lambda p: min(p) > 200  # «remedy» is near-white; tagline and «FOR ALL» are blue
    cols = [x for x in range(w) if any(is_white(px[x, y]) for y in range(h))]
    start = end = cols[0]
    while end + 1 in cols:
        end += 1
    rows = [y for y in range(h) if any(is_white(px[x, y]) for x in range(start, end + 1))]
    glyph = img.crop((start, min(rows), end + 1, max(rows) + 1))
    side = int(max(glyph.size) * 1.5)
    square = Image.new("RGB", (side, side), bg)
    square.paste(glyph, ((side - glyph.width) // 2, (side - glyph.height) // 2))
    return square


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    logos = {}
    for variant in ("light", "dark"):
        img = embedded_logo(SRC / f"remedy-logo-proposal4-{variant}.svg")
        bg = img.getpixel((0, 0))
        cropped = img.crop(artwork_box(img, bg))
        cropped.save(OUT / f"remedy-logo-{variant}.png", optimize=True)
        logos[variant] = (cropped, bg)
        print(f"{variant}: {cropped.size[0]}x{cropped.size[1]}, background #{bytes(bg).hex().upper()}")

    shutil.copyfile(SRC / "cssa-logo-horizontal.png", OUT / "cssa-logo.png")

    dark, navy = logos["dark"]
    icon = first_glyph(dark, navy)
    icon.resize((32, 32), Image.LANCZOS).save(PUBLIC / "favicon-32.png", optimize=True)
    icon.resize((180, 180), Image.LANCZOS).save(PUBLIC / "apple-touch-icon.png", optimize=True)
    icon.save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])

    og = Image.new("RGB", (1200, 630), navy)
    scale = min(1.0, 1000 / dark.width, 480 / dark.height)
    logo = dark.resize((round(dark.width * scale), round(dark.height * scale)), Image.LANCZOS)
    og.paste(logo, ((1200 - logo.width) // 2, (630 - logo.height) // 2))
    og.save(OUT / "og-image.png", optimize=True)
    print("Wrote public/brand/*, public/favicon-32.png, public/apple-touch-icon.png, public/favicon.ico")


if __name__ == "__main__":
    main()
