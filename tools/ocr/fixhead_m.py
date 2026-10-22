import re,sys
p=sys.argv[1]; blocks=open(p,encoding='utf-8').read().split("\n\n")
CANON=[
 (r"^(#+ )?Введение$", "## Введение", None),
 (r"^(#+ )?Глава 1\.", "## Глава 1. Исторические особенности и современное состояние профессионального образования в области ювелирного искусства в России", None),
 (r"^(#+ )?1\.1\.", "### 1.1. Социокультурные позиции общества в отношении традиционных видов ювелирного искусства и образования в этой области", None),
 (r"^(#+ )?1\.2\.", "### 1.2. Историческое своеобразие социодинамики российской ювелирной культуры", None),
 (r"^(#+ )?1\.3\.", "### 1.3. Социокультурный анализ развития профессионального образования в области ювелирного искусства в России", None),
 (r"^(#+ )?Глава 2\.", "## Глава 2. Разработка социокультурной концепции профессионального образования в области ювелирного искусства", None),
 (r"^(#+ )?2\.1\.", "### 2.1. Закономерности, принципы и требования к построению социокультурной концепции профессионального образования в области ювелирного искусства", None),
 (r"^(#+ )?2\.2\.", "### 2.2. Структура и содержание концепции профессионального образования в области ювелирного искусства, направленной на развитие социальной культуры средствами традиционных видов данного искусства", None),
 (r"^(#+ )?2\.3\.", "### 2.3. Обоснование структуры и содержания многоуровневого профессионального образования в области ювелирного искусства", None),
 (r"^(#+ )?Глава 3\.", "## Глава 3. Влияние социокультурных факторов на динамику профессионального образования в области традиционного ювелирного искусства", None),
 (r"^(#+ )?3\.1\.", "### 3.1. Социокультурная адаптация как фактор ювелирного культурогенеза, оказывающего воздействие на педагогические основы профессионального образования", None),
 (r"^(#+ )?Заключение$", "## Заключение", None),
]
# split merged blocks: "Глава N ... N.1. ..." and "Список литературы X.Y. 1. ..."
pre=[]
for b in blocks:
    s=b.strip()
    m=re.match(r'^(Глава \d\..*?)\s+(\d\.1\.\s*[А-ЯЁ].*)$',s)
    if m: pre += [m.group(1), m.group(2)]; continue
    m=re.match(r'^(Список литературы\s*\d\.\d\.?)\s+(1\..*)$',s)
    if m: pre += [m.group(1), m.group(2)]; continue
    pre.append(b)
blocks=pre
out=[]; used=set(); ci=0; pending_cont=False; seen4=set()
for b in blocks:
    s=b.strip().replace('4..2.2.','4.2.2.')
    hit=None
    for k,(rx,canon,_) in enumerate(CANON):
        if k not in used and re.match(rx,s,re.I) and len(s)<400:
            hit=k; break
    if hit is not None:
        used.add(hit); ci=len(used); out.append(CANON[hit][1]); pending_cont=True; continue
    # drop heading continuation fragments right after a canonical heading (lowercase start, short)
    if pending_cont and not s.startswith(('<!--','#')) and re.match(r'^[а-яё]',s) and len(s)<220 and not re.search(r'[.!?]$',s):
        pending_cont=False; continue
    if not s.startswith('<!--'): pending_cont=False
    m=re.match(r'^(?:#+\s*)?Список литературы\s*(\d\.\d)?\.?$',s,re.I)
    if m:
        out.append("#### Список литературы" + (f" к разделу {m.group(1)}" if m.group(1) else " к введению")); continue
    m4=re.match(r'^(?:#+\s*)?(4\.[1-4])\.\s+[А-ЯЁ]',s)
    if m4 and m4.group(1) not in seen4 and len(seen4)<4 and not any(x.startswith('#### 4.1.') for x in out[-1:]) and (not seen4 or out[-1].startswith('4.')) :
        seen4.add(m4.group(1)); out.append(re.sub(r'^#+\s*','',s)); continue
    if re.match(r'^#+\s*4\.\d',s) or re.match(r'^4\.\d+\.?\s?\d*\.?\s*[А-ЯЁ]',s) and len(s)<260:
        out.append("#### "+re.sub(r'^#+\s*','',s)); continue
    if s.startswith('#'): s=re.sub(r'^#+\s*','',s)
    out.append(s)
print("matched",ci,"of",len(CANON))
open(p,'w',encoding='utf-8').write("\n\n".join(out))
