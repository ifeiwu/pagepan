(() => {
  // assets/admin/js/builder/rpanel/group/video/height.js
  function videoHeight(attrs = {}) {
    const $target = $(attrs.target);
    const $video = $target.find("video");
    const $template = $(`
        <div class="group">
            <div class="label">\u89C6\u9891\u9AD8\u5EA6</div>
            <div class="value">
                <input type="text">
            </div>
        </div>
    `);
    const $input = $template.find("input");
    $input.val($video.attr("height") || "");
    $input.on("input", function() {
      $video.attr("height", this.value);
    });
    return $template;
  }
})();
