(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // assets/admin/js/builder/rpanel/group/default/button-switch.js
  var require_button_switch = __commonJS({
    "assets/admin/js/builder/rpanel/group/default/button-switch.js"() {
      RPanel.GroupButtonSwitch = {
        view: function(vnode) {
          let group_class = vnode.attrs["group.class"] || "";
          let name = vnode.attrs["name"];
          let text = vnode.attrs["text"];
          let title = vnode.attrs["title"];
          let value = vnode.attrs["value"] || "";
          const updateButtonStatus = function(el, value2) {
            if (value2 === true) {
              $(el).addClass("active");
            } else {
              $(el).removeClass("active");
            }
          };
          return m(".group" + group_class, { "setting": name }, [
            m('button[type="button"].btn', {
              "title": title,
              oncreate: function(vnode2) {
                vnode2.attrs.onupdate(vnode2);
              },
              onupdate: function(vnode2) {
                if (value) {
                  $(vnode2.dom).data("checked", true);
                } else {
                  $(vnode2.dom).data("checked", "");
                }
                updateButtonStatus(vnode2.dom, value);
              },
              onclick: function() {
                let value2 = $(this).data("checked");
                value2 = value2 == "" ? true : "";
                $(this).data("checked", value2);
                updateButtonStatus(this, value2);
                Component.setSetting(name, value2);
              }
            }, text)
          ]);
        }
      };
    }
  });
  require_button_switch();
})();
