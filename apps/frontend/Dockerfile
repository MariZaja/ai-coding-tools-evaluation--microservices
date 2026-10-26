# Use the official Node.js image as the base image
FROM node:23.1.0-alpine

WORKDIR /app

COPY ./apps/frontend/package*.json .

RUN npm install --force && npm cache clean --force 

COPY . .

CMD ["npm", "run", "fe:start"]
