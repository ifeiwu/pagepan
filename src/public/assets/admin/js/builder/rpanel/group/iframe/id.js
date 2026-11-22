(() => {
  // assets/admin/js/builder/rpanel/group/iframe/id.js
  function iframeId(attrs = {}) {
    const $target = $(attrs.target);
    const $template = $(`
        <div class="group">
            <div class="label">\u5143\u7D20 ID</div>
            <div class="value">
                <input type="text" placeholder="">
            </div>
        </div>
    `);
    const $input = $template.find("input");
    $input.val($target.find("iframe").attr("id") || "");
    $input.on("input", function() {
      const id = this.value.trim();
      if (id) {
        $target.find("iframe").attr("id", id);
      } else {
        $target.find("iframe").removeAttr("id");
      }
    });
    return $template;
  }
})();
