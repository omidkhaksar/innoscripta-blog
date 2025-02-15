
# Innoscripta Blog

Innoscripta Blog is a Next.js 15 app designed for blog-related content, with features like a responsive design, smooth animations, and state management using Redux Toolkit. The project is containerized using Docker for both development and production environments.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Docker Setup](#docker-setup)
- [Project Structure](#project-structure)
- [Scripts](#scripts)

## Getting Started

### Prerequisites

- Docker
- Yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/innoscripta-blog.git
   ```

2. Navigate to the project directory:
   ```bash
   cd innoscripta-blog
   ```

3. Install dependencies:
   ```bash
   yarn install
   ```

4. Start the development server:
   ```bash
   yarn dev
   ```

Now, open your browser and go to `http://localhost:3001` to see the application.

## Development Setup

To run the development server locally, use the following command:

```bash
yarn dev
```

This will start the Next.js app with Turbopack on port 3001.

## Docker Setup

To run the application using Docker, follow these steps:

1. Build the Docker image:
   ```bash
   docker build -t innoscripta-blog .
   ```

2. Start the container:
   ```bash
   docker-compose up
   ```

This will run the application in a Docker container on port 3001.

### Docker Compose

The `docker-compose.yml` file provides a simple configuration for running the app in development mode. It mounts the current directory as a volume and installs dependencies, making it easier to develop within the container.

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3001:3001"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    command: ["yarn", "dev"]
```

### Dockerfile

The Dockerfile is used to build the production image:

```dockerfile
# Use Node.js as base image
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the entire project
COPY . .

# Build the Next.js application
RUN yarn build

# Expose the port Next.js runs on
EXPOSE 3001

# Start the application
CMD ["yarn", "start"]
```

## Project Structure

- `docker-compose.yml`: Configuration for running the app with Docker.
- `Dockerfile`: Instructions to build the Docker image.
- `package.json`: The main project dependencies and scripts.
- `pages/`: The Next.js pages directory.
- `public/`: Public assets like images and fonts.
- `styles/`: CSS and Tailwind styles.
- `components/`: Reusable components for the blog.

## Scripts

Here are the available scripts in the project:

- `dev`: Start the development server with Turbopack.
  ```bash
  yarn dev
  ```

- `build`: Build the Next.js application for production.
  ```bash
  yarn build
  ```

- `start`: Start the application in production mode.
  ```bash
  yarn start
  ```

- `lint`: Run the linting tools on the codebase.
  ```bash
  yarn lint
  ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
