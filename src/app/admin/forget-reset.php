<?php
/**
 * 重置密码（超级管理员密码）
 */
return function () {
    $vcode = intval($_POST['vcode']);
    if (session('forget_vcode') !== $vcode) {
        Response::error('验证码有误，请重新输入～');
    }

    $pass = password_hash($_POST['pass'], PASSWORD_DEFAULT);
    if (db()->update('admin', ['pass' => $pass], ['id', '=', 1])) {
        Response::success();
    } else {
        Response::error('密码更新失败，请稍后重试～');
    }
};