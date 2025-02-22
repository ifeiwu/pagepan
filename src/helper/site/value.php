<?php
// 通过字段 name 返回 value
return function ($name) {
    return db()->column('site', 'value', ['name', '=', $name]);
};