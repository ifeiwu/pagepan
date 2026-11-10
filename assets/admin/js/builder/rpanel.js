import PubSub from 'pubsub-js'
import * as Group from './rpanel/group/index.js';


PubSub.subscribe('event.click.contenteditable', function (msg, target) {
    // $target = $(target);
    const $fieldset = $('<div class="field-group px-4">');

    switch (target.tagName.toLocaleUpperCase()) {
        case 'A':
            $fieldset.append(
                Group.linkHref({ target }),
                Group.linkTarget({target }),
            );
            break;

        case 'IMG':
            $fieldset.append(
                Group.imgSrc({ target }),
                Group.imgHref({ target }),
            );
            break;

        case 'SVG':
            $fieldset.append(
                Group.svgCode({ target }),
                Group.svgHeight({ target }),
                Group.svgWidth({ target }),
                Group.svgHref({ target }),
                // Group.linkTarget({ target }),
            );
            break;
    }

    $('.pb-rpanel .scroll').html($fieldset);
});



