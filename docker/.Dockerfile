FROM nginx:latest

COPY  ./dist/angular-agency-ui /usr/share/nginx/html
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
