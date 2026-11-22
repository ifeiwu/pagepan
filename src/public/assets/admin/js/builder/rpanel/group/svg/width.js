(() => {
  // assets/admin/js/builder/rpanel/group/svg/width.js
  function svgWidth(attrs = {}) {
    const $target = $(attrs.target);
    const $template = $(`
        <div class="field">
            <div class="input-group">
                <span class="input-group-addon"><span class="input-group-text">\u56FE\u6807\u5BBD\u5EA6</span></span>
                <input type="text" class="input text-right" name="svg_width" placeholder="" value="">
                <span class="input-group-addon input-group-addon-end"><span class="input-group-text">px</span></span>
            </div>
        </div>
    `);
    const $input = $template.find('[name="svg_width"]');
    $input.val($target.attr("width") || "24");
    $input.on("input", function() {
      $target.attr("width", this.value || 24);
    });
    return $template;
  }
})();
