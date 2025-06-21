FROM serversideup/php:8.2-fpm-nginx-alpine-v3.5.2

# Switch to root so we can do root things
USER root

# Install extension with root permissions
RUN install-php-extensions apcu gd exif

# 设置时区环境变量
ENV TZ=Asia/Shanghai
# 安装 tzdata 包，其中包含时区信息
RUN apk update && apk add tzdata
# (可选) 创建 /etc/localtime 链接
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Drop back to our unprivileged user
USER www-data