#!/bin/sh

rsync -av -r -c --progress ./src ./docker --exclude node_modules --exclude npm_debug.log --delete-excluded
docker build --tag "expressjs-boilerplate" --rm=true --force-rm=true --no-cache=true ./docker/
rm -Rf ./docker/src