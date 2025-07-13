FROM oven/bun:1.1.13-alpine

WORKDIR /usr/src/app

COPY package.json bun.lock ./

RUN bun install

COPY . .

RUN cp .env.production .env

RUN bun run build