export default function buttonClass(attrs = {}) {
    // 获取目标元素
    const $target = $(attrs.target);

    // 创建组件模板
    const $template = $(`
        <div class="group">
            <div class="label">按钮样式</div>

            <div class="value">
                <select name="btncss" id="btncss">
                    <option value="">默认透明</option>
                    <option value="btn-primary">主色（背景）</option>
                    <option value="btn-secondary">副色（背景）</option>
                    <option value="btn-mix">混色（背景）</option>
                    <option value="btn-outline-primary">主色（线框）</option>
                    <option value="btn-outline-secondary">副色（线框）</option>
                    <option value="btn-outline-mix">混色（线框）</option>
                </select>
            </div>
        </div>
    `);

    // 获取组件内部元素
    const $select = $template.find('select');

    // 按钮样式对应的 CSS 类名
    const classNames = [
        'btn-primary',
        'btn-secondary',
        'btn-mix',
        'btn-outline-primary',
        'btn-outline-secondary',
        'btn-outline-mix'
    ];

    // 根据目标元素判断是否显示组件
    function update() {
        if (!$target.is('.btn')) {
            $template.hide();
            return;
        }

        $template.show();

        // 根据目标元素现有的样式选中对应选项
        const selectedClass = classNames.find(className => {
            return $target.hasClass(className);
        });

        $select.val(selectedClass || '');
    }

    // 监听选择变化，更新目标元素的按钮样式
    $select.on('change', function () {
        // 移除所有按钮样式
        $target.removeClass(classNames.join(' '));

        // 添加当前选中的样式
        if (this.value) {
            $target.addClass(this.value);
        }
    });

    // 初始化组件
    update();

    return $template;
}