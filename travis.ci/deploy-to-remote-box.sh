#! /bin/bash

if [ "$TRAVIS_PULL_REQUEST" = "false" ]
then
scp -oStrictHostKeyChecking=no ./deploy/$COMPOSE_FILE root@$SERVER_IP:~/docker-compose.yml
ssh root@$SERVER_IP "docker-compose pull api && docker-compose down && docker-compose up -d api"
fi