<?php
/**
 * 数据处理页面，例如：/!/upload 或者 /!/upload/image
 * @param string $name 页面名称
 */
return function ($name) {
    view()->display($name);
};