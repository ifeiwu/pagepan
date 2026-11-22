(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // assets/admin/js/builder/rpanel/group/default/checkbox.js
  var require_checkbox = __commonJS({
    "assets/admin/js/builder/rpanel/group/default/checkbox.js"() {
      RPanel.GroupCheckbox = {
        view: function(vnode) {
          let name = vnode.attrs["name"];
          let text = vnode.attrs["text"];
          let value = vnode.attrs["value"];
          let default_value = vnode.attrs["default_value"];
          return m(".group", { "setting": name }, [
            m(".value", [
              m('input[type="checkbox"]', {
                oncreate: function(vnode2) {
                  vnode2.attrs.onupdate(vnode2);
                },
                onupdate: function(vnode2) {
                  if (value) {
                    $(vnode2.dom).prop("checked", true);
                  } else {
                    $(vnode2.dom).prop("checked", false);
                  }
                },
                onchange: function() {
                  let value2 = this.checked ? this.value : "";
                  Component.setSetting(name, value2);
                  Uikit.updateDynamicComponent();
                }
              }),
              m("label", text)
            ])
          ]);
        }
      };
    }
  });
  require_checkbox();
})();
