$(function() {

    // 发送邮箱验证码
    $('#next1').click(function() {
        let token = $('#token').val()
        let email = $('#email').val()

        if (!email) {
            UIkit.notification('请输入您的网站邮箱地址。', 'warning')
            $('#email').focus()
            return
        }

        if (!/^[a-z0-9](\w|\.|-)*@([a-z0-9]+-?[a-z0-9]+\.){1,3}[a-z]{2,4}$/i.test(email)) {
            UIkit.notification('邮箱格式有误，请检查后重新输入～', 'warning')
            $('#email').focus()
            return
        }

        $('#next1').text('请稍候...').prop('disabled', true)

        $.post('admin/forget-vcode', { 'email': email, 'token': token }, function(res) {
            if (res.code == 0) {
                $('#next1,#step1').hide()
                $('#next2').show()
                $('#next2,#step2').fadeIn()
                $('#vcode').focus()
                UIkit.notification('验证码已发送到您的邮箱，请注意查收～', 'success')
            } else {
                if (res.data == 'reload') {
                    alert(res.message)
                    location.reload()
                } else {
                    $('#next1').text('重 试').prop('disabled', false)
                    UIkit.notification(res.message, 'warning')
                }
            }
        })
    })

    //核实验证码
    $('#next2').click(function() {
        let vcode = $('#vcode').val()
        if (!vcode) {
            UIkit.notification('验证码还没输入哦～', 'warning')
            $('#vcode').focus()
            return
        }

        let $pass = $('#pass')
        let pass = $pass.val()
        if (!pass) {
            UIkit.notification('忘记输入新密码啦～', 'warning')
            $('#pass').focus()
            return
        }

        if (pass.length < 6) {
            UIkit.notification('少于6位的密码不安全哦～', 'warning')
            $('#pass').focus()
            return
        }

        let pass2 = $('#pass2').val()
        if (!pass2) {
            UIkit.notification('忘记输入确认密码啦～', 'warning')
            $('#pass').focus()
            return
        }

        if (pass != pass2) {
            UIkit.notification('两次输入的密码不一致哦～', 'warning')
            $('#pass').focus()
            return
        }

        $('#next2').text('请稍候...').prop('disabled', true)

        $.post('admin/forget-reset', { 'pass': pass, 'vcode': vcode }, function(res) {
            if (res.code == 0) {
                $('#next2,#step2,#back').hide()
                $('#done').html('<div class="uk-alert-success" uk-alert><p>恭喜您，密码修改成功！&nbsp;<a href="admin/login">现在登录</a></p></div>').fadeIn()
            } else {
                $('#next2').text('重 置').prop('disabled', false)
                UIkit.notification(res.message, 'warning')
            }
        })
    })
})