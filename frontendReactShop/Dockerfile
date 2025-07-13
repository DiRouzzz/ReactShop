FROM oven/bun:1.1.13-alpine

WORKDIR /usr/src/app

COPY package.json bun.lock ./

RUN bun install

COPY . .

RUN VITE_API_URL=http://94.198.216.234 bun run build