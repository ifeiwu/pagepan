(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // assets/admin/js/builder/rpanel/group/lottie/src.js
  var require_src = __commonJS({
    "assets/admin/js/builder/rpanel/group/lottie/src.js"() {
      RPanel.GroupLottieSrc = {
        view: function() {
          const getValue = function(value2) {
            return /^(http:|https:)?\/\//.test(value2) ? value2 : builder.site.domain + value2;
          };
          let value = getValue($targetel.attr("src"));
          return m(RPanel.GroupFinder, {
            label: "JSON \u5730\u5740",
            placeholder: "https://domain/*.json",
            rows: 3,
            value,
            file: "json",
            update: function(value2) {
              value2 = getValue(value2);
              $targetel.attr("src", value2);
              $targetel[0].load(value2);
            }
          });
        }
      };
    }
  });
  require_src();
})();
