<?php $this->layout('admin');?>

<div class="flex flex:col h:full">
    <div class="flex mt:30 px:20">
        <div>
            <h2>页面管理 <sup class="badge color5"><?=$this->page_count?></sup></h2>
        </div>
        <div class="ml:auto">
            <div class="flex gap:10">
                <div>
                    <button type="button" class="outlined" aria-label="清理缓存" data-tooltip="bottom">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-brush-cleaning preview-icon"><path d="m16 22-1-4"/><path d="M19 14a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v1a1 1 0 0 0 1 1"/><path d="M19 14H5l-1.973 6.767A1 1 0 0 0 4 22h16a1 1 0 0 0 .973-1.233z"/><path d="m8 22 1-4"/></svg>
                    </button>
                </div>
                <div>
                    <button type="button" class="outlined" aria-label="页面块管理" data-tooltip="bottom"
                            data-on:click="@get('/admin/blocks/dialog')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-blocks preview-icon"><path d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2"/><rect x="14" y="2" width="8" height="8" rx="1"/></svg>
                    </button>
                </div>
                <div>
                    <button type="button"
                            data-on:click="@get('/admin/pages/edit')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus preview-icon"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                        添加页面
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="flex gap:10 px:20 mt:10">
        <div>
            <label>
                <svg data-prefix width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search preview-icon"><path d="m21 21-4.34-4.34"/><circle cx="11" cy="11" r="8"/></svg>
                <input type="search" placeholder="搜索页面" />
            </label>
        </div>
        <div>
            <select>
                <button>
                    <selectedcontent></selectedcontent>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down preview-icon"><path d="m6 9 6 6 6-6"/></svg>
                </button>
                <option>全部分组</option>
                <option>酷店</option>
                <option>未分组</option>
                <hr />
                <option class="f:orange">添加分组</option>
            </select>
        </div>
        <div class="ml:auto"></div>
    </div>
    <div class="flex:1 min-h:0 overflow-y:auto px:20 mt:30 pb:30">
        <ul id="pages" class="grid-cols:4 gap:30 jc:space-between mb:20 {rel;flex;flex:col;b:1|solid|gray-86;r:10;overflow:hidden}>li {b:gray-80}>li:hover {opacity:1}>li:hover_.more {opacity:1}>li:has([popover]:popover-open)_.more"
            data-init="@get('/admin/pages/query')"></ul>
    </div>
</div>

<template id="EditDialog"></template>
<!--<template id="RepositoryModal" data-init="@get('/admin/repository/open-modal')"></template>-->
<template id="BuilderDialog" data-init="@get('/admin/builder/dialog?id=1')"></template>
