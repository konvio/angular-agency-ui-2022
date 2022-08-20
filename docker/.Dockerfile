FROM nginx:latest

COPY  ./dist/angular-agency-ui /usr/share/nginx/html
COPY ./docker/conf.nginx /etc/nginx/conf.d/default.conf

EXPOSE 80
