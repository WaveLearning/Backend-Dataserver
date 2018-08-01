#!/bin/bash

#This script only applies to the case of using docker-machine to deploy
docker rmi -f wavelearning-image
docker rm -f wave-server
docker build -t wavelearning-image .
docker run --name wave-server -p 80:3000 wavelearning-image``
