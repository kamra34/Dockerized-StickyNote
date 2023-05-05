#!/bin/bash

docker stop $(docker ps -a -q)

docker rm /sticky_note_container

docker build -t dockerized_stickynote .

# Run the Docker container
docker run -d -p 5000:5000 -v ${PWD}/db:/app/db -e DATABASE_URI=sqlite:////app/db/users.db --name sticky_note_container dockerized_stickynote

# Wait for the container to start
sleep 5

# Run the 'flask database create-tables' command inside the container
docker exec -it sticky_note_container flask database create-tables

# Output the container logs
docker logs -f sticky_note_container