
define(['jquery'], function ($) {
    return function (doc) {
        const $body = $(doc).find('body');
        const blockSelector = '[data-block-type=""]';
        const blockPhpSelector = '[data-block-type!=""]';
        const editableSelector = 'h1,h2,h3,h4,h5,h6,p,a,span,kbd,em,small,big,button,td,th,li,time';

        // 为区块内的指定元素启用编辑
        function setEditable(block) {
            $(block).find(editableSelector).addBack(editableSelector).each(function () {
                const $el = $(this);
                $el.closest('[contenteditable="true"]').removeAttr('contenteditable');
                $el.attr('contenteditable', 'true');
            });
        }

        // 初始化时阻止链接导航
        doc.addEventListener('click', e => {
            if (e.target.closest('a')) {
                e.preventDefault();
            }
        }, true);

        doc.addEventListener('click', e => {
            console.log(e)
            const el = e.target.closest(editableSelector);
            if (!el) return;

            doc.querySelectorAll('[contenteditable="true"]')
                .forEach(item => item.removeAttribute('contenteditable'));

            el.setAttribute('contenteditable', 'true');
            el.focus();
        });

        // 初始化现有区块
        // $body.children(blockSelector).each(function () {
        //     setEditable(this);
        // });

        // 初始化区块
        $body.children('[data-block-type]').each(function () {
            $(this).attr('data-block-mode', 'design')
        });

        // 监听新增区块及其内部元素
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(({ addedNodes }) => {
                addedNodes.forEach(node => {
                    if (node.nodeType !== 1) return;
                    // 新增区块或普通 DOM 节点
                    setEditable(node);
                });
            });
        });

        observer.observe($body[0], {
            childList: true,
            subtree: true
        });

        // 点击可编辑元素
        $body.on('click', '[contenteditable="true"]', function () {
            console.log('点击了可编辑元素', this);
        });

        // 点击区块及取消选中
        $body.on('click', '> :not([data-block-type=""])', function (e) {
            e.stopPropagation();

            $body.children('.active').removeClass('active');
            $(this).addClass('active');
        });

        $body.on('click', function () {
            $body.children('.active').removeClass('active');
        });
    };
});
