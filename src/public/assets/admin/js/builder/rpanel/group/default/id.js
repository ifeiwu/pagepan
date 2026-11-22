(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // assets/admin/js/builder/rpanel/group/default/id.js
  var require_id = __commonJS({
    "assets/admin/js/builder/rpanel/group/default/id.js"() {
      RPanel.GroupId = {
        view: function() {
          return m(".group", [
            m(".label", "\u5143\u7D20 ID"),
            m(
              ".value",
              m('input[type="text"][placeholder=""]', {
                oncreate: function(vnode) {
                  vnode.attrs.onupdate(vnode);
                },
                onupdate: function(vnode) {
                  $(vnode.dom).val($targetel.attr("id"));
                },
                oninput: function() {
                  if (this.value) {
                    $targetel.attr("id", this.value);
                  } else {
                    $targetel.removeAttr("id");
                  }
                  Component.setSetting("component.id", this.value);
                }
              })
            )
          ]);
        }
      };
    }
  });
  require_id();
})();
