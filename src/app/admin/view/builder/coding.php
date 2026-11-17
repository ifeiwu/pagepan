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
    require(['vs/editor/editor.main', 'monaco/tailwind-completion'], function() {
        registerTailwindCompletion(monaco)
        require(['js/builder', 'js/builder-coding'])
    })
</script>

<template id="RepositoryModal"></template>
