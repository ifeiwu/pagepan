(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // assets/admin/js/builder/rpanel/group/lottie/controls.js
  var require_controls = __commonJS({
    "assets/admin/js/builder/rpanel/group/lottie/controls.js"() {
      RPanel.GroupLottieControls = {
        view: function() {
          return m(".group", [
            m(".label", "\u52A8\u753B\u63A7\u5236"),
            m(".value", [
              m('input[name="controls"][id="controls1"][type="radio"][value=""][checked]', {
                oncreate: function(vnode) {
                  vnode.attrs.onupdate(vnode);
                },
                onupdate: function(vnode) {
                  $(vnode.dom).prop("checked", !$targetel.is("[controls]"));
                },
                onchange: function() {
                  $targetel.removeAttr("controls");
                }
              }),
              m('label[for="controls1"]', "\u5426"),
              m('input[name="controls"][id="controls2"][type="radio"][value="controls"]', {
                oncreate: function(vnode) {
                  vnode.attrs.onupdate(vnode);
                },
                onupdate: function(vnode) {
                  $(vnode.dom).prop("checked", $targetel.is("[controls]"));
                },
                onchange: function() {
                  $targetel.attr({ "controls": "" });
                }
              }),
              m('label[for="controls2"]', "\u662F")
            ])
          ]);
        }
      };
    }
  });
  require_controls();
})();
