import PubSub from 'pubsub-js'
import * as Action from './rpanel/action/index.js';
import * as Group from './rpanel/group/index.js';


PubSub.subscribe('event.click.contenteditable', function (msg, target) {
    // $target = $(target);
    const $fieldset = $('<div class="field-group px-4">');
    const $action = $('<ul class="grid grid-cols-6 p-2">');

    switch (target.tagName.toLocaleUpperCase()) {
        case 'A':
            $fieldset.append(
                Group.linkHref({target}),
                Group.linkTarget({target}),
            );
            break;

        case 'IMG':
            $action.append(
                Action.clone({target})
            )

            $fieldset.append(
                Group.imgSrc({target}),
                Group.imgHref({target}),
            );
            break;

        case 'SVG':
            $fieldset.append(
                Group.svgCode({target}),
                Group.svgHeight({target}),
                Group.svgWidth({target}),
                Group.svgHref({target}),
                // Group.linkTarget({ target }),
            );
            break;
    }

    $action.append(Action.remove({target}))

    $('.pb-rpanel .scroll').html($fieldset);
    $('.pb-rpanel .action').html($action);
});



