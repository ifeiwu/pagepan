<?php
foreach ($this->items as $item):
    $id = $item->id;
    ?>
    <div class="sidebar-menu-item">
        <a href="/admin/datasets?id=<?= $id ?>" class="sidebar-menu-button  <?= $id == $this->dataset_id ? 'secondary' : 'ghost' ?>">
            <span><?= $item->title ?></span>
        </a>
    </div>
<?php endforeach; ?>
