import re, json, os
from bs4 import BeautifulSoup
from PIL import Image
SITE='/home/claude/jewelry-art-pedagogy'
SLUG='gemmologiya-ch1'
imgdir=f'{SITE}/public/books/{SLUG}'; os.makedirs(imgdir,exist_ok=True)
soup=BeautifulSoup(open('raw.html',encoding='utf-8').read(),'html.parser')
body=soup.body or soup
# 1. drop front matter up to "Введение" heading
start=None
for el in body.find_all(['h1','h2','h3','h4','h5','h6']):
    if el.get_text(strip=True).startswith('Введение'): start=el; break
for sib in list(start.find_previous_siblings()): sib.decompose()
TR={'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'e','ж':'zh','з':'z','и':'i','й':'y','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'h','ц':'c','ч':'ch','ш':'sh','щ':'sch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya'}
used=set()
def slug(t):
    b=re.sub(r'[^a-z0-9]+','-',''.join(TR.get(c,c) for c in t.lower())).strip('-')[:60] or 'razdel'
    i=b; k=2
    while i in used: i=f'{b}-{k}'; k+=1
    used.add(i); return i
SUB3=('Принципы оценки','Диагностика и оценка драгоценных камней','Алмазы и бриллианты','Изумруд','Группа корунда','Александрит')
# 2. headings
for h in body.find_all(['h1','h2','h3','h4','h5','h6']):
    t=re.sub(r'\s+',' ',h.get_text(' ',strip=True))
    h.name = 'h2' if h.name in ('h1','h2','h3') else 'h3'
    h.attrs={}; h.string=t
for p in body.find_all('p'):
    t=re.sub(r'\s+',' ',p.get_text(' ',strip=True))
    strongs=p.find_all(['strong','b'])
    only_bold = strongs and sum(len(s.get_text(strip=True)) for s in strongs) >= len(t.replace(' ',''))-1 if t else False
    if not t or not only_bold or len(t)>120: continue
    if t.startswith('Вопросы к разделу'): p.name='h4'
    elif t.startswith('Перечень использованных источников'): p.name='h2'
    elif t.startswith(SUB3): p.name='h3'
    else: continue
    p.attrs={}; p.string=t
toc=[]
for h in body.find_all(['h2','h3','h4']):
    h['id']=slug(h.get_text())
    if h.name!='h4': toc.append({'id':h['id'],'text':h.get_text(),'level':int(h.name[1])})
# 3. images
n=0
for img in body.find_all('img'):
    src=img['src']; base=os.path.splitext(os.path.basename(src))[0]
    im=Image.open(src).convert('RGB'); im.thumbnail((1400,1400))
    out=f'{imgdir}/{base}.webp'; im.save(out,quality=84)
    img.attrs={'src':f'/books/{SLUG}/{base}.webp','alt':img.get('alt') or 'Иллюстрация к учебному пособию «Геммология»','loading':'lazy','width':str(im.width),'height':str(im.height)}
    n+=1
# 4. tables: strip styles, wrap
for tb in body.find_all('table'):
    for el in tb.find_all(True):
        for a in ('style','width','class'): el.attrs.pop(a,None)
    tb.attrs={}
    w=soup.new_tag('div'); w['class']='table-wrap'; tb.wrap(w)
for el in body.find_all(True):
    if el.name not in ('img','td','th') : el.attrs.pop('style',None)
    if el.name in('td','th'):
        keep={k:v for k,v in el.attrs.items() if k in('colspan','rowspan')}; el.attrs=keep
html=''.join(str(c) for c in body.contents)
html=re.sub(r'\n{2,}','\n',html)
open(f'{SITE}/content/{SLUG}.html','w',encoding='utf-8').write(html)
json.dump(toc,open(f'{SITE}/content/{SLUG}.toc.json','w',encoding='utf-8'),ensure_ascii=False,indent=1)
words=len(BeautifulSoup(html,'html.parser').get_text(' ').split())
print('images',n,'toc',len(toc),'words',words)
for t in toc: print(t['level'],t['text'][:90])
