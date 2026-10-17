<?php
$appVar = [
    'isBuilder' => true,
    'version' => '0.01',
];
?>
<!DOCTYPE html>
<html lang="zh">
<head>
    <link href="/assets/css/reset.css" rel="stylesheet">
    <link href="/assets/css/main.css" rel="stylesheet">
    <script src="https://cdn.jsdmirror.com/npm/@tailwindcss/browser@4"></script>

    <script>
        var appVar = <?php echo json_encode($appVar); ?>;
        document.addEventListener('click', (e) => {
            if (e.target.closest('a')) {
                e.preventDefault();
            }
        });
    </script>

    <script src="/assets/lib/require.js"></script>
<!--    <script src="/assets/js/config.js"></script>-->
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
<!--<script src="/assets/js/main.js"></script>-->
</body>
</html>



