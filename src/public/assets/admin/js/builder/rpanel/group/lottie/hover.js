(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // assets/admin/js/builder/rpanel/group/lottie/hover.js
  var require_hover = __commonJS({
    "assets/admin/js/builder/rpanel/group/lottie/hover.js"() {
      RPanel.GroupLottieHover = {
        view: function() {
          return m(".group", [
            m(".label", "\u60AC\u505C\u52A8\u753B"),
            m(".value", [
              m('input[name="hover"][id="hover1"][type="radio"][value=""][checked]', {
                oncreate: function(vnode) {
                  vnode.attrs.onupdate(vnode);
                },
                onupdate: function(vnode) {
                  $(vnode.dom).prop("checked", !$targetel.is("[hover]"));
                },
                onchange: function() {
                  $targetel.removeAttr("hover");
                }
              }),
              m('label[for="hover1"]', "\u5426"),
              m('input[name="hover"][id="hover2"][type="radio"][value="hover"]', {
                oncreate: function(vnode) {
                  vnode.attrs.onupdate(vnode);
                },
                onupdate: function(vnode) {
                  $(vnode.dom).prop("checked", $targetel.is("[hover]"));
                },
                onchange: function() {
                  $targetel.attr({ "hover": "" });
                }
              }),
              m('label[for="hover2"]', "\u662F")
            ])
          ]);
        }
      };
    }
  });
  require_hover();
})();
