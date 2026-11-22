(() => {
  // assets/admin/js/builder/rpanel/action/clone.js
  function clone(attrs = {}) {
    let $target = $(attrs.target);
    const $template = $(`
        <li>
            <button class="btn btn-lg btn-icon btn-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy preview-icon"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </button>
        </li>
    `);
    const $apply = $template.find("button");
    $apply.on("click", function(e) {
      e.preventDefault();
      if ($target.is("img")) {
        let $picture = $target.parent("picture");
        if ($picture.length) {
          let $picture2 = $picture.clone();
          $picture2.find("img").removeAttr("data-editable");
          $picture.after($picture2);
        } else {
          let $target2 = $target.clone();
          $target2.removeAttr("data-editable");
          $target.after($target2);
        }
      } else {
        let $li = $target.closest("li");
        if ($li.length) {
          let $li2 = $li.clone(true);
          $li2.removeAttr("data-editable contenteditable");
          $li.after($li2);
        } else {
          let $target2 = $target.clone();
          $target2.removeAttr("data-editable contenteditable");
          $target.after($target2);
        }
      }
    });
    return $template;
  }

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
