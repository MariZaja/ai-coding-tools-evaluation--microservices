#!/bin/bash

docker-compose down

docker image rmi "$(docker images | grep 'garden-genius-db' | awk '{print $3}')"

docker volume rm garden-genius_pgdata