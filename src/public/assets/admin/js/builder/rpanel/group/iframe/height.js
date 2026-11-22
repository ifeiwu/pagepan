(() => {
  // assets/admin/js/builder/rpanel/group/iframe/height.js
  function iframeHeight(attrs = {}) {
    const $target = $(attrs.target);
    const $template = $(`
        <div class="group">
            <div class="label">\u9AD8\u5EA6</div>
            <div class="value">
                <input type="text">
            </div>
        </div>
    `);
    const $input = $template.find("input");
    $input.val($target.find("iframe").attr("height") || "");
    $input.on("input", function() {
      $target.find("iframe").attr("height", this.value);
    });
    return $template;
  }
})();
