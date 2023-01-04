FROM node:14-alpine as builder

WORKDIR /usr/src/app

COPY ./package.json ./
RUN npm install
RUN npm cache clean --force
COPY ./ ./
RUN npm run build
# CMD ["sh", "-c", "npm run typeorm migration:run;node dist/main.js"]

FROM node:14-alpine as launcher

COPY --from=builder /usr/src/app .

CMD ["sh", "-c", "npm run typeorm migration:run;npm run start:prod"]