export default function removeBlock(attrs = {}) {
    // 获取目标元素
    let $target = $(attrs.target);

    // 创建组件模板
    const $template = $(`
        <li>
            <button class="btn btn-lg btn-icon btn-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash preview-icon"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
        </li>
    `);

    // 获取删除按钮
    const $apply = $template.find('button');

    // 点击删除区块
    $apply.on('click', function (e) {
        e.preventDefault();

        const block_id = $target.data('blockId');
        console.log(block_id)
        $.get('/admin/builder/block/delete', {'block_id': block_id}, function (res) {
            if (res.code === 0) {
                // let $target2 = $target.next()
                // if ($target2.length === 0) {
                //     $target2 = $target.prev()
                //     if ($target2.length === 0) {
                // }
                $target.remove()
                // $target.trigger('click.target')
            }
        })
    });

    // 返回组件模板
    return $template;
}