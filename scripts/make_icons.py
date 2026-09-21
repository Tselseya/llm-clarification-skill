from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
src = root / "assets" / "logo-concept-3.png"
out = root / "extension" / "icons"
out.mkdir(parents=True, exist_ok=True)
with Image.open(src).convert("RGBA") as image:
    for size in (16, 32, 48, 128):
        image.resize((size, size), Image.Resampling.LANCZOS).save(out / f"icon-{size}.png", optimize=True)
