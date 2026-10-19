<?php $page = $this->page; ?>

<ku-modal id="EditDialog" style="" static-backdrop hidden>
    <div slot="header" class="f:bold f:17"><?=$page->title?></div>

    <form id="form" class="flex flex:col gap:15 mt:10 mb:20"
          data-signals="{type:'<?=$page->type?>',layout:'<?=$page->layout?>',state:'<?=$page->state?>'}"
          data-on:submit="@post('/admin/pages/save',{contentType:'form',openWhenHidden:true})">
        <input type="hidden" name="id" value="<?=$page->id?>">
            <label class="field">
                <span>页面类型</span>
                <select name="type" data-bind:type>
                    <button>
                        <selectedcontent></selectedcontent>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down preview-icon"><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                    <option value="guide">引导页：引导用户进入主页或其他内页。</option>
                    <option value="home">首页：提供网站的重要内容、特性以及最新动态。</option>
                    <option value="inside">内页：除了引导页和主页之外的子页面，通常包括作品页、详情页等。</option>
                    <option value="graphic">图文：也是内页的一种，它没有现成的组件，而是通过富文本编辑器排版页面。</option>
                    <option value="layout">布局：指的是页面之间可共用的页头或页尾等内容。</option>
                    <option value="404">404：在用户请求的页面不存在时显示。</option>
                </select>
            </label>
            <label class="field">
                <span>页面布局</span>
                <select name="layout" data-bind:layout data-attr:disabled="$type=='layout'">
                    <button>
                        <selectedcontent></selectedcontent>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down preview-icon"><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                    <option value="">请选择</option>
                    <?php foreach ($this->layouts as $layout): ?>
                        <option value="<?=$layout->path?>"><?=$layout->title?></option>
                    <?php endforeach;?>
                </select>
            </label>
            <label class="field">
                <span>页面名称</span>
                <input type="text" name="title" value="<?=$page->title?>" placeholder="" required />
            </label>
            <label class="field">
                <span>页面路径</span>
                <input type="text" name="path" value="<?=$page->path?>" pattern="[a-zA-Z0-9][a-zA-Z0-9\/_\-]*" placeholder="字母、数字、横线、下划线或斜杆组成。"
                    data-attr:disabled="($type=='guide' || $type=='404')" />
            </label>
    </form>

    <div slot="footer">
        <div class="flex jc:end gap:10">
            <label class="f:bold f:orange {f:green}:has(input:checked)">
                <input type="checkbox" class="input:checked" form="form" name="state" value="1" data-bind:state />
                启用
            </label>
            <div>
                <button type="submit" form="form">保存页面</button>
            </div>
        </div>
    </div>
</ku-modal>