# Stage 1: Build an Angular Docker Image
FROM node:20.10.0 AS build
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY . /app
RUN npm run build

# Stage 2: Use the compile app (which is ready for production) with Nginx
FROM nginxinc/nginx-unprivileged:1.21.4
COPY --from=build /app/dist/frontend/browser/ /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf
