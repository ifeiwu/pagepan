<?php
$name = $name ?? 'image'; // 图片字段名称
$value = $value ?? ''; // 图片字段值
$path = $item->path ?? '';
$option = $option ?? [];

// 上传路径
$path = $path ?: $option['path'] ?? '';
if (!$path) {
    $path = "files/dataset/{$dataset->id}";
}
$option2 = $option + ['path' => $path];

$pattern = '/^(https?:\/\/|\/\/)/i';
if (preg_match($pattern, $value)) {
    $image = $value;
} else {
    $image = "/$path/$value";
}
?>

<div class="c-upload-image" data-option='<?= json_encode($option2) ?>'>
    <input type="hidden" name="<?= $name ?>" value="<?= $value ?>" data-field-name>
    <input type="hidden" name="path" value="<?= $path ?>" data-field-path>

    <button type="button" class="upload relative flex flex-col gap-1 items-center justify-center size-full aspect-3/1 bg-gray-100 text-gray-600 rounded-md overflow-hidden" style="<?= !$value ?: 'display:none' ?>">
        <input type="file" class="choose" accept="<?= $option['accept'] ?? 'image/*' ?>" style="position:absolute;z-index:1;width:200%;height:200%;opacity:1;cursor:pointer;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="inline-block"><path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21"/><path d="m14 19.5 3-3 3 3"/><path d="M17 22v-5.5"/><circle cx="9" cy="9" r="2"/></svg>
        点击上传图片
    </button>

    <div class="preview relative aspect-3/1 flex items-center justify-center bg-gray-100 rounded-md" style="<?= $value ?: 'display:none' ?>">
        <img <?= $value ? 'src="' . $image . '"' : '' ?> class="size-full object-scale-down">
        <button type="button" class="delete btn btn-xs btn-icon btn-destructive rounded absolute -top-2 -right-2" title="删除">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x preview-icon"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
    </div>

    <div class="progressbar mt-2 text-xs" style="display:none">
        <div class="flex">
            <span>上传进度</span>
            <span class="percentage ml-auto tabular-nums">0%</span>
        </div>
        <progress class="progress" value="0" max="100"></progress>
    </div>

    <div class="more btn-group *:grow mt-2" style="<?= !$value ?: 'display:none' ?>">
        <button type="button" class="btn btn-sm btn-outline">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 5h6"/><path d="M19 2v6"/><path d="M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/><circle cx="9" cy="9" r="2"/></svg>
            选取图片
        </button>
        <button type="button" class="remote-image btn btn-sm btn-outline">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
            远程图片
        </button>
    </div>
</div>