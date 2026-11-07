<?php $this->layout('builder') ?>

<div id="app" class="resizable resizable-vertical h-screen">
    <div class="resizable-panel" data-sp-size="50">
        <?php
        $this->insert('builder/_header');
        $this->insert('builder/_ruler');
        $this->insert('builder/_body');
        ?>
    </div>
    <div class="resizable-handle bg-slate-300 h-3">
        <div class="resizable-grip" style="--border:#63748d;--spacing:0.4rem;"></div>
    </div>
    <div class="resizable-panel" data-sp-size="50">
        <?php $this->insert('builder/_coder') ?>
    </div>
</div>

<script>
    require(['js/builder', 'js/builder/coder'], function() {})
</script>

<template id="RepositoryModal"></template>
