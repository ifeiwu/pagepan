<div class="pb-header">
    <div class="basis-xs flex items-center">
        <div>
            <button id="dd-menu" class="btn btn-ghost btn-icon">
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
        <div class="ml:20">
            <div class="tab-list">
                <button class="tab">设计</button>
                <button class="tab active">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/></svg>
                    代码
                </button>
            </div>
        </div>
    </div>
    <div class="grow flex justify-center">首页</div>
    <div class="basis-xs flex justify-end gap-1">
        <button id="publish" class="btn rounded-sm">发布</button>
        <button class="btn rounded-sm"
                data-on:click="parent.BuilderModal.close()">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x preview-icon"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
    </div>
</div>