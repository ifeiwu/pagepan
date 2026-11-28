<select id="group_filter" class="select w-full max-w-sm"
        data-bind:group_id>
    <option value="">全部分组</option>
    <?php
    foreach ($items as $item) {
        echo "<option value=\"{$item->id}\">{$item->title}</option>";
    }
    ?>
</select>