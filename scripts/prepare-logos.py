"""Prepare web-sized copies of the original GARWORKZ artwork (requires Pillow).

Only blank outer margins and output dimensions change. Original PNGs are kept
in assets/brand; the artwork is not redrawn, recolored, or stretched.
"""
from pathlib import Path
from PIL import Image, ImageChops, ImageOps

root = Path(__file__).resolve().parents[1]
output = root / 'public/images/logos'
output.mkdir(parents=True, exist_ok=True)

horizontal = Image.open(root / 'assets/brand/garworkz-horizontal-original.png').convert('RGB')
bounds = ImageChops.difference(horizontal, Image.new('RGB', horizontal.size)).getbbox()
horizontal = ImageOps.expand(horizontal.crop(bounds), border=24, fill='black')
horizontal.thumbnail((640, 640), Image.Resampling.LANCZOS)
horizontal.save(output / 'garworkz-horizontal.webp', 'WEBP', lossless=True, method=6)

mark = Image.open(root / 'assets/brand/garworkz-mark-original.png').convert('RGB')
# Select the bright artwork to locate its bounds, keeping the original background.
mask = ImageChops.lighter(mark.getchannel('G'), mark.getchannel('B')).point(lambda value: 255 if value > 150 else 0)
left, top, right, bottom = mask.getbbox()
padding = 65
mark = mark.crop((max(0, left-padding), max(0, top-padding), min(mark.width, right+padding), min(mark.height, bottom+padding)))
mark.thumbnail((384, 384), Image.Resampling.LANCZOS)
mark.save(output / 'garworkz-mark.webp', 'WEBP', lossless=True, method=6)
icon = ImageOps.pad(mark, (64, 64), color=mark.getpixel((0, 0)), method=Image.Resampling.LANCZOS)
icon.save(output / 'favicon.png', optimize=True)
ImageOps.pad(mark, (180, 180), color=mark.getpixel((0, 0)), method=Image.Resampling.LANCZOS).save(output / 'apple-touch-icon.png', optimize=True)
for path in output.iterdir():
    print(f'{path.name}: {path.stat().st_size:,} bytes')
