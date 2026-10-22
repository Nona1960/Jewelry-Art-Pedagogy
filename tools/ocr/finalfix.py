import re,sys
FIX={"HU":"ни","HE":"не","OCHOBE":"основе","OPM":"при","IPH":"при","CBOE":"свое","MacTepoB":"мастеров","TOJIBKO":"только",
"OCHOBOM":"основном","TeX":"тех","Poccun":"России","Korma":"когда","€CTh":"есть","HX":"их","BOKPYr":"вокруг","COCTOMT":"состоит",
"OCHOBBI":"основы","HUM":"ним","TeM":"тем","Tema":"Тема","CO":"со","BXOJAAT":"входят","HW":"ни","IO":"Ю","lO":"Ю","Ta":"та","opm":"при","JO":"до","CBOC":"свое","cpene":"среде","Makpo":"макро","WMEIOT":"имеют","Beka":"века","WM":"им","HEM":"нем","TOMY":"тому","TIO":"по","TEM":"тем","OHA":"она","WMH":"им","OCHOB":"основ","Moms":"Моль"}
for p in sys.argv[1:]:
    t=open(p,encoding='utf-8').read()
    t=re.sub(r'(^|\s)®\s*', r'\1• ', t)
    t=t.replace('©','')
    t=re.sub(r'(?<=[\s.\-–—])[иM]\.(?=\s?:)', 'М.', t)
    t=re.sub(r'(?<=[\s.\-–—])[иM]\.,', 'М.,', t)
    def rep(m):
        w=m.group(0); return FIX.get(w,w)
    t=re.sub(r'(?<![\w/.])[A-Za-z€]+(?![\w/])', rep, t)
    t=re.sub(r'\. — (?=[А-ЯЁ])','. ',t)
    t=re.sub(r'(?<=[а-яё])- (?=[а-яё])','-',t)
    t=t.replace('`','').replace(' | ',' ')
    t=re.sub(r'\{(\d+)\]', r'[\1]', t); t=re.sub(r'\[(\d+)\|', r'[\1]', t)
    t=re.sub(r'[ \t]{2,}',' ',t)
    open(p,'w',encoding='utf-8').write(t)
