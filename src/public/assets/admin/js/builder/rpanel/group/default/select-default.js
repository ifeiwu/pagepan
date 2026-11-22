(() => {
  // assets/admin/js/builder/rpanel/group/default/select-default.js
  function selectDefault(attrs = {}) {
    const {
      data = [],
      name,
      value = "",
      label = "",
      callbacks = {},
      breakpoint = false
    } = attrs;
    const $template = $(`
        <div class="group">
            <div class="label"></div>
            <select></select>
        </div>
    `);
    const $label = $template.find(".label");
    const $select = $template.find("select");
    $template.attr("setting", name);
    $select.attr("name", name);
    $label.text(label);
    if (breakpoint) {
      $label.append(`
            <span class="icon" title="${window.breakpointText}">
                ${window.breakpointIcon}
            </span>
        `);
    }
    data.forEach(function(option) {
      const group = option.group;
      if ($.isArray(group)) {
        const $optgroup = $("<optgroup>").attr("label", option.label);
        group.forEach(function(item) {
          const $option = $("<option>").val(item.value).text(item.text);
          $optgroup.append($option);
        });
        $select.append($optgroup);
      } else {
        const $option = $("<option>").val(option.value).text(option.text);
        $select.append($option);
      }
    });
    $select.val(String(value));
    if (typeof callbacks.oncreate === "function") {
      callbacks.oncreate(String(value), $select[0]);
    }
    $select.on("change", function() {
      callbacks.onchange?.(this.value);
    });
    if (typeof callbacks.onupdate === "function") {
      callbacks.onupdate(String(value), $select[0]);
    }
    return $template;
  }
})();
