<?php
return function () {
    define('MAGIC_QUOTES_GPC', ini_set('magic_quotes_runtime', 0) ? true : false);
    define('DS', DIRECTORY_SEPARATOR);

    (require APP_PATH . 'api/cors.php')();
    require ROOT_PATH . 'vendor/autoload.php';
    require APP_PATH . 'api/v1/db.php';
    require APP_PATH . 'api/v1/restler.php';

    $r = new Restler(true);
    $r->setSupportedFormats('JsonFormat');
    $r->addAuthenticationClass('TokenAuth');
    $r->addAPIClass('Admin', 'api/v1/admin');
    $r->addAPIClass('Site', 'api/v1/site');
    $r->addAPIClass('Item', 'api/v1/item');
    $r->addAPIClass('Goods', 'api/v1/goods');
    $r->addAPIClass('GoodsSpec', 'api/v1/goodsspec');
    $r->addAPIClass('Page', 'api/v1/page');
    $r->addAPIClass('Trash', 'api/v1/trash');
    $r->addAPIClass('Finder', 'api/v1/finder');
    $r->addAPIClass('Message', 'api/v1/message');
    $r->addAPIClass('Uploader', 'api/v1/uploader');
    $r->addAPIClass('Backup', 'api/v1/backup');
    $r->addAPIClass('Fonts', 'api/v1/fonts');

    $r->addAPIClass('site\Js', 'api/v1/site/js');
    $r->addAPIClass('site\Css', 'api/v1/site/css');
    $r->addAPIClass('site\Php', 'api/v1/site/php');
    $r->addAPIClass('site\I18n', 'api/v1/site/i18n');
    $r->addAPIClass('site\CosSync', 'api/v1/site/cossync');
    $r->addAPIClass('site\Sitemap', 'api/v1/site/sitemap');

    $r->handle();
};
