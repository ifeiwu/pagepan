define(function (require) {

    const contact = function (component_selector) {
        let language = $('html').attr('lang') || navigator.language.toLowerCase();
        const Parsley = require('parsley/parsley');

        require(['tippy', 'i18n', 'parsley/i18n/' + language], function (tippy, i18n) {
            i18n.set('zh-cn', {
                success_text: '发送成功！',
                wait_text: '请稍候.',
                fail_text: '发送失败！',
                retry_text: '重试'
            });
            i18n.set('zh-tw', {
                success_text: '發送成功！',
                wait_text: '請稍候.',
                fail_text: '發送失敗！',
                retry_text: '重試'
            });
            i18n.set('en', {
                success_text: 'Sent successfully!',
                wait_text: 'Please wait.',
                fail_text: 'Failed to send!',
                retry_text: 'Retry'
            });

            i18n.locale(language);

            let $component = $(component_selector);
            let $form = $component.find('form');
            tippy($form[0].querySelectorAll('input[required],textarea[required]'), {
                placement: 'top-start',
                hideOnClick: false,
                trigger: 'manual',
                theme: 'tomato'
            });

            // 表单验证
            $form.parsley().on('field:error', function () {
                let $error = this._ui.$errorsWrapper.hide();
                let _tippy = this.$element[0]._tippy;
                if (_tippy) {
                    _tippy.setContent($error.text());
                    _tippy.show();
                }

            }).on('field:success', function () {
                let _tippy = this.$element[0]._tippy;
                if (_tippy) {
                    _tippy.hide();
                }
            });

            // 提交表单
            $form.submit(function (e) {
                e.preventDefault();
                let $submit = $form.find('button[type="submit"]');
                $submit.attr('disabled', true).removeClass('error').text(i18n.t('wait_text'));
                $.post('act/message-add', $form.serialize(), function (res) {
                    if (res.code == 0) {
                        $submit.addClass('success').text(i18n.t('success_text'));
                        $form[0].reset();
                    } else {
                        alert(i18n.t('fail_text'));
                        $submit.addClass('error').attr('disabled', false).text(i18n.t('retry_text'));
                    }
                }, 'JSON');
            });
        });
    }

    return {
        'contact': contact
    }
});