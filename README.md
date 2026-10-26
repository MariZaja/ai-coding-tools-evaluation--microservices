# Garden Genius
Garden Genius is an app designed to help gardeners maintain their plants efficiently. It allows users to create and manage gardens, receive care notifications, and explore a database of plants with comprehensive care instructions.

## Project Overview
**Garden Genius** is divided into several microservices to handle different aspects of the app. The app includes:

- **User Management:** Handles user authentication and profile management.
- **Gardens Management:** Provides information about different plant species and their care requirements and allows users to create and manage their personal gardens.
- **Plants:** Manages plants.

The app's backend is built using **NestJS** with **PostgreSQL** as the database, and the frontend is developed using **React.js**. The project is structured as a monorepo to maintain a cohesive codebase for all microservices.

## Tech Stack
Frontend: React.js\
Backend: NestJS (REST API)\
Language: TypeScript\
Database: PostgreSQL (via Docker)

## Prerequisites
Node.js (version 20 or higher)

## Installation
1. Clone the Repository:

```bash
$ git clone https://github.com/your-repo/garden-genius.git
$ cd garden-genius
```

## Docker Setup

Before running the Docker setup, ensure you create a `.env` file based on `.env.example` and load the environment variables:

```bash
$ cp .env.example .env
$ source .env
```

### Running Docker Compose

To start the application using Docker Compose, run:

```bash
$ docker-compose up -d
```

This command will build and start all the services defined in the `docker-compose.yml` file.

### Stopping Containers

To stop the running containers, use:

```bash
$ docker-compose down
```

### Rebuilding Containers

If you need to rebuild the containers (for example, after making changes to the Dockerfile or dependencies), run:

```bash
$ docker-compose up --build -d
```

### Removing Docker Elements

To remove all containers, networks, and volumes created by Docker Compose, use:

```bash
$ docker-compose down --volumes
```

This command will stop and remove all containers, networks, and volumes defined in the `docker-compose.yml` file.

### Pruning Docker System

To remove all unused containers, networks, images (both dangling and unreferenced), and optionally, volumes, you can use the following command:

```bash
$ docker system prune --all --volumes
```

This command will free up space by removing all unused Docker data.

## Local development
### Install Dependencies:

```bash
$ npm install
```

#### 1. Running Microservices Individually
Each microservice is located in its respective folder within the src/ directory. To start a specific microservice:

```bash
$ npm run <microservice-shortcut>:start
```

Replace `<microservice-shortcut>` with one of the following:

- `users -> us`
- `species -> sp`
- `gardens -> `


#### 2. Running All Microservices Simultaneously
To run all microservices together, you can use the following command:

```bash
$ npm run start:all
```

## Project Structure
```bash
garden-genius/
│
├── apps/
│   ├── users/          # Microservice handling user management and authentication
│   ├── species/        # Microservice for plant database and species information
│   ├── gardens/        # Microservice for garden management
│   └── frontend/       # React frontend application
```

## Purpose and Goals

Garden Genius aims to streamline the gardening experience by offering personalized plant care information and notifications. The project is built with microservices to ensure flexibility, scalability, and maintainability.

## Author of README
ChatGPT, Github Copilot