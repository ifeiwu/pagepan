export default function clone(attrs = {}) {
    // 获取目标元素
    let $target = $(attrs.target);

    // 创建组件模板
    const $template = $(`
        <li>
            <button class="btn btn-lg btn-icon btn-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy preview-icon"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </button>
        </li>
    `);

    // 获取编辑按钮
    const $apply = $template.find('button');

    // 点击按钮，打开 SVG 源码编辑器
    $apply.on('click', function (e) {
        e.preventDefault();

        if ($target.is('img')) {
            let $picture = $target.parent('picture')
            if ($picture.length) {
                let $picture2 = $picture.clone()
                $picture2.find('img').removeAttr('data-editable')
                $picture.after($picture2)
            } else {
                let $target2 = $target.clone()
                $target2.removeAttr('data-editable')
                $target.after($target2)
            }
        } else {
            let $li = $target.closest('li');
            if ($li.length) {
                $li.after($li.clone(true));
            } else {
                let $target2 = $target.clone()
                $target2.removeAttr('data-editable')
                $target.after($target2)
            }
        }
    });

    // 返回组件模板
    return $template;
}