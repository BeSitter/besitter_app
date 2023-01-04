# DOCKERFILE TO BE USED DURING DEV ONLY
FROM node:16-alpine

WORKDIR /usr/src/app

COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

CMD ["node", "dist/index.js"]