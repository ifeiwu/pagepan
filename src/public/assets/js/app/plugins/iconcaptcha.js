define(['iconcaptcha/iconcaptcha', 'css!iconcaptcha/iconcaptcha'], function (require) {
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