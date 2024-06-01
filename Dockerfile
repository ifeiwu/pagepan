FROM serversideup/php:8.3-fpm-nginx-alpine

# Switch to root so we can do root things
USER root

# Install the imagick extension with root permissions
RUN install-php-extensions apcu gd

# Drop back to our unprivileged user
USER www-data