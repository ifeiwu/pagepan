<?php
foreach ($this->items as $item):
    $item = (array)$item;
    $state = $item['state'];
    $id = $item['id'];
    $type = $item['type'];
    $title = $item['title'];
    $layout = $item['layout'];
    $type_icon = '';

    switch ($type) {
        case 'guide':
            $type_icon = '<svg class="w:66 h:65" viewBox="0 0 90 89"><path d="M17.06 8H90V0H17.06C7.66 0 0 7.12 0 15.87V89h8V29h82v-8H8v-5.13C8 11.53 12.07 8 17.06 8Z" fill="#eaf9c8"/><path d="m61.83 44.28-5.66 5.66 6.17 6.17H31.97v8h30.37l-6.17 6.17 5.66 5.66 15.83-15.83-15.83-15.83z" fill="#dcf5a3"/></svg>';
            break;
        case 'home':
            $type_icon = '<svg class="w:63.05 h:65.04" viewBox="0 0 83.05 85.04"><path d="M83.05 19.28v9.31L49.36 8.53 4.1 35.48 0 28.6 48.05 0h2.62l32.38 19.28z" fill="#cedefd"/><path d="M83.05 40.98V77.4a7.64 7.64 0 0 1-7.64 7.64H5.37V47.11l43.78-26.07h.42l33.48 19.94Z" fill="#dde8fe"/></svg>';
            break;
        case 'graphic':
            $type_icon = '<svg class="w:61.5 h:62" viewBox="0 0 87.5 88"><path d="M8 88H0V18.13C0 8.13 7.77 0 17.33 0H87.5v8H17.33C12.19 8 8 12.55 8 18.13V88Z" style="fill:#cee5f2"/><path d="M53 27.65H30.66v-8H53v8Zm5.31 23.38c-3.2 0-5.79 2.59-5.79 5.79s2.59 5.79 5.79 5.79 5.79-2.59 5.79-5.79-2.59-5.79-5.79-5.79ZM79 66.65V47.53C79 41.72 73.91 37 67.65 37h-34.3C27.09 37 22 41.72 22 47.53V88h8v-9.54l7.25-3.82 7.99 5.04c2.01 1.28 4.61 1.44 6.77.43l7.3-3.42 10.86 6.1v5.22h8v-9.9l-15.39-8.64a7.13 7.13 0 0 0-6.44-.22l-7.26 3.4-8.02-5.06a7.024 7.024 0 0 0-7.06-.28l-4 2.11V47.54c0-1.37 1.53-2.53 3.35-2.53h34.3c1.82 0 3.35 1.16 3.35 2.53v19.12h8Z" style="fill:#ceddf8"/></svg>';
            break;
        case 'inside':
            $type_icon = '<svg class="w:59 h:65.51" viewBox="0 0 79 85.51"><path d="M8 15.65v7.78h71v8H8v54.08H0V15.65C0 7.02 7.02 0 15.65 0H79v8H15.65C11.43 8 8 11.43 8 15.65Z" fill="#ccebff"/><path d="M79 40.51v37.36a7.64 7.64 0 0 1-7.64 7.64H18v-45h61Z" fill="#dbf1ff"/></svg>';
            break;
        case 'pro':
            $type_icon = '<svg class="w:68 h:60.51" viewBox="0 0 88 80.51"><path d="M88 36.51v36.36a7.64 7.64 0 0 1-7.64 7.64H0v-44h88Z" fill="#ffdbfa"/><path d="M88 0v8H29.86c-5.35 0-9.71 4.36-9.71 9.71v62.8h-8v-62.8C12.15 7.95 20.09 0 29.86 0H88Z" fill="#ffffff80"/><path d="M40.66 20.16H88v8H40.66z" fill="#ffccf8"/></svg>';
            break;
        case 'layout':
            $type_icon = '<svg class="w:59.85 h:69.51" viewBox="0 0 79.85 89.51"><path d="M17.71 8h62.14V0H17.71C7.95 0 0 7.95 0 17.71v71.8h8v-60h71.85v-8H8v-3.8C8 12.35 12.36 8 17.71 8Z" style="fill:#ffffffcc"/><path d="M26.02 41.19h17.65v48.32H20.85V46.36c0-2.85 2.32-5.17 5.17-5.17Z" style="fill:#ffe1d4"/><path d="M53.04 41.19h26.82v18.2H53.04z" style="fill:#ffccc7"/><path d="M79.85 65.35v19.03c0 2.83-2.29 5.13-5.13 5.13H53.03V65.35h26.82Z" style="fill:#f7d7e8"/></svg>';
            break;
        case '404':
            $type_icon = '<svg class="w:59 h:65.51" viewBox="0 0 79 85.51"><path d="M8 15.65v7.78h71v8H8v54.08H0V15.65C0 7.02 7.02 0 15.65 0H79v8H15.65C11.43 8 8 11.43 8 15.65Z" fill="#ffffff80"/><path d="M37.69 70.38v-5.06H25.84V60.7l10.69-13.56h6.42v13.68h3.23l-.44 4.5h-2.78v5.06h-5.27Zm0-13.19c0-1.32.03-3.84.07-5.03-.97 1.45-3.01 4.28-6.39 8.65h6.31v-3.63Zm20.68-10.54c-6.89 0-10.19 5.49-10.19 12.1s3.34 12.11 10.12 12.11c7.2 0 10.09-5.32 10.09-12.33 0-6.44-3.36-11.88-10.02-11.88Zm-.01 19.8c-3.54 0-4.4-4.08-4.4-7.77 0-4.07.97-7.65 4.44-7.65s4.25 4.08 4.25 7.53c0 4.08-.69 7.89-4.29 7.89ZM79 50.55 71 60.7v4.62h8v-4.5h-2.47c.92-1.19 1.75-2.27 2.47-3.24v-7.03Z" fill="#ffcccc"/></svg>';
            break;
    }
?>
<li id="page_<?=$id?>" class="bg:<?=getTypeColor($type)?> overflow-hidden" style="<?=$state === 0 ? 'opacity:.6' : ''?>">
    <!--<a href="#" data-on:click="@get('/admin/pages/edit/dialog?id=<?php /*=$id*/?>')">
        <img src="/assets/admin/img/page-cover-demo.png" class="h:120 w:full obj:cover obj:top">
    </a>-->
    <div class="flex flex:col h:full p:15 pt:10">
        <div class="flex ai:center">
            <div>
                <?php if ($state === 1):?>
                <span class="badge bg:#32d296 f:white"><?=getTypeText($type)?></span>
                <?php else:?>
                <span class="badge bg:fade f:white"><?=getTypeText($type)?></span>
                <?php endif;?>

                <?php if ($layout):?>
                    <span class="badge bg:orange-94 f:orange f:12" style="--bg:white" aria-label="<?=$layout?>" data-tooltip="right">布局</span>
                <?php endif;?>
            </div>
            <div class="ml:auto">
                <div class="more opacity:0">
                    <button id="dd-basic-trigger<?=$id?>" class="btn btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis preview-icon"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                    </button>
                    <div class="dropdown" data-sp-toggle="#dd-basic-trigger<?=$id?>">
                        <button class="dropdown-item" data-on:click="@get('/admin/pages/edit-info?id=<?=$id?>')">基本信息</button>
                        <button class="dropdown-item">打开页面</button>
                        <button class="dropdown-item">复制页面</button>
                        <div class="dropdown-separator"></div>
                        <button class="dropdown-item dropdown-item-destructive"
                                data-on:click="confirm('确认要删除页面【<?=$title?>】吗?') && @get('/admin/pages/delete?id=<?=$id?>')">删除页面</button>
                    </div>
                </div>
            </div>
        </div>
        <a href="" class="flex gap:2 mt:5">
            <div class="f:17 f:bold"><?=$item['title']?></div>
            <!--<div class="lh:0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w:16 h:16" color="currentColor" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9 6.65032C9 6.65032 15.9383 6.10759 16.9154 7.08463C17.8924 8.06167 17.3496 15 17.3496 15M16.5 7.5L6.5 17.5"></path>
                </svg>
            </div>-->
        </a>
        <div class="f:13 f:gray f:bold mt:10 mb:20 font:mono"><?=$item['path']?></div>
        <div class="mt:auto"></div>
    </div>
    <div class="abs bottom:-2 right:-2 lh:0"><?=$type_icon?></div>
</li>
<?php endforeach; ?>
