(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // assets/admin/js/builder/winbox/iframe.js
  var require_iframe = __commonJS({
    "assets/admin/js/builder/winbox/iframe.js"() {
      var WinboxIframe = /* @__PURE__ */ (function(window2, document2, $) {
        function open(url, title, onLoadCallback = null, onCloseCallback = null) {
          WinBox.stack().forEach((winbox2) => {
            winbox2.close();
          });
          let winbox = new WinBox(title, {
            url,
            x: "center",
            y: "center",
            width: "80%",
            minwidth: "900px",
            maxwidth: "1200px",
            height: "80%",
            border: 6,
            background: "#000",
            overflow: true,
            class: ["no-full", "no-max", "no-min", "footbar"],
            oncreate: function() {
              $(this.body).append('<div class="wb-loading">\u9875\u9762\u52A0\u8F7D\u4E2D...</div>');
            },
            onload: function() {
              if (typeof onLoadCallback === "function") {
                onLoadCallback();
              }
            },
            onclose: function(force) {
              winbox.setUrl("about:blank");
              if (typeof onCloseCallback === "function") {
                onCloseCallback();
              }
            }
          });
        }
        return {
          open
        };
      })(window, document, jQuery);
    }
  });
  require_iframe();
})();
