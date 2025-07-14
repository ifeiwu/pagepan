<?php return function () {?>
<!DOCTYPE html>
<html lang="zh">
<head>
    <base href="<?=ROOT_URL?>">
    <meta charset="UTF-8">
    <meta name="renderer" content="webkit">
    <meta name="force-rendering" content="webkit">
    <title>小飞云 - 可视化建站平台</title>

    <link rel="icon" href="favicon.png">
    <link href="https://yun.pagepan.test/assets/uikit/uikit.css" rel="stylesheet">
    <link href="https://yun.pagepan.test/assets/uikit/theme.css" rel="stylesheet">
    <link href="https://yun.pagepan.test/assets/css/login.css" rel="stylesheet">
</head>
<body>
    <div class="uk-padding">
        <a href="//www.pagepan.com" class="logo">
            <svg viewBox="0 0 24 24" height="24" width="24"><rect x="4" width="16" height="8" style="fill:#ff7186"/><rect x="4" width="8" height="24" style="fill:#ff7186"/><rect x="12" width="8" height="8" style="fill:#ff889f"/><rect x="4" y="8" width="8" height="8" style="fill:#ff4e58"/><rect x="4" y="16" width="8" height="8" style="fill:#f2254d"/></svg>
        </a>
    </div>

    <div class="uk-container uk-padding-small uk-width-1-5 uk-margin-large-top">
        <form class="uk-form-stacked" id="loginForm">
            <input type="hidden" name="token" value="<?=md5(session('login_token'))?>">
            <fieldset class="uk-fieldset">
                <legend class="uk-legend uk-text-bold uk-text-center uk-margin-bottom">
                    <h2 class="logo-text" style="margin-bottom: 5px;">PAGE<span style="color: #ff1c37;">PAN</span></h2>
                    <small class="uk-display-block uk-text-small uk-text-normal uk-text-muted uk-text-bold">可视化建站平台</small>
                </legend>
                <div class="uk-margin">
                    <label class="uk-form-label">用户名</label>
                    <div class="uk-form-controls">
                        <input class="uk-input" name="username" type="text" value="" required>
                    </div>
                </div>
                <div class="uk-margin">
                    <label class="uk-form-label">密码</label>
                    <div class="uk-form-controls">
                        <input class="uk-input" name="password" type="password" value="" data-key="<?=md5(session('pass_key'));?>" required>
                    </div>
                </div>
                <div class="uk-margin uk-margin-medium-top uk-text-center">
                    <button class="uk-button uk-button-primary uk-padding-large uk-padding-remove-vertical" type="submit">登 录</button>
                </div>
                <div class="uk-margin uk-text-center">
                    <a href="main/forget" class="uk-text-muted" style="font-size:13px">忘记密码？</a>
                </div>
            </fieldset>
        </form>
    </div>

    <div class="uk-position-bottom uk-padding-small uk-text-center copyright">© PAGEPAN 2013, <?=date('Y')?></div>

    <script src="https://yun.pagepan.test/assets/js/lib/jquery.js"></script>
    <script src="https://yun.pagepan.test/assets/uikit/uikit.js"></script>
    <script src="assets/js/app/admin/login.js"></script>
    <script>
        let upgrade = "<?=$_GET['upgrade']?>";
        if (upgrade == '1') {
            localStorage.setItem('theme-auto-update', '1');
        }
    </script>
</body>
</html>
<?php }?>