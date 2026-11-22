(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // assets/admin/js/builder/rpanel/group/default/select-image.js
  var require_select_image = __commonJS({
    "assets/admin/js/builder/rpanel/group/default/select-image.js"() {
      RPanel.GroupSelectImage = {
        view: function(vnode) {
          let data = vnode.attrs["data"];
          let name = vnode.attrs["name"];
          let value = (vnode.attrs["value"] ?? "").toString();
          let label = vnode.attrs["label"];
          let callbacks = vnode.attrs["callbacks"] ?? {};
          return m(".group", { "setting": name }, [
            m(".label", label),
            m(
              ".value",
              m('select[placeholder="\u672A\u9009\u62E9"][autocomplete="off"]', {
                name,
                oncreate: function(vnode2) {
                  new TomSelect(vnode2.dom, {
                    maxOptions: 1e3,
                    allowEmptyOption: true,
                    controlInput: null,
                    create: false,
                    valueField: "value",
                    searchField: "text",
                    options: data,
                    items: [value],
                    onChange: function(value2) {
                      callbacks.onchange(value2);
                    },
                    render: {
                      option: function(data2, escape) {
                        let value2 = data2.value;
                        if (value2) {
                          return `<div class="image"><img src="${data2.image}" alt="" /></div>`;
                        } else {
                          return `<div>${data2.text}</div>`;
                        }
                      },
                      item: function(data2, escape) {
                        let value2 = data2.value;
                        if (value2) {
                          return `<div class="image"><div><img src="${data2.image}" alt=""></div><div>${value2}</div></div>`;
                        } else {
                          return `<div>${data2.text}</div>`;
                        }
                      }
                    }
                  });
                  if ("toggleOptions" in callbacks) {
                    callbacks.toggleOptions(value);
                  }
                },
                onupdate: function(vnode2) {
                  vnode2.dom.value = value;
                  if ("toggleOptions" in callbacks) {
                    callbacks.toggleOptions(value);
                  }
                }
              })
            )
          ]);
        }
      };
    }
  });
  require_select_image();
})();
