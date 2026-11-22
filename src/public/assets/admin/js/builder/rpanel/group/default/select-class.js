(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // assets/admin/js/builder/rpanel/group/default/select-class.js
  var require_select_class = __commonJS({
    "assets/admin/js/builder/rpanel/group/default/select-class.js"() {
      RPanel.GroupSelectClass = {
        view: function(vnode) {
          let data = vnode.attrs["data"];
          let name = vnode.attrs["name"];
          let value = vnode.attrs["value"];
          let label = vnode.attrs["label"];
          let breakpoint = vnode.attrs["breakpoint"];
          let callbacks = {
            onchange: function(value2) {
              Component.setSetting(name, value2);
              let $handle = Component.getHandle();
              let setting_prefix = vnode.attrs["setting-prefix"];
              let class_prefix = vnode.attrs["class-prefix"];
              $targetel = $handle.find('[data-setting-prefix="' + setting_prefix + '"]');
              if (class_prefix) {
                $.PFrame.addPrefixClass(class_prefix, value2, breakpoint);
                $.PFrame.removeGapClass(class_prefix);
              } else {
                $select = $(vnode.dom).find("select");
                let option_class_list = $select.find("option").map(function() {
                  return this.value;
                }).get().filter(function(value3) {
                  return value3 !== "";
                });
                if (breakpoint == true) {
                  option_class_list = option_class_list.join(window.breakpoint + " ") + window.breakpoint;
                  value2 = value2 + window.breakpoint;
                } else {
                  option_class_list = option_class_list.join(" ");
                }
                $targetel.removeClass(option_class_list);
                $targetel.addClass(value2);
                $.PFrame.setComponentSettingClass();
              }
              $targetel = $handle.find('>[_name="component"]');
            }
          };
          return m(RPanel.GroupSelectDefault, {
            "breakpoint": breakpoint,
            "label": label,
            "name": name,
            "value": value,
            "data": data,
            "callbacks": callbacks
          });
        }
      };
    }
  });
  require_select_class();
})();
