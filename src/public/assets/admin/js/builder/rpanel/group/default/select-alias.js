(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // assets/admin/js/builder/rpanel/group/default/select-alias.js
  var require_select_alias = __commonJS({
    "assets/admin/js/builder/rpanel/group/default/select-alias.js"() {
      RPanel.GroupSelectAlias = {
        view: function(vnode) {
          let data = vnode.attrs["data"];
          let name = vnode.attrs["name"];
          let value = vnode.attrs["value"];
          let label = vnode.attrs["label"];
          let uikit_assets = builder.uikit.url + "assets";
          data.forEach(function(item, i) {
            let subdir = item.text ? `/${item.text}` : "";
            let image = uikit_assets + "/" + name.replace(".alias", `${subdir}/${item.value}`).replace(".", "/") + ".webp";
            data[i]["image"] = image;
          });
          let callbacks = {
            onchange: function(value2) {
              let setting = Component.getSetting();
              let prefix = name.replace(".alias", "");
              Object.keys(setting).forEach((key) => {
                if (key.startsWith(prefix + ".gx") || key.startsWith(prefix + ".gy") || key.startsWith(prefix + ".gap-x") || key.startsWith(prefix + ".gap-y") || key.startsWith(prefix + ".row") || key.startsWith(prefix + ".grid-cols")) {
                  delete setting[key];
                }
              });
              Component.setSetting(name, value2);
              Uikit.updateDynamicComponent();
            },
            // 如果组件区域下拉关闭（分类、分页等），则隐藏其它相关表单输入。
            oncreate: function(value2) {
              let prefix = name.replace(".alias", "");
              let $groups = RPanel.$.find(`[setting^="${prefix}."][setting!="${name}"]`);
              if (value2 == "") {
                $groups.addClass("hidden");
              } else {
                $groups.removeClass("hidden");
              }
            }
          };
          return m(RPanel.GroupSelectImage, {
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
  require_select_alias();
})();
