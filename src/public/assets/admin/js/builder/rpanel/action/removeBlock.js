(() => {
  // assets/admin/js/builder/rpanel/action/removeBlock.js
  function removeBlock(attrs = {}) {
    let $target = $(attrs.target);
    const $template = $(`
        <li>
            <button class="btn btn-lg btn-icon btn-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash preview-icon"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
        </li>
    `);
    const $apply = $template.find("button");
    $apply.on("click", function(e) {
      e.preventDefault();
      const block_id = $target.data("blockId");
      $.get("/admin/builder/page/delete-block", { "block_id": block_id }, function(res) {
        if (res.code === 0) {
          let $target2 = $target.nextAll(":not(script, link, style)").first();
          if (!$target2.length) {
            $target2 = $target.prevAll(":not(script, link, style)").first();
          }
          $target.remove();
          if (!$target2.length) {
            $target = $();
            return;
          }
          $target = $target2;
          $target.trigger("click.target");
        }
      });
    });
    return $template;
  }
})();
