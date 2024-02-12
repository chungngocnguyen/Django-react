FROM node:alpine as build-stage

WORKDIR /app
COPY . .

RUN npm install

RUN npm run build


FROM nginx:1.17-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]