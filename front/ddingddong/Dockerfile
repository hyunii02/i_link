# test 10
FROM node:16.15.0 as build-stage

WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app
RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
