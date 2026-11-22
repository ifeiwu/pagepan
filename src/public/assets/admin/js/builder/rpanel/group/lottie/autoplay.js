(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // assets/admin/js/builder/rpanel/group/lottie/autoplay.js
  var require_autoplay = __commonJS({
    "assets/admin/js/builder/rpanel/group/lottie/autoplay.js"() {
      RPanel.GroupLottieAutoplay = {
        view: function() {
          return m(".group", [
            m(".label", "\u81EA\u52A8\u64AD\u653E"),
            m(".value", [
              m('input[name="autoplay"][id="autoplay1"][type="radio"][value=""][checked]', {
                oncreate: function(vnode) {
                  vnode.attrs.onupdate(vnode);
                },
                onupdate: function(vnode) {
                  $(vnode.dom).prop("checked", !$targetel.is("[autoplay]"));
                },
                onchange: function() {
                  $targetel.removeAttr("autoplay");
                }
              }),
              m('label[for="autoplay1"]', "\u5426"),
              m('input[name="autoplay"][id="autoplay2"][type="radio"][value="autoplay"]', {
                oncreate: function(vnode) {
                  vnode.attrs.onupdate(vnode);
                },
                onupdate: function(vnode) {
                  $(vnode.dom).prop("checked", $targetel.is("[autoplay]"));
                },
                onchange: function() {
                  $targetel.attr({ "autoplay": "" });
                }
              }),
              m('label[for="autoplay2"]', "\u662F")
            ])
          ]);
        }
      };
    }
  });
  require_autoplay();
})();
