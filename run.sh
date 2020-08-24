#! /bin/sh
docker run --rm -v="$PWD:/srv/jekyll" -p 4000:4000 -it jekyll/minimal:latest jekyll serve --livereload
