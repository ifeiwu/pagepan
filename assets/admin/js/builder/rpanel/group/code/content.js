import * as WinboxEditor from '../../../winbox/editor.js';

export default function codeContent(attrs = {}) {
    // 获取目标元素
    const $target = $(attrs.target);

    // 创建组件模板
    const $template = $(`
        <div class="group">
            <div class="value">
                <button type="button" class="btn btn-primary">
                    编辑语言代码
                </button>
            </div>
        </div>
    `);

    // 获取编辑按钮
    const $apply = $template.find('button');

    // 打开代码编辑器
    $apply.on('click', function (e) {
        e.preventDefault();

        // 禁用按钮，防止重复打开编辑器
        $apply.prop('disabled', true);

        // 获取当前代码内容
        const value = $target.text();

        // 编辑器地址
        const url = 'builder/winpage/monaco?lang=';

        WinboxEditor.open(
            url,
            '编辑语言代码',
            value,

            // 保存代码后更新目标元素
            function (value, $save, $save_close) {
                $target.text(value);

                // 恢复编辑器保存按钮
                $save.prop('disabled', false);
                $save_close.prop('disabled', false);
            },

            // 编辑器关闭时恢复当前按钮
            function () {
                $apply.prop('disabled', false);
            }
        );
    });

    // 返回组件模板
    return $template;
}