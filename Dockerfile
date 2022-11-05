# Test the app in a node.js version 16 environment.
FROM node:16

# Create app directory.
WORKDIR /usr/src/joke-bot

# Install all dependencies.
COPY package*.json ./
RUN npm install

# Copy all the scources to the container.
COPY . .

# Define the command to run the app.
CMD [ "node", "index.js" ]
