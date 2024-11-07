define(function (require) {
    let $component;
    const setComponent = function ($_component) {
        $component = $_component;
    }

    return {
        'setComponent': setComponent,
    };
});