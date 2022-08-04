FROM node:16.15.0

WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

COPY package.json /usr/src/app
RUN npm install

RUN npm install -g pm2

COPY . /usr/src/app

EXPOSE 8000 8443
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
