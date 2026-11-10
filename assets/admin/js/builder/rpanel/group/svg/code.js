import * as WinboxEditor from '../../../winbox/editor.js';

export default function svgCode(attrs = {}) {
    // 获取目标元素
    let $target = $(attrs.target);

    // 创建组件模板
    const $template = $(`
        <div class="field">
            <button type="button" class="btn w-full">编辑图标源码</button>
        </div>
    `);

    // 获取编辑按钮
    const $apply = $template.find('button');

    // 点击按钮，打开 SVG 源码编辑器
    $apply.on('click', function (e) {
        e.preventDefault();

        // 禁用按钮，避免重复打开编辑器
        $apply.attr('disabled', true);

        // 获取当前 SVG 源码
        const value = $target[0].outerHTML;

        // 打开 SVG 编辑窗口
        WinboxEditor.open(
            '/admin/builder/winbox/svg-edit',
            '编辑SVG',
            value,

            // 保存回调：替换当前 SVG 元素
            function (value, $save, $save_close) {
                const $target2 = $(value);

                // 使用新 SVG 替换旧元素
                $target.replaceWith($target2);

                // 重新引用新元素
                $target = $target2;

                // 同步更新表单中的 SVG 宽高
                const $form = $apply.closest('form');

                $form.find('[name="svg_width"]').val($target.attr('width'));
                $form.find('[name="svg_height"]').val($target.attr('height'));

                // 恢复编辑器保存按钮状态
                $save.attr('disabled', false);
                $save_close.attr('disabled', false);
            },

            // 关闭回调：恢复编辑按钮状态
            function () {
                $apply.attr('disabled', false);
            }
        );
    });

    // 返回组件模板
    return $template;
}