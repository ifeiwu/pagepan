<?php $this->layout('builder') ?>

<div id="app" class="h-screen">
    <?php
    $this->insert('builder/_header');
    $this->insert('builder/_ruler');
    $this->insert('builder/_body');
    ?>
</div>

<script>
    require(['js/builder'], function() {})
</script>