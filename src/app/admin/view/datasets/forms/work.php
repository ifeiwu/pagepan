<?php $this->layout('iframe'); ?>

<section class="px-8 py-20">
    <header class="fixed inset-x-0 top-0 z-50 flex py-5 px-8 bg-white/30 backdrop-blur-sm">
        <div class="flex items-center gap-2 text-lg font-bold">
            <svg width="24" height="24" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 21L12 21H21" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12.2218 5.82839L15.0503 2.99996L20 7.94971L17.1716 10.7781M12.2218 5.82839L6.61522 11.435C6.42769 11.6225 6.32233 11.8769 6.32233 12.1421L6.32233 16.6776L10.8579 16.6776C11.1231 16.6776 11.3774 16.5723 11.565 16.3847L17.1716 10.7781M12.2218 5.82839L17.1716 10.7781" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>
            编辑信息
        </div>
        <div class="ml-auto">
            <a href="#" class="btn btn-lg px-4">保 存</a>
        </div>
    </header>

    <form class="grid grid-cols-[350px_1fr]">
        <div class="">
            <div class="field-group">
                <?php $this->insert('datasets/fields/combobox-categorys') ?>
                <?php $this->insert('datasets/fields/input') ?>
                <?php $this->insert('datasets/fields/upload-image', []) ?>
            </div>
        </div>
        <div>

        </div>
    </form>

</section>

<script src="/assets/admin/js/forms.js"></script>