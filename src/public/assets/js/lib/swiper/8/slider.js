define(['swiper/8/swiper', 'mousewheel', 'mobile-events'], function (Swiper) {

    const init = function (setting, callback = null) {
		const ukchild = setting['ukchild'] ? setting['ukchild'] : ''; // uk子模块名称
        const ukchildid = setting['ukchildid'] ? setting['ukchildid'] : ''; // uk子模块id
		const ukchildprefix = ukchild ? ukchild + '.' : ''; // uk子模块前缀
        const $component = $('[' + setting.ukid + ']');
        const $slider = ukchildid ? $component.find('#' + ukchildid) : $component.find((ukchild ? '.' + ukchild : '') + '.slider');

        setting.autoplay = parseInt(setting[ukchildprefix + 'slider.autoplay']);
        setting.speed = parseInt(setting[ukchildprefix + 'slider.speed']);
        setting.between = parseInt(setting[ukchildprefix + 'slider.between']);
        setting.initial = parseInt(setting[ukchildprefix + 'slider.initial']);
		setting.pergroup = parseInt(setting[ukchildprefix + 'slider.pergroup']);
        setting.perview = setting[ukchildprefix + 'slider.perview'];
        setting.hash = Boolean(setting[ukchildprefix + 'slider.hash']);
        setting.loop = Boolean(setting[ukchildprefix + 'slider.loop']);
        setting.centered = Boolean(setting[ukchildprefix + 'slider.centered']);
        setting.mousewheel = Boolean(setting[ukchildprefix + 'slider.mousewheel']);
        setting.autorelease = Boolean(setting[ukchildprefix + 'slider.autorelease']);
        setting.touchmove = Boolean(setting[ukchildprefix + 'slider.touchmove']);
		setting.navigation = setting[ukchildprefix + 'slider.navigation'];
		setting.direction = setting[ukchildprefix + 'slider.direction'];
		setting.pagination = setting[ukchildprefix + 'slider.pagination'];
		setting.lazy = setting[ukchildprefix + 'slider.lazy'];
		setting.effect = setting[ukchildprefix + 'slider.effect'];
        setting.freemode = setting[ukchildprefix + 'slider.freemode'];
        setting.breakpoints = setting[ukchildprefix + 'slider.breakpoints'];

        let options = {
            init: false,
            speed: setting.speed ? setting.speed : 800,
            autoplay: setting.autoplay ? { delay: setting.autoplay } : false,
            mousewheel: {'enabled': setting.mousewheel},
            allowTouchMove: setting.touchmove,
            loop: setting.autorelease == true ? false : setting.loop,
            hashNavigation: setting.hash,
            initialSlide: setting.initial ? setting.initial : 0,
            spaceBetween: setting.between ? setting.between : 0,
            centeredSlides: setting.centered,
            slidesPerView: setting.perview ? isNaN(setting.perview) ? setting.perview : parseInt(setting.perview) : 1,
			slidesPerGroup: setting.pergroup ? setting.pergroup : 1,
            direction: setting.direction ? setting.direction : 'horizontal',
            freeMode: setting.freemode ? setting.freemode : false,
        };
		
        // 自动设置断点
        if ( ! setting.breakpoints ) {
            let breakpoints_suffix = { 560: '-sm', 768: '-md', 1024: '-lg', 1280: '-xl' };
            // 不同断点设置属性
            options.breakpoints = { 560: {}, 768: {}, 1024: {}, 1280: {} };
            $.each(options.breakpoints, function (k) {
                let suffix = breakpoints_suffix[k];
                let perview = setting[ukchildprefix + 'slider.perview' + suffix];
                let pergroup = setting[ukchildprefix + 'slider.pergroup' + suffix];
                let between = setting[ukchildprefix + 'slider.between' + suffix];

                if ( perview ) { options.breakpoints[k].slidesPerView = parseInt(perview); }
                if ( pergroup ) { options.breakpoints[k].slidesPerGroup = parseInt(pergroup); }
                if ( between ) { options.breakpoints[k].spaceBetween = parseInt(between); }
            });
            // 删除未设置断点的空对象
            Object.keys(options.breakpoints).forEach(function(key) {
                if ( Object.keys(options.breakpoints[key]).length === 0) {
                    delete options.breakpoints[key]
                }
            });
        } else {
            // 手动设置断点
            options.breakpoints = setting.breakpoints;
        }
		// 触发事件
        let events = [];
		events.push({
		    beforeInit: function () {
		        $slider.css('opacity', 1);
		    }
		});
        // 左右导航
        if ( setting.navigation ) {
            options.navigation = {
                nextEl: $slider.find('.swiper-button-next')[0],
                prevEl: $slider.find('.swiper-button-prev')[0]
            }
            events.push({
                init: function () {
                    const $prevbtn = this.navigation.$prevEl;
                    const $nextbtn = this.navigation.$nextEl;
                    setTimeout(() => {
                        $prevbtn.removeClass('hidden');
                        $nextbtn.removeClass('hidden');
                        // 导航图标形状
                        const navigation_shape = setting[ukchildprefix + 'slider.navigation-shape'];
                        if ( navigation_shape ) {
                            $prevbtn.addClass('swiper-button-shape-' + navigation_shape);
                            $nextbtn.addClass('swiper-button-shape-' + navigation_shape);
                            if ( navigation_shape == 'arrow-line' ) {
                                $prevbtn.html('<span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg></span>');
                                $nextbtn.html('<span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13.1714 12.0007L8.22168 7.05093L9.63589 5.63672L15.9999 12.0007L9.63589 18.3646L8.22168 16.9504L13.1714 12.0007Z"></path></svg></span>');
                            } else if ( navigation_shape == 'arrow-line2' ) {
                                $prevbtn.html('<span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7.82843 10.9999H20V12.9999H7.82843L13.1924 18.3638L11.7782 19.778L4 11.9999L11.7782 4.22168L13.1924 5.63589L7.82843 10.9999Z"></path></svg></span>');
                                $nextbtn.html('<span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path></svg></span>');
                            } else if ( navigation_shape == 'arrow-solid' ) {
                                $prevbtn.html('<span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8 12L14 6V18L8 12Z"></path></svg></span>');
                                $nextbtn.html('<span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M16 12L10 18V6L16 12Z"></path></svg></span>');
                            } else if ( navigation_shape == 'text-en' ) {
                                $prevbtn.html('<span>Prev</span>');
                                $nextbtn.html('<span>Next</span>');
                            } else if ( navigation_shape == 'text-cn' ) {
                                $prevbtn.html('<span>上一个</span>');
                                $nextbtn.html('<span>下一个</span>');
                            }
                        }
                        // 导航背景形状
                        const navigation_bgshape = setting[ukchildprefix + 'slider.navigation-bgshape'];
                        if ( navigation_bgshape ) {
                            $prevbtn.addClass('swiper-button-bgshape-' + navigation_bgshape);
                            $nextbtn.addClass('swiper-button-bgshape-' + navigation_bgshape);
                        }
                    }, 10);
                }
            });

            switch (setting.navigation) {
                case 'show-hide':
                    if ( setting.loop == false ) {
                        events.push({
                            init: function () {
                                const $prevbtn = this.navigation.$prevEl;
                                const $nextbtn = this.navigation.$nextEl;
                                setTimeout(() => {
                                    $prevbtn.addClass('animated');
                                    $nextbtn.addClass('animated');
                                    if ( $nextbtn && ! this.isEnd ) {
                                        $nextbtn.addClass('fadeInRight');
                                    }
                                }, 10);
                            },
                            slideChange: function () {
                                const $prevbtn = this.navigation.$prevEl;
                                const $nextbtn = this.navigation.$nextEl;
                                if ( $prevbtn ) {
                                    if (!this.isBeginning) {
                                        $prevbtn.removeClass('fadeOutLeft').addClass('fadeInLeft');
                                    } else {
                                        $prevbtn.removeClass('fadeInLeft').addClass('fadeOutLeft');
                                    }
                                }
                                if ( $nextbtn ) {
                                    if (!this.isEnd) {
                                        $nextbtn.removeClass('fadeOutRight').addClass('fadeInRight');
                                    } else {
                                        $nextbtn.removeClass('fadeInRight').addClass('fadeOutRight');
                                    }
                                }
                            }
                        });
                    }
                    break;
                case 'hover-show':
                    events.push({
                        init: function (swiper) {
                            let $prev = swiper.navigation.$prevEl;
                            let $next = swiper.navigation.$nextEl;
                            $prev.css('opacity', 0);
                            $next.css('opacity', 0);
                            $(swiper.el).mouseenter(function () {
                                $prev.css('opacity', 1);
                                $next.css('opacity', 1);
                            }).mouseleave(function () {
                                $prev.css('opacity', 0);
                                $next.css('opacity', 0);
                            });
                        }
                    });
                    break;
            }
        }

        // 分页导航
        if ( setting.pagination ) {
            options.pagination = {
                el: $slider.find('.swiper-pagination')[0],
                type: 'bullets',
                clickable: true,
            }
            switch ( setting.pagination ) {
                case 'dynamic':
                    $.extend(options.pagination, { dynamicBullets: true });
                    break;
                case 'progressbar':
                    $.extend(options.pagination, { type: 'progressbar' });
                    break;
                case 'fraction':
                    $.extend(options.pagination, { type: 'fraction' });
                    break;
                case 'fraction2':
                    $.extend(options.pagination, {
                        type: 'fraction',
                        formatFractionCurrent: function (number) {
                            return (number < 10 ? '0' : '') + number
                        },
                        formatFractionTotal: function (number) {
                            return (number < 10 ? '0' : '') + number
                        }
                    });
                    break;
                case 'number':
                    $.extend(options.pagination, {
                        type: 'custom',
                        renderCustom: function (swiper, current, total) {
                            let spans = '';
                            for (let i = 0; i < total; i++) {
                                spans += '<span class="swiper-pagination-number">' + (i < 10 ? '0' : '') + (i + 1) + '</span>';
                            }
                            return spans;
                        }
                    });
                    events.push({
                        init: function () {
                            setTimeout(() => {
                                $slider.find('.swiper-pagination-custom').addClass('swiper-pagination-numbers');
                                $slider.find('.swiper-pagination-custom>span:eq(' + this.realIndex + ')').addClass('swiper-pagination-number-active');
                            }, 10);
                        },
                        slideChange: function () {
                            $slider.find('.swiper-pagination-custom>span:eq(' + this.realIndex + ')').addClass('swiper-pagination-number-active');
                        }
                    });
                    break;
                case 'number2':
                    $.extend(options.pagination, {
                        type: 'custom',
                        renderCustom: function (swiper, current, total) {
                            let spans = '';
                            for (let i = 0; i < total; i++) {
                                spans += '<span class="swiper-pagination-number2">' + (i + 1) + '</span>';
                            }
                            return spans;
                        }
                    });
                    events.push({
                        init: function () {
                            setTimeout(() => {
                                $slider.find('.swiper-pagination-custom').addClass('swiper-pagination-numbers2');
                                $slider.find('.swiper-pagination-custom>span:eq(' + this.realIndex + ')').addClass('swiper-pagination-number2-active');
                            }, 10);
                        },
                        slideChange: function () {
                            $slider.find('.swiper-pagination-custom>span:eq(' + this.realIndex + ')').addClass('swiper-pagination-number2-active');
                        }
                    });
                    break;

                case 'pill':
                    options.pagination.renderBullet = function (index, className) {
                        return '<span class="' + className + ' swiper-pagination-pill"></span>';
                    }
                    break;

                case 'square':
                    options.pagination.renderBullet = function (index, className) {
                        return '<span class="' + className + ' swiper-pagination-square"></span>';
                    }
                    break;

                case 'rectangle':
                    options.pagination.renderBullet = function (index, className) {
                        return '<span class="' + className + ' swiper-pagination-rectangle"></span>';
                    }
                    break;

                case 'rectangle2':
                    events.push({
                        autoplayStart: function (swiper) {
                            if ( swiper.autoplay.running ) {
                                swiper.$el.addClass('autoplay');
                                setTimeout(function () {
                                    swiper.pagination.bullets.eq(0).addClass('start-current');
                                }, 100);
                                $(swiper.pagination.bullets).on('click', function () {
                                    swiper.autoplay.stop()
                                });
                            }
                        },
                        slideChangeTransitionStart: function (swiper) {
                            if ( swiper.autoplay.running ) {
                                if ( 0 == swiper.realIndex ) {
                                    setTimeout(function () {
                                        swiper.pagination.bullets.removeClass('replace');
                                    }, options.speed);
                                }
                                swiper.pagination.bullets.eq(swiper.realIndex - 1).addClass('replace').removeClass('current start-current');
                            }
                        },
                        slideChangeTransitionEnd: function (swiper) {
                            if ( swiper.autoplay.running ) {
                                swiper.pagination.bullets.eq(swiper.realIndex).addClass('current');
                            }
                        },
                        autoplayStop: function (swiper) {
                            swiper.$el.removeClass('autoplay');
                            swiper.pagination.$el.children().removeClass('current replace');
                        }
                    });
                    options.pagination.renderBullet = function (index, className) {
                        return '<span class="' + className + ' swiper-pagination-rectangle2"><i></i></span>';
                    }
                    break;
            }

            $slider.on('click', '.swiper-pagination-custom>span', function () {
                if ( setting.loop == false ) {
                    swiper.slideTo($(this).index());
                } else {
                    swiper.slideToLoop($(this).index());
                }
            });
        }
        // 延迟加载图片
        if ( setting.lazy ) {
            options.preloadImages = false;
            if ( setting.lazy == 'load-prev-next' ) {
                options.lazy = { loadPrevNext: true };
            } else {
                options.lazy = true;
                options.loadOnTransitionStart = true
            }
        }
        // 在编辑器里不添加效果，否则会报错错误。
        if ( ! pagevar.isBuilder ) {
            if ( setting.effect == 'parallax' ) {
                options.parallax = true;
                events.push({
                    init: function() {
                        let $slides = $(swiper.slides);
                        $slides.addClass('of-hidden');
                        $slides.find('.slide-inner').attr('data-swiper-parallax', swiper.width * 0.5);
                    }
                });
            } else if ( setting.effect == 'parallax-scale' ) {
                options.parallax = true;
                events.push({
                    init: function (swiper) {
                        let $slides = $(swiper.slides);
                        let $slides_inner = $slides.find('.slide-inner');

                        $slides.addClass('of-hidden');
                        $slides_inner.removeClass('bg-cover');
                        $slides_inner.attr('data-swiper-parallax', swiper.width * 0.5);

                        swiper.update(); // 动态添加 'data-swiper-parallax' 需要更新滑块
                    },
                    slideChange: function (swiper) {
                        $(swiper.slides).find('.slide-inner').css('background-size', '100%');
                        $(swiper.slides[swiper.activeIndex]).find('.slide-inner').css('background-size', '110%');
                    }
                });
            } else {
                options.effect = setting.effect ? setting.effect : 'slide';
            }
        }

        // 扩展回调涵数
        if ( callback ) {
            callback(options, events, $slider);
        }

        const swiper = new Swiper($slider.find('.swiper')[0], options);

        // 添加多个事件
        events.forEach(function (value) {
            for (const name in value) {
                swiper.on(name, value[name]);
            }
        })

        if ( options.init == false ) {
            swiper.init();
        }
        
        if ( pagevar.isBuilder ) {
            // swiper.detachEvents();
            swiper.autoplay.stop();
        } else {
            // 开启鼠标滚轮，让页面内容自动选择启用和禁用滚轮。
            if ( setting.autorelease == true ) {
                autoRelease($component, swiper);
            }
        }
        return swiper;
    }
    
    // 禁用滚轮
    const mousewheelDisable = function (swiper) {
        if ( swiper.mousewheel.enabled == true ) {
            swiper.detachEvents();
            swiper.mousewheel.disable();
        }
    }
    
    // 启用滚轮
    const mousewheelEnable = function (swiper) {
        if ( swiper.mousewheel.enabled == false ) {
            swiper.attachEvents();
            swiper.mousewheel.enable();
        }
    }
    
    // 滑块到达第一个或最后一个自动关闭鼠标滚轮，允许页面上下滚动内容。
    const autoRelease = function ($component, swiper) {
        mousewheelDisable(swiper);
        let component = $component[0];
        setTimeout(function () {
            if (component.offsetTop < $(window).height() || component.offsetTop == $(window).scrollTop()) {
                mousewheelEnable(swiper);
            }
        }, 250);

        let is_slider_start = true;
        let is_slider_end = false;
        swiper.on('slideChangeTransitionEnd', function () {
            // 记录卡片是否到第一个或最后一个
            if (this.activeIndex == 0) {
                is_slider_start = true;
                is_slider_end = false;
            } else if (this.activeIndex == (this.slides.length - 1)) {
                is_slider_end = true;
                is_slider_start = false;
            } else {
                is_slider_start = is_slider_end = false;
            }
        });

        // 鼠标滚轮或 Touch 向上或向下，如果没有可滚动卡片，则禁用卡片滚轮。
        $(window).on('mousewheel swipedown swipeup', function (e) {
            let $window = $(this);
            let _top = component.offsetTop - $window.scrollTop();
            // 向下滚轮
            if (e.deltaY == -1 || e.type == 'swipeup') {
                // 滚动条是否到达底部
                let is_scroll_bottom = ($window.scrollTop() + $window.height()) == $(document).height();
                if (is_slider_end == false && swiper.mousewheel.enabled == false) {
                    // 组件快到达窗口顶部，定位组件开启滚轮
                    if (_top >= 0 && _top < 250) {
                        // 首屏定位
                        if (component.offsetTop < $window.height()) {
                            $('html,body').animate({scrollTop: 0}, 400);
                        }
                        // 组件定位
                        else {
                            $('html,body').animate({scrollTop: component.offsetTop}, 400);
                        }

                        mousewheelEnable(swiper);
                    }
                    // 如果到达窗口底部也开启滚轮
                    else if (is_scroll_bottom == true) {
                        mousewheelEnable(swiper);
                    }
                }
                // 滑块到最后一个禁用滚轮
                else if (is_slider_end == true && swiper.mousewheel.enabled == true && is_scroll_bottom == false) {
                    mousewheelDisable(swiper);
                }
            }

            // 向上滚轮
            if (e.deltaY == 1 || e.type == 'swipedown') {
                // 滚动条是否到达顶部
                let is_scroll_top = $window.scrollTop() == 0;
                if (is_slider_end == true && swiper.mousewheel.enabled == false) {
                    // 组件快到达窗口顶部，定位组件开启滚轮
                    if (_top <= 0 && _top > -250) {
                        // 首屏定位
                        if (component.offsetTop < $window.height()) {
                            $('html,body').animate({scrollTop: 0}, 400);
                        }
                        // 组件定位
                        else {
                            $('html,body').animate({scrollTop: component.offsetTop}, 400);
                        }

                        mousewheelEnable(swiper);
                    }
                    // 如果到达窗口顶部也开启滚轮
                    else if (is_scroll_top == true) {
                        mousewheelEnable(swiper);
                    }
                }
                // 滑块到达第一个禁用滚轮
                else if (is_slider_start == true && swiper.mousewheel.enabled == true && is_scroll_top == false) {
                    mousewheelDisable(swiper);
                }
            }
        });
    }

    return {
        'init': init
    }
});