# Full-Stack Application Setup

## Overview
This project consists of two main parts: the backend server and the frontend client. To get the application running locally, you'll need to follow the steps below.

## Prerequisites

Before starting, make sure you have the following installed on your machine:

- [Docker](https://docs.docker.com/get-docker/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/)

## Setup Instructions

### Step 1: Start Docker Services

First, you'll need to bring up the necessary Docker services (like the database and other dependencies) using Docker Compose.

1. `docker-compose up -d`

2. `cd /server`
   `yarn start:dev`

3. `cd ../client`
   `yarn start dev`