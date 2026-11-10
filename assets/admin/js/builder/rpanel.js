import PubSub from 'pubsub-js'
import * as Group from './rpanel/group/index.js';

PubSub.subscribe('event.click.contenteditable', function (msg, target) {
    const $fieldset = $('<div class="field-group px-4">');

    $fieldset.append(
        Group.linkHref({ label: '链接地址', target }),
        Group.linkTarget({ target }),
    );
    $('.pb-rpanel .scroll').html($fieldset);
});



