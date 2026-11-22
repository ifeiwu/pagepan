(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // assets/admin/js/builder/rpanel/group/default/select-pages.js
  var require_select_pages = __commonJS({
    "assets/admin/js/builder/rpanel/group/default/select-pages.js"() {
      RPanel.GroupSelectPages = {
        view: function(vnode) {
          let name = vnode.attrs["name"];
          let value = vnode.attrs["value"];
          let _setting = vnode.attrs["_setting"];
          let data = [{ "text": "\u8BF7\u9009\u62E9\u9875\u9762", "value": "" }];
          $.ajax({
            url: "pager/action/pages?type=" + _setting["filter_type"],
            async: false,
            success: function(pages) {
              pages.forEach(function(page) {
                data.push({ "text": page.title, "value": page.alias });
              });
            }
          });
          _setting.data = data;
          return m(RPanel.GroupSelectDynamic, $.extend(_setting, { "name": name, "value": value }));
        }
      };
    }
  });
  require_select_pages();
})();
