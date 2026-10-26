<ku-modal id="RepositoryModal" placement="top-center" style="--ku-width:64rem;--ku-height:100%" static-backdrop hidden>
    <div slot="header" class="flex ai:center gap:10 f:bold f:17">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-blocks preview-icon"><path d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2"/><rect x="14" y="2" width="8" height="8" rx="1"/></svg>
        页面块管理
    </div>

    <div class="flex gap:10 p:15 r:10 bg:gray-88">
        <div class="flex-grow:1">
            <label class="field">
                <select name="repo_id" class="bg:white r:5"
                        data-url="/admin/repository/items"
                        data-init="@get(el.dataset.url)"
                        data-on:reload="@get(el.dataset.url)"
                        data-ref:repo
                        data-bind:repo_id
                        data-on:change="$pagenum=1;$category='';$kword='';searchForm.requestSubmit();@get('/admin/repository/block-categorys')">
                    <button type="button">
                        <selectedcontent></selectedcontent>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down preview-icon"><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                    <option value="">选择仓库</option>
                    <div id="repo_options"></div>
                </select>
            </label>
        </div>
        <div>
            <button class="destructive" data-on:click="confirm(`确认要删除内容块仓库【${$repo.selectedOptions[0].textContent}】吗?`) && @get('/admin/repository/delete')">删除</button>
        </div>
        <div>
            <button class="color3" onclick="AddModal.showModal()">添加仓库</button>
            <dialog id="AddModal" closedby="any">
                <article>
                    <form id="form" class="flex flex:col gap:15 mt:10 mb:20"
                          data-on:submit="@post('/admin/repository/add',{contentType:'form'})">
                        <input type="text" name="url" value="https://gitee.com/ifeiwu/example-blocks.git" placeholder="https://" />
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
          data-signals="{pagenum:0}"
          data-indicator:fetching
          data-on:submit__delay.0ms="items.innerHTML='';@post('/admin/repository/block-query',{contentType:'form'})">
        <input type="hidden" name="pagenum" data-bind:pagenum>
        <input type="hidden" name="repo_id" data-attr:value="$repo_id">
        <div class="flex ai:center gap:20 mt:10 py:10 r:5">
            <div class="flex-grow:1">
                <fieldset role="group">
                    <input type="search" name="kword" placeholder="开始搜索..." enterkeyhint="搜索"
                           data-bind:kword
                           data-on:search="$pagenum=1;$category='';!el.value && searchForm.requestSubmit()"/>
                    <button type="submit" class="ghost square">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search preview-icon"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
                    </button>
                </fieldset>
            </div>
            <div class="ml:auto">
                <select name="category"
                        data-bind:category
                        data-on:change="$pagenum=1;$kword='';searchForm.requestSubmit()">
                    <button type="button">
                        <selectedcontent></selectedcontent>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down preview-icon"><path d="m6 9 6 6 6-6"></path></svg>
                    </button>
                    <option value="">全部分类</option>
                    <div id="category_options"></div>
                </select>
            </div>
        </div>
    </form>

    <ul id="items" class="gap:20 cols:3 py:20 {mb:20;r:10;b:1|solid|gray-86;overflow:hidden;}>li"></ul>

    <div class="text:center f:gray" data-show="$fetching">加载数据中</div>

    <div class="f:gray-50 f:14 text:center mt:20" style="display:none" data-show="$nodata">没有找到相关内容</div>

    <div slot="footer">
        <nav id="paginator" class="pagination flex jc:center"
             data-indicator="fetching"
             data-on-signal-patch-filter='{include:/^pagenum$/}'
             data-on-signal-patch__debounce.200ms="searchForm.requestSubmit()"></nav>
    </div>
</ku-modal>