(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // assets/admin/js/builder/rpanel/group/default/button-setting.js
  var require_button_setting = __commonJS({
    "assets/admin/js/builder/rpanel/group/default/button-setting.js"() {
      RPanel.GroupButtonSetting = {
        view: function(vnode) {
          vnode.attrs["text"] = m.trust('<svg width="19" height="19" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24"><path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/><circle cx="12" cy="12" r="3"/></svg>');
          vnode.attrs["title"] = "\u52A8\u6001\u8BBE\u7F6E";
          vnode.attrs["url"] = "builder/winpage/monaco?lang=json";
          vnode.attrs["updateButtonStatus"] = function(el, value) {
          };
          vnode.attrs["getValueCallback"] = function(value) {
            return JSON.stringify(Component.getSetting(), null, "	");
          };
          vnode.attrs["onClickSaveCallback"] = function(value, $save, $save_close) {
            try {
              Component.setSetting(JSON.parse(value));
              Uikit.updateDynamicComponent("", "", function() {
                $save.attr("disabled", false);
                $save_close.attr("disabled", false);
              });
            } catch (err) {
              $save.attr("disabled", false);
              $save_close.attr("disabled", false);
              notyf.error("JSON \u683C\u5F0F\u9519\u8BEF\uFF0C\u8BF7\u67E5\u770B\u63A7\u5236\u53F0\u8F93\u51FA\u7ED3\u679C\uFF01");
              console.error(err);
              console.error(value);
            }
          };
          return m(RPanel.GroupButtonEditor, vnode.attrs);
        }
      };
    }
  });
  require_button_setting();
})();
