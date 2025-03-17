#!/bin/bash

for i in {1..10}
do
  echo "commit $i" >> fakefile.txt
  git add .
  
  # Random date or set your own
  GIT_AUTHOR_DATE="2024-02-0$iT12:00:00" \
  GIT_COMMITTER_DATE="2024-02-0$iT12:00:00" \
  git commit -m "commit number $i"
done
