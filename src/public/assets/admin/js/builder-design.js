(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/pubsub-js/src/pubsub.js
  var require_pubsub = __commonJS({
    "node_modules/pubsub-js/src/pubsub.js"(exports, module) {
      (function(root, factory) {
        "use strict";
        var PubSub = {};
        if (root.PubSub) {
          PubSub = root.PubSub;
          console.warn("PubSub already loaded, using existing version");
        } else {
          root.PubSub = PubSub;
          factory(PubSub);
        }
        if (typeof exports === "object") {
          if (module !== void 0 && module.exports) {
            exports = module.exports = PubSub;
          }
          exports.PubSub = PubSub;
          module.exports = exports = PubSub;
        } else if (typeof define === "function" && define.amd) {
          define(function() {
            return PubSub;
          });
        }
      })(typeof window === "object" && window || exports || global, function(PubSub) {
        "use strict";
        var messages = {}, lastUid = -1, ALL_SUBSCRIBING_MSG = "*";
        function hasKeys(obj) {
          var key;
          for (key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
              return true;
            }
          }
          return false;
        }
        function throwException(ex) {
          return function reThrowException() {
            throw ex;
          };
        }
        function callSubscriberWithDelayedExceptions(subscriber, message, data) {
          try {
            subscriber(message, data);
          } catch (ex) {
            setTimeout(throwException(ex), 0);
          }
        }
        function callSubscriberWithImmediateExceptions(subscriber, message, data) {
          subscriber(message, data);
        }
        function deliverMessage(originalMessage, matchedMessage, data, immediateExceptions) {
          var subscribers = messages[matchedMessage], callSubscriber = immediateExceptions ? callSubscriberWithImmediateExceptions : callSubscriberWithDelayedExceptions, s;
          if (!Object.prototype.hasOwnProperty.call(messages, matchedMessage)) {
            return;
          }
          for (s in subscribers) {
            if (Object.prototype.hasOwnProperty.call(subscribers, s)) {
              callSubscriber(subscribers[s], originalMessage, data);
            }
          }
        }
        function createDeliveryFunction(message, data, immediateExceptions) {
          return function deliverNamespaced() {
            var topic = String(message), position = topic.lastIndexOf(".");
            deliverMessage(message, message, data, immediateExceptions);
            while (position !== -1) {
              topic = topic.substr(0, position);
              position = topic.lastIndexOf(".");
              deliverMessage(message, topic, data, immediateExceptions);
            }
            deliverMessage(message, ALL_SUBSCRIBING_MSG, data, immediateExceptions);
          };
        }
        function hasDirectSubscribersFor(message) {
          var topic = String(message), found = Boolean(Object.prototype.hasOwnProperty.call(messages, topic) && hasKeys(messages[topic]));
          return found;
        }
        function messageHasSubscribers(message) {
          var topic = String(message), found = hasDirectSubscribersFor(topic) || hasDirectSubscribersFor(ALL_SUBSCRIBING_MSG), position = topic.lastIndexOf(".");
          while (!found && position !== -1) {
            topic = topic.substr(0, position);
            position = topic.lastIndexOf(".");
            found = hasDirectSubscribersFor(topic);
          }
          return found;
        }
        function publish(message, data, sync, immediateExceptions) {
          message = typeof message === "symbol" ? message.toString() : message;
          var deliver = createDeliveryFunction(message, data, immediateExceptions), hasSubscribers = messageHasSubscribers(message);
          if (!hasSubscribers) {
            return false;
          }
          if (sync === true) {
            deliver();
          } else {
            setTimeout(deliver, 0);
          }
          return true;
        }
        PubSub.publish = function(message, data) {
          return publish(message, data, false, PubSub.immediateExceptions);
        };
        PubSub.publishSync = function(message, data) {
          return publish(message, data, true, PubSub.immediateExceptions);
        };
        PubSub.subscribe = function(message, func) {
          if (typeof func !== "function") {
            return false;
          }
          message = typeof message === "symbol" ? message.toString() : message;
          if (!Object.prototype.hasOwnProperty.call(messages, message)) {
            messages[message] = {};
          }
          var token = "uid_" + String(++lastUid);
          messages[message][token] = func;
          return token;
        };
        PubSub.subscribeAll = function(func) {
          return PubSub.subscribe(ALL_SUBSCRIBING_MSG, func);
        };
        PubSub.subscribeOnce = function(message, func) {
          var token = PubSub.subscribe(message, function() {
            PubSub.unsubscribe(token);
            func.apply(this, arguments);
          });
          return PubSub;
        };
        PubSub.clearAllSubscriptions = function clearAllSubscriptions() {
          messages = {};
        };
        PubSub.clearSubscriptions = function clearSubscriptions(topic) {
          var m;
          for (m in messages) {
            if (Object.prototype.hasOwnProperty.call(messages, m) && m.indexOf(topic) === 0) {
              delete messages[m];
            }
          }
        };
        PubSub.countSubscriptions = function countSubscriptions(topic) {
          var m;
          var token;
          var count = 0;
          for (m in messages) {
            if (Object.prototype.hasOwnProperty.call(messages, m) && m.indexOf(topic) === 0) {
              for (token in messages[m]) {
                count++;
              }
              break;
            }
          }
          return count;
        };
        PubSub.getSubscriptions = function getSubscriptions(topic) {
          var m;
          var list = [];
          for (m in messages) {
            if (Object.prototype.hasOwnProperty.call(messages, m) && m.indexOf(topic) === 0) {
              list.push(m);
            }
          }
          return list;
        };
        PubSub.unsubscribe = function(value) {
          var descendantTopicExists = function(topic) {
            var m2;
            for (m2 in messages) {
              if (Object.prototype.hasOwnProperty.call(messages, m2) && m2.indexOf(topic) === 0) {
                return true;
              }
            }
            return false;
          }, isTopic = typeof value === "string" && (Object.prototype.hasOwnProperty.call(messages, value) || descendantTopicExists(value)), isToken = !isTopic && typeof value === "string", isFunction = typeof value === "function", result = false, m, message, t;
          if (isTopic) {
            PubSub.clearSubscriptions(value);
            return;
          }
          for (m in messages) {
            if (Object.prototype.hasOwnProperty.call(messages, m)) {
              message = messages[m];
              if (isToken && message[value]) {
                delete message[value];
                result = value;
                break;
              }
              if (isFunction) {
                for (t in message) {
                  if (Object.prototype.hasOwnProperty.call(message, t) && message[t] === value) {
                    delete message[t];
                    result = true;
                  }
                }
              }
            }
          }
          return result;
        };
      });
    }
  });

  // assets/admin/js/builder/rpanel/group/link/href.js
  function GroupLinkHref(attrs = {}) {
    const $target = $(attrs.target);
    const $template = $(`
        <div class="field gap-1">
            <label class="label">${attrs.label}</label>
            <div class="input-group">
                <textarea class="textarea" placeholder="https://"></textarea>
                <span class="input-group-addon input-group-addon-block-end">
                <span class="input-group-text">0/280</span>
                <button type="button" name="finder" class="btn btn-xs ml-auto shadow-none" title="\u9009\u62E9\u6587\u4EF6">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M3.5 2C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V6H8.5C8.22386 6 8 5.77614 8 5.5V2H3.5ZM9 2.70711L11.2929 5H9V2.70711ZM2 2.5C2 1.67157 2.67157 1 3.5 1H8.5C8.63261 1 8.75979 1.05268 8.85355 1.14645L12.8536 5.14645C12.9473 5.24021 13 5.36739 13 5.5V12.5C13 13.3284 12.3284 14 11.5 14H3.5C2.67157 14 2 13.3284 2 12.5V2.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                </button>
                <button type="button" name="remove" class="btn btn-xs btn-destructive" title="\u6E05\u7A7A\u5730\u5740">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                </button>
                </span>
            </div>
        </div>
    `);
    const $textarea = $template.find("textarea");
    $textarea.val($target.attr("href"));
    $textarea.on("input", function() {
      $target.attr("href", this.value);
    });
    $template.find('[name="finder"]').on("click", function(e) {
      e.preventDefault();
    });
    $template.find('[name="remove"]').on("click", function(e) {
      e.preventDefault();
      $textarea.val("").trigger("input");
    });
    return $template;
  }
  var init_href = __esm({
    "assets/admin/js/builder/rpanel/group/link/href.js"() {
    }
  });

  // assets/admin/js/builder/rpanel/group/index.js
  var init_group = __esm({
    "assets/admin/js/builder/rpanel/group/index.js"() {
      init_href();
    }
  });

  // assets/admin/js/builder/rpanel.js
  var require_rpanel = __commonJS({
    "assets/admin/js/builder/rpanel.js"() {
      var import_pubsub_js = __toESM(require_pubsub());
      init_group();
      import_pubsub_js.default.subscribe("event.click.contenteditable", function(msg, target) {
        const $fieldset = $('<div class="field-group px-4">');
        $fieldset.append(
          GroupLinkHref({ label: "\u94FE\u63A5\u5730\u5740", target })
        );
        $(".pb-rpanel .scroll").html($fieldset);
      });
    }
  });

  // assets/admin/js/builder-design.js
  var require_builder_design = __commonJS({
    "assets/admin/js/builder-design.js"() {
      var import_pubsub_js = __toESM(require_pubsub());
      var import_rpanel = __toESM(require_rpanel());
      var iframe = document.querySelector("#iframe");
      iframe.addEventListener("load", () => {
        const iframeDoc = iframe.contentDocument;
        const $body = $(iframeDoc).find("body");
        const editableSelector = "h1,h2,h3,h4,h5,h6,p,a,span,kbd,em,small,big,button,td,th,li,time";
        function setEditable(block) {
          $(block).find(editableSelector).addBack(editableSelector).each(function() {
            const $el = $(this);
            $el.closest('[contenteditable="true"]').removeAttr("contenteditable");
            $el.attr("contenteditable", "true");
          });
        }
        iframeDoc.addEventListener("mousedown", (e) => {
          const el = e.target.closest(editableSelector);
          if (!el) return;
          iframeDoc.querySelectorAll('[contenteditable="true"]').forEach((item) => item.removeAttribute("contenteditable"));
          el.setAttribute("contenteditable", "true");
        });
        $body.children("[data-block-type]").each(function() {
          $(this).attr("data-block-mode", "design");
          setEditable(this);
        });
        $body.on("click", '[contenteditable="true"]', function(e) {
          e.stopPropagation();
          console.log("\u70B9\u51FB\u4E86\u53EF\u7F16\u8F91\u5143\u7D20", this);
          $body.children(".active").removeClass("active");
          import_pubsub_js.default.publish("event.click.contenteditable", this);
        });
        $body.on("click", "> [data-block-type]", function(e) {
          e.stopPropagation();
          $body.children(".active").removeClass("active");
          $(this).addClass("active");
        });
        $body.on("click", function() {
          $body.children(".active").removeClass("active");
        });
      });
    }
  });
  require_builder_design();
})();
