FROM node:16.10 as build-stage

ARG PORT=3000

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install --legacy-peer-deps && npm cache clean --force

# Bundle app source
COPY . /usr/src/app

EXPOSE $PORT

CMD [ "npm", "run", "start:prod" ]
