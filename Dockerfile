# Building stage

FROM node:12.17.0 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig*.json ./
COPY ./src ./src
RUN npm ci --quiet && npm run build

# Production stage

FROM node:12.17.0-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
COPY ./client ./client
RUN npm ci --quiet --only=production

COPY --from=builder /usr/src/app/build ./build

CMD [ "node", "/app/build/index.js" ]
