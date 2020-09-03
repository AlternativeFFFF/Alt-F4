#! /bin/sh
docker run --rm -v="$PWD:/srv/jekyll" -p 4000:4000 -it jekyll/jekyll:latest jekyll serve --drafts
