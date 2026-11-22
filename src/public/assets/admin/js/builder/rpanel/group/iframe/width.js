(() => {
  // assets/admin/js/builder/rpanel/group/iframe/width.js
  function iframeWidth(attrs = {}) {
    const $target = $(attrs.target);
    const $template = $(`
        <div class="group">
            <div class="label">\u5BBD\u5EA6</div>
            <div class="value">
                <input type="text">
            </div>
        </div>
    `);
    const $input = $template.find("input");
    $input.val($target.find("iframe").attr("width") || "");
    $input.on("input", function() {
      $target.find("iframe").attr("width", this.value);
    });
    return $template;
  }
})();
