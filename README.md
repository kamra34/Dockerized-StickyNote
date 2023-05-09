# Real-Time Sticky Note Application
This repository contains a real-time sticky note web application built using Python, Flask, and SQLite. The application allows users to create and manage their notes, groups, and members with different roles.

## Prerequisites

- Docker installed on your system.

## Setup and Running the Application

1. Clone the repository:
git clone <repository_url>
cd <repository_directory>

### Automatic deployment
2. Run the update_docker.sh script to automatically build and run the container "sticky_note_container"

### manual Deployment
2. Build the Docker image:
docker build -t dockerized_stickynote .

 Run the Docker container with the following command:
docker run -d -p 5000:5000 -v ${PWD}/db:/app/db -e DATABASE_URI=sqlite:////app/db/users.db --name sticky_note_container dockerized_stickynote

This command maps port 5000 on the host to port 5000 on the container, mounts the `db` directory, and sets the `DATABASE_URI` environment variable.

 In another terminal, create the database tables:

docker exec -it sticky_note_container flask database create-tables

If you want to see logs in realtime:
docker logs -f sticky_note_container


3. Visit http://localhost:5000/login to manage groups, members, and notes. 

4. Visit http://localhost:5000/eink-login to see only the board without management functionalities.

## Stopping and Removing the Container

To stop and remove the container, run the following commands:

docker stop sticky_note_container
docker rm sticky_note_container


## Features
- User roles: When a new user registers, they are assigned the role of admin. The admin can add new members using their email and password. Members have restricted roles compared to admin.

- Group management: The admin can create and delete groups and members. Members can create groups and assign notes to them but cannot delete existing groups.

- Note management: Both members and admin can see the notes and groups of notes created by each other. The eink board gets updated automatically using Flask websocket as soon as any changes are made in the webapp.

## Dockerfile
The Dockerfile installs the requirements listed in requirements.txt, which includes all the necessary packages and libraries for running the application.
