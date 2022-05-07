FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
EXPOSE 5005
CMD [ "yarn", "start" ]
