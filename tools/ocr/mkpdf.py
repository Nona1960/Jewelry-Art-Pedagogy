import subprocess, sys, io, os
from PIL import Image
import img2pdf
src, dst = sys.argv[1], sys.argv[2]
color = set(map(int, filter(None, sys.argv[3].split(","))))
gray = set(map(int, filter(None, sys.argv[4].split(","))))
n = int([l for l in subprocess.run(["pdfinfo", src], capture_output=True, text=True).stdout.splitlines() if l.startswith("Pages")][0].split()[1])
pages = []
for i in range(1, n + 1):
    dpi = 150 if (i in color or i in gray) else 200
    subprocess.run(["pdftoppm", "-r", str(dpi), "-f", str(i), "-l", str(i), "-singlefile", "-png", src, "/tmp/claude-0/mk"], check=True)
    im = Image.open("/tmp/claude-0/mk.png"); im.load()
    buf = io.BytesIO()
    if i in color:
        im.convert("RGB").save(buf, "JPEG", quality=70, optimize=True, dpi=(dpi, dpi))
    elif i in gray:
        im.convert("L").save(buf, "JPEG", quality=65, optimize=True, dpi=(dpi, dpi))
    else:
        im.convert("L").point(lambda v: 255 if v > 160 else 0).convert("1").save(buf, "TIFF", compression="group4", dpi=(dpi, dpi))
    pages.append(buf.getvalue())
open(dst, "wb").write(img2pdf.convert(pages))
print(dst, os.path.getsize(dst) // 1024, "KB", n, "pages")
