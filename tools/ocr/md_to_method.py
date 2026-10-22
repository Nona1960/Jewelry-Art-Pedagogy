"""Convert a methodology article (Markdown) into site content: <slug>.html, <slug>.toc.json, <slug>.meta.json"""
import re, json, subprocess, sys
from bs4 import BeautifulSoup
src, slug = sys.argv[1], sys.argv[2]
SITE='/home/claude/jewelry-art-pedagogy/content/metodiki'
import os; os.makedirs(SITE, exist_ok=True)
md=open(src,encoding='utf-8').read()
title=re.search(r'^#\s+(.+)$',md,re.M).group(1).strip()
sub=re.search(r'^\*\*(.+?)\*\*\s*$',md,re.M)
subtitle=sub.group(1).strip() if sub else ''
ann=re.search(r'^##\s+Аннотация\s*\n(.*?)(?=^##\s)',md,re.M|re.S)
annotation=[]; keywords=''
if ann:
    for para in [p.strip() for p in ann.group(1).split('\n\n') if p.strip()]:
        k=re.match(r'\*\*Ключевые слова:\*\*\s*(.+)',para)
        if k: keywords=k.group(1).strip().rstrip('.')
        else: annotation.append(para)
    md=md.replace(ann.group(0),'')
md=re.sub(r'^#\s+.+$','',md,count=1,flags=re.M)
if sub: md=md.replace(sub.group(0),'',1)
html=subprocess.run(['pandoc','-f','markdown','-t','html5','--wrap=none'],input=md,capture_output=True,text=True,check=True).stdout
soup=BeautifulSoup(html,'html.parser')
TR={'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'e','ж':'zh','з':'z','и':'i','й':'y','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'h','ц':'c','ч':'ch','ш':'sh','щ':'sch','ъ':'','ы':'y','ь':'','э':'e','ю':'yu','я':'ya'}
used=set(); toc=[]
for h in soup.find_all(['h1','h2','h3','h4']):
    if h.name=='h1': h.name='h2'
    t=re.sub(r'\s+',' ',h.get_text()).strip()
    b=re.sub(r'[^a-z0-9]+','-',''.join(TR.get(c,c) for c in t.lower())).strip('-')[:60] or 'razdel'
    i=b;k=2
    while i in used: i=f'{b}-{k}';k+=1
    used.add(i); h.attrs={'id':i}
    if h.name in('h2','h3'): toc.append({'id':i,'text':t,'level':int(h.name[1])})
for tb in soup.find_all('table'):
    for el in tb.find_all(True):
        for a in ('style','class','width'): el.attrs.pop(a,None)
    tb.attrs={}; w=soup.new_tag('div'); w['class']='table-wrap'; tb.wrap(w)
out=str(soup).strip()
open(f'{SITE}/{slug}.html','w',encoding='utf-8').write(out)
json.dump(toc,open(f'{SITE}/{slug}.toc.json','w',encoding='utf-8'),ensure_ascii=False,indent=1)
meta={'title':title,'subtitle':subtitle,'annotation':annotation,'keywords':keywords,
      'words':len(BeautifulSoup(out,'html.parser').get_text(' ').split())}
json.dump(meta,open(f'{SITE}/{slug}.meta.json','w',encoding='utf-8'),ensure_ascii=False,indent=1)
print(title,'|',subtitle[:60],'| toc',len(toc),'| ann',len(annotation),'| words',meta['words'])
