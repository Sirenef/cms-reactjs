# Stage 1 - the build process
FROM node:16-alpine as build

ARG ENV=dev

WORKDIR /app
COPY source/package.json source/package-lock.json ./
RUN npm install
COPY source/ ./
RUN npm run build:$ENV

# Stage 2 - the production environment
FROM nginx:alpine
COPY deploy/docker/app/nginx.conf /etc/nginx/nginx.conf
RUN echo "OK" > /usr/share/nginx/html/healthz

COPY --from=build /app/build /app
