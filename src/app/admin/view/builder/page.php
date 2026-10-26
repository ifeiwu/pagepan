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
    </script>

    <script src="/assets/js/require.js"></script>
    <script src="/assets/js/config.js"></script>
    <script src="/assets/js/jquery.js"></script>
    <script src="/assets/js/tailwind.js"></script>
</head>
<body>
    <?php
        $page_code = '';
        foreach ($this->blocks as $block) {
            $page_code .= $block->content;
        }
        ob_start();
        eval('?>' . $page_code);
        echo ob_get_clean();
    ?>
</body>
</html>



