
<!DOCTYPE html>
<html lang="zh">
<head>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <style>
        :root {
            --white: #fff;
            --black: #000;
            --primary-dark: #a91903;
            --primary: #c21d03;
            --primary-1: #c52810;
            --primary-2: #c8341c;
            --primary-3: #cb3f29;
            --primary-4: #ce4a35;
            --primary-5: #d15642;
            --primary-6: #d4614f;
            --primary-7: #d76c5b;
            --primary-8: #da7768;
            --primary-9: #dd8374;
            --primary-10: #e18e81;
            --primary-11: #e4998e;
            --primary-12: #e7a59a;
            --primary-13: #eab0a7;
            --primary-14: #edbbb3;
            --primary-15: #f0c7c0;
            --primary-16: #f3d2cd;
            --primary-17: #f6ddd9;
            --primary-18: #f9e8e6;
            --primary-19: #fcf4f2;
            --primary-20: white;
            --secondary-dark: #2c2c2c;
            --secondary: #393939;
            --secondary-1: #434343;
            --secondary-2: #4d4d4d;
            --secondary-3: #575757;
            --secondary-4: #616161;
            --secondary-5: #6b6b6b;
            --secondary-6: #747474;
            --secondary-7: #7e7e7e;
            --secondary-8: #888;
            --secondary-9: #929292;
            --secondary-10: #9c9c9c;
            --secondary-11: #a6a6a6;
            --secondary-12: #b0b0b0;
            --secondary-13: #bababa;
            --secondary-14: #c4c4c4;
            --secondary-15: #cecece;
            --secondary-16: #d7d7d7;
            --secondary-17: #e1e1e1;
            --secondary-18: #ebebeb;
            --secondary-19: whitesmoke;
            --secondary-20: white;
            --mix-dark: #161515;
            --mix: #232121;
            --mix-1: #282626;
            --mix-2: #2e2c2c;
            --mix-3: #333131;
            --mix-4: #393737;
            --mix-5: #3e3c3c;
            --mix-6: #434242;
            --mix-7: #494747;
            --mix-8: #4e4d4d;
            --mix-9: #545252;
            --mix-10: #595858;
            --mix-11: #5e5d5d;
            --mix-12: #646262;
            --mix-13: #696868;
            --mix-14: #6f6d6d;
            --mix-15: #747373;
            --mix-16: #797878;
            --mix-17: #7f7e7e;
            --mix-18: #848383;
            --mix-19: #8a8989;
            --mix-20: #8f8e8e;
            --mix-21: #949393;
            --mix-22: #9a9999;
            --mix-23: #9f9e9e;
            --mix-24: #a5a4a4;
            --mix-25: #aaa9a9;
            --mix-26: #afafaf;
            --mix-27: #b5b4b4;
            --mix-28: #bababa;
            --mix-29: #c0bfbf;
            --mix-30: #c5c5c5;
            --mix-31: #cacaca;
            --mix-32: #d0cfcf;
            --mix-33: #d5d5d5;
            --mix-34: #dbdada;
            --mix-35: #e0e0e0;
            --mix-36: #e5e5e5;
            --mix-37: #ebebeb;
            --mix-38: #f0f0f0;
            --mix-39: #f6f6f6;
            --mix-40: #fbfbfb;
            --alpha-0: rgba(35, 33, 33, 0);
            --alpha-5: rgba(35, 33, 33, 0.05);
            --alpha-10: rgba(35, 33, 33, 0.1);
            --alpha-15: rgba(35, 33, 33, 0.15);
            --alpha-20: rgba(35, 33, 33, 0.2);
            --alpha-25: rgba(35, 33, 33, 0.25);
            --alpha-30: rgba(35, 33, 33, 0.3);
            --alpha-35: rgba(35, 33, 33, 0.35);
            --alpha-40: rgba(35, 33, 33, 0.4);
            --alpha-45: rgba(35, 33, 33, 0.45);
            --alpha-50: rgba(35, 33, 33, 0.5);
            --alpha-55: rgba(35, 33, 33, 0.55);
            --alpha-60: rgba(35, 33, 33, 0.6);
            --alpha-65: rgba(35, 33, 33, 0.65);
            --alpha-70: rgba(35, 33, 33, 0.7);
            --alpha-75: rgba(35, 33, 33, 0.75);
            --alpha-80: rgba(35, 33, 33, 0.8);
            --alpha-85: rgba(35, 33, 33, 0.85);
            --alpha-90: rgba(35, 33, 33, 0.9);
            --alpha-95: rgba(35, 33, 33, 0.95);
            --bg-alpha-0: rgba(251, 251, 251, 0);
            --bg-alpha-5: rgba(251, 251, 251, 0.05);
            --bg-alpha-10: rgba(251, 251, 251, 0.1);
            --bg-alpha-15: rgba(251, 251, 251, 0.15);
            --bg-alpha-20: rgba(251, 251, 251, 0.2);
            --bg-alpha-25: rgba(251, 251, 251, 0.25);
            --bg-alpha-30: rgba(251, 251, 251, 0.3);
            --bg-alpha-35: rgba(251, 251, 251, 0.35);
            --bg-alpha-40: rgba(251, 251, 251, 0.4);
            --bg-alpha-45: rgba(251, 251, 251, 0.45);
            --bg-alpha-50: rgba(251, 251, 251, 0.5);
            --bg-alpha-55: rgba(251, 251, 251, 0.55);
            --bg-alpha-60: rgba(251, 251, 251, 0.6);
            --bg-alpha-65: rgba(251, 251, 251, 0.65);
            --bg-alpha-70: rgba(251, 251, 251, 0.7);
            --bg-alpha-75: rgba(251, 251, 251, 0.75);
            --bg-alpha-80: rgba(251, 251, 251, 0.8);
            --bg-alpha-85: rgba(251, 251, 251, 0.85);
            --bg-alpha-90: rgba(251, 251, 251, 0.9);
            --bg-alpha-95: rgba(251, 251, 251, 0.95);
            --link-color: var(--mix);
            --link-hover-color: var(--primary);
            --link-active-color: var(--primary);
            --link-active-bgcolor: var(--primary-16);
            --font-family: "system-ui, -apple-system, Tahoma, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif"
        }
        html {
            font-size: 16px;
        }
        body {
            font-size: 1rem;
        }
    </style>
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
        $page_code .= $block->content;
    }
    ob_start();
    eval('?>' . $page_code);
    echo ob_get_clean();
    ?>

<!--    <textarea id="__page_source_code__" style="display:none">--><?php //=$page_code?><!--</textarea>-->

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



