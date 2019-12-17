#! /bin/bash

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker build -t "$DOCKER_IMAGE_NAME":$TRAVIS_BRANCH .
docker push "$DOCKER_IMAGE_NAME":$TRAVIS_BRANCH 