"""Genera og.jpg (vista previa del enlace, 1200x630) con una foto real de Wikimedia Commons.
Lo corre el robot de GitHub Actions (.github/workflows/og-image.yml)."""
import io, json, urllib.parse, urllib.request
from PIL import Image, ImageDraw, ImageFont, ImageFilter

UA = {"User-Agent": "GraciasEnFamilia/1.0 (Vibras Positivas HM; github.com/haroldco45)"}
QUERIES = ["Thanksgiving dinner family table filetype:bitmap", "roast turkey Thanksgiving dinner filetype:bitmap"]

def get(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=40).read()

def photo():
    for q in QUERIES:
        u = ("https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=15"
             "&prop=imageinfo&iiprop=url|mime|size&iiurlwidth=1600&gsrsearch=" + urllib.parse.quote(q))
        pages = json.loads(get(u)).get("query", {}).get("pages", {}).values()
        for p in sorted(pages, key=lambda x: x.get("index", 99)):
            ii = (p.get("imageinfo") or [{}])[0]
            if "jpeg" in ii.get("mime", "") and ii.get("width", 0) > ii.get("height", 1):
                return Image.open(io.BytesIO(get(ii.get("thumburl") or ii["url"]))).convert("RGB")
    raise SystemExit("sin foto")

def font(size, bold=True):
    for f in ["/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf" if bold else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"]:
        try: return ImageFont.truetype(f, size)
        except OSError: pass
    return ImageFont.load_default()

img = photo()
W, H = 1200, 630
s = max(W / img.width, H / img.height)
img = img.resize((int(img.width * s) + 1, int(img.height * s) + 1), Image.LANCZOS)
img = img.crop(((img.width - W) // 2, (img.height - H) // 2, (img.width - W) // 2 + W, (img.height - H) // 2 + H))
shade = Image.new("L", (W, H))
d = ImageDraw.Draw(shade)
for y in range(H):
    d.line([(0, y), (W, y)], fill=int(235 * max(0, (y - H * .3) / (H * .7))))
dark = Image.new("RGB", (W, H), (40, 15, 5))
img = Image.composite(dark, img, shade)
d = ImageDraw.Draw(img)
d.rounded_rectangle([60, 330, 470, 378], 24, fill=(224, 164, 58))
d.text((82, 337), "Jueves 26 de noviembre", font=font(28, False), fill=(42, 26, 18))
d.text((60, 400), "Gracias en Familia", font=font(76), fill="white")
d.text((60, 495), "Día de Acción de Gracias 2026 · Español / English", font=font(30, False), fill=(255, 235, 210))
d.text((60, 560), "Vibras Positivas HM", font=font(26), fill=(224, 164, 58))
img.save("og.jpg", quality=88)
print("og.jpg listo")
