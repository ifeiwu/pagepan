(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // assets/admin/js/builder/rpanel/group/default/button-editor.js
  var require_button_editor = __commonJS({
    "assets/admin/js/builder/rpanel/group/default/button-editor.js"() {
      RPanel.GroupButtonEditor = {
        view: function(vnode) {
          let group_class = vnode.attrs["group.class"];
          group_class = group_class ? " " + group_class : "";
          let name = vnode.attrs["name"];
          let text = vnode.attrs["text"];
          let title = vnode.attrs["title"] || text;
          let url = vnode.attrs["url"];
          let getValueCallback = vnode.attrs["getValueCallback"];
          let onClickSaveCallback = vnode.attrs["onClickSaveCallback"];
          let updateButtonStatus = vnode.attrs["updateButtonStatus"];
          let btnel;
          return m(".group" + group_class, { "setting": name }, [
            m('button[type="button"].btn', {
              "title": title,
              oncreate: function(vnode2) {
                btnel = vnode2.dom;
                vnode2.attrs.onupdate();
              },
              onupdate: function() {
                let value = getValueCallback();
                updateButtonStatus(btnel, value);
              },
              onclick: function() {
                let $apply = $(this);
                $apply.attr("disabled", true);
                let value = getValueCallback();
                WinboxEditor.open(
                  url,
                  title,
                  value,
                  function(value2, $save, $save_close) {
                    onClickSaveCallback(value2, $save, $save_close);
                    updateButtonStatus(btnel, value2);
                  },
                  function() {
                    $apply.attr("disabled", false);
                  }
                );
              }
            }, text)
          ]);
        }
      };
    }
  });
  require_button_editor();
})();
