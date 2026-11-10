<?php
$site = context('site');
$page = context('page');

$theme = $site['theme'] ? json_decode($site['theme'], true) : [];

$pagevar = [
    'isBuilder' => true,
    'domain' => $site['domain'],
    'domain3' => $site['domain3'] ?: '',
    'page_id' => $page['id'],
    'page_path' => $page['path'],
    'page_title' => $page['title'],
    'timestamp' => $site['timestamp']
];
?>
<!DOCTYPE html>
<html lang="<?=$theme['base']['lang']?>" class="-<?=str_replace('/', '-', $page['path'] ?: 'index')?>">
<head>
    <base href="<?=$site['domain']?>">
    <meta charset="utf-8">
    <meta name="renderer" content="webkit">
    <meta name="force-rendering" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="ie=edge,chrome=1">
    <?php if (!$theme['screen']): ?>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <?php endif;?>

    <title><?=$page['title']?></title>

    <script>
        var pagevar = <?=json_encode($pagevar)?>;

        document.addEventListener('click', (e) => {
            if (e.target.closest('a')) {
                e.preventDefault();
            }
        });

        // document.documentElement.dataset.theme = 'dark';
    </script>

    <script src="/assets/js/require.js"></script>
    <script src="/assets/js/config.js"></script>
    <script src="/assets/js/jquery.js"></script>
    <script src="/assets/js/tailwind.js"></script>
    <style type="text/tailwindcss">
        @custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));
        @theme {
            --default-font-family: "system-ui, -apple-system, Tahoma, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif"
        }

        :root {
            --radius: 0.625rem;
            --background: oklch(1 0 0);
            --foreground: oklch(0.141 0.004 150.069);
            --card: oklch(1 0 0);
            --card-foreground: oklch(0.141 0.004 150.069);
            --popover: oklch(1 0 0);
            --popover-foreground: oklch(0.141 0.004 150.069);
            --primary: oklch(0.527 0.154 150.069);
            --primary-foreground: oklch(0.985 0 0);
            --secondary: oklch(0.967 0.009 150.069);
            --secondary-foreground: oklch(0.21 0.009 150.069);
            --muted: oklch(0.967 0.009 150.069);
            --muted-foreground: oklch(0.552 0.009 150.069);
            --accent: oklch(0.982 0.018 155.826);
            --accent-foreground: oklch(0.393 0.095 152.535);
            --destructive: oklch(0.583 0.239 28.487);
            --border: oklch(0.92 0.009 150.069);
            --input: oklch(0.92 0.009 150.069);
            --ring: oklch(0.792 0.209 151.711);
        }

        [data-theme="dark"] {
            --background: oklch(0.141 0.004 150.069);
            --foreground: oklch(0.985 0.004 150.069);
            --card: oklch(0.21 0.009 150.069);
            --card-foreground: oklch(0.985 0.004 150.069);
            --popover: oklch(0.21 0.009 150.069);
            --popover-foreground: oklch(0.985 0.004 150.069);
            --primary: oklch(0.792 0.209 151.711);
            --primary-foreground: oklch(0.141 0.004 150.069);
            --secondary: oklch(0.274 0.009 150.069);
            --secondary-foreground: oklch(0.985 0.004 150.069);
            --muted: oklch(0.274 0.009 150.069);
            --muted-foreground: oklch(0.705 0.009 150.069);
            --accent: oklch(0.266 0.065 152.934);
            --accent-foreground: oklch(0.962 0.044 156.743);
            --destructive: oklch(0.702 0.189 22.162);
            --border: oklch(0.274 0.009 150.069);
            --input: oklch(0.274 0.009 150.069);
            --ring: oklch(0.723 0.219 149.579);
        }

        @theme inline {
            --color-background: var(--background);
            --color-foreground: var(--foreground);

            --color-primary: var(--primary);
            --color-primary-foreground: var(--primary-foreground);

            --color-secondary: var(--secondary);
            --color-secondary-foreground: var(--secondary-foreground);

            --color-muted: var(--muted);
            --color-muted-foreground: var(--muted-foreground);

            --color-accent: var(--accent);
            --color-accent-foreground: var(--accent-foreground);

            --color-destructive: var(--destructive);

            --color-border: var(--border);
            --color-input: var(--input);
            --color-ring: var(--ring);

            --radius-sm: calc(var(--radius) - 4px);
            --radius-md: calc(var(--radius) - 2px);
            --radius-lg: var(--radius);
            --radius-xl: calc(var(--radius) + 4px);
        }

        @layer base {
            * {
                @apply border-border outline-ring/50;
            }
        }
    </style>
    <link href="/assets/css/main.css" rel="stylesheet">

    <style>
        body[data-mode="design"]>* {
            outline: 1px dashed transparent;
            outline-offset: -1px;
            border-radius: 2px;
            transition: outline-color .15s;
            &:hover {
                outline-color: #94a3b8;
            }
            &.pb-editable {
                outline: 2px solid #3b82f6;
                outline-offset: -2px;
            }

            &[data-block-type=""] {
                h1,h2,h3,h4,h5,h6,p,a,span,kbd,em,small,big,button,td,th,li,time {
                    outline: 1px dashed transparent;
                    outline-offset: 2px;
                    border-radius: 2px;
                    cursor: text;
                    transition: outline-color .15s;
                    &:hover {
                        outline-color: #94a3b8;
                    }
                    &:empty::before {
                        content: '点击编辑内容';
                        color: #94a3b8;
                        pointer-events: none;
                    }
                }
            }

            &[data-block-type=""] .pb-editable,
            &[data-block-type=""] [contenteditable="true"]:focus {
                outline: 2px solid #3b82f6;
                outline-offset: 2px;
            }

            &:not([data-block-type=""]) {
                user-select: none;
                cursor: pointer;
                * {
                    pointer-events: none;
                }
            }
        }
    </style>
</head>
<body>
    <?php eval('?>' . $page_code) ?>

    <script src="/assets/js/main.js"></script>
</body>
</html>



