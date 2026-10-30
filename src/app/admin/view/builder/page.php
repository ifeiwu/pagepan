<?php
$theme = $this->site['theme'] ? json_decode($this->site['theme'], true) : [];

$pagevar = [
    'isBuilder' => true,
    'domain' => $this->site['domain'],
    'domain3' => $this->site['domain3'] ?: '',
    'page_id' => $this->page->id,
    'page_path' => $this->page->path,
    'page_title' => $this->page->title,
    'timestamp' => $this->site['timestamp']
];
?>
<!DOCTYPE html>
<html lang="<?=$theme['base']['lang']?>" class="-<?=str_replace('/', '-', $this->page->path ?: 'index')?>">
<head>
    <base href="<?=$this->site['domain']?>">
    <meta charset="utf-8">
    <meta name="renderer" content="webkit">
    <meta name="force-rendering" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="ie=edge,chrome=1">
    <?php if (!$theme['screen']): ?>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <?php endif;?>

    <title><?=$this->page->title?></title>

    <link href="/assets/css/main.css" rel="stylesheet">

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

        :root {
            --background: oklch(1 0 0);
            --foreground: oklch(0.145 0 0);

            --card: oklch(1 0 0);
            --card-foreground: oklch(0.145 0 0);

            --popover: oklch(1 0 0);
            --popover-foreground: oklch(0.145 0 0);

            --primary: oklch(0.205 0 0);
            --primary-foreground: oklch(0.985 0 0);

            --secondary: oklch(0.97 0 0);
            --secondary-foreground: oklch(0.205 0 0);

            --muted: oklch(0.97 0 0);
            --muted-foreground: oklch(0.556 0 0);

            --accent: oklch(0.97 0 0);
            --accent-foreground: oklch(0.205 0 0);

            --destructive: oklch(0.577 0.245 27.325);

            --border: oklch(0.922 0 0);
            --input: oklch(0.922 0 0);
            --ring: oklch(0.708 0 0);

            --radius: 0.625rem;
        }

        [data-theme="dark"] {
            --background: oklch(0.145 0 0);
            --foreground: oklch(0.985 0 0);

            --card: oklch(0.205 0 0);
            --card-foreground: oklch(0.985 0 0);

            --popover: oklch(0.205 0 0);
            --popover-foreground: oklch(0.985 0 0);

            --primary: oklch(0.922 0 0);
            --primary-foreground: oklch(0.205 0 0);

            --secondary: oklch(0.269 0 0);
            --secondary-foreground: oklch(0.985 0 0);

            --muted: oklch(0.269 0 0);
            --muted-foreground: oklch(0.708 0 0);

            --accent: oklch(0.269 0 0);
            --accent-foreground: oklch(0.985 0 0);

            --destructive: oklch(0.704 0.191 22.216);

            --border: oklch(1 0 0 / 10%);
            --input: oklch(1 0 0 / 15%);
            --ring: oklch(0.556 0 0);
        }

        @theme inline {
            --color-background: var(--background);
            --color-foreground: var(--foreground);

            --color-card: var(--card);
            --color-card-foreground: var(--card-foreground);

            --color-popover: var(--popover);
            --color-popover-foreground: var(--popover-foreground);

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

            body {
                @apply bg-background text-foreground;
            }
        }
    </style>
</head>
<body class="bg-white dark:bg-black">
    <?php
        $page_code = '';
        foreach ($this->blocks as $block) {
            $page_code .= $block->content;
        }
        ob_start();
        eval('?>' . $page_code);
        echo ob_get_clean();
    ?>

    <script src="/assets/js/main.js"></script>
</body>
</html>



