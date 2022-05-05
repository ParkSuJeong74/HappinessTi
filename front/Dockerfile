FROM nginx
FROM node:16
WORKDIR /
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
COPY . .
RUN rm /etc/nginx/conf.d/*
COPY ./nginx.conf /etc/nginx/conf.d
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
