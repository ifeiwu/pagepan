(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // assets/admin/js/builder/rpanel/group/default/button-table-addtr.js
  var require_button_table_addtr = __commonJS({
    "assets/admin/js/builder/rpanel/group/default/button-table-addtr.js"() {
      RPanel.GroupButtonTableAddTr = {
        view: function(vnode) {
          vnode.attrs["title"] = "\u5728\u4E0B\u65B9\u63D2\u5165\u884C";
          vnode.attrs["direction"] = "bottom";
          vnode.attrs["text"] = m.trust('<svg width="16" height="16" fill="currentColor"><path d="M2.5 4C1.677 4 1 4.677 1 5.5v4c0 .823.677 1.5 1.5 1.5h4.55c-.018.166-.05.329-.05.5 0 2.48 2.02 4.5 4.5 4.5s4.5-2.02 4.5-4.5a4.5 4.5 0 00-2-3.738V5.5c0-.823-.677-1.5-1.5-1.5h-10zm0 1h10c.281 0 .5.219.5.5v1.775A4.443 4.443 0 0011.5 7c-1.951 0-3.603 1.258-4.225 3H2.5a.493.493 0 01-.5-.5v-4c0-.281.219-.5.5-.5zm9 3c1.939 0 3.5 1.561 3.5 3.5S13.439 15 11.5 15A3.492 3.492 0 018 11.5C8 9.561 9.561 8 11.5 8zM11 9v2H9v1h2v2h1v-2h2v-1h-2V9h-1zM1 12l2.5 2.5L6 12H1z"/></svg>');
          vnode.attrs["onClickCallback"] = function(btn) {
            let $tr = $targetel.closest("tr");
            if (vnode.attrs.direction == "bottom") {
              $tr.after($tr.clone(true));
            } else {
              $tr.before($tr.clone(true));
            }
            $(btn).attr("disabled", false);
          };
          return m(RPanel.GroupButton, vnode.attrs);
        }
      };
    }
  });
  require_button_table_addtr();
})();
