FROM node:16-alpine AS builder

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY ./ /app/

RUN npm run build && ls -alh /app/dist/

FROM nginx:alpine as serv

COPY --from=builder /app/dist/ /usr/share/nginx/html

