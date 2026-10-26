# Use the official Node.js image as the base image
FROM node:23.1.0-alpine as build

WORKDIR /app

COPY package*.json .

RUN npm install --force

COPY . .

RUN npm run build

FROM node:23.1.0-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json .

RUN npm install --omit dev --force && npm cache clean --force 

COPY . .

COPY --from=build /app/dist ./dist

CMD ["node", "dist/apps/gar-api-gateway/main"]
