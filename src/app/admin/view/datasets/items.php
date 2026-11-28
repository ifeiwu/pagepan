<?php
foreach ($items as $item):
    $id = $item->id;
    $dataset_id = $item->dataset_id;
    $title = $item->title;
    $image = $item->image ?? '';

    if ($image === basename($image)) {
        $image = "/files/dataset/$item->dataset_id/$id/$image";
    }

    $update_field_url = "/admin/datasets/items/update/field?dataset_id=$dataset_id&id=$id"
    ?>
    <tr class="table-row" id="<?= "item-$id" ?>">
        <td class="table-cell">
            <input type="checkbox" name="ids[]" class="checkbox" value="<?= $id ?>"
                   data-bind:ids>
        </td>
        <td class="table-cell">
            <div class="flex items-center gap-3">
                <?= $image ? "<div><img src='$image' class='object-cover h-10 w-10'></div>" : '' ?>
                <div><?= $title ?></div>
            </div>
        </td>
        <td class="table-cell text-[13px]">
            <div data-title="更新时间：<?= date('Y/m/d', strtotime($item->updated)) ?>">
                <?= date('Y/m/d', strtotime($item->created)) ?>
            </div>
        </td>
        <td class="table-cell">
            <div data-title="按回车键排序">
                <input type="number" class="input" value="<?= $item->sort ?>"
                    data-on:keydown="evt.keyCode == 13 && @get(`<?= $update_field_url ?>&name=sort&value=${el.value}`)">
            </div>
        </td>
        <td class="table-cell">
            <?php if ($item->state): ?>
                <div data-title="点击禁用">
                    <span class="badge bg-green-50 text-green-700 dark:text-green-300 cursor-pointer"
                        data-on:click="@get(`<?= $update_field_url ?>&name=state&value=0`)">启用</span>
                </div>
            <?php else: ?>
                <div data-title="点击启用">
                    <span class="badge bg-orange-50 text-orange-700 dark:text-orange-300 cursor-pointer"
                        data-on:click="@get(`<?= $update_field_url ?>&name=state&value=1`)">禁用</span>
                </div>
            <?php endif; ?>
        </td>
        <td class="table-cell text-right">
            <button class="btn btn-ghost btn-icon hover:text-green-600" data-title="修改"
                    data-on:click="@get('<?= "/admin/datasets/items/edit?dataset_id=$dataset_id&id=$id&title=$title" ?>')">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen preview-icon">
                    <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>
                </svg>
            </button>
            <button class="btn btn-ghost btn-icon hover:text-red-600" data-title="删除"
                    data-on:click="confirm('确定要删除【<?=$title?>】吗?') && @get('/admin/datasets/items/delete?id=<?= $id ?>')">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash preview-icon">
                    <path d="M10 11v6"/>
                    <path d="M14 11v6"/>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                    <path d="M3 6h18"/>
                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
            </button>
        </td>
    </tr>
<?php endforeach; ?>
