import PubSub from 'pubsub-js'
import { GroupLinkHref } from './rpanel/group/index.js';

PubSub.subscribe('event.click.contenteditable', function (msg, target) {
    const $fieldset = $('<div class="field-group px-4">');

    $fieldset.append(
        GroupLinkHref({ label: '链接地址', target }),
    );
    $('.pb-rpanel .scroll').html($fieldset);
});



