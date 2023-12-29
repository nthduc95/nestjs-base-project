FROM node:16.10 as build-stage

ARG PORT=3000

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

# Install dependencies
COPY package.json .
RUN npm install && npm cache clean --force

# Copy source
COPY . .
RUN npm run build

EXPOSE $PORT

CMD [ "npm", "run", "start:prod" ]
