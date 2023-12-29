FROM node:16.10 as build-stage

ARG PORT=3000

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json .
RUN npm install --legacy-peer-deps && npm cache clean --force

# Bundle app source
COPY . .

EXPOSE $PORT

CMD [ "npm", "run", "start:prod" ]
