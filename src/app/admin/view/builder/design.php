<?php $this->layout('builder') ?>

<div id="app" class="h-screen">
    <?php
    $this->insert('builder/_header');
    $this->insert('builder/_ruler');
    $this->insert('builder/_body');
    ?>
</div>

<script>
    const iframe = document.querySelector('#iframe');
    iframe.addEventListener('load', () => {
        require(['js/builder', 'js/builder/design'], function (builder, design) {
            design(iframe.contentDocument);
        });
    });
</script>