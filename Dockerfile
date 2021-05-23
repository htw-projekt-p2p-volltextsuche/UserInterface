# syntax=docker/dockerfile:1

FROM node:14

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --production

COPY . .

CMD ["npm", "start"]