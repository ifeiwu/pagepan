(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // assets/admin/js/builder/rpanel/group/default/button-menu.js
  var require_button_menu = __commonJS({
    "assets/admin/js/builder/rpanel/group/default/button-menu.js"() {
      RPanel.GroupButtonMenu = {
        view: function(vnode) {
          let name = vnode.attrs["name"];
          vnode.attrs["updateButtonStatus"] = function(el, value) {
            if (value) {
              $(el).addClass("reddot");
            } else {
              $(el).removeClass("reddot");
            }
          };
          vnode.attrs["getValueCallback"] = function(value) {
            return Component.getSetting(name);
          };
          vnode.attrs["onClickSaveCallback"] = function(value, $save, $save_close) {
            value = JSON.parse(value);
            Component.setSetting(name, value);
            Uikit.updateDynamicComponent("", "", function() {
              $save.attr("disabled", false);
              $save_close.attr("disabled", false);
            });
          };
          return m(RPanel.GroupButtonEditor, vnode.attrs);
        }
      };
    }
  });
  require_button_menu();
})();
