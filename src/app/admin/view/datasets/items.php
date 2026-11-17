<thead class="table-header sticky top-0 z-10 bg-white">
    <tr class="table-row">
        <th class="table-head w-10 pl-5">
            <input type="checkbox" class="checkbox" aria-label="Select all"/>
        </th>
        <th class="table-head font-bold">标题</th>
        <th class="table-head font-bold">发布时间</th>
        <th class="table-head font-bold">状态</th>
        <th class="table-head font-bold">排序</th>
        <th class="table-head font-bold text-right pr-5">操作</th>
    </tr>
</thead>
<tbody class="table-body">
    <?php
    foreach ($this->items as $item):
        $item = (array)$item;
        $id = $item['id'];
    ?>
    <tr class="table-row">
        <td class="table-cell pl-5">
            <input type="checkbox" class="checkbox" aria-label="Select INV002"/>
        </td>
        <td class="table-cell font-medium"><?= $item['title'] ?></td>
        <td class="table-cell"><?= date('Y-m-d', $item['created']) ?></td>
        <td class="table-cell"><?= $item['state'] ?></td>
        <td class="table-cell"><?= $item['sort'] ?></td>
        <td class="table-cell text-right pr-5">
            <button id="dd-basic-trigger-<?=$id?>" class="btn btn-outline">Open</button>
            <div class="dropdown" data-sp-toggle="#dd-basic-trigger-<?=$id?>">
                <button type="button" class="dropdown-item">Profile</button>
                <button type="button" class="dropdown-item">Billing</button>
                <button type="button" class="dropdown-item">Settings</button>
            </div>
        </td>
    </tr>
        <tr class="table-row">
            <td class="table-cell pl-5">
                <input type="checkbox" class="checkbox" aria-label="Select INV002"/>
            </td>
            <td class="table-cell font-medium"><?= $item['title'] ?></td>
            <td class="table-cell"><?= date('Y-m-d', $item['created']) ?></td>
            <td class="table-cell"><?= $item['state'] ?></td>
            <td class="table-cell"><?= $item['sort'] ?></td>
            <td class="table-cell text-right pr-5">
                <button id="dd-basic-trigger-<?=$id?>" class="btn btn-outline">Open</button>
                <div class="dropdown" data-sp-toggle="#dd-basic-trigger-<?=$id?>">
                    <button type="button" class="dropdown-item">Profile</button>
                    <button type="button" class="dropdown-item">Billing</button>
                    <button type="button" class="dropdown-item">Settings</button>
                </div>
            </td>
        </tr>
        <tr class="table-row">
            <td class="table-cell pl-5">
                <input type="checkbox" class="checkbox" aria-label="Select INV002"/>
            </td>
            <td class="table-cell font-medium"><?= $item['title'] ?></td>
            <td class="table-cell"><?= date('Y-m-d', $item['created']) ?></td>
            <td class="table-cell"><?= $item['state'] ?></td>
            <td class="table-cell"><?= $item['sort'] ?></td>
            <td class="table-cell text-right pr-5">
                <button id="dd-basic-trigger-<?=$id?>" class="btn btn-outline">Open</button>
                <div class="dropdown" data-sp-toggle="#dd-basic-trigger-<?=$id?>">
                    <button type="button" class="dropdown-item">Profile</button>
                    <button type="button" class="dropdown-item">Billing</button>
                    <button type="button" class="dropdown-item">Settings</button>
                </div>
            </td>
        </tr>
    <?php endforeach; ?>
</tbody>