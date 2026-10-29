<?php $this->layout('admin');?>

<div class="flex flex-col h-full">
    <div class="flex p-5 pb-1">
        <div>
            <h2 class="text-[22px] font-bold">页面管理 <sup class="badge badge-secondary"><?=$this->page_count?></sup></h2>
        </div>
        <div class="ml-auto">
            <div class="flex gap-2">
                <div>
                    <button type="button" class="btn btn-outline" id="tooltip-clear-cache">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-brush-cleaning preview-icon"><path d="m16 22-1-4"/><path d="M19 14a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v1a1 1 0 0 0 1 1"/><path d="M19 14H5l-1.973 6.767A1 1 0 0 0 4 22h16a1 1 0 0 0 .973-1.233z"/><path d="m8 22 1-4"/></svg>
                    </button>
                    <div class="tooltip" data-sp-toggle="#tooltip-clear-cache">清理缓存</div>
                </div>
                <div>
                    <button type="button" class="btn btn-outline" id="tooltip-block-manage"
                            data-on:click="@get('/admin/blocks/dialog')">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-blocks preview-icon"><path d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2"/><rect x="14" y="2" width="8" height="8" rx="1"/></svg>
                    </button>
                    <div class="tooltip" data-sp-toggle="#tooltip-block-manage">内容块管理</div>
                </div>
                <div>
                    <button type="button" class="btn"
                            data-on:click="@get('/admin/pages/edit-info')">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus preview-icon"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                        添加页面
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="flex gap-2 px-5">
        <div>
            <div class="input-group">
                <input class="input" placeholder="搜索页面" />
                <span class="input-group-addon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg></span>
            </div>
        </div>
        <div>
            <div class="flex items-center gap-2">
                <div>
                    <select class="select w-full max-w-sm">
                        <option value="">全部分组</option>
                        <option value="one">酷店</option>
                        <option value="two">未分组</option>
                    </select>
                </div>
                <div class="leading-0">
                    <button type="button" class="text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings-2 preview-icon"><path d="M14 17H5"/><path d="M19 7h-9"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/></svg>
                    </button>
                </div>
            </div>
        </div>
        <div class="ml-auto"></div>
    </div>
    <div class="px-5 mt-6 pb-10 scroll-fade scrollbar scrollbar-sm" style="flex:1;width:100%;min-height:0;overflow-y:auto">
        <ul id="pages" class="grid grid-cols-4 gap-5 justify-between
            *:relative *:flex *:border *:border-solid *:border-gray-300 *:rounded-[10px] *:overflow-hidden
           [&>li]:border-gray-200
           [&>li:hover]:opacity-100
           [&>li:hover_.more]:opacity-100
           [&>li:has([popover]:popover-open)_.more]:opacity-100"
            data-init="@get('/admin/pages/query')"></ul>
    </div>
</div>

<template id="EditModal"></template>
<!--<template id="RepositoryModal" data-init="@get('/admin/repository/open-modal')"></template>-->
<!--<template id="BuilderModal" data-init="@get('/admin/builder/open-modal?page_id=1')"></template>-->
