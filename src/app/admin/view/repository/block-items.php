<?php
foreach ($this->items as $item):
    $id = $item->id;
    $category = $item->category;
    $dirname = $item->dirname;
?>
<li>
    <img src="<?="/admin/repository/block-image?repo=$this->repo_path&path=$category/$dirname"?>" alt="">
    <div>
        <button type="button" data-on:click="@get('<?="/admin/repository/copy-code?block_id=$id"?>')">复制</button>
    </div>
</li>
<?php endforeach; ?>