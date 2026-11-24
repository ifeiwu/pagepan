<div class="pb-header">
    <div class="basis-xs flex items-center">
        <div>
            <button id="dd-menu" class="btn btn-icon btn-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" style="width:20px;height:20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu preview-icon"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg>
            </button>
            <div class="dropdown" data-sp-toggle="#dd-menu">
                <button class="dropdown-item">页面设置</button>
                <button id="dd-sub-history" class="dropdown-item">
                    历史记录
                    <svg class="ml-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </button>
                <a href="https://support.qq.com/products/65308" target="_blank" class="dropdown-item">意见反馈</a>
            </div>
            <div class="dropdown dropdown-sub" data-sp-toggle="#dd-sub-history" data-sp-mode="hover" data-sp-placement="inline-end-start">
                <button class="dropdown-item">2026/10/17 16:23:07</button>
                <button class="dropdown-item">2026/10/17 15:35:53</button>
                <button class="dropdown-item">2026/10/17 15:35:35</button>
            </div>
        </div>
        <div class="flex justify-center w-10">
            <div class="separator separator-vertical h-4"></div>
        </div>
        <div class="flex gap-2">
            <?php if ($edit_mode === 'design'):?>
                <button id="drawer-layer-trigger" class="btn btn-icon btn-secondary" title="内容块排序">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layers-2 preview-icon"><path d="M13 13.74a2 2 0 0 1-2 0L2.5 8.87a1 1 0 0 1 0-1.74L11 2.26a2 2 0 0 1 2 0l8.5 4.87a1 1 0 0 1 0 1.74z"/><path d="m20 14.285 1.5.845a1 1 0 0 1 0 1.74L13 21.74a2 2 0 0 1-2 0l-8.5-4.87a1 1 0 0 1 0-1.74l1.5-.845"/></svg>
                </button>
                <dialog id="drawer_layer" class="drawer drawer-start" data-sp-toggle="#drawer-layer-trigger">
                    <div class="drawer-panel w-xs">
                        <div class="flex-1 p-4">
                            <div id="drawer_layer_list"></div>
                        </div>
                        <div class="drawer-footer">
                            <button id="drawer_layer_save" class="btn">保存排序</button>
                        </div>
                    </div>
                </dialog>

                <button id="drawer-block-trigger" class="btn btn-icon btn-secondary" title="添加内容块"
                        data-on:click="@get('/admin/builder/blocks/open-drawer')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-grid-2x2-plus preview-icon"><path d="M12 3v17a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a1 1 0 0 1-1 1H3"/><path d="M16 19h6"/><path d="M19 22v-6"/></svg>
                </button>
                <template id="drawer_repo_blocks"></template>
            <?php endif;?>
        </div>
    </div>
    <div class="grow flex justify-center">
        <button class="btn font-bold rounded-full bg-blue-50 text-gray-700 px-6"><?=$page->title?></button>
    </div>
    <div class="basis-xs flex justify-end">
        <div>
            <div class="tab-list rounded-full bg-gray-200/60 p-0 *:h-full *:shadow-none [&>a]:gap-1 [&>a]:rounded-full [&>a]:border-0 [&>a]:px-4 [&>a]:text-gray-700 [&>a]:hover:text-blue-700 [&>a.active]:bg-blue-100 [&>a.active]:text-blue-700">
                <a href="/admin/builder/switch?edit_mode=design&page_id=<?=$page->id?>" class="tab <?=$edit_mode == 'design' ? 'active' : ''?>">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-ruler preview-icon"><path d="M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13"/><path d="m8 6 2-2"/><path d="m18 16 2-2"/><path d="m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17"/><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
                    设计
                </a>
                <a href="/admin/builder/switch?edit_mode=coding&page_id=<?=$page->id?>" class="tab <?=$edit_mode == 'coding' ? 'active' : ''?>">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/></svg>
                    代码
                </a>
            </div>
        </div>
        <div class="flex justify-end gap-1 w-32">
            <button id="publish" class="btn w-18 justify-end rounded-lg bg-blue-700 hover:bg-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send preview-icon"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/><path d="m21.854 2.147-10.94 10.939"/></svg>发布
            </button>
            <button class="btn btn-icon rounded-lg"
                    data-on:click="parent.BuilderModal.close()">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x preview-icon"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
        </div>
    </div>
</div>