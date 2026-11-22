(() => {
  // assets/admin/js/builder/rpanel/group/svg/height.js
  function svgHeight(attrs = {}) {
    const $target = $(attrs.target);
    const $template = $(`
        <div class="field">
            <div class="input-group">
                <span class="input-group-addon"><span class="input-group-text">\u56FE\u6807\u9AD8\u5EA6</span></span>
                <input type="text" class="input text-right" name="svg_height" placeholder="" value="">
                <span class="input-group-addon input-group-addon-end"><span class="input-group-text">px</span></span>
            </div>
        </div>
    `);
    const $input = $template.find('[name="svg_height"]');
    $input.val($target.attr("height") || "24");
    $input.on("input", function() {
      $target.attr("height", this.value || 24);
    });
    return $template;
  }
})();
