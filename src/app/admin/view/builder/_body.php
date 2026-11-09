<div class="pb-body">
    <div class="pb-board">
        <div class="pb-resize ease" style="width: 360px;">
            <div class="resize-left"></div>
            <div class="browser-header">
                <div><div></div><div></div><div></div></div>
                <div><input type="text" value="<?=$this->page_url?>" class="text-xs" readonly /></div>
                <div>
                    <a target="_blank" title="预览效果" href="<?=$this->page_url?>">
                        <svg class="w:18 h:18" viewBox="0 0 24 24">
                            <path fill="currentColor"
                                  d="M3.512 15h4.66A25.567 25.567 0 0 1 8 12c0-1.044.06-2.052.172-3h-4.66A8.985 8.985 0 0 0 3 12c0 1.052.18 2.062.512 3Zm.424 1a9.017 9.017 0 0 0 6.092 4.783c-.78-1.06-1.376-2.746-1.714-4.783H3.936Zm16.552-1A8.985 8.985 0 0 0 21 12c0-1.052-.18-2.062-.512-3h-4.66c.113.948.172 1.956.172 3s-.06 2.052-.172 3h4.66Zm-.424 1h-4.378c-.338 2.037-.935 3.723-1.714 4.783A9.017 9.017 0 0 0 20.064 16Zm-10.88-1h5.632c.118-.938.184-1.947.184-3s-.066-2.062-.184-3H9.184A24.046 24.046 0 0 0 9 12c0 1.053.066 2.062.184 3Zm.151 1c.522 2.968 1.583 5 2.665 5s2.143-2.032 2.665-5h-5.33Zm-5.4-8h4.379c.338-2.037.935-3.723 1.714-4.783A9.017 9.017 0 0 0 3.936 8Zm16.13 0a9.017 9.017 0 0 0-6.093-4.783c.78 1.06 1.376 2.746 1.714 4.783h4.378ZM9.334 8h5.33C14.143 5.032 13.082 3 12 3S9.857 5.032 9.335 8ZM12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10Z"></path>
                        </svg>
                    </a>
                </div>
            </div>
<!--            <iframe id="iframe" src="about:blank"></iframe>-->
            <iframe id="iframe" src="<?="/admin/builder/page?id={$this->page->id}"?>"></iframe>
            <div class="resize-right"></div>
        </div>
    </div>
    <div class="pb-rpanel open">
        <div class="close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"></path></svg>
        </div>
        <div class="grid grid-cols-6 p-2">
            <div>
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
            </div>
        </div>
        <div class="scroll">

        </div>
    </div>
</div>