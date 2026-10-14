<?php
foreach ($this->items as $item):
    $item = (array)$item;
    $id = $item['id'];
?>
    <li>
        <a href="/admin/datasets?id=<?=$id?>" class="button <?=$id == $this->id ? 'secondary' : 'ghost'?>"><?=$item['title']?></a>
    </li>
<?php endforeach; ?>
