"""Create responsive WebP copies of the preview JPGs. Requires Pillow."""
from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
for source in (root / 'public/images').glob('*.jpg'):
    with Image.open(source) as image:
        for size in (640, 960, image.width):
            if size > image.width:
                continue
            resized = image.copy()
            resized.thumbnail((size, 10000), Image.Resampling.LANCZOS)
            target = source.with_name(f'{source.stem}-{size}.webp') if size != image.width else source.with_suffix('.webp')
            resized.save(target, 'WEBP', quality=82, method=6)
            print(f'{target.name}: {target.stat().st_size // 1024} KB')
