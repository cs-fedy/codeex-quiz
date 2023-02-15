FROM node:18-alpine AS common
WORKDIR /home/app/
COPY package.json .
RUN yarn install
COPY . .
EXPOSE ${PORT}

FROM common AS development
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
CMD yarn run start:dev

FROM common AS production
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
CMD yarn run start