(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // assets/admin/js/dataset.js
  var require_dataset = __commonJS({
    "assets/admin/js/dataset.js"() {
      var winboxs = [];
      __require(["winbox"], function() {
        window.openItemEdit = function(title, url) {
          let winbox = new WinBox(title || " ", {
            url,
            x: "center",
            y: "center",
            maxwidth: 1100,
            minwidth: 800,
            maxheight: "85%",
            autosize: true,
            border: 4,
            background: "#374152",
            overflow: true,
            class: ["no-full"],
            oncreate: function() {
              $(this.body).append('<div class="wb-loading">\u9875\u9762\u52A0\u8F7D\u4E2D...</div>');
            },
            onload: function() {
            },
            onclose: function(force) {
              let winbox_id = this.id;
              let index = winboxs.findIndex((item) => item.id === winbox_id);
              if (index !== -1) {
                winboxs.splice(index, 1);
              }
            }
          });
          if (winboxs.length > 0) {
            let last_winbox = winboxs[winboxs.length - 1];
            winbox.move(last_winbox.x + 30, last_winbox.y + 30);
          }
          winboxs.push(winbox);
        };
        $(document).on("click", ".item-edit", function(e) {
          e.preventDefault();
          const data = $(this).data();
          openItemEdit(data.title, data.url);
        });
      });
    }
  });
  require_dataset();
})();
