FROM node:16

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install

Copy . .

EXPOSE 3001

CMD ["docker-compose", "up"]
