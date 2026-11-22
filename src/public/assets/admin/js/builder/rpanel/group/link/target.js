(() => {
  // assets/admin/js/builder/rpanel/group/link/target.js
  function linkTarget(attrs = {}) {
    const $target = $(attrs.target);
    const $link = $target.closest("a");
    const $template = $(`
        <div class="field gap-1">
            <label class="label">\u6253\u5F00\u65B9\u5F0F</label>
            <div class="radio-segmented" role="radiogroup" aria-label="\u94FE\u63A5\u6253\u5F00\u65B9\u5F0F">
                <label class="radio-segment">
                    <input type="radio" name="link_target" value="">
                    \u672C\u7A97\u53E3
                </label>
                <label class="radio-segment">
                    <input type="radio" name="link_target" value="_blank">
                    \u65B0\u7A97\u53E3
                </label>
                <label class="radio-segment">
                    <input type="radio" name="link_target" value="_modal">
                    \u5F39\u7A97\u53E3
                </label>
            </div>
        </div>
    `);
    const $radios = $template.find('[name="link_target"]');
    const target = $link.attr("target");
    $radios.filter('[value=""]').prop("checked", !target);
    $radios.filter('[value="_blank"]').prop("checked", target === "_blank");
    $radios.filter('[value="_modal"]').prop("checked", target === "_modal" || $link.is("[data-modal]"));
    $radios.on("change", function() {
      if (!this.checked) return;
      switch (this.value) {
        case "":
          $link.removeAttr("target data-modal");
          break;
        case "_blank":
          $link.attr("target", "_blank").removeAttr("data-modal");
          break;
        case "_modal":
          $link.attr("target", "_modal");
          break;
      }
    });
    return $template;
  }
})();
