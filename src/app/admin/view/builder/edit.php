<?php $this->layout('iframe') ?>

<script>
    appvar.page = <?=json_encode($this->page)?>
</script>

<link href="/assets/admin/css/builder.css" rel="stylesheet">

<div class="pb-split">
    <div id="split-view" class="rel overflow:hidden">
        <div class="pb-header">
            <div class="flex-basis:300 flex ai:center">
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
            <div class="flex-grow:1 flex jc:center">首页</div>
            <div class="flex-basis:300 flex jc:right gap:5">
                <button id="publish" class="btn rounded-sm">发布</button>
                <button class="btn rounded-sm"
                        data-on:click="parent.BuilderModal.close()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x preview-icon"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
            </div>
        </div>
        <div class="pb-ruler active">
            <div class="fluid">
                <div class="left"></div>
                <div class="right"></div>
            </div>
            <div class="xxl">
                <div class="left"></div>
                <div class="right"></div>
            </div>
            <div class="xl">
                <div class="left"></div>
                <div class="right"></div>
            </div>
            <div class="lg">
                <div class="left"></div>
                <div class="right"></div>
            </div>
            <div class="md">
                <div class="left"></div>
                <div class="right"></div>
            </div>
            <div class="sm">
                <div class="left"></div>
                <div class="right"></div>
            </div>
            <div class="xs active">
                <div class="left"></div>
                <div class="size"></div>
                <div class="right"></div>
            </div>
        </div>
        <div class="pb-body">
        <div class="pb-board">
            <div class="pb-resize ease" style="width: 360px;">
                <div class="resize-left"></div>
                <div class="browser-header">
                    <div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div><input type="text" value="<?=$this->page_url?>" class="f:11" readonly /></div>
                    <div>
                        <a target="_blank" title="预览效果" href="<?=$this->page_url?>">
                            <svg class="w:18 h:18" viewBox="0 0 24 24">
                                <path fill="currentColor"
                                      d="M3.512 15h4.66A25.567 25.567 0 0 1 8 12c0-1.044.06-2.052.172-3h-4.66A8.985 8.985 0 0 0 3 12c0 1.052.18 2.062.512 3Zm.424 1a9.017 9.017 0 0 0 6.092 4.783c-.78-1.06-1.376-2.746-1.714-4.783H3.936Zm16.552-1A8.985 8.985 0 0 0 21 12c0-1.052-.18-2.062-.512-3h-4.66c.113.948.172 1.956.172 3s-.06 2.052-.172 3h4.66Zm-.424 1h-4.378c-.338 2.037-.935 3.723-1.714 4.783A9.017 9.017 0 0 0 20.064 16Zm-10.88-1h5.632c.118-.938.184-1.947.184-3s-.066-2.062-.184-3H9.184A24.046 24.046 0 0 0 9 12c0 1.053.066 2.062.184 3Zm.151 1c.522 2.968 1.583 5 2.665 5s2.143-2.032 2.665-5h-5.33Zm-5.4-8h4.379c.338-2.037.935-3.723 1.714-4.783A9.017 9.017 0 0 0 3.936 8Zm16.13 0a9.017 9.017 0 0 0-6.093-4.783c.78 1.06 1.376 2.746 1.714 4.783h4.378ZM9.334 8h5.33C14.143 5.032 13.082 3 12 3S9.857 5.032 9.335 8ZM12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10Z"></path>
                            </svg>
                        </a>
                    </div>
                </div>
                <iframe id="iframe" src="about:blank" class="w:full h:full"></iframe>
                <div class="resize-right"></div>
            </div>
        </div>
        </div>
    </div>
    <div id="split-code">
        <div class="flex w:full h:full">
            <div class="flex flex:col gap:10 p:10|3 bg:gray-30">
                <button id="save_code">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-save preview-icon"><path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/></svg>
                </button>
                <button data-on:click="@get('/admin/repository/open-modal')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-blocks preview-icon"><path d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2"></path><rect x="14" y="2" width="8" height="8" rx="1"></rect></svg>
                </button>
            </div>
            <div class="flex-grow:1">
                <div id="coder" style="width:100%;height:100%"></div>
            </div>
        </div>
    </div>
</div>

<script>
    require(['js/builder'], function() {})
</script>

<template id="RepositoryModal"></template>