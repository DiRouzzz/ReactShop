FROM oven/bun:1.1.13-alpine

WORKDIR /usr/src/app

COPY ./backendReactShop ./backendReactShop

WORKDIR /usr/src/app/backendReactShop
RUN apk add --no-cache libstdc++
RUN bun install

EXPOSE 3000

WORKDIR /usr/src/app/backendReactShop
CMD ["bun", "serve"]