(() => {
  // assets/admin/js/builder/rpanel/group/button/class.js
  function buttonClass(attrs = {}) {
    const $target = $(attrs.target);
    const $template = $(`
        <div class="group">
            <div class="label">\u6309\u94AE\u6837\u5F0F</div>

            <div class="value">
                <select name="btncss" id="btncss">
                    <option value="">\u9ED8\u8BA4\u900F\u660E</option>
                    <option value="btn-primary">\u4E3B\u8272\uFF08\u80CC\u666F\uFF09</option>
                    <option value="btn-secondary">\u526F\u8272\uFF08\u80CC\u666F\uFF09</option>
                    <option value="btn-mix">\u6DF7\u8272\uFF08\u80CC\u666F\uFF09</option>
                    <option value="btn-outline-primary">\u4E3B\u8272\uFF08\u7EBF\u6846\uFF09</option>
                    <option value="btn-outline-secondary">\u526F\u8272\uFF08\u7EBF\u6846\uFF09</option>
                    <option value="btn-outline-mix">\u6DF7\u8272\uFF08\u7EBF\u6846\uFF09</option>
                </select>
            </div>
        </div>
    `);
    const $select = $template.find("select");
    const classNames = [
      "btn-primary",
      "btn-secondary",
      "btn-mix",
      "btn-outline-primary",
      "btn-outline-secondary",
      "btn-outline-mix"
    ];
    function update() {
      if (!$target.is(".btn")) {
        $template.hide();
        return;
      }
      $template.show();
      const selectedClass = classNames.find((className) => {
        return $target.hasClass(className);
      });
      $select.val(selectedClass || "");
    }
    $select.on("change", function() {
      $target.removeClass(classNames.join(" "));
      if (this.value) {
        $target.addClass(this.value);
      }
    });
    update();
    return $template;
  }
})();
