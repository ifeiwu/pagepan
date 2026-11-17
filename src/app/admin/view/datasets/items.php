<table class="table table-lg" data-signals:ids="[]">
    <thead class="table-header sticky top-0 z-10 bg-white">
        <tr class="table-row *:font-bold">
            <th class="table-head w-10">
                <input type="checkbox" class="checkbox"
                       data-on:change="
                            const items = document.querySelectorAll('tbody input[name=\'ids[]\']');
                            $ids = evt.target.checked
                                ? [...items].map(el => el.value)
                                : Array(items.length).fill('');
                        ">
            </th>
            <th class="table-head">标题</th>
            <th class="table-head w-35">发布时间</th>
            <th class="table-head w-15">状态</th>
            <th class="table-head w-15">排序</th>
            <th class="table-head w-30 text-right">操作</th>
        </tr>
    </thead>
    <tbody class="table-body">
        <?php
        foreach ($this->items as $item):
            $id = $item->id;
        ?>
        <tr class="table-row">
            <td class="table-cell">
                <input type="checkbox" name="ids[]" class="checkbox" value="<?=$id?>"
                       data-bind:ids>
            </td>
            <td class="table-cell font-medium"><?= $item->title ?></td>
            <td class="table-cell"><?= date('Y-m-d', $item->created) ?></td>
            <td class="table-cell">
                <?php if ($item->state):?>
                    <span class="badge bg-green-50 text-green-700 dark:text-green-300">启用</span>
                <?php else:?>
                    <span class="badge bg-orange-50 text-orange-700 dark:text-orange-300">禁用</span>
                <?php endif;?>
            </td>
            <td class="table-cell"><?= $item->sort ?></td>
            <td class="table-cell text-right">
                <button class="btn btn-ghost btn-icon hover:text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen preview-icon"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>
                </button>
                <button class="btn btn-ghost btn-icon hover:text-red-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash preview-icon"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
            </td>
        </tr><tr class="table-row">
            <td class="table-cell">
                <input type="checkbox" name="ids[]" class="checkbox" value="<?=$id?>"
                       data-bind:ids>
            </td>
            <td class="table-cell font-medium"><?= $item->title ?></td>
            <td class="table-cell"><?= date('Y-m-d', $item->created) ?></td>
            <td class="table-cell">
                <?php if ($item->state):?>
                    <span class="badge bg-green-50 text-green-700 dark:text-green-300">启用</span>
                <?php else:?>
                    <span class="badge bg-orange-50 text-orange-700 dark:text-orange-300">禁用</span>
                <?php endif;?>
            </td>
            <td class="table-cell"><?= $item->sort ?></td>
            <td class="table-cell text-right">
                <button class="btn btn-ghost btn-icon hover:text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen preview-icon"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>
                </button>
                <button class="btn btn-ghost btn-icon hover:text-red-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash preview-icon"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
            </td>
        </tr>
        <?php endforeach; ?>
    </tbody>
</table>

<div class="action-bar"
     data-effect="
        const actBar = sp.actionBar(el);
        $ids.some(id => id !== '') ? actBar.show() : actBar.hide()
    ">
    <button class="btn btn-ghost btn-sm tabular-nums" data-sp-dismiss>
        <span id="action-bar-count" data-text="$ids.filter(Boolean).length">0</span> selected<span class="sr-only">, clear selection</span>
        <svg class="icon-end" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
    </button>
    <div class="separator separator-vertical"></div>
    <button class="btn btn-ghost btn-sm">
        <svg class="icon-start" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/></svg>
        Export
    </button>
    <button class="btn btn-ghost btn-sm text-destructive hover:text-destructive">
        <svg class="icon-start" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        Delete
    </button>
</div>