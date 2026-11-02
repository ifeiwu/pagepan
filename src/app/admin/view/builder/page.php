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



