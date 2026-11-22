(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // assets/admin/js/builder/rpanel/group/default/button.js
  var require_button = __commonJS({
    "assets/admin/js/builder/rpanel/group/default/button.js"() {
      RPanel.GroupButton = {
        view: function(vnode) {
          let name = vnode.attrs["name"];
          let text = vnode.attrs["text"];
          let title = vnode.attrs["title"];
          let value = vnode.attrs["value"];
          let onClickCallback = vnode.attrs["onClickCallback"];
          return m(".group", { "setting": name }, [
            m('button[type="button"].btn', {
              "title": title,
              oncreate: function(vnode2) {
              },
              onupdate: function(vnode2) {
              },
              onclick: function() {
                $(this).attr("disabled", true);
                onClickCallback(this);
              }
            }, text)
          ]);
        }
      };
    }
  });
  require_button();
})();
