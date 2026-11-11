export default function selectDefault(attrs = {}) {
    const {
        data = [],
        name,
        value = '',
        label = '',
        callbacks = {},
        breakpoint = false
    } = attrs;

    // 创建组件模板
    const $template = $(`
        <div class="group">
            <div class="label"></div>
            <select></select>
        </div>
    `);

    const $label = $template.find('.label');
    const $select = $template.find('select');

    // 设置组件属性
    $template.attr('setting', name);
    $select.attr('name', name);

    // 设置标签内容
    $label.text(label);

    // 添加断点标识
    if (breakpoint) {
        $label.append(`
            <span class="icon" title="${window.breakpointText}">
                ${window.breakpointIcon}
            </span>
        `);
    }

    // 添加选项
    data.forEach(function (option) {
        const group = option.group;

        if ($.isArray(group)) {
            // 创建选项分组
            const $optgroup = $('<optgroup>').attr('label', option.label);

            group.forEach(function (item) {
                const $option = $('<option>')
                    .val(item.value)
                    .text(item.text);

                $optgroup.append($option);
            });

            $select.append($optgroup);
        } else {
            // 创建普通选项
            const $option = $('<option>')
                .val(option.value)
                .text(option.text);

            $select.append($option);
        }
    });

    // 设置初始选中值
    $select.val(String(value));

    // 初始化回调
    if (typeof callbacks.oncreate === 'function') {
        callbacks.oncreate(String(value), $select[0]);
    }

    // 监听选项变化
    $select.on('change', function () {
        callbacks.onchange?.(this.value);
    });

    // 更新选中值及执行更新回调
    if (typeof callbacks.onupdate === 'function') {
        callbacks.onupdate(String(value), $select[0]);
    }

    // 返回组件模板
    return $template;
}