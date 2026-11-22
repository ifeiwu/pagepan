<div class="c-text-editor invisible" data-option='<?= json_encode($option ?? []) ?>'>
    <textarea name="<?= $name ?>"><?= htmlspecialchars($value) ?></textarea>
    <script>
		(() => {
            const component = document.currentScript.closest('.c-text-editor');
            require(['js/forms/text-editor'], function (textEditor) {
				textEditor(component);
            });
		})();
    </script>
</div>