(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // assets/admin/js/builder/rpanel/group/default/style.js
  var require_style = __commonJS({
    "assets/admin/js/builder/rpanel/group/default/style.js"() {
      RPanel.GroupStyle = {
        view: function(vnode) {
          let placeholder = vnode.attrs["placeholder"] || "";
          let rows = vnode.attrs["rows"];
          let name = vnode.attrs["name"];
          let value = vnode.attrs["value"];
          let save_value = value ?? "";
          let attrname = vnode.attrs["attrname"];
          let label = vnode.attrs["label"];
          let update_timeout_id = null;
          let breakpoint = vnode.attrs["breakpoint"] ?? false;
          if (breakpoint == true) {
            attrname = attrname + window.breakpoint;
            label = m.trust(label + '<span class="icon" title="' + window.breakpointText + '">' + window.breakpointIcon + "</span>");
          }
          function css2kv(cssstr) {
            let stylekv = {};
            let styles = cssstr.split(";").filter((style) => style.trim() !== "");
            styles.forEach((style) => {
              const [key, value2] = style.split(":").map((s) => s.trim());
              if (key && value2) {
                stylekv[key] = value2;
              }
            });
            return stylekv;
          }
          function kv2css(stylekv) {
            let cssstr = "";
            for (const [key, value2] of Object.entries(stylekv)) {
              cssstr += `${key}:${value2};`;
            }
            return cssstr.trim();
          }
          return m(".group", { "setting": name }, [
            m(".label", label),
            m(".value", m("textarea", {
              oncreate: function(vnode2) {
                vnode2.attrs.onupdate(vnode2);
              },
              onupdate: function(vnode2) {
                $(vnode2.dom).attr({ "placeholder": placeholder, "rows": rows });
                let stylekv = css2kv(save_value);
                $(vnode2.dom).val(stylekv[attrname]);
              },
              oninput: function() {
                let value2 = this.value;
                let stylekv = css2kv(save_value);
                stylekv[attrname] = value2;
                Component.setSetting(name, kv2css(stylekv));
                clearTimeout(update_timeout_id);
                update_timeout_id = setTimeout(function() {
                  Uikit.updateDynamicComponent();
                }, 1e3);
              }
            }))
          ]);
        }
      };
    }
  });
  require_style();
})();
