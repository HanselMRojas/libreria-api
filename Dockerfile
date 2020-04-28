FROM node:erbium
LABEL Hansel M. Rojas <co.hanselmorales@gmail.com>

WORKDIR /libreria-api
COPY ./package.json ./package.json
RUN npm install --production-only

COPY ./ ./
CMD npm start
EXPOSE 3000
