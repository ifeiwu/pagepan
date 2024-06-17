FROM serversideup/php:8.3-fpm-nginx-alpine-v3.1.1

# Switch to root so we can do root things
USER root

# Install extension with root permissions
RUN install-php-extensions apcu gd exif

# Drop back to our unprivileged user
USER www-data