(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // assets/admin/js/builder/rpanel/group/default/color-picker.js
  var require_color_picker = __commonJS({
    "assets/admin/js/builder/rpanel/group/default/color-picker.js"() {
      RPanel.GroupColorPicker = {
        view: function(vnode) {
          let name = vnode.attrs["name"];
          let value = vnode.attrs["value"];
          let label = vnode.attrs["label"];
          value = value ?? "";
          return m(".group", { "setting": name }, [
            m(".label", label),
            m(
              ".value",
              m('button[type="button"].color-picker', {
                oncreate: function(vnode2) {
                  const pickr = $.pb.fn.getColorPickr({
                    el: vnode2.dom,
                    // theme: 'monolith',
                    default: value,
                    components: {
                      preview: false,
                      opacity: true,
                      hue: true,
                      interaction: {
                        hex: true,
                        rgba: true,
                        hsva: false,
                        input: true,
                        cancel: false,
                        clear: true,
                        save: true
                      }
                    }
                  });
                  pickr.on("change", (color) => {
                    $(vnode2.dom).css("background-color", color.toHEXA().toString(0));
                  });
                  pickr.on("save", (color) => {
                    let color_value = color ? color.toHEXA().toString() : "";
                    $(vnode2.dom).css("background-color", color_value);
                    Component.setSetting(name, color_value);
                    Uikit.updateDynamicComponent();
                    pickr.hide();
                  });
                  pickr.on("show", (color) => {
                    $(vnode2.dom).css("background-color", color.toHEXA().toString());
                  });
                  vnode2.attrs.onupdate(vnode2);
                },
                onupdate: function(vnode2) {
                  $(vnode2.dom).css("background-color", value);
                }
              }, "")
            )
          ]);
        }
      };
    }
  });
  require_color_picker();
})();
