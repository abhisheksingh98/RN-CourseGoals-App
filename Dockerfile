# Use a Node.js base image
FROM node:20-slim

# Set working directory
WORKDIR /app

# Install system dependencies for Expo and sharp
RUN apt-get update && apt-get install -y \
    git \
    libvips-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install dependencies with legacy-peer-deps (to match your local setup)
RUN npm install --legacy-peer-deps

# Copy the rest of the application
COPY . .

# Expo ports
EXPOSE 8081

# Command to start the bundler
# We use --host lan or --tunnel to make it accessible from outside the container
CMD ["npx", "expo", "start", "--port", "8081"]
