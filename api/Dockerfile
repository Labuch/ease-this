FROM node:17

RUN npm i -g npm@6.14.15

RUN npm i -g @nestjs/cli

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["nest", "start", "--watch"]