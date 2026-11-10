import WinBox from 'winbox/src/js/winbox.js';
import 'winbox/dist/css/winbox.min.css';

export function open(url, title, callback) {
    // 删除已经打开的窗口
    WinBox.stack().forEach(winbox => winbox.close());

    let winbox = new WinBox(title, {
        url,
        x: 'center',
        y: 'center',
        width: '80%',
        minwidth: '900px',
        maxwidth: '1200px',
        height: '80%',
        border: 6,
        background: '#000',
        overflow: true,
        class: ['no-full', 'no-max', 'no-min', 'footbar'],

        oncreate() {
            $(this.body).append('<div class="wb-loading">页面加载中...</div>');
        },

        onload() {
            $(window).one('finder.choose-file', function (e, image) {
                image = builder.site.domain3 + image + '?' + Date.now();

                callback(image);
                winbox.close();
            });
        },

        onclose() {
            winbox.setUrl('about:blank');
        }
    });
}