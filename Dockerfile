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

RUN mkdir -p ./public && cp -r /usr/src/app/frontendReactShop/dist/* ./public/

EXPOSE 3000

CMD ["bun", "run", "src/index.ts"]