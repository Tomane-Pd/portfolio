"""Convert the Machine Learning notebooks into portfolio assets.
Usage: python scripts/extract_notebooks.py "D:\\Projects\\Projects\\Machine Learning"
To add a new notebook: add it to NOTEBOOKS below, run the script, then add the
project (with notebooks: [{ label, file }]) to src/data/projectsData.js.


For each notebook it writes to public/notebooks/:
  <slug>.json      cleaned cells for the in-site code viewer
  <slug>.ipynb     downloadable copy (huge HTML map outputs removed)
  img/<slug>-N.png images from cell outputs
  maps/<slug>-N.html interactive folium maps (loaded on demand)
"""
import json, os, re, sys, html, base64, copy

SRC = sys.argv[1] if len(sys.argv) > 1 else r"D:\Projects\Projects\Machine Learning"
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "public", "notebooks")
os.makedirs(f"{OUT}/img", exist_ok=True)
os.makedirs(f"{OUT}/maps", exist_ok=True)

NOTEBOOKS = {
    "olympic-medals-prediction": "Machine Learning Prediction Project.ipynb",
    "stock-price-lstm": "Stock Price Prediction Using Python & Machine Learning (LSTM).ipynb",
    "ecg-signal-analysis": "ECG com Python.ipynb",
    "traffic-accidents-analysis": "Ciência de Dados_Projecto_Analise de Acidentes.ipynb",
    "youtube-single-video": "Baixar Video no Yotube com Python.ipynb",
    "youtube-playlist": "Baixar Videos no Youtube.ipynb",
    "youtube-playlist-hq": "Descarregar videos no Youtube.ipynb",
    "pythonize-001-youtube": "🐍 Pythonize com Tomane_baixar vídeos do YouTube.ipynb",
    "pythonize-002-remove-background": "🐍 Pythonize com Tomane_Remover background de imagem.ipynb.ipynb",
    "pythonize-003-image-to-pdf": "🐍 Pythonize com Tomane_Converter uma imagem para.ipynb.ipynb",
    "pythonize-004-rename-files": "🐍 Pythonize com Tomane_Organizar arquivos e renomeiar.ipynb.ipynb",
    "pythonize-005-encrypt-file": "🐍 Pythonize com Tomane_Proteger arquivo.ipynb.ipynb",
    "pythonize-006-pdf-password": "🐍 Pythonize com Tomane_Proteger com palavra passe.ipynb.ipynb",
    "pythonize-007-qr-code": "🐍 Pythonize com Tomane_Criar QR code.ipynb.ipynb",
    "pythonize-009-duplicate-files": "Encontrar ficheiros duplicados com Python - Pythonize com Tomane 009.ipynb",
    "pythonize-010-zip-folder": "Compactar uma pasta em ZIP com Python - Pythonize com Tomane 8.ipynb",
    "pythonize-011-agronomy": "Agronomia com Python - Pythonize com Tomane 12.ipynb",
    "pythonize-012-soil-maps": "Criar mapas de pH e carbono orgânico do solo - Pythonize com Tomane 12.ipynb",
    "pythonize-021-market-prices": "Pythonize com Tomane 021 - Comparar precos no mercado.ipynb",
    "pythonize-022-pantry-dates": "Pythonize com Tomane 022 - Organizar datas da despensa.ipynb",
    "pythonize-023-web-scraping": "Pythonize com Tomane 023 - Web scraping.ipynb",
    "pythonize-024-book-prices": "Pythonize com Tomane 024 - Comparar precos de livros.ipynb",
    "pythonize-026-review-calendar": "Pythonize com Tomane 026 - Calendario de revisoes.ipynb",
}

ANSI = re.compile(r"\x1b\[[0-9;]*[A-Za-z]")
MAX_LINES, MAX_CHARS = 25, 2500
INSTALL = re.compile(r"^\s*[!%]?\s*pip\s+install", re.M)


def joined(v):
    return "".join(v) if isinstance(v, list) else (v or "")


def trim(text):
    text = ANSI.sub("", text).replace("\r", "")
    lines = text.rstrip("\n").split("\n")
    cut = False
    if len(lines) > MAX_LINES:
        lines, cut = lines[:MAX_LINES], True
    text = "\n".join(lines)
    if len(text) > MAX_CHARS:
        text, cut = text[:MAX_CHARS], True
    return text + ("\n…" if cut else "")


def convert(slug, fname):
    nb = json.load(open(os.path.join(SRC, fname), encoding="utf-8"))
    cells, img_n, map_n = [], 0, 0
    for cell in nb["cells"]:
        src = joined(cell["source"]).strip("\n")
        if cell["cell_type"] == "markdown":
            if src.strip():
                cells.append({"type": "markdown", "source": src})
            continue
        if cell["cell_type"] != "code" or not src.strip():
            continue
        outputs = []
        is_install = bool(INSTALL.search(src))
        for o in cell.get("outputs", []):
            kind = o.get("output_type")
            if is_install:
                break  # pip logs are noise
            if kind == "stream":
                if o.get("name") == "stderr":
                    continue
                t = trim(joined(o.get("text")))
                if t.strip():
                    outputs.append({"type": "text", "text": t})
            elif kind in ("execute_result", "display_data"):
                data = o.get("data", {})
                if "image/png" in data:
                    img_n += 1
                    path = f"img/{slug}-{img_n}.png"
                    with open(f"{OUT}/{path}", "wb") as fh:
                        fh.write(base64.b64decode(joined(data["image/png"])))
                    outputs.append({"type": "image", "src": f"/notebooks/{path}"})
                elif "text/html" in data:
                    h = joined(data["text/html"])
                    m = re.search(r'srcdoc="(.*?)" style=', h, re.S)
                    if m:  # folium map
                        map_n += 1
                        path = f"maps/{slug}-{map_n}.html"
                        with open(f"{OUT}/{path}", "w", encoding="utf-8") as fh:
                            fh.write(html.unescape(m.group(1)))
                        size = os.path.getsize(f"{OUT}/{path}")
                        outputs.append({"type": "map", "src": f"/notebooks/{path}",
                                        "sizeMB": round(size / 1e6, 1)})
                    elif len(h) < 40000 and "<table" in h:
                        outputs.append({"type": "html", "html": h})
                    elif "text/plain" in data:
                        outputs.append({"type": "text", "text": trim(joined(data["text/plain"]))})
                elif "text/plain" in data:
                    t = joined(data["text/plain"])
                    if t.startswith("<Figure") or t.startswith("<seaborn") or t.startswith("<Axes"):
                        continue
                    outputs.append({"type": "text", "text": trim(t)})
            elif kind == "error":
                outputs.append({"type": "error",
                                "text": f"{o.get('ename')}: {ANSI.sub('', o.get('evalue', ''))}"})
        cells.append({"type": "code", "source": src, "outputs": outputs})

    json.dump({"file": f"{slug}.ipynb", "originalName": fname, "cells": cells},
              open(f"{OUT}/{slug}.json", "w", encoding="utf-8"), ensure_ascii=False)

    # Downloadable notebook: drop giant HTML outputs (maps live in maps/)
    dl = copy.deepcopy(nb)
    for cell in dl["cells"]:
        for o in cell.get("outputs", []):
            d = o.get("data", {})
            if "text/html" in d and len(joined(d["text/html"])) > 200000:
                del d["text/html"]
                d["text/plain"] = ["[Interactive map removed from download - see tomane-portfolio.com]"]
    json.dump(dl, open(f"{OUT}/{slug}.ipynb", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(f"{slug}: {len(cells)} cells, {img_n} images, {map_n} maps")


for slug, fname in NOTEBOOKS.items():
    convert(slug, fname)
