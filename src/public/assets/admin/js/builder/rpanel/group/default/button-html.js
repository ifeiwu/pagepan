(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // assets/admin/js/builder/rpanel/group/default/button-html.js
  var require_button_html = __commonJS({
    "assets/admin/js/builder/rpanel/group/default/button-html.js"() {
      RPanel.GroupButtonHtml = {
        view: function(vnode) {
          let name = vnode.attrs["name"];
          function htmlentities_encode(str) {
            let textarea = document.createElement("textarea");
            textarea.innerHTML = str;
            return textarea.innerHTML;
          }
          function htmlentities_decode(str) {
            let textarea = document.createElement("textarea");
            textarea.innerHTML = str;
            return textarea.value;
          }
          function style_url_double_quotes_replace(content) {
            content = content.replace(/(url\(".*?"\))/gi, function(match, p1) {
              return p1.replaceAll('"', "'");
            });
            return content;
          }
          function pre_code_entity_replace(content) {
            content = content.replace(/<pre><code(.*?)>([\s\S]*?)<\/code><\/pre>/gi, function(match, p1, p2) {
              return "<pre><code" + p1 + ">" + htmlentities_encode(p2) + "</code></pre>";
            });
            return content;
          }
          vnode.attrs["updateButtonStatus"] = function(el, value) {
          };
          vnode.attrs["getValueCallback"] = function(value) {
            let $component = Component.getComponent().clone();
            $component.removeAttr("_name contenteditable");
            $component.find("[contenteditable]").removeAttr("contenteditable");
            $component.find("[_name]").removeAttr("_name");
            let content = $component[0].outerHTML;
            content = htmlentities_decode(content);
            content = style_url_double_quotes_replace(content);
            return content;
          };
          vnode.attrs["onClickSaveCallback"] = function(value, $save, $save_close) {
            let $source = $(value);
            let $component = Component.getComponent();
            let $handle = Component.getHandle();
            if ($handle.find("[layout-content]").length == 0) {
              if (!$source.find('>[class*="container"]').length) {
                notyf.warning("\u7EC4\u4EF6\u91CC\u5FC5\u9700\u6709\u5BB9\u5668\u6807\u7B7E\uFF0C\u672C\u6B21\u4FEE\u6539\u5DF2\u64A4\u9500\uFF01");
              } else {
                $component.replaceWith($source);
                Component.toFrameEditable($handle);
                $source.trigger("click");
              }
            }
            $save.attr("disabled", false);
            $save_close.attr("disabled", false);
          };
          return m(RPanel.GroupButtonEditor, vnode.attrs);
        }
      };
    }
  });
  require_button_html();
})();
