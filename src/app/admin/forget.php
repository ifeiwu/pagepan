<?php
return function ($action) {
    $yun_url = Config::file('admin', 'url');
    session('forget_token', uniqid());
?>
<!DOCTYPE html>
<html lang="zh">
<head>
	<base href="<?=ROOT_URL?>">
    <meta charset="UTF-8">
    <meta name="renderer" content="webkit">
    <meta name="force-rendering" content="webkit">
    <title>重置密码 - PAGEPAN</title>
    
    <link rel="icon" href="favicon.png">
    <link href="<?=$yun_url?>assets/uikit/uikit.css" rel="stylesheet">
    <link href="<?=$yun_url?>assets/uikit/theme.css" rel="stylesheet">
    <link href="<?=$yun_url?>assets/css/login.css" rel="stylesheet">
</head>
<body>
    <div class="uk-padding">
        <a href="//www.pagepan.com" class="logo">
            <svg viewBox="0 0 24 24" height="24" width="24"><rect x="4" width="16" height="8" style="fill:#ff7186"/><rect x="4" width="8" height="24" style="fill:#ff7186"/><rect x="12" width="8" height="8" style="fill:#ff889f"/><rect x="4" y="8" width="8" height="8" style="fill:#ff4e58"/><rect x="4" y="16" width="8" height="8" style="fill:#f2254d"/></svg>
        </a>
    </div>

    <div class="uk-container uk-padding-small uk-width-1-5 uk-margin-large-top">
        <form class="uk-form-stacked" id="loginForm">
            <input type="hidden" id="token" value="<?=md5(session('forget_token'));?>">
            <fieldset class="uk-fieldset">
                <legend class="uk-legend uk-margin-bottom">重置密码</legend>
                <div class="uk-margin" id="step1">
                    <input type="text" id="email" name="email" class="uk-input" value="pagepan@qq.com" placeholder="网站邮箱" tabindex="1">
                </div>
                <div class="uk-margin" id="step2" style="display: none">
                    <div class="uk-margin">
                        <input type="text" id="vcode" name="vcode" class="uk-input" value="" placeholder="邮件验证码">
                    </div>
                    <div class="uk-margin">
                        <input type="password" id="pass" name="pass" class="uk-input" value="" placeholder="新密码">
                    </div>
                    <div class="uk-margin">
                        <input type="password" id="pass2" name="pass2" class="uk-input" value="" placeholder="确认密码">
                    </div>
                </div>
                <div class="uk-margin" id="done"></div>
                <div class="uk-margin uk-margin-medium-top uk-text-center uk-position-relative">
                    <button type="button" class="uk-button uk-button-primary uk-padding-large uk-padding-remove-vertical" id="next1" tabindex="2">下一步</button>
                    <button type="button" class="uk-button uk-button-primary uk-padding-large uk-padding-remove-vertical" id="next2" style="display: none">重置</button>
                </div>
                <div class="uk-margin uk-text-center">
                    <a href="admin/login" class="uk-text-muted" id="back" style="font-size:13px" tabindex="3">返回登录</a>
                </div>
            </fieldset>
        </form>
    </div>

    <div class="uk-position-bottom uk-padding-small uk-text-center copyright">© PAGEPAN 2013, <?=date('Y')?></div>

    <script src="<?=$yun_url?>assets/js/lib/jquery.js"></script>
    <script src="<?=$yun_url?>assets/uikit/uikit.js"></script>
    <script src="assets/js/app/admin/forget.js"></script>
</body>
</html>
<?php }?>