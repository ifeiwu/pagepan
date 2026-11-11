<?php $this->layout('builder') ?>

<div id="app">
    <?php
    $this->insert('builder/_header');
    $this->insert('builder/_ruler');
    $this->insert('builder/_body');
    ?>

    <div class="pb-rpanel open">
        <div class="close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg>
        </div>
        <div class="actions">
            <!--<div>
                <button class="btn btn-lg btn-icon btn-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-up preview-icon"><path d="m18 15-6-6-6 6"/></svg>
                </button>
            </div>
            <div>
                <button class="btn btn-lg btn-icon btn-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down preview-icon"><path d="m6 9 6 6 6-6"/></svg>
                </button>
            </div>
            <div>
                <button class="btn btn-lg btn-icon btn-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy preview-icon"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                </button>
            </div>
            <div>
                <button class="btn btn-lg btn-icon btn-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash preview-icon"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
            </div>-->
        </div>
        <div class="scroll">
            <div class="cards">
                <div class="card card-sm attributes"></div>
            </div>
        </div>
    </div>
</div>

<link href="/assets/admin/lib/winbox-theme.css" rel="stylesheet">
<script src="/assets/admin/lib/winbox.js" async></script>
<script src="/assets/admin/js/builder.js"></script>
<script src="/assets/admin/js/builder-design.js"></script>

<!--<script>
    const iframe = document.querySelector('#iframe');
    iframe.addEventListener('load', () => {
        require(['js/builder', 'js/builder/design'], function (builder, design) {
            design(iframe.contentDocument);
        });
    });
</script>-->