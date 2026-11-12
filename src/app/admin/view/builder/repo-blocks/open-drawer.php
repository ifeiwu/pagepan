<dialog id="drawer_repo_blocks" class="drawer drawer-start">
    <div class="drawer-panel w-xs">
        <div class="drawer-header">
            <select name="repo_id" class="select w-full"
                    data-init="@get('/admin/builder/repo-blocks/repositories')"
                    data-ref:repo
                    data-bind:repo_id
                    data-on:change="@get('/admin/builder/repo-blocks/categorys')">
                <div id="repo_options"></div>
            </select>
        </div>
        <div class="flex-1 p-4">

            <div class="input-group" id="cb-block-category-field">
                <input class="input" id="cb-demo-input" placeholder="选择分类" />
                <span class="input-group-addon input-group-addon-end">
                    <button class="btn btn-ghost btn-xs btn-icon" type="button" tabindex="-1">
                        <svg class="text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                </span>
            </div>

            <div class="combobox" data-sp-toggle="#cb-block-category-field">
                <div class="combobox-empty">No items found.</div>
                <div class="combobox-list">
                    <div id="combobox_category_list"></div>
                    <!--<div class="combobox-item">
                        <img src="/assets/admin/icon/block/cover.svg"><input type="radio" name="cb-block-category" value="next" /> Next.js
                    </div>-->
                </div>
            </div>
            <pre data-json-signals></pre>
            <!--<div class="panel uikit block">
                <ul class="dirs overflow-auto *:relative *:flex *:cursor-pointer *:items-center *:border-b *:border-[#ddd] *:py-2.5 *:after:absolute *:after:right-2.5 *:after:top-1/2 *:after:block *:after:size-2 *:after:-translate-y-1/2 *:after:-rotate-45 *:after:border-r *:after:border-b *:after:border-[#ccc] *:after:transition-[border-color,right] *:after:duration-300 [&>li:hover]:after:right-1.25 [&>li:hover]:after:border-[#333] [&>li>.image]:w-13 [&>li>.image>img]:block [&>li>.title]:inline-block [&>li>.title]:text-sm [&>li>.title]:font-bold [&>li>.title]:text-[#333] [&>li:hover>.title]:text-[#4263eb] [&>li>.subtitle]:ml-2.5 [&>li>.subtitle]:inline-block [&>li>.subtitle]:text-[10px] [&>li>.subtitle]:text-[#bbb]">
                    <li>
                        <div class="image">
                            <img src="/assets/admin/icon/block/cover.svg">
                        </div>
                        <div class="title">组件</div>
                        <div class="subtitle">Components</div>
                    </li>
                </ul>

                <div class="level2 hidden h-full">
                    <div class="back relative mx-[20px] ml-2.5 h-8 cursor-pointer border-b border-[#999] text-center text-xs leading-8 text-[#333] hover:text-[#4263eb] after:absolute after:left-[15px] after:top-1/2 after:block after:size-2 after:rotate-[135deg] after:translate-y-1/2 after:border-r after:border-b after:border-[#aaa] after:transition-[border-color,left] after:duration-300 hover:after:left-2.5 hover:after:border-[#333]">
                        返回
                    </div>

                    <div class="nodata mt-[50px] text-center text-[#666]">
                        暂无数据
                    </div>

                    <div class="loading mt-[50px] text-center">
                        加载中...
                    </div>

                    <div class="list h-[calc(100%-34px)] overflow-auto px-2.5 pt-[30px]">
                        <div class="relative mx-0.5 mb-[30px] min-h-10 cursor-move text-[0] shadow-[0_0_2px_1px_rgba(0,0,0,0.05)] transition-shadow duration-300 hover:shadow-[0_0_3px_1px_rgba(0,0,0,0.2)]">
                            <img src="example.jpg" class="block w-full">

                            <div class="show absolute right-0 top-0 bottom-0 z-[2] w-1/5 cursor-zoom-in bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.8)_100%)] opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
                        </div>

                        <div class="vip relative mx-0.5 mb-[30px] min-h-10 cursor-no-drop text-[0] shadow-[0_0_2px_1px_rgba(0,0,0,0.05)] transition-shadow duration-300 hover:shadow-[0_0_3px_1px_rgba(0,0,0,0.2)] before:absolute">
                            <img src="example.jpg" class="block w-full grayscale-[80%]">

                            <div class="absolute right-0 top-0 bottom-0 z-[2] w-1/5 cursor-zoom-in bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.8)_100%)] opacity-0 transition-opacity duration-300 hover:opacity-100"></div>
                        </div>
                    </div>
                </div>
            </div>-->

        </div>
    </div>
</dialog>