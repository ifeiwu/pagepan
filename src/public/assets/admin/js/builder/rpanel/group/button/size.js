(() => {
  // assets/admin/js/builder/rpanel/group/button/size.js
  function buttonSize(attrs = {}) {
    const $target = $(attrs.target);
    const breakpoint = window.breakpoint || "";
    const options = [
      { value: "", text: "\u9ED8\u8BA4" },
      { value: "btn-1", text: "1" },
      { value: "btn-2", text: "2" },
      { value: "btn-3", text: "3" },
      { value: "btn-4", text: "4" },
      { value: "btn-5", text: "5" }
    ];
    const label = "\u6309\u94AE\u5927\u5C0F";
    const breakpointInfo = window.breakpointWidth ? `<span class="icon" title="${window.breakpointText}">${window.breakpointIcon}</span>` : "";
    const $template = $(`
        <div class="group">
            <div class="label">${label}${breakpointInfo}</div>
            <div class="value">
                <select name="btnsize" id="btnsize"></select>
            </div>
        </div>
    `);
    const $select = $template.find("select");
    options.forEach(function(option) {
      $select.append(
        $("<option>", {
          value: option.value,
          text: option.text
        })
      );
    });
    function updateValue() {
      if (!$target.is(".btn")) {
        $template.hide();
        return;
      }
      $template.show();
      let value = "";
      for (const option of options) {
        if (option.value && $target.hasClass(option.value + breakpoint)) {
          value = option.value;
          break;
        }
      }
      $select.val(value);
    }
    $select.on("change", function() {
      options.forEach(function(option) {
        if (option.value) {
          $target.removeClass(option.value + breakpoint);
        }
      });
      if (this.value) {
        $target.addClass(this.value + breakpoint);
      }
    });
    updateValue();
    return $template;
  }
})();
