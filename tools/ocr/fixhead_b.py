import re,sys
p=sys.argv[1]; bl=open(p,encoding='utf-8').read().split("\n\n")
H2=[(r'^(#+ )?Современное состояние','Современное состояние российской ювелирной отрасли'),
    (r'^(#+ )?Проблемы ювелира-художника','Проблемы ювелира-художника'),
    (r'^(#+ )?Зарубежная ювелирная отрасль','Зарубежная ювелирная отрасль'),
    (r'^(#+ )?Список литературы','Литература')]
out=[]; used=set(); skipcont=False
def nextText(i):
    for b in bl[i+1:]:
        if not b.startswith('<!--'): return b
    return ''
for i,b in enumerate(bl):
    s=b.strip()
    if skipcont and re.match(r'^(российской ювелирной отрасли)$',s): skipcont=False; continue
    skipcont=False
    hit=False
    for k,(rx,t) in enumerate(H2):
        if k not in used and re.match(rx,s) and len(s)<80:
            out.append('## '+t); used.add(k); hit=True; skipcont=True; break
    if hit: continue
    s=re.sub(r'^#+\s*','',s)
    nxt=nextText(i)
    if (not s.startswith('<!--') and len(s)<75 and re.match(r'^[А-ЯЁA-Z«]',s) and not re.search(r'[.,;:!?]$',s)
        and not re.match(r'^\d',s) and nxt and not nxt.startswith('#') and len(nxt)>60):
        out.append('### '+s); continue
    out.append(s)
print('h2',len(used))
open(p,'w',encoding='utf-8').write("\n\n".join(out))
