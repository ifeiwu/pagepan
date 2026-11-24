<div class="field field-horizontal text-orange-700 has-checked:text-green-700">
    <input type="checkbox" name="<?= $name ?? 'state' ?>" <?= $value === 1 ? 'checked' : '' ?> value="1" class="switch checked:bg-green-700" />
    <label class="label"><?= $label ?? '启用' ?></label>
</div>