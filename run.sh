#! /bin/sh
docker run --rm -v="$PWD:/srv/jekyll" -p 4000:4000 -p 35729:35729 -it jekyll/jekyll:latest jekyll serve --livereload --drafts
