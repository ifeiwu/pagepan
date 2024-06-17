# 本地开发
```text
docker build -t pagepan/php8.3 .
docker run -d --restart=unless-stopped --hostname=dev --name site-pagepan -p 8088:8080 -v /d/www/pagepan/src:/var/www/html -e PHP_DATE_TIMEZONE="Asia/Shanghai" -e SSL_MODE="off" pagepan/php8.3
```

build 镜像时使用代理。注：牛道主机docker需要开启goproxy代理
```text
docker build --build-arg http_proxy=http://43.154.193.127:11111 --build-arg https_proxy=http://43.154.193.127:11111 -t pagepan/php8.3 .
```