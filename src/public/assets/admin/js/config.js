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

  // assets/admin/js/config.js
  var require_config = __commonJS({
    "assets/admin/js/config.js"() {
      __require.config({
        baseUrl: "/assets/admin/lib",
        paths: {
          js: "../js",
          app: "../app",
          hugerte: ["https://cdn.jsdmirror.com/npm/hugerte@1/hugerte.min", "hugerte/hugerte"],
          vselect: "vselect/vselect",
          showmore: "show-more/show-more",
          swiper: "swiper/swiper",
          popover: "popover/popover",
          toast: ["toast/toast", "https://cdn.jsdmirror.com/npm/not-a-toast@1.1.5/dist/not-a-toast.umd"],
          winbox: "winbox/winbox",
          FileAPI: "fileapi/FileAPI.html5",
          vs: "./monaco/vs"
        },
        shim: {
          winbox: ["css!winbox"],
          vselect: { exports: "VirtualSelect", deps: ["css!vselect"] },
          showmore: { exports: "ShowMore", deps: ["css!showmore"] },
          swiper: { exports: "Swiper", deps: ["css!swiper"] },
          popover: ["css!popover"],
          toast: ["css!toast", "css!https://cdn.jsdmirror.com/npm/not-a-toast@1.1.5/dist/style"]
        },
        skipDataMain: true,
        waitSeconds: 0,
        urlArgs: appvar.ver
      });
      __require.onError = function(err) {
        console.log("requireType: " + err.requireType);
        if (err.requireType === "timeout") {
          console.log("requireModules: " + err.requireModules);
        }
        throw err;
      };
    }
  });
  require_config();
})();
