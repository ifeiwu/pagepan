<table class="" style="--cols: 1fr 120px 80px 80px 100px">
    <thead>
    <tr>
        <th>标题</th>
        <th>发布时间</th>
        <th>状态</th>
        <th>排序</th>
        <th>操作</th>
    </tr>
    </thead>
    <tbody>
    <?php
    foreach ($this->items as $item):
        $item = (array)$item;
        $id = $item['id'];
    ?>
        <tr>
            <td><?=$item['title']?></td>
            <td><?=date('Y-m-d', $item['ctime'])?></td>
            <td><?=$item['state']?></td>
            <td><?=$item['sortby']?></td>
            <td>
                <button class="square">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                        <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415" />
                        <path d="M16 5l3 3" /></svg>
                </button>
                <button class="square destructive">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7l16 0" />
                        <path d="M10 11l0 6" />
                        <path d="M14 11l0 6" />
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                </button>
            </td>
        </tr>
    <?php endforeach; ?>

    </tbody>
</table>

