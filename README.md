# 本地开发
```text
docker build -t pagepan/php8.3-gd .
docker run -d --restart=unless-stopped --hostname=dev --name site-pagepan -p 8088:8080 -v /d/www/pagepan/src:/var/www/html -e PHP_DATE_TIMEZONE="Asia/Shanghai" -e SSL_MODE="off" pagepan/php8.3-gd
```
