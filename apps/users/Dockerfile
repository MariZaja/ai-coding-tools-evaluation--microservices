# Use the official Node.js image as the base image
FROM node:23.1.0-alpine

RUN npm --version

WORKDIR /app

COPY package*.json .

RUN npm install --force && npm cache clean --force 

COPY . .

CMD ["npm", "run", "us:start"]
