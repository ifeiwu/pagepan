(() => {
  // assets/admin/js/builder/rpanel/group/video/width.js
  function videoWidth(attrs = {}) {
    const $target = $(attrs.target);
    const $video = $target.find("video");
    const $template = $(`
        <div class="group">
            <div class="label">\u89C6\u9891\u5BBD\u5EA6</div>
            <div class="value">
                <input type="text">
            </div>
        </div>
    `);
    const $input = $template.find("input");
    $input.val($video.attr("width") || "");
    $input.on("input", function() {
      $video.attr("width", this.value);
    });
    return $template;
  }
})();
