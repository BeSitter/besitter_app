FROM node:14-alpine as builder

WORKDIR /usr/src/app

COPY ./package.json ./
RUN npm install
COPY ./ ./
RUN npm run build
CMD ["sh", "-c", "npm run typeorm migration:run;npm run start:prod"]