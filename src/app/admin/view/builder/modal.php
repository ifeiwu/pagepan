<ku-modal id="BuilderModal" style="--ku-border-radius:8px;--ku-body-spacing:0" no-header static-backdrop fullscreen hidden>
    <div slot="header" class="f:bold f:17"><?=$this->title?></div>
    <iframe src="/admin/builder/edit?page_id=<?=$this->page_id?>" class="w:full h:full"></iframe>
</ku-modal>