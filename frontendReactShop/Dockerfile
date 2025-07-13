FROM oven/bun:1.1.13-alpine

WORKDIR /usr/src/app

# Копируем package.json и bun.lock сначала для лучшего кэширования
COPY package.json bun.lock ./

# Устанавливаем зависимости
RUN bun install

# Копируем исходный код
COPY . .

# Собираем приложение
RUN bun run build

# Устанавливаем nginx для раздачи статических файлов
RUN apk add --no-cache nginx

# Создаем необходимые директории
RUN mkdir -p /usr/share/nginx/html

# Копируем собранные файлы в папку nginx
RUN cp -r dist/* /usr/share/nginx/html/

# Создаем простую конфигурацию nginx
RUN echo 'server { listen 80; root /usr/share/nginx/html; index index.html; location / { try_files $uri $uri/ /index.html; } }' > /etc/nginx/http.d/default.conf

EXPOSE 80

# Запускаем nginx
CMD ["nginx", "-g", "daemon off;"]