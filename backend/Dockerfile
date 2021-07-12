# syntax=docker/dockerfile:1

FROM node:14
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production
RUN apt-get update
RUN apt-get install -y curl
COPY . .

CMD ["node", "index.js"]