<ku-modal id="BlocksModal" placement="top-center" style="--ku-width:64rem" static-backdrop hidden>
    <div slot="header" class="flex ai:center gap:10 f:bold f:17">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-blocks preview-icon"><path d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2"/><rect x="14" y="2" width="8" height="8" rx="1"/></svg>
        页面块管理
    </div>

    <div class="flex gap:10">
        <div class="flex-grow:1">
            <label class="field">
                <select data-bind:repo>
                    <button type="button">
                        <selectedcontent></selectedcontent>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down preview-icon"><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                    <?php foreach($this->repos as $repo):?>
                        <option value="<?=$repo->path?>"><?=$repo->path?></option>
                    <?php endforeach;?>
                </select>
            </label>
        </div>
        <div>
            <button class="destructive">删除</button>
        </div>
        <div>
            <button class="color3" onclick="AddModal.showModal()">添加仓库</button>
            <dialog id="AddModal" closedby="any">
                <article>
                    <form id="form" class="flex flex:col gap:15 mt:10 mb:20"
                          data-on:submit="@post('/admin/blocks/add-repo',{contentType:'form'})">
                        <input type="text" name="url" value="https://github.com/ifeiwu/pagepan-blocks.git" placeholder="https://" />
                    </form>
                    <form method="dialog" class="text:right">
                        <button form="form">保存</button>
                        <button class="outlined">关闭</button>
                    </form>
                </article>
            </dialog>
        </div>
    </div>

    <form id="searchForm"
          data-indicator:fetching
          data-on:submit__delay.0ms="items.innerHTML='';@post('/admin/blocks/query',{contentType:'form'})">
        <input type="hidden" name="pagenum" data-bind:pagenum>
        <input type="hidden" name="repo" data-attr:value="$repo">
    </form>
    <pre data-json-signals></pre>
    <ul id="items" class="gap:10 cols:3">
        <li></li>
    </ul>

    <div class="f:gray-50 f:14 text:center mt:20" style="display:none" data-show="$nodata">没有找到相关作品</div>

    <nav id="paginator" class="pagination" aria-label="Pagination"
         data-indicator="fetching"
         data-on-signal-patch-filter='{include:/^pagenum$/}'
         data-on-signal-patch__debounce.200ms="searchForm.requestSubmit()"
         data-init="$pagenum=1"></nav>
</ku-modal>