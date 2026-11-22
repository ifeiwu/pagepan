(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // assets/admin/js/builder/rpanel/group/default/select-style.js
  var require_select_style = __commonJS({
    "assets/admin/js/builder/rpanel/group/default/select-style.js"() {
      RPanel.GroupSelectStyle = {
        view: function(vnode) {
          let data = vnode.attrs["data"];
          let name = vnode.attrs["name"];
          let value = vnode.attrs["value"];
          let label = vnode.attrs["label"];
          let attrname = vnode.attrs["attrname"];
          let breakpoint = vnode.attrs["breakpoint"];
          let callbacks = {
            onchange: function(value2) {
              Component.setSetting(name, value2);
              let setting_prefix = vnode.attrs["setting-prefix"];
              $targetel = $handle.find('[data-setting-prefix="' + setting_prefix + '"]');
              if (attrname.indexOf("--") == 0) {
                $.PFrame.addPrefixStyleVar(attrname.replace("--", ""), value2, breakpoint);
              } else {
                $.PFrame.addStyle(attrname, value2);
                $.PFrame.setComponentSettingStyle();
              }
              $targetel = $handle.find('>[_name="component"]');
              Uikit.updateDynamicComponent();
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
  require_select_style();
})();
