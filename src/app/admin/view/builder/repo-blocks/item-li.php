<?php foreach ($this->items as $item): ?>
    <li class="item item-outline item-sm cursor-pointer" data-on:click="$block_id=<?=$item->id?>;@get('/admin/builder/repo-blocks/addto-page')">
        <img src="<?= "/admin/repository/block-cover?repo=$this->repo_path&path={$item->category}/{$item->name}" ?>&v=<?= strtotime($item->updated) ?: time() ?>">
    </li>
<?php endforeach; ?>