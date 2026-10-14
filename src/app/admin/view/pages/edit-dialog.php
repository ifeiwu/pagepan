<ku-modal id="EditDialog" style="--ku-body-spacing:0;--ku-width:600px;--ku-height:100%" static-backdrop fullscreen hidden>
    <div slot="header" class="f:bold f:17"><?=$this->title?></div>
    <iframe src="/admin/pages/edit?id=<?=$this->id?>" class="w:full h:full"></iframe>
</ku-modal>