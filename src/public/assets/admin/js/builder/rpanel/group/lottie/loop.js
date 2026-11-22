(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // assets/admin/js/builder/rpanel/group/lottie/loop.js
  var require_loop = __commonJS({
    "assets/admin/js/builder/rpanel/group/lottie/loop.js"() {
      RPanel.GroupLottieLoop = {
        view: function() {
          return m(".group", [
            m(".label", "\u5FAA\u73AF\u64AD\u653E"),
            m(".value", [
              m('input[name="loop"][id="loop1"][type="radio"][value=""][checked]', {
                oncreate: function(vnode) {
                  vnode.attrs.onupdate(vnode);
                },
                onupdate: function(vnode) {
                  $(vnode.dom).prop("checked", !$targetel.is("[loop]"));
                },
                onchange: function() {
                  $targetel.removeAttr("loop");
                }
              }),
              m('label[for="loop1"]', "\u5426"),
              m('input[name="loop"][id="loop2"][type="radio"][value="loop"]', {
                oncreate: function(vnode) {
                  vnode.attrs.onupdate(vnode);
                },
                onupdate: function(vnode) {
                  $(vnode.dom).prop("checked", $targetel.is("[loop]"));
                },
                onchange: function() {
                  $targetel.attr({ "loop": "" });
                }
              }),
              m('label[for="loop2"]', "\u662F")
            ])
          ]);
        }
      };
    }
  });
  require_loop();
})();
