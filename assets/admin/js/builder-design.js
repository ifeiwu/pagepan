import PubSub from 'pubsub-js';
import './builder/rpanel.js';

const $iframe = $('#iframe');

$iframe.on('load', function () {
    const $doc = $(this.contentDocument);
    const $body = $doc.find('body').attr('data-mode', 'design');
    const editableSelector = 'h1,h2,h3,h4,h5,h6,p,a,span,kbd,em,small,big,button,td,th,li,time';
    const clickSelector = 'svg,img';

    // 单击可编辑元素
    $doc.on('mousedown', function (e) {
        if (e.button > 0) return;

        // const $el = $(e.target).closest(editableSelector);
        // if (!$el.length) return;

        const $el = $(e.target);

        $body.find('[contenteditable="true"]').removeAttr('contenteditable');
        $body.find('[data-editable]').removeAttr('data-editable');

        if ($el.is(editableSelector)) {
            $el.attr('contenteditable', 'true');
        }

        if ($el.is(editableSelector) || $el.is(clickSelector)) {
            $(e.target).attr('data-editable', '');
        }
    });

    // 点击可编辑元素
    $body.on('click', '[data-editable]', function (e) {
        e.preventDefault();
        e.stopPropagation();

        PubSub.publish('event.click.contenteditable', e.target);
    });

    // 点击区块及取消选中
    $body.on('click', '> [data-block-type]', function (e) {
        e.preventDefault();
        e.stopPropagation();

        $body.find('[data-editable]').removeAttr('data-editable');
        $(this).attr('data-editable', '');

        PubSub.publish('event.click.block', this);
    });

    // 点击空白区域取消选中
    $body.on('click', function () {
        $body.find('[data-editable]').removeAttr('data-editable');
    });
});