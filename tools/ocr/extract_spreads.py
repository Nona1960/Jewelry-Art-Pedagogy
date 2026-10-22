import pdfplumber, re, sys
pdf = pdfplumber.open('text.pdf')
KEEP = re.compile(r"(?:учебно|художественно|психолого|научно|социально|декоративно|историко|культурно|эмоционально|теоретико|общественно|ценностно|художников|художника|мастеров|мастера|северо|юго|санкт|кое|темно|светло|ярко|бело|красно|золото|серебро|экономико|естественно|морально|духовно|нравственно|торгово|ювелирно|культурно|социокультурно|организационно|финансово|материально|технико|производственно|информационно|военно|народно|религиозно|политико|государственно|идейно|образно|стилево|национально)-$", re.I)
pages = []  # list of (book_index, lines[(x0, text, size)])
for pi, p in enumerate(pdf.pages):
    for side, (a, b) in enumerate([(0, 410), (410, p.width)]):
        c = p.crop((a, 0, b, p.height))
        ls = c.extract_text_lines()
        pages.append([(round(l['x0'] - a), l['text'].strip(), round(l['chars'][0]['size'], 1), bool(re.search('Bold', l['chars'][0]['fontname']))) for l in ls if l['text'].strip()])
out = []
for idx, ls in enumerate(pages, start=1):
    if idx in (1, 2, 3, 76):
        continue
    printed = idx - 1
    # drop page number line
    if ls and re.fullmatch(r"\d{1,3}", ls[-1][1]):
        ls = ls[:-1]
    out.append(f"<!-- p:{printed} -->")
    if not ls:
        continue
    left = min(x for x, *_ in ls)
    par = None
    first = True
    for x, t, size, bold in ls:
        centered = x - left > 25
        indent = 10 < x - left <= 25
        if centered or bold:
            if par is not None: out.append(par); par = None
            if out and out[-1].startswith('#H ') and not first_heading_break:
                out[-1] += ' ' + t
            else:
                out.append('#H ' + t)
            first_heading_break = False
            continue
        first_heading_break = True
        if par is None:
            if first and out and not out[-1].startswith(('<!--', '#H')) is False:
                pass
            par = t
        elif indent:
            out.append(par); par = t
        else:
            if re.search(r"[А-Яа-яЁё]-$", par) and re.match(r"[а-яё]", t):
                par = par + t if KEEP.search(par.split()[-1]) else par[:-1] + t
            else:
                par += ' ' + t
        first = False
    if par is not None:
        out.append(par)
open('raw.md', 'w').write("\n\n".join(out))
