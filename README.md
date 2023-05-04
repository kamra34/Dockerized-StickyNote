# Sticky Note Application

This repository contains a simple sticky note web application, which allows users to create and manage their notes. The application is built using Python, Flask, and SQLite.

## Prerequisites

- Docker installed on your system.

## Setup and Running the Application

1. Clone the repository:
git clone <repository_url>
cd <repository_directory>

2. Build the Docker image:
docker build -t dockerized_stickynote .

3. Run the Docker container with the following command:
docker run -p 5000:5000 -v ${PWD}/db:/app/db -e DATABASE_URI=sqlite:///db/users.db --name sticky_note_container dockerized_stickynote


This command maps port 5000 on the host to port 5000 on the container, mounts the `db` directory, and sets the `DATABASE_URI` environment variable.

4. In another terminal, create the database tables:

docker exec -it sticky_note_container flask database create-tables


5. The application should now be running at http://localhost:5000. Open your browser and navigate to the URL to start using the application.

## Stopping and Removing the Container

To stop and remove the container, run the following commands:

docker stop sticky_note_container
docker rm sticky_note_container


## Re-running the Application

After stopping and removing the container, you can follow steps 3-5 above to run the application again.

