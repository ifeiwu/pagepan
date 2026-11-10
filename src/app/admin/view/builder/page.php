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
            &[data-editable] {
                outline: 2px solid #3b82f6;
                outline-offset: -2px;
            }

            h1,h2,h3,h4,h5,h6,p,a,span,kbd,em,small,big,button,td,th,li,time,svg,img {
                outline: 1px dashed transparent;
                outline-offset: 2px;
                border-radius: 2px;
                cursor: text;
                transition: outline-color .15s;
                &:not([data-editable]):hover {
                    outline-color: #94a3b8;
                }
                &:empty::before {
                    content: '点击编辑内容';
                    color: #94a3b8;
                    pointer-events: none;
                }
            }

            [data-editable],
            [contenteditable="true"]:focus {
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

            img {
                cursor: pointer;
            }

            img::selection {
                background: transparent;
            }

            pre code {
                position: relative;
                display: block;
            }

            pre code:after {
                content: '';
                position: absolute;
                top: 0;
                bottom: 0;
                right: 0;
                left: 0;
                cursor: pointer;
                z-index: 2;
            }

            svg {
                cursor: pointer;
            }

            svg * {
                pointer-events: none;
            }

            php {
                position: relative;
                display: block;
                font-size: 0;
                line-height: 1;
                height: 36px;
                width: 100%;
                pointer-events: none;
                background: #ebecff;
            }

            php::before {
                content: "";
                position: absolute;
                left: 10px;
                width: 36px;
                height: 36px;
                background-repeat: no-repeat;
                background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSIjNEE0RDg3IiBkPSJNMTIgMTguMDhjLTYuNjMgMC0xMi0yLjcyLTEyLTYuMDhzNS4zNy02LjA4IDEyLTYuMDhTMjQgOC42NCAyNCAxMnMtNS4zNyA2LjA4LTEyIDYuMDhtLTUuMTktNy45NWMuNTQgMCAuOTEuMSAxLjA5LjMxLjE4LjIuMjIuNTYuMTMgMS4wMy0uMS41My0uMjkuODctLjU4IDEuMDktLjI4LjIyLS43MS4zMy0xLjI5LjMzaC0uODdsLjUzLTIuNzZoLjk5bS0zLjUgNS41NWgxLjQ0bC4zNC0xLjc1aDEuMjNjLjU0IDAgLjk4LS4wNiAxLjMzLS4xNy4zNS0uMTIuNjctLjMxLjk2LS41OC4yNC0uMjIuNDMtLjQ2LjU4LS43My4xNS0uMjYuMjYtLjU2LjMxLS44OC4xNi0uNzguMDUtMS4zOS0uMzMtMS44Mi0uMzktLjQ0LS45OS0uNjUtMS44Mi0uNjVINC41OWwtMS4yOCA2LjU4bTcuMjUtOC4zMy0xLjI4IDYuNThoMS40MmwuNzQtMy43N2gxLjE0Yy4zNiAwIC42LjA2LjcxLjE4LjExLjEyLjEzLjM0LjA3LjY2bC0uNTcgMi45M2gxLjQ1bC41OS0zLjA3Yy4xMy0uNjIuMDMtMS4wNy0uMjctMS4zNi0uMy0uMjctLjg1LS40LTEuNjUtLjRoLTEuMjdMMTIgNy4zNWgtMS40NE0xOCAxMC4xM2MuNTUgMCAuOTEuMSAxLjA5LjMxLjE4LjIuMjIuNTYuMTMgMS4wMy0uMS41My0uMjkuODctLjU3IDEuMDktLjI5LjIyLS43Mi4zMy0xLjMuMzNoLS44NWwuNS0yLjc2aDFtLTMuNSA1LjU1aDEuNDRsLjM0LTEuNzVoMS4yMmMuNTUgMCAxLS4wNiAxLjM1LS4xNy4zNS0uMTIuNjUtLjMxLjk1LS41OC4yNC0uMjIuNDQtLjQ2LjU4LS43My4xNS0uMjYuMjYtLjU2LjMyLS44OC4xNS0uNzguMDQtMS4zOS0uMzQtMS44Mi0uMzYtLjQ0LS45OS0uNjUtMS44Mi0uNjVoLTIuNzVsLTEuMjkgNi41OFoiLz48L3N2Zz4=);
            }

            php::after {
                content: "这里的代码在网站运行时显示效果。";
                position: absolute;
                font-size: 12px;
                top: 11px;
                left: 55px;
                color: #797CB1;
            }

        }
    </style>
</head>
<body>
    <?php eval('?>' . $page_code) ?>

    <script src="/assets/js/main.js"></script>
</body>
</html>



