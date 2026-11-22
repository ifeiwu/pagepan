(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // assets/admin/js/builder/rpanel/group/default/textarea.js
  var require_textarea = __commonJS({
    "assets/admin/js/builder/rpanel/group/default/textarea.js"() {
      RPanel.GroupTextarea = {
        view: function(vnode) {
          let isbase64 = vnode.attrs["isbase64"];
          let placeholder = vnode.attrs["placeholder"] || "";
          let rows = vnode.attrs["rows"];
          let name = vnode.attrs["name"];
          let value = vnode.attrs["value"];
          let update_timeout_id = null;
          return m(".group", { "setting": name }, [
            m(".label", vnode.attrs["label"]),
            m(".value", m("textarea", {
              oncreate: function(vnode2) {
                vnode2.attrs.onupdate(vnode2);
              },
              onupdate: function(vnode2) {
                $(vnode2.dom).attr({ "placeholder": placeholder, "rows": rows });
                if (value && isbase64 === true) {
                  value = Base64.decode(value);
                }
                $(vnode2.dom).val(value);
              },
              oninput: function() {
                let value2 = this.value;
                if (value2 && isbase64 === true) {
                  value2 = Base64.encode(value2);
                }
                Component.setSetting(name, value2);
                clearTimeout(update_timeout_id);
                update_timeout_id = setTimeout(function() {
                  Uikit.updateDynamicComponent();
                }, 1e3);
              }
            }))
          ]);
        }
      };
    }
  });
  require_textarea();
})();
