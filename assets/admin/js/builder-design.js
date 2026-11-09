import PubSub from 'pubsub-js'
import './builder/rpanel.js';

const iframe = document.querySelector('#iframe');

iframe.addEventListener('load', () => {
    const iframeDoc = iframe.contentDocument
    const $body = $(iframeDoc).find('body');
    const editableSelector = 'h1,h2,h3,h4,h5,h6,p,a,span,kbd,em,small,big,button,td,th,li,time';

    // 为区块内的指定元素启用编辑
    function setEditable(block) {
        $(block).find(editableSelector).addBack(editableSelector).each(function () {
            const $el = $(this);
            $el.closest('[contenteditable="true"]').removeAttr('contenteditable');
            $el.attr('contenteditable', 'true');
        });
    }

    iframeDoc.addEventListener('mousedown', (e) => {
        const el = e.target.closest(editableSelector);
        if (!el) return;

        iframeDoc.querySelectorAll('[contenteditable="true"]')
            .forEach(item => item.removeAttribute('contenteditable'));

        el.setAttribute('contenteditable', 'true');
    });

    // 初始化区块
    $body.children('[data-block-type]').each(function () {
        $(this).attr('data-block-mode', 'design');
        setEditable(this);
    });

    // 点击可编辑元素
    $body.on('click', '[contenteditable="true"]', function (e) {
        e.stopPropagation();
        console.log('点击了可编辑元素', this);
        $body.children('.active').removeClass('active');

        PubSub.publish('event.click.contenteditable', this);
    });

    // 点击区块及取消选中
    $body.on('click', '> [data-block-type]', function (e) {
        e.stopPropagation();

        $body.children('.active').removeClass('active');
        $(this).addClass('active');
    });

    $body.on('click', function () {
        $body.children('.active').removeClass('active');
    });
});



