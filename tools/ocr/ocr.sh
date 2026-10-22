#!/bin/bash
# usage: ocr.sh file.pdf prefix pages
f=$1; p=$2; n=$3
mkdir -p out/$p
seq 1 $n | xargs -P 2 -I{} bash -c '
 i=$(printf "%03d" {});
 [ -s out/'$p'/$i.txt ] && exit 0;
 pdftoppm -r 300 -gray -f {} -l {} -singlefile '$f' /tmp/claude-0/'$p'-$i;
 OMP_THREAD_LIMIT=1 tesseract /tmp/claude-0/'$p'-$i.pgm out/'$p'/$i --tessdata-dir tessdata -l rus+eng --psm 3 >/dev/null 2>&1;
 rm -f /tmp/claude-0/'$p'-$i.pgm'
echo DONE $p
