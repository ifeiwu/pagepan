(() => {
  // assets/admin/js/builder/rpanel/action/remove.js
  function remove(attrs = {}) {
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
      if ($target.is("img") && $target.parent().is("picture") || $target.is("video") && $target.parent().is("._video_") || $target.is("audio") && $target.parent().is("._audio_") || $target.is("iframe") && $target.parent().is("._iframe_")) {
        let $parent = $target.parent();
        $target = $parent.parent();
        $parent.remove();
      } else {
        let $target2 = $target.next();
        if ($target2.length === 0) {
          $target2 = $target.prev();
        }
        if ($target2.length === 0) {
          $target2 = $target.parent();
        }
        $target.remove();
        $target = $target2;
      }
      if ($target.children().length === 0 && $target.text().trim() === "") {
        $target.empty();
      }
      $target.trigger("click.target");
    });
    return $template;
  }
})();
