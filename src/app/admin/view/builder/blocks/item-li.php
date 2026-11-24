<?php foreach ($items as $item): ?>
    <li class="item item-outline item-sm cursor-pointer" data-on:click="$block_id=<?=$item->id?>;@get('/admin/builder/blocks/add-to-page')">
        <img src="<?= "/admin/repository/block-cover?repo=$repo_path&path={$item->category}/{$item->name}" ?>&v=<?= strtotime($item->updated ?: time()) ?>">
    </li>
<?php endforeach; ?>