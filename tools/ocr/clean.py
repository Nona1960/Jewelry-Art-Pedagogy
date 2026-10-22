"""Clean Tesseract OCR output of Russian typewritten scans into structured markdown.

usage: python3 clean.py <pages_dir> <out.md> [--skip N,N] [--image N,N]
Output markdown conventions:
  <!-- p:N -->      page marker (start of printed page N of PDF)
  ## / ###         headings
  ![scan](p:N)     placeholder: show the scanned page image instead of text
"""
import re
import sys
from pathlib import Path

CYR = re.compile(r"[А-Яа-яЁё]")
LAT = re.compile(r"[A-Za-z]")

HOMO_UP = str.maketrans("ABCEHKMOPTXY", "АВСЕНКМОРТХУ")
HOMO_LO = str.maketrans("aceopxyk", "асеорхук")

# whole-token fixes for Latin look-alikes inside Russian text
TOKEN_FIX = {
    "B": "в", "b": "в", "H": "и", "HM": "и", "HH": "и", "M": "и", "Ha": "на", "HA": "на", "Hа": "на",
    "He": "не", "Hc": "не", "TO": "то", "To": "то", "Kak": "как", "KaK": "как", "K": "к", "O": "о",
    "MO": "по", "Mo": "по", "ero": "его", "€ro": "его", "uid": "для", "OT": "от", "Or": "от",
    "OH": "он", "Ho": "но", "HO": "но", "Bo": "во", "C": "с", "Y": "у", "y": "у", "c": "с", "o": "о",
    "a": "а", "e": "е", "u": "и", "OMBIT": "опыт", "OCHOBHBIX": "основных", "3Tan": "этап",
    "Tak": "так", "TaK": "так", "Bce": "все", "BCE": "все", "Hac": "нас", "Hee": "нее", "Bbl": "вы",
    "OHH": "они", "OHM": "они", "eë": "её", "ee": "ее", "Ee": "Ее", "ux": "их", "Ux": "Их", "MX": "их", "TOM": "том", "Tom": "том", "Il": "II", "Ш": "III", "Hu": "ни", "HM.": "им.", "OHa": "она", "OHO": "оно", "BO": "во", "Mbl": "мы", "MBI": "мы", "Bcex": "всех", "Bce": "все", "Ilo": "По", "Ho": "но",
}
CAP_START = {"в": "В", "и": "И", "на": "На", "не": "Не", "то": "То", "как": "Как", "к": "К", "о": "О",
             "по": "По", "его": "Его", "для": "Для", "от": "От", "он": "Он", "но": "Но", "во": "Во",
             "с": "С", "у": "У", "так": "Так", "все": "Все", "а": "А", "их": "Их", "ее": "Ее", "опыт": "Опыт",
             "этап": "Этап", "они": "Они"}


def cyr_ratio(s: str) -> float:
    c = len(CYR.findall(s))
    l = len(LAT.findall(s))
    return c / (c + l) if c + l else 1.0


def fix_token(tok: str, sentence_start: bool) -> str:
    m = re.match(r"^([«(\"]*)(.*?)([».,;:!?)\"]*)$", tok)
    pre, core, post = m.groups()
    if not core:
        return tok
    if core in TOKEN_FIX:
        new = TOKEN_FIX[core]
        if sentence_start and new in CAP_START:
            new = CAP_START[new]
        return pre + new + post
    # initials like "A.B." or "B.C." -> Cyrillic
    if re.fullmatch(r"(?:[A-ZА-Я]\.){1,3}[A-ZА-Я]?", core + post[:1]) or re.fullmatch(r"[A-Z]", core):
        return pre + core.translate(HOMO_UP) + post
    # mixed Cyrillic/Latin word -> transliterate homoglyphs
    if CYR.search(core) and LAT.search(core):
        return pre + core.translate(HOMO_UP).translate(HOMO_LO) + post
    return tok


def clean_line(line: str) -> str:
    s = line
    s = s.replace("~~", " ").replace("‚", ",")
    s = re.sub(r"\s\|\s", " ", s)
    s = re.sub(r"^\|\s*|\s*\|$", "", s)
    # justification artefacts: em dash between words
    # keep genuine dashes: after a comma, or before copula-like words
    s = re.sub(r"(?<=[А-Яа-яЁё»),])\s+—\s+(?!(?:это|все|значит|есть|вот)\b)(?=[А-Яа-яЁё«(])", " ", s)
    s = re.sub(r"(?<=[0-9])r\.", " г.", s)
    s = re.sub(r"(?<=[0-9])\s?rr\.", " гг.", s)
    s = re.sub(r"\bC\.(?=\s?\d)", "С.", s)
    s = re.sub(r"\s{2,}", " ", s).strip()
    if cyr_ratio(s) < 0.6:
        return s
    toks = s.split(" ")
    out = []
    for i, t in enumerate(toks):
        prev = out[-1] if out else ""
        start = i == 0 or prev.endswith((".", "!", "?", ":")) and not re.fullmatch(r"[А-ЯA-Z]\.", prev)
        out.append(fix_token(t, start))
    return " ".join(out)


HEAD_PATTERNS = [
    (re.compile(r"^(ВВЕДЕНИЕ|Введение)\.?$"), 2),
    (re.compile(r"^(ЗАКЛЮЧЕНИЕ|Заключение)\.?$"), 2),
    (re.compile(r"^(СПИСОК ЛИТЕРАТУРЫ|Список литературы|Список использованной литературы|БИБЛИОГРАФИЯ|Библиография)\.?$"), 2),
    (re.compile(r"^(ПРИЛОЖЕНИЕ|Приложение|ПРИЛОЖЕНИЯ|Приложения)\s*\d*\.?$"), 2),
    (re.compile(r"^(Глава|ГЛАВА)\s+[1-9IVХ]+\.?\s*.*$"), 2),
    (re.compile(r"^\d\.\d\.?\s*[А-ЯЁ].*$"), 3),
    (re.compile(r"^(Выводы|ВЫВОДЫ)\b.*$"), 3),
    (re.compile(r"^(ОБЩАЯ ХАРАКТЕРИСТИКА РАБОТЫ|ОСНОВНОЕ СОДЕРЖАНИЕ ДИССЕРТАЦИИ|СОДЕРЖАНИЕ|Содержание|Оглавление|ОГЛАВЛЕНИЕ)$"), 2),
]


def heading_level(par: str):
    if len(par) > 220:
        return None
    for rx, lvl in HEAD_PATTERNS:
        if rx.match(par):
            return lvl
    return None


KEEP_HYPHEN = re.compile(
    r"(?:^|\s|[«(])(?:учебно|художественно|психолого|научно|личностно|социально|декоративно|историко|культурно|"
    r"эмоционально|чувственно|опытно|проблемно|философско|технико|организационно|профессионально|теоретико|"
    r"общественно|социокультурно|материально|духовно|нравственно|художественно|ценностно|практико|"
    r"информационно|сюжетно|образно|предметно|мастеров|мастера|мастер|художников|художника|художник|студентов|"
    r"студента|студенты|кандидат|северо|юго|санкт|из|во|по|кое|темно|светло|ярко|бело|сине|зелено|"
    r"красно|желто|золото|серебро|историко|искусствоведческо|научно|естественно|"
    r"интеллектуально|эстетико|экономико|социально|психолого|педагогическо|мировоззренческо|"
    r"[А-Яа-яЁё]+(?:ско|цко))-$",
    re.I,
)


def join_hyphen(par: str, nxt: str) -> str:
    if KEEP_HYPHEN.search(par):
        return par + nxt
    return par[:-1] + nxt


def page_paragraphs(text: str):
    text = re.sub(r"^\s*[-–—]?\s*\d{1,3}\s*[-–—]?\s*\n", "", text, count=1)
    blocks = re.split(r"\n\s*\n", text)
    pars = []
    for b in blocks:
        lines = [l for l in (clean_line(x) for x in b.splitlines()) if l]
        if not lines:
            continue
        # drop running page numbers
        if len(lines) == 1 and re.fullmatch(r"[-–—]?\s*\d{1,3}\s*[-–—]?", lines[0]):
            continue
        par = ""
        for l in lines:
            if not par:
                par = l
            elif re.search(r"[А-Яа-яЁё]-$", par) and re.match(r"[а-яё]", l):
                par = join_hyphen(par, l)
            else:
                par += " " + l
        if pars and not re.search(r"[.!?:»)]$", pars[-1]) and re.match(r"[а-яё(«,;]", par) and not heading_level(pars[-1]):
            pars[-1] = pars[-1] + " " + par
        else:
            pars.append(par)
    return pars


def main():
    src = Path(sys.argv[1])
    out = Path(sys.argv[2])
    skip, image = set(), set()
    offset = 0
    args = sys.argv[3:]
    for i, a in enumerate(args):
        if a == "--skip":
            skip = {int(x) for x in args[i + 1].split(",") if x}
        if a == "--offset":
            offset = int(args[i + 1])
        if a == "--image":
            image = {int(x) for x in args[i + 1].split(",") if x}
    md = []
    open_par = False  # last paragraph may continue on next page
    for f in sorted(src.glob("*.txt")):
        n = int(f.stem)
        if n in skip:
            continue
        pn = n - offset
        md.append(f"<!-- p:{pn} -->")
        if n in image:
            md.append(f"![scan](p:{pn})")
            open_par = False
            continue
        pars = page_paragraphs(f.read_text(encoding="utf-8"))
        for j, p in enumerate(pars):
            lvl = heading_level(p)
            if lvl:
                h = p.rstrip(".")
                if h.upper() == h:
                    h = h.capitalize()
                md.append("#" * lvl + " " + h)
                open_par = False
                continue
            if j == 0 and open_par and re.match(r"[а-яё(«0-9,;]", p):
                # continue previous paragraph across the page break; keep marker inline
                marker = md.pop()
                prev = md.pop()
                if re.search(r"[А-Яа-яЁё]-$", prev):
                    joined = join_hyphen(prev, p)
                    cut = len(prev) - (0 if KEEP_HYPHEN.search(prev) else 1)
                    md.append(joined[:cut] + "{{p:" + str(pn) + "}}" + joined[cut:])
                else:
                    md.append(prev + " {{p:" + str(pn) + "}}" + p)
                _ = marker
            else:
                md.append(p)
            open_par = not re.search(r"[.!?:»)]$", p)
        if not pars:
            open_par = False
    out.write_text("\n\n".join(md) + "\n", encoding="utf-8")
    print("written", out, len(md), "blocks")


if __name__ == "__main__":
    main()
