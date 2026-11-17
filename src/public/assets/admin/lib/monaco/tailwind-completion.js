
/**
 * Tailwind CSS v4 Monaco Completion
 * Browser AMD environment
 *
 * Usage:
 * require(['vs/editor/editor.main'], function (monaco) {
 *     registerTailwindCompletion(monaco);
 * });
 */

function registerTailwindCompletion(monaco, options = {}) {
    const {
        language = 'php',
        maxSuggestions = 100,
    } = options;

    const CompletionItemKind = monaco.languages.CompletionItemKind;

    const classes = new Map();

    // --------------------------------------------------
    // Class registry
    // --------------------------------------------------

    function add(names, detail = 'Tailwind CSS') {
        if (typeof names === 'string') {
            names = names.split(/\s+/).filter(Boolean);
        }

        for (const name of names) {
            classes.set(name, detail);
        }
    }

    function range(prefix, values, suffix = '', detail = 'Tailwind CSS') {
        for (const value of values) {
            add(prefix + value + suffix, detail);
        }
    }

    function numeric(prefix, values, suffix = '', detail = 'Tailwind CSS') {
        range(prefix, values, suffix, detail);
    }

    // --------------------------------------------------
    // Static utilities
    // --------------------------------------------------

    add(`
        sr-only not-sr-only
        pointer-events-none pointer-events-auto
        visible invisible collapse
        static fixed absolute relative sticky
        isolate isolation-auto
        z-auto
        block inline-block inline flex inline-flex
        table inline-table table-caption table-cell table-column
        table-column-group table-footer-group table-header-group
        table-row-group table-row flow-root grid inline-grid
        contents list-item hidden
        float-start float-end float-right float-left float-none
        clear-start clear-end clear-left clear-right clear-both clear-none
        box-border box-content
        container
        aspect-auto aspect-square aspect-video
        columns-auto
        break-after-auto break-after-avoid break-after-all
        break-before-auto break-before-avoid break-before-all
        break-inside-auto break-inside-avoid break-inside-avoid-page
        break-inside-avoid-column
        box-decoration-clone box-decoration-slice
        overflow-auto overflow-hidden overflow-clip overflow-visible overflow-scroll
        overflow-x-auto overflow-x-hidden overflow-x-clip overflow-x-visible overflow-x-scroll
        overflow-y-auto overflow-y-hidden overflow-y-clip overflow-y-visible overflow-y-scroll
        overscroll-auto overscroll-contain overscroll-none
        overscroll-x-auto overscroll-x-contain overscroll-x-none
        overscroll-y-auto overscroll-y-contain overscroll-y-none
        truncate text-ellipsis text-clip
        whitespace-normal whitespace-nowrap whitespace-pre
        whitespace-pre-line whitespace-pre-wrap whitespace-break-spaces
        break-normal break-words break-all break-keep
        hyphens-none hyphens-manual hyphens-auto
        bg-fixed bg-local bg-scroll
        bg-clip-border bg-clip-padding bg-clip-content bg-clip-text
        bg-origin-border bg-origin-padding bg-origin-content
        bg-repeat bg-no-repeat bg-repeat-x bg-repeat-y
        bg-repeat-round bg-repeat-space
        bg-auto bg-cover bg-contain
        bg-bottom bg-center bg-left bg-left-bottom bg-left-top
        bg-right bg-right-bottom bg-right-top bg-top
        object-contain object-cover object-fill object-none object-scale-down
        object-bottom object-center object-left object-left-bottom
        object-left-top object-right object-right-bottom object-right-top object-top
        text-left text-center text-right text-justify text-start text-end
        align-baseline align-top align-middle align-bottom align-text-top
        align-text-bottom align-sub align-super
        font-thin font-extralight font-light font-normal font-medium
        font-semibold font-bold font-extrabold font-black
        italic not-italic
        antialiased subpixel-antialiased
        underline overline line-through no-underline
        uppercase lowercase capitalize normal-case
        text-wrap text-nowrap text-balance text-pretty
        list-inside list-outside
        list-none list-disc list-decimal
        appearance-none appearance-auto
        cursor-auto cursor-default cursor-pointer cursor-wait cursor-text
        cursor-move cursor-help cursor-not-allowed cursor-none
        cursor-context-menu cursor-progress cursor-cell cursor-crosshair
        cursor-vertical-text cursor-alias cursor-copy cursor-no-drop
        cursor-grab cursor-grabbing cursor-all-scroll cursor-col-resize
        cursor-row-resize cursor-n-resize cursor-e-resize cursor-s-resize
        cursor-w-resize cursor-ne-resize cursor-nw-resize cursor-se-resize
        cursor-sw-resize cursor-ew-resize cursor-ns-resize cursor-nesw-resize
        cursor-nwse-resize cursor-zoom-in cursor-zoom-out
        resize resize-none resize-x resize-y
        select-none select-text select-all select-auto
        pointer-events-none pointer-events-auto
        outline-none outline-hidden
        ring-inset
        transition transition-all transition-colors transition-opacity
        transition-shadow transition-transform transition-none
        ease-linear ease-in ease-out ease-in-out
        animate-none animate-spin animate-ping animate-pulse animate-bounce
        transform transform-cpu transform-gpu transform-none
        origin-center origin-top origin-top-right origin-right
        origin-bottom-right origin-bottom origin-bottom-left
        origin-left origin-top-left
        grayscale invert sepia
        filter filter-none
        backdrop-blur backdrop-brightness backdrop-contrast
        backdrop-grayscale backdrop-hue-rotate backdrop-invert
        backdrop-opacity backdrop-saturate backdrop-sepia
        mix-blend-normal mix-blend-multiply mix-blend-screen
        mix-blend-overlay mix-blend-darken mix-blend-lighten
        mix-blend-color-dodge mix-blend-color-burn mix-blend-hard-light
        mix-blend-soft-light mix-blend-difference mix-blend-exclusion
        mix-blend-hue mix-blend-saturation mix-blend-color mix-blend-luminosity
        bg-blend-normal bg-blend-multiply bg-blend-screen bg-blend-overlay
        bg-blend-darken bg-blend-lighten bg-blend-color-dodge
        bg-blend-color-burn bg-blend-hard-light bg-blend-soft-light
        bg-blend-difference bg-blend-exclusion bg-blend-hue
        bg-blend-saturation bg-blend-color bg-blend-luminosity
        border-solid border-dashed border-dotted border-double border-hidden border-none
        border-collapse border-separate
        table-auto table-fixed
        caption-top caption-bottom
        sr-only
    `);

    // --------------------------------------------------
    // Spacing / sizing scales
    // --------------------------------------------------

    const spacing = [
        '0', 'px', '0.5', '1', '1.5', '2', '2.5', '3',
        '3.5', '4', '5', '6', '7', '8', '9', '10',
        '11', '12', '14', '16', '20', '24', '28', '32',
        '36', '40', '44', '48', '52', '56', '60', '64',
        '72', '80', '96', 'auto', 'full', 'screen', 'svw',
        'lvw', 'dvw', 'min', 'max', 'fit'
    ];

    for (const prefix of [
        'p-', 'px-', 'py-', 'pt-', 'pr-', 'pb-', 'pl-',
        'ps-', 'pe-', 'm-', 'mx-', 'my-', 'mt-', 'mr-',
        'mb-', 'ml-', 'ms-', 'me-', 'gap-', 'gap-x-',
        'gap-y-', 'space-x-', 'space-y-', 'scroll-m-',
        'scroll-mx-', 'scroll-my-', 'scroll-mt-', 'scroll-mr-',
        'scroll-mb-', 'scroll-ml-', 'scroll-p-', 'scroll-px-',
        'scroll-py-', 'scroll-pt-', 'scroll-pr-', 'scroll-pb-',
        'scroll-pl-'
    ]) {
        numeric(prefix, spacing, '', 'Spacing');
    }

    for (const prefix of [
        'w-', 'min-w-', 'max-w-', 'h-', 'min-h-', 'max-h-',
        'size-', 'basis-', 'inset-', 'inset-x-', 'inset-y-',
        'top-', 'right-', 'bottom-', 'left-', 'start-', 'end-',
        'translate-x-', 'translate-y-', 'scroll-snap-stop-'
    ]) {
        numeric(prefix, spacing, '', 'Sizing / Position');
    }

    range('w-', [
        '1/2', '1/3', '2/3', '1/4', '2/4', '3/4',
        '1/5', '2/5', '3/5', '4/5',
        '1/6', '5/6', '1/12', '5/12', '7/12', '11/12'
    ], '', 'Width');

    range('h-', ['1/2', '1/3', '2/3', '1/4', '3/4', '1/5', 'full'], '', 'Height');

    range('max-w-', [
        'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl',
        '4xl', '5xl', '6xl', '7xl', 'prose', 'screen-sm',
        'screen-md', 'screen-lg', 'screen-xl', 'screen-2xl'
    ], '', 'Max width');

    // --------------------------------------------------
    // Flex / Grid
    // --------------------------------------------------

    add(`
        flex-row flex-row-reverse flex-col flex-col-reverse
        flex-wrap flex-wrap-reverse flex-nowrap
        flex-1 flex-auto flex-initial flex-none
        grow grow-0 shrink shrink-0
        items-start items-end items-center items-baseline items-stretch
        justify-normal justify-start justify-end justify-center
        justify-between justify-around justify-evenly justify-stretch
        justify-items-start justify-items-end justify-items-center
        justify-items-stretch
        justify-self-auto justify-self-start justify-self-end
        justify-self-center justify-self-stretch
        content-normal content-center content-start content-end
        content-between content-around content-evenly content-baseline
        content-stretch
        self-auto self-start self-end self-center self-stretch self-baseline
        place-content-center place-content-start place-content-end
        place-content-between place-content-around place-content-evenly
        place-content-baseline place-content-stretch
        place-items-start place-items-end place-items-center place-items-baseline
        place-items-stretch
        place-self-auto place-self-start place-self-end place-self-center
        place-self-stretch
        grid-flow-row grid-flow-col grid-flow-dense
        grid-flow-row-dense grid-flow-col-dense
        auto-cols-auto auto-cols-min auto-cols-max auto-cols-fr
        auto-rows-auto auto-rows-min auto-rows-max auto-rows-fr
        col-auto row-auto
    `);

    for (let i = 1; i <= 12; i++) {
        add([
            `grid-cols-${i}`,
            `grid-rows-${i}`,
            `col-span-${i}`,
            `row-span-${i}`,
            `col-start-${i}`,
            `col-end-${i}`,
            `row-start-${i}`,
            `row-end-${i}`
        ], 'Grid');
    }

    add(`
        col-span-full row-span-full
        col-start-auto col-end-auto
        row-start-auto row-end-auto
    `, 'Grid');

    // --------------------------------------------------
    // Typography
    // --------------------------------------------------

    add(`
        text-xs text-sm text-base text-lg text-xl
        text-2xl text-3xl text-4xl text-5xl
        text-6xl text-7xl text-8xl text-9xl
        leading-none leading-tight leading-snug
        leading-normal leading-relaxed leading-loose
        tracking-tighter tracking-tight tracking-normal
        tracking-wide tracking-wider tracking-widest
        decoration-solid decoration-double decoration-dotted
        decoration-dashed decoration-wavy
        underline-offset-auto
        normal-nums ordinal slashed-zero lining-nums
        oldstyle-nums proportional-nums tabular-nums
        diagonal-fractions stacked-fractions
        list-inside list-outside
    `);

    range('leading-', spacing, '', 'Line height');
    range('tracking-', [
        'tighter', 'tight', 'normal', 'wide', 'wider', 'widest'
    ], '', 'Letter spacing');

    range('indent-', spacing, '', 'Text indent');

    // --------------------------------------------------
    // Colors
    // --------------------------------------------------

    const colors = [
        'inherit', 'current', 'transparent', 'black', 'white',
        'slate', 'gray', 'zinc', 'neutral', 'stone',
        'red', 'orange', 'amber', 'yellow', 'lime',
        'green', 'emerald', 'teal', 'cyan', 'sky',
        'blue', 'indigo', 'violet', 'purple', 'fuchsia',
        'pink', 'rose'
    ];

    const shades = [
        '50', '100', '200', '300', '400', '500',
        '600', '700', '800', '900', '950'
    ];

    for (const prefix of ['bg-', 'text-', 'border-', 'outline-', 'ring-', 'fill-', 'stroke-', 'decoration-', 'accent-', 'caret-']) {
        add([
            prefix + 'inherit',
            prefix + 'current',
            prefix + 'transparent',
            prefix + 'black',
            prefix + 'white'
        ], 'Color');

        for (const color of colors.slice(5)) {
            for (const shade of shades) {
                add(prefix + color + '-' + shade, 'Color');
            }
        }
    }

    // --------------------------------------------------
    // Background
    // --------------------------------------------------

    add(`
        bg-gradient-to-t bg-gradient-to-tr bg-gradient-to-r
        bg-gradient-to-br bg-gradient-to-b bg-gradient-to-bl
        bg-gradient-to-l bg-gradient-to-tl
        bg-none
    `, 'Background');

    // --------------------------------------------------
    // Border / Radius / Shadow
    // --------------------------------------------------

    add(`
        rounded-none rounded-sm rounded-md rounded-lg rounded-xl
        rounded-2xl rounded-3xl rounded-full
        rounded-t-none rounded-t-sm rounded-t-md rounded-t-lg
        rounded-b-none rounded-b-sm rounded-b-md rounded-b-lg
        rounded-l-none rounded-l-sm rounded-l-md rounded-l-lg
        rounded-r-none rounded-r-sm rounded-r-md rounded-r-lg
        border border-0 border-2 border-4 border-8
        border-x border-y border-t border-r border-b border-l
        outline outline-0 outline-1 outline-2 outline-4 outline-8
        ring ring-0 ring-1 ring-2 ring-4 ring-8
        shadow shadow-xs shadow-sm shadow-md shadow-lg
        shadow-xl shadow-2xl shadow-inner shadow-none
        divide-x divide-y divide-x-reverse divide-y-reverse
        divide-solid divide-dashed divide-dotted divide-double divide-none
    `, 'Border / Shadow');

    // --------------------------------------------------
    // Effects
    // --------------------------------------------------

    add(`
        opacity-0 opacity-5 opacity-10 opacity-15 opacity-20
        opacity-25 opacity-30 opacity-35 opacity-40 opacity-45
        opacity-50 opacity-55 opacity-60 opacity-65 opacity-70
        opacity-75 opacity-80 opacity-85 opacity-90 opacity-95 opacity-100
        blur-none blur-sm blur-md blur-lg blur-xl blur-2xl blur-3xl
        brightness-0 brightness-50 brightness-75 brightness-90
        brightness-95 brightness-100 brightness-105 brightness-110
        brightness-125 brightness-150 brightness-200
        contrast-0 contrast-50 contrast-75 contrast-100
        contrast-125 contrast-150 contrast-200
        grayscale-0 grayscale
        invert-0 invert
        sepia-0 sepia
        saturate-0 saturate-50 saturate-100 saturate-150 saturate-200
        drop-shadow-xs drop-shadow-sm drop-shadow-md drop-shadow-lg
        drop-shadow-xl drop-shadow-2xl drop-shadow-none
    `, 'Effects');

    // --------------------------------------------------
    // Transform / Transition
    // --------------------------------------------------

    add(`
        rotate-0 rotate-1 rotate-2 rotate-3 rotate-6 rotate-12
        rotate-45 rotate-90 rotate-180
        -rotate-1 -rotate-2 -rotate-3 -rotate-6 -rotate-12
        -rotate-45 -rotate-90 -rotate-180
        scale-0 scale-50 scale-75 scale-90 scale-95
        scale-100 scale-105 scale-110 scale-125 scale-150
        scale-x-0 scale-x-50 scale-x-75 scale-x-90 scale-x-95
        scale-x-100 scale-x-105 scale-x-110 scale-x-125 scale-x-150
        scale-y-0 scale-y-50 scale-y-75 scale-y-90 scale-y-95
        scale-y-100 scale-y-105 scale-y-110 scale-y-125 scale-y-150
        skew-x-0 skew-x-1 skew-x-2 skew-x-3 skew-x-6 skew-x-12
        skew-y-0 skew-y-1 skew-y-2 skew-y-3 skew-y-6 skew-y-12
        duration-75 duration-100 duration-150 duration-200
        duration-300 duration-500 duration-700 duration-1000
        delay-75 delay-100 delay-150 delay-200 delay-300
        delay-500 delay-700 delay-1000
        ease-linear ease-in ease-out ease-in-out
    `, 'Transform / Transition');

    // --------------------------------------------------
    // Animation
    // --------------------------------------------------

    add(`
        animate-none animate-spin animate-ping animate-pulse animate-bounce
    `, 'Animation');

    // --------------------------------------------------
    // Interactivity
    // --------------------------------------------------

    add(`
        touch-auto touch-none touch-pan-x touch-pan-left
        touch-pan-right touch-pan-y touch-pan-up touch-pan-down
        touch-pinch-zoom touch-manipulation
        will-change-auto will-change-scroll will-change-contents
        will-change-transform
        snap-none snap-x snap-y snap-both
        snap-mandatory snap-proximity
        snap-start snap-end snap-center snap-align-none
        snap-normal snap-always
        accent-auto
    `, 'Interactivity');

    // --------------------------------------------------
    // Variant generator
    // --------------------------------------------------

    const variants = [
        // Responsive
        'sm', 'md', 'lg', 'xl', '2xl',

        // Dark
        'dark',

        // State
        'hover', 'focus', 'focus-within', 'focus-visible',
        'active', 'visited', 'target',
        'first', 'last', 'only', 'odd', 'even',
        'first-of-type', 'last-of-type', 'only-of-type',
        'empty', 'enabled', 'disabled', 'checked',
        'indeterminate', 'default', 'required', 'valid',
        'invalid', 'in-range', 'out-of-range',
        'placeholder-shown', 'autofill', 'read-only',

        // Pseudo elements
        'before', 'after', 'first-letter', 'first-line',
        'marker', 'selection', 'file', 'placeholder',
        'backdrop',

        // Group
        'group-hover', 'group-focus', 'group-active',
        'group-checked', 'group-disabled',
        'group-first', 'group-last',

        // Peer
        'peer-hover', 'peer-focus', 'peer-active',
        'peer-checked', 'peer-disabled',
        'peer-required', 'peer-invalid',

        // Accessibility
        'motion-safe', 'motion-reduce',
        'contrast-more', 'contrast-less',
        'forced-colors', 'print',

        // Direction
        'ltr', 'rtl',

        // Container
        '@sm', '@md', '@lg', '@xl', '@2xl'
    ];

    // Custom arbitrary variants
    const arbitraryVariants = [
        'aria-checked',
        'aria-disabled',
        'aria-expanded',
        'aria-hidden',
        'aria-pressed',
        'aria-selected',
        'data-[state=open]',
        'data-[state=closed]',
        'data-[state=active]',
        'data-[state=inactive]',
        'data-[disabled]',
        'data-[active]',
        '[&>div]',
        '[&>a]',
        '[&_a]',
        '[&_p]',
        '[&:nth-child(3)]'
    ];

    // Variant prefixes: generated lazily, no huge combinations.
    function getVariantSuggestions(prefix) {
        const result = [];

        for (const variant of variants) {
            const candidate = variant + ':';

            if (candidate.startsWith(prefix)) {
                result.push({
                    label: candidate,
                    detail: 'Tailwind variant',
                    kind: CompletionItemKind.Keyword
                });
            }
        }

        for (const variant of arbitraryVariants) {
            const candidate = variant + ':';

            if (candidate.startsWith(prefix)) {
                result.push({
                    label: candidate,
                    detail: 'Arbitrary variant',
                    kind: CompletionItemKind.Keyword
                });
            }
        }

        return result;
    }

    // --------------------------------------------------
    // HTML class attribute detection
    // --------------------------------------------------

    function getClassContext(line, column) {
        const before = line.slice(0, column - 1);

        const match = before.match(
            /\bclass(?:Name)?\s*=\s*(['"])([^'"]*)$/
        );

        if (!match) return null;

        const content = match[2];
        const tokenMatch = content.match(/(?:^|\s)([^\s]*)$/);

        if (!tokenMatch) return null;

        const prefix = tokenMatch[1];
        const tokenStart = column - prefix.length;

        return {
            prefix,
            startColumn: tokenStart,
            endColumn: column
        };
    }

    // --------------------------------------------------
    // Completion provider
    // --------------------------------------------------

    const provider = monaco.languages.registerCompletionItemProvider(language, {
        triggerCharacters: [' ', ':', '-', '/'],

        provideCompletionItems(model, position) {
            const line = model.getLineContent(position.lineNumber);

            const context = getClassContext(line, position.column);

            if (!context) {
                return { suggestions: [] };
            }

            const prefix = context.prefix;
            const colonIndex = prefix.lastIndexOf(':');

            const variantPrefix = colonIndex >= 0
                ? prefix.slice(0, colonIndex + 1)
                : '';

            const classPrefix = colonIndex >= 0
                ? prefix.slice(colonIndex + 1)
                : prefix;

            const wordRange = {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: context.startColumn,
                endColumn: context.endColumn
            };

            const suggestions = [];

            // Variant completion
            if (colonIndex < 0 || !classPrefix) {
                for (const item of getVariantSuggestions(prefix)) {
                    suggestions.push({
                        label: item.label,
                        kind: item.kind,
                        detail: item.detail,
                        insertText: item.label,
                        range: wordRange,
                        sortText: '0' + item.label
                    });
                }
            }

            // Base class completion
            for (const [name, detail] of classes) {
                if (!name.startsWith(classPrefix)) continue;

                suggestions.push({
                    label: name,
                    kind: CompletionItemKind.Class,
                    detail,
                    insertText: variantPrefix + name,
                    range: wordRange,
                    sortText: '1' + name
                });

                if (suggestions.length >= maxSuggestions) break;
            }

            // Variant-prefixed utilities
            if (variantPrefix) {
                for (const [name, detail] of classes) {
                    if (!name.startsWith(classPrefix)) continue;

                    suggestions.push({
                        label: variantPrefix + name,
                        kind: CompletionItemKind.Class,
                        detail: 'Variant: ' + variantPrefix + detail,
                        insertText: variantPrefix + name,
                        range: wordRange,
                        sortText: '1' + name
                    });

                    if (suggestions.length >= maxSuggestions) break;
                }
            }

            return {
                suggestions
            };
        }
    });

    return {
        dispose() {
            provider.dispose();
        },
        classes
    };
}
