FROM node:14.13.1

WORKDIR /
COPY package.json ./

RUN apt-get update \
    && apt-get install -qq build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev

RUN npm install -g tsc
RUN npm install
COPY . .
RUN npm run build
