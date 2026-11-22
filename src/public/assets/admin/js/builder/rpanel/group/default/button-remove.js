(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // assets/admin/js/builder/rpanel/group/default/button-remove.js
  var require_button_remove = __commonJS({
    "assets/admin/js/builder/rpanel/group/default/button-remove.js"() {
      RPanel.GroupButtonRemove = {
        view: function(vnode) {
          vnode.attrs["text"] = m.trust('<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>');
          vnode.attrs["onClickCallback"] = function(btn) {
            if ($.PFrame.isI18nKeys()) {
              modal.confirm("\u8FD9\u4E2A\u5143\u7D20\u5DF2\u542F\u7528\u591A\u8BED\u8A00\u652F\u6301\uFF0C\u662F\u5426\u540C\u65F6\u5220\u9664\uFF1F", "\u63D0\u793A", {
                buttons: {
                  yes: {
                    text: "\u662F",
                    action: function() {
                      $.PFrame.removeI18nKeys();
                      $.PFrame.deleteTargetel();
                    }
                  },
                  no: {
                    text: "\u5426",
                    action: function() {
                      $.PFrame.deleteTargetel();
                    }
                  }
                }
              });
            } else {
              $.PFrame.deleteTargetel();
            }
            $(btn).attr("disabled", false);
          };
          return m(RPanel.GroupButton, vnode.attrs);
        }
      };
    }
  });
  require_button_remove();
})();
