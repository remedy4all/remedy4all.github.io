#!/usr/bin/env python3
# /// script
# requires-python = ">=3.12"
# dependencies = ["pillow>=10", "numpy>=1.26", "scipy>=1.11"]
# ///
"""Turn the spot illustrations in brand/source/spots/ into transparent masters for the site.

Each source is a 2048 x 2048 JPEG: a centred motif on a paper-cut blob over a flat cream field
(about #F3F1E4, with JPEG noise). For each image this script:

1. samples the background as the median colour of the outer border,
2. keys it to transparency, but only where the near-background area is connected to the image
   edge, so cream inside the artwork (papers, highlights) is kept. The threshold is tight on
   purpose: background noise measures about 3, the papers touching the background start at about
   10, and coverage is flat from 4 to 8, so 6 separates them. Isolated specks of noise are treated
   as background, and a short alpha ramp softens the edge,
3. crops to one square shared by all images: centred, big enough to hold every motif, so the
   motif is never cut and every spot keeps the same scale,
4. writes a 600 px transparent PNG master to src/assets/spots/<name>.png.

Astro (src/components/Spot.astro) then serves AVIF and WebP at 300 and 600 px. Nothing is
redrawn or recoloured. Re-run after replacing a source (04 is provisional), with no code change:
    uv run --script scripts/build-spot-illustrations.py
"""

from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage

SRC = Path("brand/source/spots")
OUT = Path("src/assets/spots")
SIZE = 600  # master width and height
NOISE = 3.0  # differences up to this are background noise: fully transparent
EDGE = 6.0  # background-connected pixels from NOISE to EDGE are the soft edge; above is artwork
SPECK = 64  # artwork "islands" smaller than this many pixels are noise, keyed as background
MARGIN = 0.03  # share of the side kept around the widest motif


def key_background(img: Image.Image) -> Image.Image:
    rgb = np.asarray(img.convert("RGB"), dtype=np.float32)
    h, w, _ = rgb.shape
    border = np.concatenate([rgb[:4].reshape(-1, 3), rgb[-4:].reshape(-1, 3), rgb[:, :4].reshape(-1, 3), rgb[:, -4:].reshape(-1, 3)])
    bg = np.median(border, axis=0)
    diff = np.abs(rgb - bg).max(axis=2)

    # Background: near-background pixels connected to the image edge.
    labels, _ = ndimage.label(diff <= EDGE)
    edge_labels = np.unique(np.concatenate([labels[0], labels[-1], labels[:, 0], labels[:, -1]]))
    connected = np.isin(labels, edge_labels[edge_labels > 0])

    # Tiny artwork islands inside the background are JPEG noise: key them too.
    islands, count = ndimage.label(~connected)
    if count:
        sizes = ndimage.sum(np.ones_like(diff), islands, index=np.arange(1, count + 1))
        connected |= np.isin(islands, np.nonzero(sizes < SPECK)[0] + 1)

    # Soft edge only in a 2px band around the artwork; the rest of the background is fully clear.
    artwork = ~connected
    band = ndimage.binary_dilation(artwork, iterations=2) & connected
    ramp = np.clip((diff - NOISE) / (EDGE - NOISE), 0.0, 1.0)
    alpha = np.where(artwork, 1.0, np.where(band, ramp, 0.0))
    rgba = np.dstack([rgb, alpha * 255]).round().astype(np.uint8)
    return Image.fromarray(rgba, "RGBA")


def shared_square(keyed: list[Image.Image]) -> tuple[int, int, int, int]:
    """One centred square that holds the visible pixels of every image."""
    w, h = keyed[0].size
    cx, cy = w / 2, h / 2
    half = 0.0
    for img in keyed:
        ys, xs = np.nonzero(np.asarray(img.getchannel("A")) > 16)
        half = max(half, cx - xs.min(), xs.max() + 1 - cx, cy - ys.min(), ys.max() + 1 - cy)
    half = min(half * (1 + MARGIN), cx, cy)
    return (round(cx - half), round(cy - half), round(cx + half), round(cy + half))


def main() -> None:
    sources = sorted(SRC.glob("*.jpg"))
    if not sources:
        raise SystemExit(f"No sources in {SRC}")
    keyed = {src.stem: key_background(Image.open(src)) for src in sources}
    box = shared_square(list(keyed.values()))
    print(f"shared crop {box} of {next(iter(keyed.values())).size}")
    OUT.mkdir(parents=True, exist_ok=True)
    for name, img in keyed.items():
        # Resample in premultiplied alpha so transparent pixels do not bleed colour into edges.
        master = img.crop(box).convert("RGBa").resize((SIZE, SIZE), Image.LANCZOS).convert("RGBA")
        master.save(OUT / f"{name}.png", optimize=True)
        print(f"{name}: {SIZE}x{SIZE}")


if __name__ == "__main__":
    main()
