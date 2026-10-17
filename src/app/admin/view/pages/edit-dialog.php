<ku-modal id="EditDialog" style="--ku-border-radius:8px;--ku-body-spacing:0" no-header static-backdrop fullscreen hidden>
    <div slot="header" class="f:bold f:17"><?=$this->title?></div>
    <iframe src="/admin/pages/edit?id=<?=$this->id?>" class="w:full h:full"></iframe>
</ku-modal>