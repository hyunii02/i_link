# test 16
FROM node:16.15.0 as build-stage

WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app
RUN npm run build

FROM nginx
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
COPY /config/default.conf /etc/nginx/conf.d
EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
