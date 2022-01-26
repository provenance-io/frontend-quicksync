FROM nginx:alpine

ADD build/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80/tcp

CMD ["nginx", "-g", "daemon off;"]