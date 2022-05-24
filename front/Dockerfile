FROM nginx
RUN mkdir /app
WORKDIR /app
ADD ./build ./build
RUN rm /etc/nginx/conf.d/*
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]

