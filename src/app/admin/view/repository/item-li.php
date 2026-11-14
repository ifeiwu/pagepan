<?php foreach ($this->items as $item):?>
<li>
    <img src="<?="/admin/repository/block-cover?repo=$this->repo_path&path={$item->category}/{$item->name}"?>&v=<?= strtotime($item->updated) ?: time() ?>" alt="">
    <div class="flex items-center px-4 py-2 bg-gray-100">
        <div><?="{$item->category}/{$item->name}"?></div>
        <div class="ml-auto">
            <button class="bar btn btn-sm btn-outline btn-icon"
                data-on:click="@get('<?="/admin/repository/copy-code?block_id={$item->id}"?>')">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy preview-icon"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </button>
        </div>
    </div>
    
</li>
<?php endforeach; ?>
