<?php $this->layout('iframe') ?>

<script>
    appvar.page = <?=json_encode($this->page)?>
</script>

<link href="/assets/admin/css/builder.css" rel="stylesheet">

<div id="workspace" class="resizable resizable-vertical h-screen">
    <div class="resizable-panel" data-sp-size="50">
        <?php $this->insert('builder/_header') ?>
        <?php $this->insert('builder/_ruler') ?>
        <?php $this->insert('builder/_body') ?>
    </div>
    <div class="resizable-handle bg-slate-300 h-3">
        <div class="resizable-grip" style="--border:#63748d;--spacing:0.4rem;"></div>
    </div>
    <div class="resizable-panel" data-sp-size="50">
        <?php $this->insert('builder/_editor') ?>
    </div>
</div>

<script>
    require(['js/builder'], function() {})
</script>

<template id="RepositoryModal"></template>
