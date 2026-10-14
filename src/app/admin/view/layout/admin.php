<?php
$route = request()->path();
/*if (str_starts_with($route, '/account/')){
    $top_title = '个人中心';
    $menus = [
        '/account/profile' => '个人资料',
        '/account/order' => '我的订单',
        '/account/address' => '收货地址',
        '/account/settings' => '帐号设置',
    ];
} elseif (str_starts_with($route, '/manager/')) {
    $top_title = '店铺管理';
    $menus = [
        '/manager/store' => '基本信息',
        '/manager/work' => '作品管理',
        '/manager/category' => '作品分类',
        '/manager/order' => '客户订单',
//        '/manager/notice' => '设置',
    ];
}*/
?>
<!DOCTYPE html>
<html lang="zh" style="color-scheme: light">
<head>
    <?=$this->insert('layout/admin-head')?>
</head>
<body class="flex flex:col bg:gray-96">

<style>
    .topnav-links {
        --bg: transparent;
        --bg-active: var(--ui-primary);
        --fg: var(--ui-primary-500);
        --fg-active: var(--ui-primary-50);
        --fg-hover: var(--ui-primary);
    }
</style>
    <header class="fixed top:0 left:0 right:0 z:9 py:10 bd:blur(10px)">
        <div class="container">
            <div class="flex ai:center">
                <div>
                    <nav class="tab-links topnav-links">
                        <a href="/admin/dashboard" <?=str_starts_with($route, '/admin/dashboard') ? 'aria-current="page"' : ''?>>工作台</a>
                        <a href="/admin/pages" <?=str_starts_with($route, '/admin/pages') ? 'aria-current="page"' : ''?>>页面</a>
                        <a href="/admin/datasets" <?=str_starts_with($route, '/admin/datasets') ? 'aria-current="page"' : ''?>>数据</a>
                        <a href="/admin/files" <?=str_starts_with($route, '/admin/files') ? 'aria-current="page"' : ''?>>文件</a>
                    </nav>
                </div>
                <div>
                    <button class="ghost" popovertarget="edit-menu">更多</button>
                    <div id="edit-menu" popover>
                        <menu>
                            <li><a href="#" class="button ghost">网站主题</a></li>
                            <li><a href="#" class="button ghost">自定代码</a></li>
                            <li><a href="#" class="button ghost">页面字体</a></li>
                            <li><a href="#" class="button ghost">更换网站</a></li>
                            <li><a href="#" class="button ghost">回收数据</a></li>
                            <li><a href="#" class="button ghost">关于系统</a></li>
                        </menu>
                    </div>
                </div>
                <div class="ml:auto">
                    <button class="avatar vertical:middle" popovertarget="avatar-menu">
                        <img src="/assets/admin/img/avatar.png" alt="" />
                    </button>

                    <div id="avatar-menu" popover data-placement="bottom right">
                        <menu>
                            <li><small>admin</small></li>
                            <li><a href="#" class="button ghost">个人信息</a></li>
                            <li><a href="#" class="button ghost">安全邮箱</a></li>
                            <li><a href="#" class="button ghost">登录密码</a></li>
                            <li><a href="#" class="button ghost">帮助中心</a></li>
                            <li><a href="#" class="button ghost">问题反馈</a></li>
                            <li><hr /></li>
                            <li><a class="button ghost destructive">安全退出</a></li>
                        </menu>
                    </div>
                </div>
            </div>

        </div>
    </header>

    <main class="flex:1 pt:100 pb:50">
        <div class="container">
            <?=$this->section('content')?>
        </div>
    </main>

    <script src="/assets/admin/js/main.js"></script>
</body>
</html>