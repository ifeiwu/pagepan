import PubSub from 'pubsub-js';
import './builder/rpanel.js';

const $iframe = $('#iframe');

$iframe.on('load', function () {
    const $doc = $(this.contentDocument);
    const $body = $doc.find('body').attr('data-mode', 'design');
    const editableSelector = 'h1,h2,h3,h4,h5,h6,p,a,span,kbd,em,small,big,button,td,th,li,time';
    const clickSelector = 'svg,img';

    // 单击可编辑元素
    $body.on('mousedown', '> [data-block-type] *', function (e) {
        e.stopPropagation();

        if (e.button > 0) return;

        const target = e.target;
        const $target = $(target);

        $body.find('[contenteditable="true"]').removeAttr('contenteditable');
        $body.find('[data-editable]').removeAttr('data-editable');

        if ($target.is(editableSelector)) {
            $target.attr('contenteditable', 'true');
            PubSub.publish('event.click.contenteditable', target);
        }

        if ($target.is(editableSelector) || $target.is(clickSelector)) {
            $target.attr('data-editable', '');
            PubSub.publish('event.click.editable', target);
        }
    });

    // 点击可编辑元素
    $body.on('click', '[data-editable]', function (e) {
        e.preventDefault();
        e.stopPropagation();
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

    // 手动触发点击元素：$target.trigger('click.target')
    $body.on('click.target', function (e) {
        e.preventDefault();
        e.stopPropagation();

        const target = e.target;
        const $target = $(target);

        $body.find('[data-editable]').removeAttr('data-editable');
        $target.attr('data-editable', '');
    });
});