"""Plain-text methodology article -> markdown in md2page format."""
import re, sys
src, dst = sys.argv[1], sys.argv[2]
start = int(sys.argv[3]); title = sys.argv[4]; subtitle = sys.argv[5]
lines = open(src, encoding='utf-8').read().replace('​', '').replace('\xa0', ' ').splitlines()[start - 1:]
DROP = re.compile(r'^(Публикация\s+Открыть|Книга\s+Открыть|Авторы/Создатели|Дронов, Дмитрий.*|Дронов Дмитрий( Сергеевич| \(руководитель проекта\))?\.?|Описание|'
                  r'Кандидат педагогических наук, доцент, член Союза художников России\.?|Первоисточник.*|Оригинальная учебная программа:.*|Учреждение:.*|Год:.*|'
                  r'Тип статьи:.*|Тип публикации:.*|Автор исходной методической разработки:.*|Организация-разработчик:.*|Оригинальный автор:.*|название:.*|Исходный учебник:.*)$')
FIX = [(r'\bИтой\b', 'Итого'), (r'^Этотп\b', 'Этап'), (r'\bводный\b', 'Базовый'), (r'^Похед\b', 'Показатель'), (r'\bДеяностный\b', 'Деятельностный'),
       (r'^II\. лет\t', 'II. Анализ\t'), (r'^В\. Рефлексия\t', 'V. Рефлексия\t'), (r'Этап В\. Рефлексия', 'Этап V. Рефлексия'),
       (r'^7\. Эта организацияпы', '7. Этапы'), (r'Гемология', 'Геммология')]
ANN = {'Абстрактный', 'Аннотация', 'м', 'Аннотация.'}
blocks = []
cur = []
for raw in lines:
    l = raw.strip()
    for a, b in FIX:
        l = re.sub(a, b, l)
    if DROP.match(l):
        continue
    if not l:
        if cur: blocks.append(cur); cur = []
        continue
    cur.append(l)
if cur: blocks.append(cur)

def is_heading(t):
    if len(t) > 160 or t.endswith(('?', ';', ',', ':')): return None
    if re.match(r'^\d+\.\s+[^.]{3,}\.\s+[А-ЯЁ]', t) and len(t) > 60: return None
    m = re.match(r'^(\d+(?:\.\s?\d+)*)\.?\s+([А-ЯЁA-Z«].*)$', t)
    if m:
        depth = m.group(1).count('.') + 1
        if t.endswith('.') and len(t) > 110: return None
        return 2 if depth == 1 else 3
    if re.match(r'^(Этап [IVX]+\.|Уровень [IVX]+\.|Компетенция \d+\.|Методическая разработка №|Разработка №)', t) and len(t) < 140: return 3
    if re.match(r'^(Приложение\s+[\dА-Я]+\.)', t): return 3
    if re.match(r'^(МЕТОДИЧЕСКИЕ ПРИЛОЖЕНИЯ|Заключение|Список литературы|Литература|Ссылки|Первоисточник|Библиографическое примечание|Рекомендуемая литература)$', t): return 2
    return None

# split: any line inside a block that is a heading becomes its own block
nb = []
def push_text(lines_):
    cur = []
    for l in lines_:
        if is_heading(l) or l in ANN or re.match(r'^Ключевые слова\s*:', l):
            if cur: nb.append(cur); cur = []
            nb.append([l])
        else:
            cur.append(l)
    if cur: nb.append(cur)
for b in blocks:
    if any('\t' in l for l in b):
        seg = []; mode = None
        for l in b:
            m = '\t' in l
            if mode is None or m == mode:
                seg.append(l)
            else:
                (nb.append(seg) if mode else push_text(seg)); seg = [l]
            mode = m
        if seg: (nb.append(seg) if mode else push_text(seg))
        continue
    push_text(b)
blocks = [[l] for b in nb for l in ([' '.join(b)] if not any('\t' in x for x in b) else [None])] if False else nb

out = [f'# {title}', '', f'**{subtitle}**', '']
i = 0
in_list = False
while i < len(blocks):
    b = blocks[i]
    # tables: block lines with tabs
    if any('\t' in l for l in b):
        rows = [[c.strip() for c in l.split('\t')] for l in b if '\t' in l]
        pre = [l for l in b if '\t' not in l]
        for p in pre: out += [p, '']
        n = max(len(r) for r in rows)
        rows = [r + [''] * (n - len(r)) for r in rows]
        out.append('| ' + ' | '.join(rows[0]) + ' |')
        out.append('|' + '---|' * n)
        for r in rows[1:]:
            out.append('| ' + ' | '.join(r) + ' |')
        out.append('')
        i += 1; continue
    t = ' '.join(b)
    if t in ANN:
        out += ['## Аннотация', '']; i += 1; continue
    k = re.match(r'^Ключевые слова\s*:\s*(.+)$', t)
    if k:
        out += [f'**Ключевые слова:** {k.group(1)}', '']; i += 1; continue
    h = is_heading(t)
    if h and len(b) == 1:
        if t.upper() == t and len(t) > 12: t = t[0] + t[1:].lower()
        out += ['#' * h + ' ' + re.sub(r'\.$', '', t), '']
        in_list = False; i += 1; continue
    # list detection: previous text paragraph ends with ':' and this one is short
    prev = next((x for x in reversed(out) if x.strip()), '')
    CONNECT = re.compile(r'^(Таким образом|Это|Эт[иа]|Так[оа][йяе]|Данн|Однако|При этом|Следовательно|Поэтому|Особ|Важн|Он[аи]?\b|Каждый|Подобн|Такж|Вместе|Кроме|Именно|Если|Предлож|Представлен|Указанн|Методик|Программ|Учебн|Исследова|Результат)')
    listy = len(t) < 200 and not t.endswith(':') and not h and not CONNECT.match(t)
    if (prev.endswith(':') or (in_list and prev.startswith('- ') and not prev.endswith('.'))) and listy:
        out += ['- ' + t.rstrip(';').rstrip('.') + (';' if t.endswith(';') else '')]
        in_list = True; i += 1
        nxt = blocks[i] if i < len(blocks) else None
        nt = ' '.join(nxt) if nxt else ''
        if not nxt or (t.endswith('.') and not re.match(r'^[а-яё0-9]', nt) and len(nt) >= 120) or len(nt) >= 200 or is_heading(nt) or any('\t' in l for l in nxt) or CONNECT.match(nt) or nt.endswith(':'):
            out.append(''); in_list = False
        continue
    if in_list: out.append(''); in_list = False
    out += [t, '']
    i += 1
md = '\n'.join(out)
md = re.sub(r'\n{3,}', '\n\n', md)
open(dst, 'w', encoding='utf-8').write(md.strip() + '\n')
print(dst, md.count('\n## '), 'h2', md.count('\n### '), 'h3', md.count('\n|---'), 'tables', md.count('\n- '), 'li')
