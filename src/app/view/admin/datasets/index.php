<?php $this->layout('admin');?>

<div class="grid grid-template-columns:180|1fr gap:20"
     data-signals="{dsid:0}"
     data-indicator="fetching"
     data-on-signal-patch-filter='{include:/^dsid$/}'
     data-on-signal-patch="$pagenum=0;$loadmore=false;$kword=$query.value;items.innerHTML='';$dsid && @get('/admin/datasets/query',{filterSignals:{include:/^(dsid|kword|pagenum)$/}})">
    <div class="bg:gray-92 p:10">
        <div class="f:gray-60 mb:10">数据源</div>
        <menu id="menus" class="flex flex:col gap:5" data-init="@get('/admin/datasets/menus?id=<?=$this->id?>')"></menu>
    </div>
    <div>
        <table id="items"
            data-init="@get('/admin/datasets/query?id=<?=$this->id?>')"
            data-on:replace-item="@get('/manager/work/replace-item?id='+evt.detail.id,{filterSignals:{exclude:/.*/}})"></table>

        <div class="f:gray-50 f:14 text:center mt:20" style="display:none" data-show="$nodata">没有找到相关作品</div>


    </div>
</div>

