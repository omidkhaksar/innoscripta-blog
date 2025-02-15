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
