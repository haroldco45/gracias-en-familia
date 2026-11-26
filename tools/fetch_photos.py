"""Baja fotos reales de Wikimedia Commons a fotos/ con sus créditos (para flyer y video)."""
import json, os, urllib.parse, urllib.request
UA = {"User-Agent": "GraciasEnFamilia/1.0 (Vibras Positivas HM; github.com/haroldco45)"}
Q = {"cena": "Thanksgiving dinner table family", "pavo": "roast turkey Thanksgiving", "pie": "pumpkin pie slice",
     "arandanos": "cranberry sauce bowl", "pure": "mashed potatoes bowl", "batata": "sweet potato casserole",
     "desfile": "Macy's Thanksgiving Day Parade balloon", "cosecha": "autumn harvest pumpkins", "mesa": "Thanksgiving table setting",
     "postal": "Thanksgiving postcard vintage", "familia": "family dinner table gathering", "hojas": "autumn leaves maple"}
os.makedirs("fotos", exist_ok=True)
cred = {}
def get(u): return urllib.request.urlopen(urllib.request.Request(u, headers=UA), timeout=60).read()
for name, q in Q.items():
    u = ("https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=20"
         "&prop=imageinfo&iiprop=url|mime|size|extmetadata&iiurlwidth=1920&gsrsearch=" + urllib.parse.quote(q + " filetype:bitmap"))
    pages = sorted(json.loads(get(u)).get("query", {}).get("pages", {}).values(), key=lambda p: p.get("index", 99))
    n = 0
    for p in pages:
        ii = (p.get("imageinfo") or [{}])[0]
        if "jpeg" not in ii.get("mime", "") or ii.get("width", 0) < 1000: continue
        n += 1
        fn = f"fotos/{name}-{n}.jpg"
        open(fn, "wb").write(get(ii.get("thumburl") or ii["url"]))
        md = ii.get("extmetadata", {})
        cred[fn] = {"page": ii.get("descriptionurl"), "artist": md.get("Artist", {}).get("value", ""), "license": md.get("LicenseShortName", {}).get("value", "")}
        if n == 3: break
json.dump(cred, open("fotos/creditos.json", "w"), ensure_ascii=False, indent=1)
print(len(cred), "fotos")
