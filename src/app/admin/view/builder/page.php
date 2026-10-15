
<!DOCTYPE html>
<html lang="zh">
<head>
    <script>
        const appvar = {
            isBuilder: true,
            ver: '0.01'
        };
    </script>

<!--    <script src="/assets/lib/master.js"></script>-->
<!--    <script src="/assets/lib/require.js"></script>-->
<!--    <script src="/assets/js/config.js"></script>-->
</head>
<body>

    <?php
    $page_code = '';
    foreach ($this->blocks as $block) {
        $content = $block->content . "\n\n";

        $setting = $block->setting;
        if ($setting) {
            $setting = json_decode($setting, true);
            $content = '<?php $setting = ' . var_export($setting, true) . ';?>' . "\n" . $content;
        }

        $page_code .= $content;
    }
    ob_start();
    eval('?>' . $page_code);
    echo ob_get_clean();
    ?>

    <textarea id="__page_source_code__" style="display:none"><?=$page_code?></textarea>

    <!--<header>b111111</header>

    <section class="py-14" data-block-path="feng/headline/023" data-block-type="json" data-block-setting='{"a":1}'>
        <header>a22222</header>
        <div class="container container-xl">
            <div contenteditable="true">你可以在这里输入文字或打开左边面板插入图片、链接、视频或按钮等元素。</div>
        </div>
    </section>

    <main>a33333</main>
    
    <footer>a44444</footer>-->

<!--<script src="/assets/js/main.js"></script>-->
</body>
</html>



