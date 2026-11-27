<dialog id="EditDialog" class="dialog" data-sp-static>
    <div class="dialog-panel">
        <button class="btn btn-ghost btn-xs btn-icon absolute top-3 right-3" aria-label="Close" data-sp-dismiss>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="size-4">
                <path d="M18 6 6 18"/>
                <path d="m6 6 12 12"/>
            </svg>
        </button>
        <div class="dialog-header">
            <div class="dialog-title flex items-center gap-1 text-[17px] font-bold text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-database-cog preview-icon"><path d="m14.305 19.53.923-.382"/><path d="m15.228 16.852-.923-.383"/><path d="m16.852 15.228-.383-.923"/><path d="m16.852 20.772-.383.924"/><path d="m19.148 15.228.383-.923"/><path d="m19.53 21.696-.382-.924"/><path d="m20.772 16.852.924-.383"/><path d="m20.772 19.148.924.383"/><path d="M21 10.5V5"/><path d="M3 12a9 3 0 0 0 7.599 2.963"/><path d="M3 5v14a9 3 0 0 0 8.148 2.987"/><circle cx="18" cy="18" r="3"/><ellipse cx="12" cy="5" rx="9" ry="3"/></svg>
                <?= $dataset->id ?? '' ? '修改' : '新建' ?>数据源
            </div>
        </div>
        <div class="dialog-content scrollbar-none max-h-[50vh] overflow-y-auto leading-normal">
            <form id="form" class="flex flex-col gap-5 mt-2 mb-5"
                  data-signals="{table:'<?= $dataset->table ?? 'dataset_work' ?>'}"
                  data-on:submit="@post('/admin/datasets/save',{contentType:'form'})">
                <input type="hidden" name="id" value="<?= $dataset->id ?? '' ?>">

                <div class="field">
                    <label class="label">数据源名称</label>
                    <input type="text" name="title" value="<?= $dataset->title ?? '' ?>" class="input" placeholder="" required/>
                </div>
                <div class="field">
                    <label class="label">数据源类型</label>
                    <select name="table" class="select" data-bind:table>
                        <option value="dataset_navbar">导航</option>
                        <option value="dataset_work">作品</option>
                        <option value="dataset_blog">博客</option>
                    </select>
                </div>
            </form>
        </div>
        <div class="dialog-footer">
            <button type="submit" class="btn" form="form">保 存</button>
        </div>
    </div>
</dialog>