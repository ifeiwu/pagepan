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

  // assets/admin/js/main.js
  var require_main = __commonJS({
    "assets/admin/js/main.js"() {
      var scrollbarWidth = window.innerWidth - document.body.clientWidth + "px";
      document.documentElement.style.setProperty("--scrollbar-width", scrollbarWidth);
      window.addEventListener("offline", () => toast.warning("\u5F53\u524D\u65E0\u6CD5\u8FDE\u63A5\u7F51\u7EDC"), false);
      document.addEventListener("datastar-fetch", ({ detail }) => {
        let el = detail.el;
        let tagname = el.tagName.toLowerCase();
        if (tagname === "button") {
          if (detail.type === "started") {
            el.setAttribute("disabled", "");
          } else if (detail.type === "finished") {
            el.removeAttribute("disabled");
          }
        } else if (tagname === "a") {
          detail.type === "started" && el.classList.add("ds-fetch-started", el.dataset.loading || "");
          detail.type === "finished" && el.classList.remove("ds-fetch-started");
        } else if (tagname === "form") {
          let submit = Array.from(el.elements).find((e) => e.type === "submit");
          if (!submit || !submit.innerText) return;
          if (detail.type === "started") {
            sessionStorage.setItem("form-submit-text", submit.innerText);
            submit.setAttribute("disabled", true);
            submit.innerText = "\u63D0\u4EA4\u4E2D";
          } else if (detail.type === "finished") {
            submit.removeAttribute("disabled");
            submit.innerText = sessionStorage.getItem("form-submit-text");
          }
        }
      });
      new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          for (const node of mutation.addedNodes) {
            if (node.nodeType !== 1) continue;
            if (node.tagName === "KU-MODAL") {
              node.addEventListener("ku-close", (evt) => {
                let target = evt.target;
                let done = () => {
                  target.replaceWith(Object.assign(document.createElement("template"), { id: target.id }));
                };
                let animations = target.shadowRoot.getAnimations();
                if (animations.length) {
                  Promise.allSettled(animations.map((a) => a.finished)).then(done);
                } else {
                  requestAnimationFrame(done);
                }
              });
            }
          }
        }
      }).observe(document.body, {
        childList: true,
        subtree: true
      });
      __require(["jquery"], function() {
        $(document).ajaxError(function(event, xhr) {
          switch (xhr.status) {
            case 401:
              window.location.href = "/auth/login";
              break;
            default:
              toast.warning(xhr.responseJSON.message);
          }
        });
      });
    }
  });
  require_main();
})();
