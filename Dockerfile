FROM oven/bun:1.1.13-alpine

WORKDIR /usr/src/app

COPY ./frontendReactShop ./frontendReactShop
COPY ./backendReactShop ./backendReactShop

WORKDIR /usr/src/app/frontendReactShop
RUN bun install
RUN bun run build

WORKDIR /usr/src/app/backendReactShop
RUN apk add --no-cache libstdc++
RUN bun install
RUN bun run build


EXPOSE 3000

CMD ["bun", "run", "dist/index.js"]
