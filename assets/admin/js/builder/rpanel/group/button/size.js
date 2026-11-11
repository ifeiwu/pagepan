export default function buttonSize(attrs = {}) {
    // 获取目标元素和当前响应式断点
    const $target = $(attrs.target);
    const breakpoint = window.breakpoint || '';

    // 按钮大小选项
    const options = [
        { value: '', text: '默认' },
        { value: 'btn-1', text: '1' },
        { value: 'btn-2', text: '2' },
        { value: 'btn-3', text: '3' },
        { value: 'btn-4', text: '4' },
        { value: 'btn-5', text: '5' }
    ];

    // 断点信息
    const label = '按钮大小';
    const breakpointInfo = window.breakpointWidth
        ? `<span class="icon" title="${window.breakpointText}">${window.breakpointIcon}</span>`
        : '';

    // 创建组件模板
    const $template = $(`
        <div class="group">
            <div class="label">${label}${breakpointInfo}</div>
            <div class="value">
                <select name="btnsize" id="btnsize"></select>
            </div>
        </div>
    `);

    // 获取下拉框
    const $select = $template.find('select');

    // 生成选项
    options.forEach(function (option) {
        $select.append(
            $('<option>', {
                value: option.value,
                text: option.text
            })
        );
    });

    // 根据目标元素的按钮大小设置当前选中项
    function updateValue() {
        if (!$target.is('.btn')) {
            $template.hide();
            return;
        }

        $template.show();

        let value = '';

        // 查找目标元素当前断点对应的按钮大小
        for (const option of options) {
            if (option.value && $target.hasClass(option.value + breakpoint)) {
                value = option.value;
                break;
            }
        }

        $select.val(value);
    }

    // 选择按钮大小时，同步更新目标元素的 class
    $select.on('change', function () {
        // 移除所有按钮大小对应的断点 class
        options.forEach(function (option) {
            if (option.value) {
                $target.removeClass(option.value + breakpoint);
            }
        });

        // 添加当前选择的按钮大小
        if (this.value) {
            $target.addClass(this.value + breakpoint);
        }
    });

    // 初始化组件状态
    updateValue();

    return $template;
}