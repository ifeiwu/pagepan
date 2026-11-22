(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // assets/admin/js/builder/rpanel/group/default/select-dynamic.js
  var require_select_dynamic = __commonJS({
    "assets/admin/js/builder/rpanel/group/default/select-dynamic.js"() {
      RPanel.GroupSelectDynamic = {
        view: function(vnode) {
          let data = vnode.attrs["data"];
          let name = vnode.attrs["name"];
          let value = vnode.attrs["value"];
          let label = vnode.attrs["label"];
          let breakpoint = vnode.attrs["breakpoint"];
          let callbacks = {
            onchange: function(value2) {
              Component.setSetting(name, value2);
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
  require_select_dynamic();
})();
