FROM node:18-alpine
WORKDIR /home/app/
COPY package.json .
RUN yarn install
COPY . .
EXPOSE ${PORT}
CMD yarn run start:dev
