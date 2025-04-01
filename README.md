## 本地开发环境

### 构建容器
```text
docker build -t pagepan/php8.3 .
# 设置代理
docker build --build-arg http_proxy=http://43.154.193.127:11100 --build-arg https_proxy=http://43.154.193.127:11100 -t pagepan/php8.3 .
```
### 运行容器
```text
docker run -d --restart=unless-stopped --hostname=dev --name site-pagepan -p 8088:8080 -v /d/www/pagepan/src:/var/www/html -e PHP_DATE_TIMEZONE="PRC" -e SSL_MODE="off" pagepan/php8.3
```

## 安装项目依赖并优化自动加载器，常用于生产环境。
```text
composer install --no-dev --optimize-autoloader
```