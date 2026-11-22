(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // assets/admin/js/builder/rpanel/group/default/button-table-deltr.js
  var require_button_table_deltr = __commonJS({
    "assets/admin/js/builder/rpanel/group/default/button-table-deltr.js"() {
      RPanel.GroupButtonTableDelTr = {
        view: function(vnode) {
          vnode.attrs["title"] = "\u5220\u9664\u884C";
          vnode.attrs["text"] = m.trust('<svg width="16" height="16" fill="currentColor"><path d="M2.492 4c-.822 0-1.5.677-1.5 1.5v4c0 .823.678 1.5 1.5 1.5h4.551c-.019.166-.05.329-.05.5 0 2.48 2.02 4.5 4.5 4.5 2.479 0 4.5-2.02 4.5-4.5a4.5 4.5 0 00-2-3.738V5.5c0-.823-.678-1.5-1.5-1.5h-10zm0 1h10c.282 0 .5.219.5.5v1.775a4.443 4.443 0 00-1.5-.275C9.541 7 7.89 8.258 7.268 10H2.492a.493.493 0 01-.5-.5v-4c0-.281.219-.5.5-.5zm9 3c1.94 0 3.5 1.561 3.5 3.5s-1.56 3.5-3.5 3.5a3.492 3.492 0 01-3.5-3.5c0-1.939 1.561-3.5 3.5-3.5zm-2.5 3v1h5v-1h-5z"/></svg>');
          vnode.attrs["onClickCallback"] = function(btn) {
            $targetel.closest("tr").remove();
            $(btn).attr("disabled", false);
          };
          return m(RPanel.GroupButton, vnode.attrs);
        }
      };
    }
  });
  require_button_table_deltr();
})();
