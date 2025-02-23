define(function (require) {
    let $component;
    const setComponent = function ($_component) {
        $component = $_component;
    }

    const init = function () {
        // 订单备注文本域自动高度
        $component.find('textarea[name="notes"]').on('input', function () {
            let padding = parseInt($(this).css('paddingTop')) * 2;
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight + padding) + 'px';
        });
        // 提交订单
        $component.find('form').submit(function (e) {
            e.preventDefault();
            let $submit = $('button[form="orderForm"]');
            let $form = $(this);
            let token = $form.data('token');
            let formData = $form.serializeArray();
            $submit.attr('disabled', true).text('正在提交...');
            $.ajax({
                url: 'm/shop/order-submit?_token=' + token,
                type: 'POST',
                data: formData,
                success: function(res) {
                    if (res.code == 0) {
                        let data = res.data;
                        if (data) {
                            $.post('m/shop/order-notice', {'order_sn': res.data.sn}, function () {
                                location.href = 'shop-order-success';
                            });
                        } else {
                            alert('没有生成订单号');
                        }
                    } else {
                        let data = res.data;
                        if (data) {
                            if (data.field) {
                                let $input = $component.find('[name="'+data.field+'"]');
                                if ($input.length) {
                                    $input[0].focus();
                                }
                                $submit.attr('disabled', false).text('提交订单');
                            } else if (data.id == 0) {
                                $submit.attr('disabled', true);
                                $.post('m/shop/order-notice', formData, function () {});
                            }
                        }
                        alert(res.message);
                    }
                },
                error: function(error) {
                    console.error(error);
                }
            });
        });
        // 保存填写表单数据
        require(['form-storage'], function (FormStorage) {
            const formStorage = new FormStorage('#orderForm', {
                name: 'form-order',
                includes: ['select','input','textarea'],
                text: '[type="text"]'
            });
            formStorage.apply();
            // 每秒钟保存
            setInterval(() => {
                formStorage.save();
            }, 1000);
        });
    }

    // 图标验证
    const iconCaptcha = function () {
        require(['iconcaptcha/iconcaptcha', 'css!iconcaptcha/iconcaptcha'], function () {
            IconCaptcha.init('.iconcaptcha-widget', {
                general: {
                    endpoint: 'act/iconcaptcha',
                    fontFamily: 'inherit',
                    showCredits: false,
                },
                security: {
                    interactionDelay: 1500,
                    hoverProtection: true,
                    displayInitialMessage: true,
                    initializationDelay: 500,
                    incorrectSelectionResetDelay: 3000,
                    loadingAnimationDuration: 1000,
                },
                locale: {
                    initialization: {
                        verify: '点击按钮开始验证',
                        loading: '正在加载中...',
                    },
                    header: '选择显示次数最少的图标',
                    correct: '验证完成',
                    incorrect: {
                        title: '哎呀',
                        subtitle: "您选错图标了",
                    },
                    timeout: {
                        title: '请等待一分钟',
                        subtitle: '您连续三次选择了错误的图标'
                    }
                }
            });
        });
        /*require(['axios', 'qs', 'gocaptcha/gocaptcha', 'css!gocaptcha/gocaptcha'], function (axios, Qs) {
            const getDataApi = "http://127.0.0.1:9001/api/go-captcha-data/slide-basic";
            const checkDataApi = "http://127.0.0.1:9001/api/go-captcha-check-data/slide-basic";

            const el = document.getElementById("slide-wrap");
            const capt = new GoCaptcha.Slide({
                width: 300,
                height: 220,
            });

            var captKey = ''

            capt.mount(el)

            capt.setEvents({
                move(x,  y) {
                    console.log('move - ', x, y)
                },
                confirm(dots, reset) {
                    confirmEvent(dots)
                },
                refresh() {
                    capt.clear()
                    requestCaptchaData()
                },
                close() {
                    console.log('>>>>> close')
                }
            })

            const requestCaptchaData = function() {
                capt.clear()
                captKey = ''
                axios({
                    method: 'get',
                    url: getDataApi,
                }).then(function(response){
                    const data = response.data || {};
                    if (data && (data['code'] || 0) === 0) {
                        capt.setData({
                            image: data['image_base64'] || '',
                            thumb: data['tile_base64'] || '',
                            thumbX: data['tile_x'] || 0,
                            thumbY: data['tile_y'] || 0,
                            thumbWidth: data['tile_width'] || 0,
                            thumbHeight: data['tile_height'] || 0,
                        })

                        captKey = data['captcha_key'] || ''
                    } else {
                        alert(`get data failed`)
                    }
                }).catch((e)=>{
                    console.warn(e)
                })
            }

            const confirmEvent = function (point) {
                axios({
                    method: 'post',
                    url: checkDataApi,
                    data: Qs.stringify({
                        point: [point.x, point.y].join(','),
                        key: captKey || ''
                    }),
                }).then(function (response){
                    const data = response.data || {};
                    if (data && (data['code'] || 0) === 0) {
                        alert(`check data success`)
                    } else {
                        alert(`check data failed`)
                    }

                    setTimeout(() => {
                        requestCaptchaData()
                    }, 500)
                }).catch((e)=>{
                    console.warn(e)
                })
            }

            requestCaptchaData()
        });*/
    }

    return {
        'setComponent': setComponent,
        'init': init,
        'iconCaptcha': iconCaptcha
    };
});