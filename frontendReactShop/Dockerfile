FROM oven/bun:1.1.13-alpine AS build
WORKDIR /usr/src/app
COPY . .
RUN bun install
RUN bun run build

FROM nginx:1.25-alpine
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]