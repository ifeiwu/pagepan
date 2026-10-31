<div id="popover-myself-block" class="popover" data-sp-toggle="#popover-myself-block-trigger">
    <div class="popover-header">
        <h4 class="popover-title">创建为内容块</h4>
    </div>
    <form class="grid gap-2"
          data-on:submit="el.querySelector('[name=content]').value = document.querySelector('#coder').editor.getValue();
          @post('/admin/repository/myself/save-block',{contentType:'form'})">
        <input type="hidden" name="content">
        <div class="grid grid-cols-5 items-center gap-4">
            <label class="label">分类</label>
            <div class="col-span-4">
                <div id="cb-block-category-field" class="input-group w-full max-w-sm">
                    <input class="input" placeholder="选择分类" />
                    <span class="input-group-addon input-group-addon-end">
                        <button class="btn btn-ghost btn-xs btn-icon" type="button" tabindex="-1">
                            <svg class="text-muted-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                        </button>
                    </span>
                </div>
                <div class="combobox" data-sp-toggle="#cb-block-category-field">
                    <div class="combobox-empty">No items found.</div>
                    <div class="combobox-list">
                        <div class="combobox-item"><input type="radio" name="category" value="next" /> Next.js</div>
                        <div class="combobox-item"><input type="radio" name="category" value="sveltekit" /> SvelteKit</div>
                        <div class="combobox-item"><input type="radio" name="category" value="nuxt" /> Nuxt.js</div>
                        <div class="combobox-item"><input type="radio" name="category" value="remix" /> Remix</div>
                        <div class="combobox-item"><input type="radio" name="category" value="astro" /> Astro</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-5 items-center gap-4">
            <label class="label">名称</label>
            <input name="name" class="input col-span-4 h-8" value="" />
        </div>
        <div class="flex justify-end gap-2 mt-3">
            <button type="submit" name="submit" value="replace" class="btn btn-outline">覆盖现有</button>
            <button type="submit" name="submit" value="create" class="btn">新建</button>
        </div>
    </form>
</div>