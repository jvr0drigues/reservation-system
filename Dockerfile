FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json from the project root to the working directory
COPY package*.json ./

# Install dependencies
ARG NODE_ENV=production
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi

# Copy the app source code from the project root to the working directory
COPY app ./app

# Copy tsconfig.json from the project root
COPY tsconfig.json ./

# Build the TypeScript code
ENV NODE_ENV=developmen

# Expose the port the app runs on
EXPOSE 3000

# Command to run the app
CMD ["npm", "dist/server.js"]
