# Use an official Node runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for installing dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Optional: Install 'serve' globally
RUN npm install -g serve

# Copy the node_modules directory into the container
COPY ./node_modules /usr/src/app/node_modules

# Copy the 'dist' directory contents into the container at /usr/src/app/dist
COPY ./dist /usr/src/app/dist

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run the app when the container launches
CMD ["npm", "start"]
