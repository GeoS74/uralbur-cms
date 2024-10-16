FROM nginx
# COPY default.conf /etc/nginx/conf.d/default.conf
# COPY default.conf.template /etc/nginx/templates/default.conf.template
COPY build /usr/share/nginx/html
