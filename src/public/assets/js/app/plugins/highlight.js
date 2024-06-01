define(function (require) {

    require(['highlight/highlight.min'], function () {

        $('pre>code').each(function (i, el) {

            let $el = $(el);

            let theme = $el.attr('theme');

            if ( ! theme )
            {
                $el.attr('theme', theme = 'agate');
            }

            require(['css!highlight/styles/' + theme + '.min']);

        });

        hljs.highlightAll();
    });
});