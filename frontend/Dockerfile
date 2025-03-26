# Build stage
FROM node:16-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:16-alpine
WORKDIR /app
COPY --from=build /app/build ./build
COPY package*.json ./
RUN npm install --production
COPY server.js .

EXPOSE 80
CMD ["node", "server.js"] 