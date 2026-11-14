<dialog id="drawer_repo_blocks" class="drawer drawer-start"
        data-signals="{repo_id:'',category:'',kword:'',pagenum:1,fetching:false,loadmore:true}">
    <div class="drawer-panel w-xs">
        <div class="drawer-header">

            <form data-indicator:fetching
                  data-on:submit__delay.0ms="$pagenum=1;items.replaceChildren();@post('/admin/builder/repo-blocks/query')">
                <div class="flex flex-col items-center gap-2">
                    <div class="w-full">
                        <select name="repo_id" class="select w-full"
                                data-init="@get('/admin/builder/repo-blocks/repositories')"
                                data-bind:repo_id
                                data-on:change="$category='';$kword='';el.closest('form').requestSubmit();@get('/admin/builder/repo-blocks/categorys')">
                        </select>
                    </div>
                    <div class="w-full">
                        <select name="category" class="select"
                                data-bind:category
                                data-on:change="$kword='';el.closest('form').requestSubmit()"></select>
                    </div>
                    <div class="w-full">
                        <div class="input-group">
                            <input type="search" class="input" name="kword" placeholder="开始搜索..."
                                   data-bind:kword
                                   data-on:search="$category='';!el.value && el.closest('form').requestSubmit()" />
                            <span class="input-group-addon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg></span>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="flex-1 p-4 overflow-auto">

            <ul id="items" class="flex flex-col gap-4"></ul>

            <div data-indicator="fetching"
                 data-on-intersect="$loadmore && !$fetching && @post('/admin/builder/repo-blocks/query')"></div>

            <ul class="flex flex-col gap-4" data-show="$pagenum==1">
                <?php for ($i = 0; $i < 10; $i++):?>
                    <li>
                        <div class="skeleton" style="height:<?=rand(50, 150)?>px"></div>
                    </li>
                <?php endfor;?>
            </ul>

            <div class="flex justify-center my-5 text-gray-500">
                <div data-show="$fetching && items.children.length">
                    <span class="shimmer text-sm text-muted-foreground">加载中...</span>
                </div>
                <div data-show="!$fetching && !items.children.length">没有找到相关信息</div>
                <div data-show="!$fetching && !$loadmore && items.children.length">已经到底了</div>
            </div>
        </div>
    </div>
</dialog>