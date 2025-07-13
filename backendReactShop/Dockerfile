FROM oven/bun:1.1.13-alpine

WORKDIR /usr/src/app

COPY . .

RUN apk add --no-cache libstdc++
RUN bun install

EXPOSE 3000

CMD ["bun", "serve"]