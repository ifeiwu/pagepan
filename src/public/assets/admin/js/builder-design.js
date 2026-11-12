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

  // assets/admin/js/builder/rpanel/action/clone.js
  function clone(attrs = {}) {
    let $target = $(attrs.target);
    const $template = $(`
        <li>
            <button class="btn btn-lg btn-icon btn-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy preview-icon"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </button>
        </li>
    `);
    const $apply = $template.find("button");
    $apply.on("click", function(e) {
      e.preventDefault();
      if ($target.is("img")) {
        let $picture = $target.parent("picture");
        if ($picture.length) {
          let $picture2 = $picture.clone();
          $picture2.find("img").removeAttr("data-editable");
          $picture.after($picture2);
        } else {
          let $target2 = $target.clone();
          $target2.removeAttr("data-editable");
          $target.after($target2);
        }
      } else {
        let $li = $target.closest("li");
        if ($li.length) {
          let $li2 = $li.clone(true);
          $li2.removeAttr("data-editable contenteditable");
          $li.after($li2);
        } else {
          let $target2 = $target.clone();
          $target2.removeAttr("data-editable contenteditable");
          $target.after($target2);
        }
      }
    });
    return $template;
  }
  var init_clone = __esm({
    "assets/admin/js/builder/rpanel/action/clone.js"() {
    }
  });

  // assets/admin/js/builder/rpanel/action/remove.js
  function remove(attrs = {}) {
    let $target = $(attrs.target);
    const $template = $(`
        <li>
            <button class="btn btn-lg btn-icon btn-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash preview-icon"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
        </li>
    `);
    const $apply = $template.find("button");
    $apply.on("click", function(e) {
      e.preventDefault();
      if ($target.is("img") && $target.parent().is("picture") || $target.is("video") && $target.parent().is("._video_") || $target.is("audio") && $target.parent().is("._audio_") || $target.is("iframe") && $target.parent().is("._iframe_")) {
        let $parent = $target.parent();
        $target = $parent.parent();
        $parent.remove();
      } else {
        let $target2 = $target.next();
        if ($target2.length === 0) {
          $target2 = $target.prev();
        }
        if ($target2.length === 0) {
          $target2 = $target.parent();
        }
        $target.remove();
        $target = $target2;
      }
      if ($target.children().length === 0 && $target.text().trim() === "") {
        $target.empty();
      }
      $target.trigger("click.target");
    });
    return $template;
  }
  var init_remove = __esm({
    "assets/admin/js/builder/rpanel/action/remove.js"() {
    }
  });

  // assets/admin/js/builder/rpanel/action/removeBlock.js
  function removeBlock(attrs = {}) {
    let $target = $(attrs.target);
    const $template = $(`
        <li>
            <button class="btn btn-lg btn-icon btn-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash preview-icon"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
        </li>
    `);
    const $apply = $template.find("button");
    $apply.on("click", function(e) {
      e.preventDefault();
      const block_id = $target.data("blockId");
      console.log(block_id);
      $.get("/admin/builder/block/delete", { "block_id": block_id }, function(res) {
        if (res.code === 0) {
          $target.remove();
        }
      });
    });
    return $template;
  }
  var init_removeBlock = __esm({
    "assets/admin/js/builder/rpanel/action/removeBlock.js"() {
    }
  });

  // assets/admin/js/builder/rpanel/action/index.js
  var init_action = __esm({
    "assets/admin/js/builder/rpanel/action/index.js"() {
      init_clone();
      init_remove();
      init_removeBlock();
    }
  });

  // assets/admin/js/builder/winbox/finder.js
  function open(url, title, callback) {
    WinBox.stack().forEach((winbox2) => winbox2.close());
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
      oncreate() {
        $(this.body).append('<div class="wb-loading">\u9875\u9762\u52A0\u8F7D\u4E2D...</div>');
      },
      onload() {
        $(window).one("finder.choose-file", function(e, image) {
          image = builder.site.domain3 + image + "?" + Date.now();
          callback(image);
          winbox.close();
        });
      },
      onclose() {
        winbox.setUrl("about:blank");
      }
    });
  }
  var init_finder = __esm({
    "assets/admin/js/builder/winbox/finder.js"() {
    }
  });

  // assets/admin/js/builder/rpanel/group/link/href.js
  function linkHref(attrs = {}) {
    const $target = $(attrs.target);
    const $template = $(`
        <div class="field">
            <label class="label">\u94FE\u63A5\u5730\u5740</label>

            <div class="input-group">
                <textarea class="textarea" placeholder="https://"></textarea>

                <span class="input-group-addon input-group-addon-block-end">
                    <button type="button" name="finder" class="btn btn-xs btn-ghost ml-auto" title="\u9009\u62E9\u6587\u4EF6">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                            <path d="M3.5 2C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V6H8.5C8.22386 6 8 5.77614 8 5.5V2H3.5ZM9 2.70711L11.2929 5H9V2.70711ZM2 2.5C2 1.67157 2.67157 1 3.5 1H8.5C8.63261 1 8.75979 1.05268 8.85355 1.14645L12.8536 5.14645C12.9473 5.24021 13 5.36739 13 5.5V12.5C13 13.3284 12.3284 14 11.5 14H3.5C2.67157 14 2 13.3284 2 12.5V2.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                        </svg>
                    </button>

                    <button type="button" name="remove" class="btn btn-xs btn-ghost" title="\u6E05\u7A7A\u5730\u5740">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                            <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </span>
            </div>
        </div>
    `);
    const $textarea = $template.find("textarea");
    const $finder = $template.find('[name="finder"]');
    const $remove = $template.find('[name="remove"]');
    $textarea.val($target.attr("href") || "");
    $textarea.on("input", function() {
      $target.attr("href", this.value);
    });
    $finder.on("click", function(e) {
      e.preventDefault();
      open(
        "finder/modal?mode=choose&type=",
        "\u9009\u62E9\u6587\u4EF6",
        function(url) {
          $textarea.val(url).trigger("input");
        }
      );
    });
    $remove.on("click", function(e) {
      e.preventDefault();
      $textarea.val("").trigger("input");
    });
    return $template;
  }
  var init_href = __esm({
    "assets/admin/js/builder/rpanel/group/link/href.js"() {
      init_finder();
    }
  });

  // assets/admin/js/builder/rpanel/group/link/target.js
  function linkTarget(attrs = {}) {
    const $target = $(attrs.target);
    const $link = $target.closest("a");
    const $template = $(`
        <div class="field gap-1">
            <label class="label">\u6253\u5F00\u65B9\u5F0F</label>
            <div class="radio-segmented" role="radiogroup" aria-label="\u94FE\u63A5\u6253\u5F00\u65B9\u5F0F">
                <label class="radio-segment">
                    <input type="radio" name="link_target" value="">
                    \u672C\u7A97\u53E3
                </label>
                <label class="radio-segment">
                    <input type="radio" name="link_target" value="_blank">
                    \u65B0\u7A97\u53E3
                </label>
                <label class="radio-segment">
                    <input type="radio" name="link_target" value="_modal">
                    \u5F39\u7A97\u53E3
                </label>
            </div>
        </div>
    `);
    const $radios = $template.find('[name="link_target"]');
    const target = $link.attr("target");
    $radios.filter('[value=""]').prop("checked", !target);
    $radios.filter('[value="_blank"]').prop("checked", target === "_blank");
    $radios.filter('[value="_modal"]').prop("checked", target === "_modal" || $link.is("[data-modal]"));
    $radios.on("change", function() {
      if (!this.checked) return;
      switch (this.value) {
        case "":
          $link.removeAttr("target data-modal");
          break;
        case "_blank":
          $link.attr("target", "_blank").removeAttr("data-modal");
          break;
        case "_modal":
          $link.attr("target", "_modal");
          break;
      }
    });
    return $template;
  }
  var init_target = __esm({
    "assets/admin/js/builder/rpanel/group/link/target.js"() {
    }
  });

  // assets/admin/js/builder/rpanel/group/finder.js
  function finder(attrs = {}) {
    const {
      placeholder = "",
      height,
      name,
      value = "",
      filetype = "",
      update = () => {
      }
    } = attrs;
    const $template = $(`
    	<div class="field gap-1">
            <label class="label"></label>

            <div class="input-group">
                <textarea class="textarea" placeholder="https://"></textarea>

                <span class="input-group-addon input-group-addon-block-end">
                    <button type="button" name="finder" class="btn btn-xs btn-ghost ml-auto" title="\u9009\u62E9\u6587\u4EF6">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                            <path d="M3.5 2C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V6H8.5C8.22386 6 8 5.77614 8 5.5V2H3.5ZM9 2.70711L11.2929 5H9V2.70711ZM2 2.5C2 1.67157 2.67157 1 3.5 1H8.5C8.63261 1 8.75979 1.05268 8.85355 1.14645L12.8536 5.14645C12.9473 5.24021 13 5.36739 13 5.5V12.5C13 13.3284 12.3284 14 11.5 14H3.5C2.67157 14 2 13.3284 2 12.5V2.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                        </svg>
                    </button>

                    <button type="button" name="remove" class="btn btn-xs btn-ghost" title="\u6E05\u7A7A\u5730\u5740">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                            <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </span>
            </div>
        </div>
    `);
    const icons = {
      file: `<svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M3.5 2C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V6H8.5C8.22386 6 8 5.77614 8 5.5V2H3.5ZM9 2.70711L11.2929 5H9V2.70711ZM2 2.5C2 1.67157 2.67157 1 3.5 1H8.5C8.63261 1 8.75979 1.05268 8.85355 1.14645L12.8536 5.14645C12.9473 5.24021 13 5.36739 13 5.5V12.5C13 13.3284 12.3284 14 11.5 14H3.5C2.67157 14 2 13.3284 2 12.5V2.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
      image: `<svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2.5 1H12.5C13.3284 1 14 1.67157 14 2.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V2.5C1 1.67157 1.67157 1 2.5 1ZM2.5 2C2.22386 2 2 2.22386 2 2.5V8.3636L3.6818 6.6818C3.76809 6.59551 3.88572 6.54797 4.00774 6.55007C4.12975 6.55216 4.24568 6.60372 4.32895 6.69293L7.87355 10.4901L10.6818 7.6818C10.8575 7.50607 11.1425 7.50607 11.3182 7.6818L13 9.3636V2.5C13 2.22386 12.7761 2 12.5 2H2.5ZM2 12.5V9.6364L3.98887 7.64753L7.5311 11.4421L8.94113 13H2.5C2.22386 13 2 12.7761 2 12.5ZM12.5 13H10.155L8.48336 11.153L11 8.6364L13 10.6364V12.5C13 12.7761 12.7761 13 12.5 13ZM6.64922 5.5C6.64922 5.03013 7.03013 4.64922 7.5 4.64922C7.96987 4.64922 8.35078 5.03013 8.35078 5.5C8.35078 5.96987 7.96987 6.35078 7.5 6.35078C7.03013 6.35078 6.64922 5.96987 6.64922 5.5ZM7.5 3.74922C6.53307 3.74922 5.74922 4.53307 5.74922 5.5C5.74922 6.46693 6.53307 7.25078 7.5 7.25078C8.46693 7.25078 9.25078 6.46693 9.25078 5.5C9.25078 4.53307 8.46693 3.74922 7.5 3.74922Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
      media: `<svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M4.76447 3.12199C5.63151 3.04859 6.56082 3 7.5 3C8.43918 3 9.36849 3.04859 10.2355 3.12199C11.2796 3.21037 11.9553 3.27008 12.472 3.39203C12.9425 3.50304 13.2048 3.64976 13.4306 3.88086C13.4553 3.90618 13.4902 3.94414 13.5133 3.97092C13.7126 4.20149 13.8435 4.4887 13.918 5.03283C13.9978 5.6156 14 6.37644 14 7.52493C14 8.66026 13.9978 9.41019 13.9181 9.98538C13.8439 10.5206 13.7137 10.8061 13.5125 11.0387C13.4896 11.0651 13.4541 11.1038 13.4296 11.1287C13.2009 11.3625 12.9406 11.5076 12.4818 11.6164C11.9752 11.7365 11.3143 11.7942 10.2878 11.8797C9.41948 11.9521 8.47566 12 7.5 12C6.52434 12 5.58052 11.9521 4.7122 11.8797C3.68572 11.7942 3.02477 11.7365 2.51816 11.6164C2.05936 11.5076 1.7991 11.3625 1.57037 11.1287C1.54593 11.1038 1.51035 11.0651 1.48748 11.0387C1.28628 10.8061 1.15612 10.5206 1.08193 9.98538C1.00221 9.41019 1 8.66026 1 7.52493C1 6.37644 1.00216 5.6156 1.082 5.03283C1.15654 4.4887 1.28744 4.20149 1.48666 3.97092C1.5098 3.94414 1.54468 3.90618 1.56942 3.88086C1.7952 3.64976 2.05752 3.50304 2.52796 3.39203C3.04473 3.27008 3.7204 3.21037 4.76447 3.12199ZM0 7.52493C0 5.28296 0 4.16198 0.729985 3.31713C0.766457 3.27491 0.815139 3.22194 0.854123 3.18204C1.63439 2.38339 2.64963 2.29744 4.68012 2.12555C5.56923 2.05028 6.52724 2 7.5 2C8.47276 2 9.43077 2.05028 10.3199 2.12555C12.3504 2.29744 13.3656 2.38339 14.1459 3.18204C14.1849 3.22194 14.2335 3.27491 14.27 3.31713C15 4.16198 15 5.28296 15 7.52493C15 9.74012 15 10.8477 14.2688 11.6929C14.2326 11.7348 14.1832 11.7885 14.1444 11.8281C13.3629 12.6269 12.3655 12.71 10.3709 12.8763C9.47971 12.9505 8.50782 13 7.5 13C6.49218 13 5.52028 12.9505 4.62915 12.8763C2.63446 12.71 1.63712 12.6269 0.855558 11.8281C0.816844 11.7885 0.767442 11.7348 0.731221 11.6929C0 10.8477 0 9.74012 0 7.52493ZM5.25 5.38264C5.25 5.20225 5.43522 5.08124 5.60041 5.15369L10.428 7.27105C10.6274 7.35853 10.6274 7.64147 10.428 7.72895L5.60041 9.84631C5.43522 9.91876 5.25 9.79775 5.25 9.61736V5.38264Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`
    };
    const $textarea = $template.find("textarea");
    const $finder = $template.find('[name="finder"]');
    const $remove = $template.find('[name="remove"]');
    $finder.html(icons[filetype] || icons.file);
    $template.attr("setting", name);
    $template.find(".label").text(attrs.label || "");
    $textarea.attr({
      placeholder
    }).css("min-height", height).val(value);
    function encodeSVG(data) {
      return data.replace(/"/g, "'").replace(/>\s+</g, "><").replace(/\s{2,}/g, " ");
    }
    $textarea.on("input", function() {
      let content = this.value;
      if (!content.includes("%")) {
        content = encodeSVG(content);
      }
      update(content);
    });
    $finder.on("click", function(e) {
      e.preventDefault();
      open(
        `finder/modal?mode=choose&type=${encodeURIComponent(filetype)}`,
        "\u9009\u62E9\u6587\u4EF6",
        function(file) {
          $textarea.val(file).trigger("input");
        }
      );
    });
    $remove.on("click", function(e) {
      e.preventDefault();
      $textarea.val("").trigger("input");
    });
    return $template;
  }
  var init_finder2 = __esm({
    "assets/admin/js/builder/rpanel/group/finder.js"() {
      init_finder();
    }
  });

  // assets/admin/js/builder/rpanel/picture.js
  function createPicture(target) {
    const $target = $(target);
    const $picture = $target.parent("picture");
    const breakpoints = {
      sm: 560,
      md: 768,
      lg: 1024,
      xl: 1280
    };
    function getSource() {
      const width = window.breakpointWidth;
      return $picture.find("source").filter(function() {
        return ($(this).attr("media") || "").includes(`${width}px`);
      });
    }
    function setPicture(image) {
      const images = {
        sm: "",
        md: "",
        lg: "",
        xl: ""
      };
      $picture.find("source").each(function() {
        const media = $(this).attr("media") || "";
        Object.entries(breakpoints).forEach(([key, width]) => {
          if (media.includes(`${width}px`)) {
            images[key] = $(this).attr("srcset") || "";
          }
        });
      }).remove();
      const breakpoint = window.breakpointSize;
      if (Object.hasOwn(images, breakpoint)) {
        images[breakpoint] = image;
      }
      $picture.find("img").one("load", function() {
        $target.trigger("click");
      });
      Object.entries(breakpoints).forEach(([key, width]) => {
        if (images[key]) {
          $picture.prepend(
            $("<source>", {
              srcset: images[key],
              media: `(min-width: ${width}px)`,
              class: `source-${key}`
            })
          );
        }
      });
      if ($picture.length && breakpoint === "") {
        $picture.find("img").attr({
          src: image,
          srcset: image
        });
      } else if (!$picture.length) {
        $target.attr("src", image);
      }
    }
    function getPicture() {
      const $source = getSource();
      if ($source.length) {
        return $source.attr("srcset");
      }
      return $target.attr("src") || $target.attr("srcset") || "";
    }
    function removePicture() {
      const $source = getSource();
      if ($source.length) {
        $source.remove();
      } else if (window.breakpointSize === "") {
        $target.attr("srcset", EMPTY_IMAGE);
      }
    }
    return {
      setPicture,
      getPicture,
      removePicture
    };
  }
  var EMPTY_IMAGE;
  var init_picture = __esm({
    "assets/admin/js/builder/rpanel/picture.js"() {
      EMPTY_IMAGE = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAYAAAA8AXHiAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAOLSURBVHhe7dzZTuNYGIVRh0GIK8QNN7z/o6Ewj2Ie0v277a4UqiBUzQ7VOWtJVmxTqkTKp+MTx85kOp3OOvhia8MjfClhESEsIoRFhLCIEBYRwiJCWEQIiwhhESEsIoRFhLCIEBYRwiJCWEQIiwhhESEsIoRFhLCIEBYRwiJCWEQIiwhhESEsIoRFhLCIEBYRwiJCWEQIiwhhESEsIoRFhLCIEBYRwiJCWEQIiwhhESEsIoRFhLCIEBYRwiJCWEQIiwhhESEsIoRFhLCIEBYRwiJCWERMptPpbFhfebPZrHt7e+uXZVpbW+uXyWQy7Fl9zYRVUdWyu7vbbW1t9W9ybSeNz/H4+NhdXFz0263E1URYY0B7e3vd+vp6v75sr6+v3fHxcb/eQlxNzLHqTd3Z2fm2qEo9d72Gei0taGbyvr29Pax9nz/hNSyLT4VECIsIYREhLCKERYSwiBAWEcIiQlhECIsIYREhLCKERYSw/oOTk5OlX436fyGs33Rzc9M9PDx0Z2dnwx7mCeudz1yu/Pz83F1eXnabm5v9Zce1zs+ENefl5aU7PDz88CrP+lsdAjc2Nvrtery9ve3u7+/7bf4hrDl1WKs5U4WzyPn5ef84f9163YFTN0vwg7AGFVWNWHVteo1Kp6enw19+qKienp76kOaNd98cHR0NexDW3+pQVhPx8WaLeqy50/X1db9d6lB3d3e38IaMCqvCvLq6Gva0rfmwKoYaid4HU9sVVgVWI1iNaIuiGtXfK6wa1VrXdFg1n6p7/RYFU/sruppz1fpn7gesT4p1GK1gW9Z0WOM5qPdzptE4d6pTEJ+Jqoz/bpzkt6rZsGpUqXlTjVo1uny01KHwV/sXLfV/1pztVx8AWtHELfb1Zu/v7/806tTc6bOj0O+qka5+J2JU2wcHB/+eA1tlzYb1HVoKq/lPhWQ0E9af8JVLS1/7NBHWeH7po+8A0+q56zUsOrWxavzwWtD4HH54bcXVm1ynAmpZJj8VCV/Ep0IihEWEsIgQFhHCIkJYRAiLCGERISwihEWEsIgQFhHCIkJYRAiLCGERISwihEWEsIgQFhHCIkJYRAiLCGERISwihEWEsIgQFhHCIkJYRAiLCGERISwihEWEsIgQFhHCIkJYRAiLCGERISwihEWEsIgQFhHCIkJYRAiLCGERISwihEWEsIgQFhHCIkJYRAiLCGERISwihEWEsIgQFhHCIkJYRAiLCGERISwihEWEsIgQFhHCIkJYRAiLCGERISwihEWEsIgQFhHCIkJYRAiLCGERISwihEWEsIgQFhHCIkJYRAiLCGERISwihEWEsIgQFhHCIkJYRAiLCGER0HV/AXYzeSNz6SCRAAAAAElFTkSuQmCC";
    }
  });

  // assets/admin/js/builder/rpanel/group/img/src.js
  function imgSrc(attrs = {}) {
    const picture = createPicture(attrs.target);
    const image = picture.getPicture();
    return finder({
      label: "\u56FE\u7247\u5730\u5740",
      placeholder: "https://domain/*.png or *.jpg",
      height: "35px",
      value: image,
      filetype: "image",
      update: function(value) {
        if (value) {
          picture.setPicture(value);
        } else {
          picture.removePicture();
          setTimeout(() => {
            $targetel.trigger("click");
          }, 50);
        }
      }
    });
  }
  var init_src = __esm({
    "assets/admin/js/builder/rpanel/group/img/src.js"() {
      init_finder2();
      init_picture();
    }
  });

  // assets/admin/js/builder/rpanel/group/img/href.js
  function imgHref(attrs = {}) {
    const $target = $(attrs.target);
    const $template = $(`
        <div class="field gap-1">
            <label class="label">\u94FE\u63A5\u5730\u5740</label>

            <div class="input-group">
                <textarea class="textarea" placeholder="https://"></textarea>

                <span class="input-group-addon input-group-addon-block-end">
                    <button type="button" name="finder" class="btn btn-xs btn-ghost ml-auto" title="\u9009\u62E9\u6587\u4EF6">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                            <path d="M3.5 2C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V6H8.5C8.22386 6 8 5.77614 8 5.5V2H3.5ZM9 2.70711L11.2929 5H9V2.70711ZM2 2.5C2 1.67157 2.67157 1 3.5 1H8.5C8.63261 1 8.75979 1.05268 8.85355 1.14645L12.8536 5.14645C12.9473 5.24021 13 5.36739 13 5.5V12.5C13 13.3284 12.3284 14 11.5 14H3.5C2.67157 14 2 13.3284 2 12.5V2.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                        </svg>
                    </button>

                    <button type="button" name="remove" class="btn btn-xs btn-ghost" title="\u6E05\u7A7A\u5730\u5740">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                            <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </span>
            </div>
        </div>
    `);
    const $textarea = $template.find("textarea");
    const $finder = $template.find('[name="finder"]');
    const $remove = $template.find('[name="remove"]');
    const getLink = () => $target.parents("a").first();
    const toggleRemoveButton = () => {
      $remove.prop("disabled", !getLink().length);
    };
    $textarea.css("min-height", "35px").val(getLink().attr("href") || "");
    $textarea.on("input", function() {
      let $link = getLink();
      if ($link.length) {
        $link.attr("href", this.value);
      } else if (this.value) {
        const $picture = $target.parents("picture").first();
        if ($picture.length) {
          $picture.wrap($("<a>", { href: this.value }));
        } else {
          $target.wrap($("<a>", { href: this.value }));
        }
      }
      toggleRemoveButton();
    });
    $finder.on("click", function(e) {
      e.preventDefault();
      open(
        "finder/modal?mode=choose&type=",
        "\u9009\u62E9\u6587\u4EF6",
        function(file) {
          $textarea.val(file).trigger("input");
        }
      );
    });
    $remove.on("click", function(e) {
      e.preventDefault();
      $textarea.val("");
      const $picture = $target.parents("picture").first();
      if ($picture.length) {
        $picture.unwrap();
      } else {
        $target.unwrap();
      }
      toggleRemoveButton();
    });
    toggleRemoveButton();
    return $template;
  }
  var init_href2 = __esm({
    "assets/admin/js/builder/rpanel/group/img/href.js"() {
      init_finder();
    }
  });

  // assets/admin/js/builder/winbox/editor.js
  function open2(url, title, value, onSaveCallback, onCloseCallback) {
    WinBox.stack().forEach((winbox2) => winbox2.close());
    let value2 = value;
    let iframe;
    const messageHandler = function(e) {
      if (e.data?.loaded === true && iframe?.contentWindow) {
        iframe.contentWindow.setValue(value2);
      }
    };
    const winbox = new WinBox(title || "\u7F16\u8F91\u5185\u5BB9", {
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
      // 窗口创建后初始化底部工具栏
      oncreate: function() {
        const $body = $(this.body);
        $body.append(`
                <div class="wb-loading">\u9875\u9762\u52A0\u8F7D\u4E2D...</div>
            `);
        const $footbar = $(`
                <div class="wb-footbar">
                    <div>
                        <button type="button" id="save">\u5E94\u7528</button>
                    </div>
                    <div>
                        <button type="button" id="save_close" class="primary">\u5E94\u7528&\u5173\u95ED</button>
                    </div>
                </div>
            `).appendTo($body);
        const $save = $footbar.find("#save");
        const $saveClose = $footbar.find("#save_close");
        $save.on("click", function(e, type) {
          $save.add($saveClose).prop("disabled", true);
          const value3 = iframe.contentWindow.getValue();
          onSaveCallback?.(value3, $save, $saveClose);
          if (type === "close") {
            winbox.close();
          }
        });
        $saveClose.on("click", function() {
          $save.trigger("click", ["close"]);
        });
      },
      // iframe 加载完成后绑定消息监听
      onload: function() {
        iframe = this;
        window.addEventListener("message", messageHandler);
      },
      // 窗口关闭时清理资源
      onclose: function() {
        winbox.setUrl("about:blank");
        window.removeEventListener("message", messageHandler);
        onCloseCallback?.();
      }
    });
    return winbox;
  }
  var init_editor = __esm({
    "assets/admin/js/builder/winbox/editor.js"() {
    }
  });

  // assets/admin/js/builder/rpanel/group/svg/code.js
  function svgCode(attrs = {}) {
    let $target = $(attrs.target);
    const $template = $(`
        <div class="field">
            <button type="button" class="btn w-full">\u7F16\u8F91\u56FE\u6807\u6E90\u7801</button>
        </div>
    `);
    const $apply = $template.find("button");
    $apply.on("click", function(e) {
      e.preventDefault();
      $apply.attr("disabled", true);
      const value = $target[0].outerHTML;
      open2(
        "/admin/builder/winbox/svg-edit",
        "\u7F16\u8F91SVG",
        value,
        // 保存回调：替换当前 SVG 元素
        function(value2, $save, $save_close) {
          const $target2 = $(value2);
          $target.replaceWith($target2);
          $target = $target2;
          const $form = $apply.closest("form");
          $form.find('[name="svg_width"]').val($target.attr("width"));
          $form.find('[name="svg_height"]').val($target.attr("height"));
          $save.attr("disabled", false);
          $save_close.attr("disabled", false);
        },
        // 关闭回调：恢复编辑按钮状态
        function() {
          $apply.attr("disabled", false);
        }
      );
    });
    return $template;
  }
  var init_code = __esm({
    "assets/admin/js/builder/rpanel/group/svg/code.js"() {
      init_editor();
    }
  });

  // assets/admin/js/builder/rpanel/group/svg/height.js
  function svgHeight(attrs = {}) {
    const $target = $(attrs.target);
    const $template = $(`
        <div class="field">
            <div class="input-group">
                <span class="input-group-addon"><span class="input-group-text">\u56FE\u6807\u9AD8\u5EA6</span></span>
                <input type="text" class="input text-right" name="svg_height" placeholder="" value="">
                <span class="input-group-addon input-group-addon-end"><span class="input-group-text">px</span></span>
            </div>
        </div>
    `);
    const $input = $template.find('[name="svg_height"]');
    $input.val($target.attr("height") || "24");
    $input.on("input", function() {
      $target.attr("height", this.value || 24);
    });
    return $template;
  }
  var init_height = __esm({
    "assets/admin/js/builder/rpanel/group/svg/height.js"() {
    }
  });

  // assets/admin/js/builder/rpanel/group/svg/width.js
  function svgWidth(attrs = {}) {
    const $target = $(attrs.target);
    const $template = $(`
        <div class="field">
            <div class="input-group">
                <span class="input-group-addon"><span class="input-group-text">\u56FE\u6807\u5BBD\u5EA6</span></span>
                <input type="text" class="input text-right" name="svg_width" placeholder="" value="">
                <span class="input-group-addon input-group-addon-end"><span class="input-group-text">px</span></span>
            </div>
        </div>
    `);
    const $input = $template.find('[name="svg_width"]');
    $input.val($target.attr("width") || "24");
    $input.on("input", function() {
      $target.attr("width", this.value || 24);
    });
    return $template;
  }
  var init_width = __esm({
    "assets/admin/js/builder/rpanel/group/svg/width.js"() {
    }
  });

  // assets/admin/js/builder/rpanel/group/svg/href.js
  function svgHref(attrs = {}) {
    const $target = $(attrs.target);
    const $template = $(`
        <div class="field">
            <label class="label"></label>

            <div class="input-group">
                <textarea class="textarea" placeholder="https://"></textarea>

                <span class="input-group-addon input-group-addon-block-end">
                    <button type="button" name="finder" class="btn btn-xs btn-ghost ml-auto" title="\u9009\u62E9\u6587\u4EF6">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                            <path d="M3.5 2C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V6H8.5C8.22386 6 8 5.77614 8 5.5V2H3.5ZM9 2.70711L11.2929 5H9V2.70711ZM2 2.5C2 1.67157 2.67157 1 3.5 1H8.5C8.63261 1 8.75979 1.05268 8.85355 1.14645L12.8536 5.14645C12.9473 5.24021 13 5.36739 13 5.5V12.5C13 13.3284 12.3284 14 11.5 14H3.5C2.67157 14 2 13.3284 2 12.5V2.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                        </svg>
                    </button>

                    <button type="button" name="remove" class="btn btn-xs btn-ghost" title="\u6E05\u7A7A\u5730\u5740">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                            <path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
                        </svg>
                    </button>
                </span>
            </div>
        </div>
    `);
    const $textarea = $template.find("textarea");
    const $finder = $template.find('[name="finder"]');
    const $remove = $template.find('[name="remove"]');
    const getLink = () => $target.parents("a").first();
    const toggleRemoveButton = () => {
      $remove.prop("disabled", !getLink().length);
    };
    $textarea.val(getLink().attr("href") || "");
    $textarea.on("input", function() {
      const href = this.value;
      let $link = getLink();
      if ($link.length) {
        $link.attr("href", href);
      } else {
        const target = $target.parents(".field-group").find('[name="link_target"]:checked').val();
        $link = $("<a></a>").attr("href", href);
        if (target === "_blank") {
          $link.attr("target", "_blank");
        } else if (target === "_modal") {
          $link.attr("data-modal", "");
        }
        $target.wrap($link);
      }
      toggleRemoveButton();
    });
    $finder.on("click", function(e) {
      e.preventDefault();
      open(
        "finder/modal?mode=choose&type=",
        "\u9009\u62E9\u6587\u4EF6",
        function(url) {
          $textarea.val(url).trigger("input");
        }
      );
    });
    $remove.on("click", function(e) {
      e.preventDefault();
      $textarea.val("");
      $target.unwrap();
      toggleRemoveButton();
    });
    toggleRemoveButton();
    return $template;
  }
  var init_href3 = __esm({
    "assets/admin/js/builder/rpanel/group/svg/href.js"() {
      init_finder();
    }
  });

  // assets/admin/js/builder/rpanel/group/index.js
  var init_group = __esm({
    "assets/admin/js/builder/rpanel/group/index.js"() {
      init_href();
      init_target();
      init_src();
      init_href2();
      init_code();
      init_height();
      init_width();
      init_href3();
      init_finder2();
    }
  });

  // assets/admin/js/builder/rpanel.js
  var require_rpanel = __commonJS({
    "assets/admin/js/builder/rpanel.js"() {
      var import_pubsub_js = __toESM(require_pubsub());
      init_action();
      init_group();
      $rpanel = $(".pb-rpanel");
      import_pubsub_js.default.subscribe("event.click.block", function(msg, target) {
        $rpanel.find(".card.attributes").empty();
        const $action = $('<ul class="grid grid-cols-6 p-2">');
        $action.append(
          // Action.cloneBlock({target}),
          removeBlock({ target })
        );
        $rpanel.find(">.actions").html($action);
      });
      import_pubsub_js.default.subscribe("event.click.editable", function(msg, target) {
        const $fieldset = $('<div class="field-group">');
        const $action = $('<ul class="grid grid-cols-6 p-2">');
        const tagname = target.tagName.toLocaleUpperCase();
        switch (tagname) {
          case "A":
            $fieldset.append(
              linkHref({ target }),
              linkTarget({ target })
            );
            break;
          case "IMG":
            $fieldset.append(
              imgSrc({ target }),
              imgHref({ target })
            );
            break;
          case "SVG":
            $fieldset.append(
              svgCode({ target }),
              svgHeight({ target }),
              svgWidth({ target }),
              svgHref({ target })
              // Group.linkTarget({ target }),
            );
            break;
        }
        $action.append(
          clone({ target }),
          remove({ target })
        );
        if (!$fieldset.is(":empty")) {
          const $card = $('<div class="card-content">').append($fieldset);
          $rpanel.find(".card.attributes").html($card);
        }
        $rpanel.find(">.actions").html($action);
      });
    }
  });

  // assets/admin/js/builder-design.js
  var require_builder_design = __commonJS({
    "assets/admin/js/builder-design.js"() {
      var import_pubsub_js = __toESM(require_pubsub());
      var import_rpanel = __toESM(require_rpanel());
      var $iframe = $("#iframe");
      $iframe.on("load", function() {
        const $doc = $(this.contentDocument);
        const $body = $doc.find("body").attr("data-mode", "design");
        const editableSelector = "h1,h2,h3,h4,h5,h6,p,a,span,kbd,em,small,big,button,td,th,li,time";
        const clickSelector = "svg,img";
        $body.on("mousedown", "> [data-block-type] *", function(e) {
          e.stopPropagation();
          if (e.button > 0) return;
          const target = e.target;
          const $target = $(target);
          $body.find('[contenteditable="true"]').removeAttr("contenteditable");
          $body.find("[data-editable]").removeAttr("data-editable");
          if ($target.is(editableSelector)) {
            $target.attr("contenteditable", "true");
            import_pubsub_js.default.publish("event.click.contenteditable", target);
          }
          if ($target.is(editableSelector) || $target.is(clickSelector)) {
            $target.attr("data-editable", "");
            import_pubsub_js.default.publish("event.click.editable", target);
          }
        });
        $body.on("click", "[data-editable]", function(e) {
          e.preventDefault();
          e.stopPropagation();
        });
        $body.on("click", "> [data-block-type]", function(e) {
          e.preventDefault();
          e.stopPropagation();
          $body.find("[data-editable]").removeAttr("data-editable");
          $(this).attr("data-editable", "");
          import_pubsub_js.default.publish("event.click.block", this);
        });
        $body.on("click", function() {
          $body.find("[data-editable]").removeAttr("data-editable");
        });
        $body.on("click.target", function(e) {
          e.preventDefault();
          e.stopPropagation();
          const target = e.target;
          const $target = $(target);
          $body.find("[data-editable]").removeAttr("data-editable");
          $target.attr("data-editable", "");
        });
      });
    }
  });
  require_builder_design();
})();
