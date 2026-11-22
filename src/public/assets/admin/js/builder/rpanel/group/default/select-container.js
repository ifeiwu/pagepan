(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // assets/admin/js/builder/rpanel/group/default/select-container.js
  var require_select_container = __commonJS({
    "assets/admin/js/builder/rpanel/group/default/select-container.js"() {
      RPanel.GroupSelectContainer = {
        view: function(vnode) {
          let label = "\u5BB9\u5668\u5BBD\u5EA6";
          let name = "container.class";
          let data = [
            { value: "container", text: "\u9ED8\u8BA4" },
            { value: "container container-sm", text: "560px" },
            { value: "container container-md", text: "768px" },
            { value: "container container-lg", text: "1024px" },
            { value: "container container-xl", text: "1280px" },
            { value: "container container-2xl", text: "1440px" },
            { value: "container container-3xl", text: "1680px" },
            { value: "container container-fluid", text: "\u6700\u5927" },
            { value: "container-fluid", text: "\u586B\u6EE1" }
          ];
          let values = data.map((item) => item.value);
          let classes = values.slice(1).join(" ");
          let $container = Component.getContainer();
          let value = "";
          for (let v of values) {
            let vs = v.split(" ");
            if (vs.length == 1) {
              if ($container.is(".container-fluid")) {
                value = "container-fluid";
              } else {
                value = "container";
              }
            } else if ($container.is("." + vs.join("."))) {
              value = v;
              break;
            }
          }
          let callbacks = {
            onchange: function(value2) {
              $container.removeClass(classes).addClass(value2);
              if (Component.isDynamic()) {
                Component.setSetting(name, $container.attr("class"));
                Uikit.updateDynamicComponent();
              }
            }
          };
          return m(RPanel.GroupSelectDefault, {
            "label": label,
            "name": name,
            "value": value,
            "data": data,
            "callbacks": callbacks
          });
        }
      };
    }
  });
  require_select_container();
})();
