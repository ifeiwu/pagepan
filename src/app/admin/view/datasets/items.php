<?php
foreach ($items as $item):
    $id = $item->id;
    $path = $item->path ?? '';
    $image = $item->image ?? '';
    ?>
    <tr class="table-row" id="<?= "item-$id" ?>">
        <td class="table-cell">
            <input type="checkbox" name="ids[]" class="checkbox" value="<?= $id ?>"
                   data-bind:ids>
        </td>
        <td class="table-cell">
            <div class="flex items-center gap-3">
                <?= $image ? "<div><img src='/$path/$image' class='object-cover h-10 w-10'></div>" : '' ?>
                <div><?= $item->title ?></div>
            </div>
        </td>
        <td class="table-cell text-[13px]"><?= date('Y/m/d', $item->created) ?></td>
        <td class="table-cell">
            <input type="number" class="input" value="<?= $item->sort ?>">
        </td>
        <td class="table-cell">
            <?php if ($item->state): ?>
                <span class="badge bg-green-50 text-green-700 dark:text-green-300">启用</span>
            <?php else: ?>
                <span class="badge bg-orange-50 text-orange-700 dark:text-orange-300">禁用</span>
            <?php endif; ?>
        </td>
        <td class="table-cell text-right">
            <button class="item-edit btn btn-ghost btn-icon hover:text-green-600"
                    data-url="<?= "/admin/forms?dataset_id={$item->dataset_id}&item_id=$id" ?>">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen preview-icon">
                    <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>
                </svg>
            </button>
            <button class="btn btn-ghost btn-icon hover:text-red-600">
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
