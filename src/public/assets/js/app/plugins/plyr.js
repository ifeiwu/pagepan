/**
 * 视音频播放组件
 * <video class="plyr" width="100%" poster="<?=$uikit->item_image($path, $image); ?>" preload="none" controls="" playsInline="">
 *     <source src="<?=$uikit->item_image($path, $item['video']); ?>"></source>
 * </video>
 **/
define(function (require) {

    window.plyrs = [];

    require(['plyr'], function () {
        require(['Plyr'], function (Plyr) {
            $('video.plyr, audio.plyr').each(function (i, el) {
                if ( ! el.plyr )
                {
                    let player = new Plyr(el, {
                        iconUrl: 'assets/js/lib/plyr/plyr.svg',
                        blankVideo: 'assets/js/lib/plyr/blank.mp4',
                        i18n: {
                            speed: '速度',
                            normal: '正常'
                        }
                    });

                    player.on('play', function (event) {

                        // 只能播放一个视频
                        const _this = event.detail.plyr;

                        $.each(window.plyrs, function (i, _plyr) {

                            if ( _this.id != _plyr.id )
                            {
                                _plyr.pause();
                            }
                        });
                    })

                    window.plyrs[i] = player;
                }
            });
        });
    });

    // 支持流媒体 Hls
    if ( $('audio.plyr[hls-src$=".m3u8"], video.plyr[hls-src$=".m3u8"]').length )
    {
        require(['hls'], function (Hls) {

            $('audio.plyr[hls-src$=".m3u8"], video.plyr[hls-src$=".m3u8"]').each(function (i, el) {

                let url = $(el).attr('hls-src');

                if ( Hls.isSupported() )
                {
                    let hls = new Hls();

                    hls.loadSource(url);
                    hls.attachMedia(el);
                    hls.on(Hls.Events.MANIFEST_PARSED, function() {
                        el.play();
                    });
                }
                else if ( el.canPlayType('application/vnd.apple.mpegurl') )
                {
                    el.src = url;

                    el.addEventListener('loadedmetadata', function() {
                        el.play();
                    });
                }
            });
        });
    }
});