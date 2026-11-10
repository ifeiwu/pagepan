import * as WinboxFinder from '../../../winbox/finder.js';

export default function linkHref(attrs = {}) {
    // 获取目标元素
    const $target = $(attrs.target);

    // 创建组件模板
    const $template = $(`
        <div class="field">
            <label class="label">链接地址</label>

            <div class="input-group">
                <textarea class="textarea" placeholder="https://"></textarea>

                <span class="input-group-addon input-group-addon-block-end">
                    <button type="button" name="finder" class="btn btn-xs btn-ghost ml-auto" title="选择文件">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                            <path d="M3.5 2C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V6H8.5C8.22386 6 8 5.77614 8 5.5V2H3.5ZM9 2.70711L11.2929 5H9V2.70711ZM2 2.5C2 1.67157 2.67157 1 3.5 1H8.5C8.63261 1 8.75979 1.05268 8.85355 1.14645L12.8536 5.14645C12.9473 5.24021 13 5.36739 13 5.5V12.5C13 13.3284 12.3284 14 11.5 14H3.5C2.67157 14 2 13.3284 2 12.5V2.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                        </svg>
                    </button>

                    <button type="button" name="remove" class="btn btn-xs btn-ghost" title="清空地址">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                            <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </span>
            </div>
        </div>
    `);

    // 获取组件内部元素
    const $textarea = $template.find('textarea');
    const $finder = $template.find('[name="finder"]');
    const $remove = $template.find('[name="remove"]');

    // 设置标签和初始链接地址
    $textarea.val($target.attr('href') || '');

    // 监听输入，同步更新目标元素的 href
    $textarea.on('input', function () {
        $target.attr('href', this.value);
    });

    // 打开文件选择器，并将选择结果填入输入框
    $finder.on('click', function (e) {
        e.preventDefault();

        WinboxFinder.open(
            'finder/modal?mode=choose&type=',
            '选择文件',
            function (url) {
                $textarea.val(url).trigger('input');
            }
        );
    });

    // 清空链接地址
    $remove.on('click', function (e) {
        e.preventDefault();

        $textarea.val('').trigger('input');
    });

    // 返回组件模板
    return $template;
}