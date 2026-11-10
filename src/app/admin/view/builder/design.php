<?php $this->layout('builder') ?>

<div id="app">
    <?php
    $this->insert('builder/_header');
    $this->insert('builder/_ruler');
    $this->insert('builder/_body');
    ?>
</div>

<link href="/assets/admin/lib/winbox-theme.css" rel="stylesheet">
<script src="/assets/admin/lib/winbox.js" async></script>
<script src="/assets/admin/js/builder-design.js"></script>

<!--<script>
    const iframe = document.querySelector('#iframe');
    iframe.addEventListener('load', () => {
        require(['js/builder', 'js/builder/design'], function (builder, design) {
            design(iframe.contentDocument);
        });
    });
</script>-->