<?php $this->layout('admin');?>

<div class="flex flex:col gap:20 h:full">
    <div class="flex mt:30 px:20 ">
        <div>
            <hgroup>
                <h2>页面管理</h2>
                <p>用最简单的方式，创建你网站的每一个页面。</p>
            </hgroup>
        </div>
        <div class="ml:auto">
            <div class="flex gap:15">
                <div>
                    <button class="outlined">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-blocks preview-icon"><path d="M10 22V7a1 1 0 0 0-1-1H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5a1 1 0 0 0-1-1H2"/><rect x="14" y="2" width="8" height="8" rx="1"/></svg>
                        内容块库
                    </button>
                </div>
                <div>
                    <button data-on:click="@get('/admin/pages/edit')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-plus preview-icon"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
                        添加页面
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="flex:1 min-h:0 overflow-y:auto px:20 pt:10 pb:30">
        <ul id="pages" class="grid-cols:4 gap:30 jc:space-between mb:20 {rel;flex;flex:col;b:1|solid|gray-86;r:10;overflow:hidden}>li {b:gray-70}>li:hover {opacity:1}>li:hover_.more {opacity:1}>li:has([popover]:popover-open)_.more"
            data-init="@get('/admin/pages/query')"></ul>
    </div>
</div>

<template id="EditDialog"></template>
<!--<template id="BuilderDialog" data-init="@get('/admin/builder/dialog?id=1')"></template>-->
