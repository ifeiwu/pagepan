<?php
foreach ($this->items as $item):
    $dirname = $item->dirname;
?>
    <li>
        <?=$dirname?>
    </li>
<?php endforeach; ?>