<?php $this->layout('admin');?>

<ul id="pages" class="grid-cols:3 gap:30 jc:space-between mb:20 {rel;flex;flex:col;bg:gray-94;shadow:0|1|2|#ddd;r:10;overflow:hidden}>li"
    data-init="@get('/admin/pages/query')"></ul>

<template id="EditDialog" data-init="@get('/admin/pages/edit/dialog?id=1')"></template>
