#!/usr/bin/env bash

echo Building docker container from the image ...
sh build.sh
echo Done building the container. Running the container now ...
sh run.sh
echo App is now running on localhost:3030