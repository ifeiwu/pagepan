import PubSub from 'pubsub-js';
import './builder/rpanel.js';

const $iframe = $('#iframe');

$iframe.on('load', function () {
    const $doc = $(this.contentDocument);
    const $body = $doc.find('body').attr('data-mode', 'design');
    const editableSelector = 'h1,h2,h3,h4,h5,h6,p,a,span,kbd,em,small,big,button,td,th,li,time';

    // 单击可编辑元素
    $doc.on('mousedown', function (e) {
        if (e.button > 0) return;

        const $el = $(e.target).closest(editableSelector);
        if (!$el.length) return;

        $body.find('[contenteditable="true"]').removeAttr('contenteditable');

        $el.attr('contenteditable', 'true');
    });

    // 点击可编辑元素
    $body.on('click', '[contenteditable="true"]', function (e) {
        e.preventDefault();
        e.stopPropagation();

        $body.find('.pb-editable').removeClass('pb-editable');
        $(this).addClass('pb-editable');

        PubSub.publish('event.click.contenteditable', this);
    });

    // 点击区块及取消选中
    $body.on('click', '> [data-block-type]', function (e) {
        e.preventDefault();
        e.stopPropagation();

        $body.find('.pb-editable').removeClass('pb-editable');
        $(this).addClass('pb-editable');

        PubSub.publish('event.click.block', this);
    });

    // 点击空白区域取消选中
    $body.on('click', function () {
        $body.find('.pb-editable').removeClass('pb-editable');
    });
});