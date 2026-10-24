<?php
foreach ($this->items as $item):
    $id = $item->id;
    $category = $item->category;
    $dirname = $item->dirname;
?>
<li>
    <img src="<?="/admin/blocks/image?repo=$this->repo&path=$category/$dirname"?>" alt="">
    <div>
        <button type="button" data-on:click="@get('<?="/admin/blocks/copy-code?repo=$this->repo&path=$category/$dirname"?>')">复制</button>
    </div>
</li>
<?php endforeach; ?>