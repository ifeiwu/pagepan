$(function() {
    // UIkit 默认配置
    UIkit.modal.labels = { ok: '是', cancel: '否' }

    if (navigator.userAgent.indexOf('AppleWebKit') == -1) {
        alert('检测到此浏览存在一些不兼容，请使用Chrome、Opera、Brave、360、QQ 等 WebKit 内核浏览器最新版本。')
    }

    const $form = $('#loginForm')
    const $submit = $('button[type="submit"]')
    const $username = $('input[name="username"]')
    const $password = $('input[name="password"]')
    const domain = $('input[name="domain"]').val()
    const login_name = localStorage.getItem('login_name')

    if (login_name) {
        $username.val(login_name)
        $password.focus()
    } else {
        $username.focus()
    }

    // 请求登录验证
    const loginAuth = function() {
        $password.val(encrypt($password.val(), $password.data('key')))
        $.post('main/login.auth', $form.serialize(), function(res) {
            if (res.code == 0) {
                localStorage.setItem('login_domain', domain)
                localStorage.setItem('login_name', $username.val())
                location.href = res.data['home']
            } else {
                $submit.text('重 试').prop('disabled', false)
                $password.val('')
                UIkit.notification(res.message, { status: 'danger' })
            }
        }, 'JSON')
    }

    // 表单提交
    $form.submit(function(e) {
        e.preventDefault()
        $submit.prop('disabled', true).text('请稍候...')
        // $password.val(encrypt($password.val(), $password.data('key')));
        $.post('m/act/yun-login', $form.serialize(), function(res) {
            if (res.code == 0) {
                localStorage.setItem('login_domain', domain)
                localStorage.setItem('login_name', $username.val())
                location.href = res.login_token_url;
            } else {
                $submit.text('重 试').prop('disabled', false)
                $password.val('')
                UIkit.notification(res.message, { status: 'danger' })
            }
        }, 'JSON')
    })
})