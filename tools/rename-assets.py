#!/usr/bin/env python3
import os
import subprocess
import unicodedata

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MENU = {
    "Bowl": "doner-bowl-200.png",
    "Box": "doner-box-180.png",
    "Dürüm": "doner-durum-180.png",
    "Ekmek": "doner-ekmek-arasi-180.png",
    "Tabak": "doner-tabak-220.png",
    "Tam": "tam-kofte-300.png",
    "Yarım": "yarim-kofte-150.png",
    "Patates Büyük": "patates-buyuk-70.png",
    "Patates Küçük": "patates-kucuk-50.png",
}

DRINKS = {
    "Ayran Büyük": "ayran-buyuk-40.png",
    "Ayran Küçük": "ayran-kucuk-30.png",
    "Kola Cam": "kola-cam-70.png",
    "Kola": "kola-70.png",
    "Su": "su-20.png",
    "cay ucretsiz": "cay-ucretsiz.jpg",
}


def rename_folder(folder, mapping):
    path = os.path.join(ROOT, folder)
    for name in os.listdir(path):
        if name.startswith(".") or name == "soguk-icecek-70.png":
            continue
        old = os.path.join(folder, name).replace("\\", "/")
        dest = None
        for key, slug in sorted(mapping.items(), key=lambda x: -len(x[0])):
            if key in name:
                dest = f"{folder}/{slug}"
                break
        if not dest:
            print("SKIP", name)
            continue
        if old.replace("\\", "/") == dest:
            continue
        subprocess.run(["git", "mv", old, dest], cwd=ROOT, check=True)
        print(dest)


if __name__ == "__main__":
    os.chdir(ROOT)
    rename_folder("images/menu", MENU)
    rename_folder("images/drinks", DRINKS)
