import PubSub from 'pubsub-js'
import * as Action from './rpanel/action/index.js';
import * as Group from './rpanel/group/index.js';

$rpanel = $('.pb-rpanel');

PubSub.subscribe('event.click.block', function (msg, target) {
    $rpanel.find('.card.attributes').empty();

    const $action = $('<ul class="grid grid-cols-6 p-2">');

    $action.append(
        // Action.cloneBlock({target}),
        Action.removeBlock({target})
    )

    $rpanel.find('>.actions').html($action);
});

PubSub.subscribe('event.click.editable', function (msg, target) {
    const $fieldset = $('<div class="field-group">');
    const $action = $('<ul class="grid grid-cols-6 p-2">');

    const tagname = target.tagName.toLocaleUpperCase();
    switch (tagname) {
        case 'A':
            $fieldset.append(
                Group.linkHref({target}),
                Group.linkTarget({target}),
            );
            break;

        case 'IMG':
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

    $action.append(
        Action.clone({target}),
        Action.remove({target})
    )

    if (!$fieldset.is(':empty')) {
        const $card = $('<div class="card-content">').append($fieldset);
        $rpanel.find('.card.attributes').html($card);
    }

    $rpanel.find('>.actions').html($action);
});




