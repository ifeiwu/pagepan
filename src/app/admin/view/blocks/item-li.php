<?php
foreach ($this->items as $item):
    $category = $item->category;
    $dirname = $item->dirname;
?>
    <li>
        <img src="<?="/admin/blocks/image?repo=$this->repo&path=$category/$dirname"?>" alt="">
    </li>
<?php endforeach; ?>