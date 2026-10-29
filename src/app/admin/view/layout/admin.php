<?php
$route = request()->path();
?>
<!DOCTYPE html>
<html lang="zh">
<head>
    <?=$this->insert('layout/head')?>
    <style>
        .app {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            height: 100dvh;
            overflow: hidden;
        }
    </style>
</head>
<body class="bg-olive-200">
    <div class="app">
        <div class="py-1" style="width:100%;flex-shrink:0;">
            <div class="container-xl">
                <header class="navbar" style="--background:#0000;--navbar-height:auto;--navbar-padding:0;">
                    <a href="#" class="brand">
                        <span class="brand-logo"><i class="font-serif font-bold not-italic">P</i></span>
                    </a>
                    <div class="navbar-collapse" data-sp-toggle="#navbar-app-toggle">
                        <nav class="navbar-nav gap-1" aria-label="Main" style="--spacing:0.2rem;">
                            <a href="/admin/dashboard" class="navbar-link <?=str_starts_with($route, '/admin/dashboard') ? 'active' : ''?>">
                                工作台
                            </a>
                            <a href="/admin/pages" class="navbar-link <?=str_starts_with($route, '/admin/pages') ? 'active' : ''?>">
                                页面
                            </a>
                            <a href="/admin/datasets" class="navbar-link <?=str_starts_with($route, '/admin/datasets') ? 'active' : ''?>">
                                数据
                            </a>
                            <a href="/admin/files" class="navbar-link <?=str_starts_with($route, '/admin/files') ? 'active' : ''?>">
                                文件
                            </a>
                            <button id="navbar-app-favorites" class="navbar-link">
                                更多
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon-end"><path d="m6 9 6 6 6-6"/></svg>
                            </button>
                            <div class="navbar-content" data-sp-toggle="#navbar-app-favorites">
                                <a href="#" class="navbar-link">网站主题</a>
                                <a href="#" class="navbar-link">自定代码</a>
                                <a href="#" class="navbar-link">网站字体</a>
                                <a href="#" class="navbar-link">模板市场</a>
                                <a href="#" class="navbar-link">回收数据</a>
                                <a href="#" class="navbar-link">关于系统</a>
                            </div>
                        </nav>
                    </div>
                    <div class="navbar-actions gap-1">
                        <button class="btn btn-ghost btn-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg><span class="sr-only">Search</span></button>
                        <button class="btn btn-ghost btn-icon"><span class="relative"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/></svg><span class="absolute -end-0.5 -top-0.5 size-2 rounded-full bg-red-500"></span></span><span class="sr-only">Notifications</span></button>
                        <button id="navbar-app-user" class="btn btn-ghost btn-icon rounded-full">
                            <span class="avatar"><img class="avatar-image" src="/assets/admin/img/avatar.png" alt="Leila Navarro" /><span class="avatar-fallback">LN</span></span>
                            <span class="sr-only"><span class="block font-medium">Leila Navarro</span><span class="block text-xs text-muted-foreground">leila@acme.com</span></span>
                        </button>
                        <div class="dropdown" data-sp-toggle="#navbar-app-user">
                            <div class="dropdown-label">admin</div>
                            <a href="#" class="dropdown-item">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                安全邮箱
                            </a>
                            <a href="#" class="dropdown-item">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                登录密码
                            </a>
                            <a href="#" class="dropdown-item">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                帮助中心
                            </a>
                            <a href="#" class="dropdown-item">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                问题反馈
                            </a>
                            <div class="dropdown-separator"></div>
                            <a href="#" class="dropdown-item">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/></svg>
                                安全退出
                            </a>
                        </div>
                    </div>
                    <button id="navbar-app-toggle" class="btn btn-ghost btn-icon navbar-toggle -me-2" aria-label="Toggle menu"></button>
                </header>
            </div>
        </div>

        <main style="flex:1;width:100%;min-height:0;">
            <div class="container-xl h-full bg-white rounded-t-2xl">
                <?=$this->section('content')?>
            </div>
        </main>
    </div>
    <script src="/assets/admin/js/main.js"></script>
</body>
</html>