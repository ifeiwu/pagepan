/**
 * 视频播放组件
 * <video class="video-js" data-theme="<?=$setting['userdata.video.theme']; ?>" data-poster="<?=$this->uikit->item_image($path, $image); ?>" width="100%" controls>
 *     <source src="$this->uikit->item_file($path, $item['video']); ?>"></source>
 * </video>
 **/
define(function (require) {

    window.videos = [];

    require(['video', 'text!lib/video/lang/zh-CN.json'], function (videojs, lang) {
        videojs.addLanguage('zh-CN', JSON.parse(lang));

        $('video.video-js').each(function (i, el) {
            const dataset = el.dataset;
            const poster = dataset.poster;
            const theme = dataset.theme;
            const player = new videojs(el, {
                poster: poster,
                controls: true,
                preload: 'none',
                width: '100%',
                language: 'zh-CN',
                fluid: true
            }, function () {
                if (theme) {
                    require(['css!lib/video/theme/' + theme], function () {
                        player.addClass('vjs-theme-' + theme);
                    });
                }
            });

            player.on('play', function () {
                // 只能播放一个视频
                const _this = this;
                $.each(window.videos, function (i, p) {
                    if (_this.id_ != p.id_) {
                        p.pause();
                    }
                });
            })
            window.videos[i] = player;
        });
    });
});