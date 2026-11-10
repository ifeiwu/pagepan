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

  // node_modules/winbox/src/js/template.js
  function template_default(tpl) {
    return (tpl || template).cloneNode(true);
  }
  var template;
  var init_template = __esm({
    "node_modules/winbox/src/js/template.js"() {
      template = document.createElement("div");
      template.innerHTML = //'<div class=winbox>' +
      "<div class=wb-header><div class=wb-control><span class=wb-min></span><span class=wb-max></span><span class=wb-full></span><span class=wb-close></span></div><div class=wb-drag><div class=wb-icon></div><div class=wb-title></div></div></div><div class=wb-body></div><div class=wb-n></div><div class=wb-s></div><div class=wb-w></div><div class=wb-e></div><div class=wb-nw></div><div class=wb-ne></div><div class=wb-se></div><div class=wb-sw></div>";
    }
  });

  // node_modules/winbox/src/js/helper.js
  function addListener(node, event, fn, opt) {
    node && node.addEventListener(event, fn, opt || false);
  }
  function removeListener(node, event, fn, opt) {
    node && node.removeEventListener(event, fn, opt || false);
  }
  function preventEvent(event, prevent) {
    event.stopPropagation();
    prevent && /*event.cancelable &&*/
    event.preventDefault();
  }
  function getByClass(root, name) {
    return root.getElementsByClassName(name)[0];
  }
  function addClass(node, classname) {
    node.classList.add(classname);
  }
  function hasClass(node, classname) {
    return node.classList.contains(classname);
  }
  function removeClass(node, classname) {
    node.classList.remove(classname);
  }
  function setStyle(node, style, value) {
    value = "" + value;
    if (node["_s_" + style] !== value) {
      node.style.setProperty(style, value);
      node["_s_" + style] = value;
    }
  }
  function setText(node, value) {
    const textnode = node.firstChild;
    textnode ? textnode.nodeValue = value : node.textContent = value;
  }
  var init_helper = __esm({
    "node_modules/winbox/src/js/helper.js"() {
    }
  });

  // node_modules/winbox/src/js/winbox.js
  function WinBox(params, _title) {
    if (!(this instanceof WinBox)) {
      return new WinBox(params);
    }
    body || setup();
    let id, index, root, tpl, title, icon, mount, html, url, width, height, minwidth, minheight, maxwidth, maxheight, autosize, overflow, x, y, top, left, bottom, right, min, max, hidden, modal, background, border, header, classname, oncreate, onclose, onfocus, onblur, onmove, onresize, onfullscreen, onmaximize, onminimize, onrestore, onhide, onshow, onload;
    if (params) {
      if (_title) {
        title = params;
        params = _title;
      }
      if (typeof params === "string") {
        title = params;
      } else {
        id = params["id"];
        index = params["index"];
        root = params["root"];
        tpl = params["template"];
        title = title || params["title"];
        icon = params["icon"];
        mount = params["mount"];
        html = params["html"];
        url = params["url"];
        width = params["width"];
        height = params["height"];
        minwidth = params["minwidth"];
        minheight = params["minheight"];
        maxwidth = params["maxwidth"];
        maxheight = params["maxheight"];
        autosize = params["autosize"];
        overflow = params["overflow"];
        min = params["min"];
        max = params["max"];
        hidden = params["hidden"];
        modal = params["modal"];
        x = params["x"] || (modal ? "center" : 0);
        y = params["y"] || (modal ? "center" : 0);
        top = params["top"];
        left = params["left"];
        bottom = params["bottom"];
        right = params["right"];
        background = params["background"];
        border = params["border"];
        header = params["header"];
        classname = params["class"];
        oncreate = params["oncreate"];
        onclose = params["onclose"];
        onfocus = params["onfocus"];
        onblur = params["onblur"];
        onmove = params["onmove"];
        onresize = params["onresize"];
        onfullscreen = params["onfullscreen"];
        onmaximize = params["onmaximize"];
        onminimize = params["onminimize"];
        onrestore = params["onrestore"];
        onhide = params["onhide"];
        onshow = params["onshow"];
        onload = params["onload"];
      }
    }
    this.dom = template_default(tpl);
    this.dom.id = this.id = id || "winbox-" + ++id_counter;
    this.dom.className = "winbox" + (classname ? " " + (typeof classname === "string" ? classname : classname.join(" ")) : "") + (modal ? " modal" : "");
    this.dom["winbox"] = this;
    this.window = this.dom;
    this.body = getByClass(this.dom, "wb-body");
    this.header = header || 35;
    stack_win.push(this);
    if (background) {
      this.setBackground(background);
    }
    if (border) {
      setStyle(this.body, "margin", border + (isNaN(border) ? "" : "px"));
    } else {
      border = 0;
    }
    if (header) {
      const node = getByClass(this.dom, "wb-header");
      setStyle(node, "height", header + "px");
      setStyle(node, "line-height", header + "px");
      setStyle(this.body, "top", header + "px");
    }
    if (title) {
      this.setTitle(title);
    }
    if (icon) {
      this.setIcon(icon);
    }
    if (mount) {
      this.mount(mount);
    } else if (html) {
      this.body.innerHTML = html;
    } else if (url) {
      this.setUrl(url, onload);
    }
    top = top ? parse(top, root_h) : 0;
    bottom = bottom ? parse(bottom, root_h) : 0;
    left = left ? parse(left, root_w) : 0;
    right = right ? parse(right, root_w) : 0;
    const viewport_w = root_w - left - right;
    const viewport_h = root_h - top - bottom;
    maxwidth = maxwidth ? parse(maxwidth, viewport_w) : viewport_w;
    maxheight = maxheight ? parse(maxheight, viewport_h) : viewport_h;
    minwidth = minwidth ? parse(minwidth, maxwidth) : 150;
    minheight = minheight ? parse(minheight, maxheight) : this.header;
    if (autosize) {
      (root || body).appendChild(this.body);
      width = Math.max(Math.min(this.body.clientWidth + border * 2 + 1, maxwidth), minwidth);
      height = Math.max(Math.min(this.body.clientHeight + this.header + border + 1, maxheight), minheight);
      this.dom.appendChild(this.body);
    } else {
      width = width ? parse(width, maxwidth) : Math.max(maxwidth / 2, minwidth) | 0;
      height = height ? parse(height, maxheight) : Math.max(maxheight / 2, minheight) | 0;
    }
    x = x ? parse(x, viewport_w, width) : left;
    y = y ? parse(y, viewport_h, height) : top;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.minwidth = minwidth;
    this.minheight = minheight;
    this.maxwidth = maxwidth;
    this.maxheight = maxheight;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.left = left;
    this.index = index;
    this.overflow = overflow;
    this.min = false;
    this.max = false;
    this.full = false;
    this.hidden = false;
    this.focused = false;
    this.onclose = onclose;
    this.onfocus = onfocus;
    this.onblur = onblur;
    this.onmove = onmove;
    this.onresize = onresize;
    this.onfullscreen = onfullscreen;
    this.onmaximize = onmaximize;
    this.onminimize = onminimize;
    this.onrestore = onrestore;
    this.onhide = onhide;
    this.onshow = onshow;
    if (hidden) {
      this.hide();
    } else {
      this.focus();
    }
    if (index || index === 0) {
      this.index = index;
      setStyle(this.dom, "z-index", index);
      if (index > index_counter) index_counter = index;
    }
    if (max) {
      this.maximize();
    } else if (min) {
      this.minimize();
    } else {
      this.resize().move();
    }
    register(this);
    (root || body).appendChild(this.dom);
    oncreate && oncreate.call(this, params);
  }
  function parse(num, base, center) {
    if (typeof num === "string") {
      if (num === "center") {
        num = (base - center) / 2 + 0.5 | 0;
      } else if (num === "right" || num === "bottom") {
        num = base - center;
      } else {
        const value = parseFloat(num);
        const unit = "" + value !== num && num.substring(("" + value).length);
        if (unit === "%") {
          num = base / 100 * value + 0.5 | 0;
        } else {
          num = value;
        }
      }
    }
    return num;
  }
  function setup() {
    body = document.body;
    body[prefix_request = "requestFullscreen"] || body[prefix_request = "msRequestFullscreen"] || body[prefix_request = "webkitRequestFullscreen"] || body[prefix_request = "mozRequestFullscreen"] || (prefix_request = "");
    prefix_exit = prefix_request && prefix_request.replace("request", "exit").replace("mozRequest", "mozCancel").replace("Request", "Exit");
    addListener(window, "resize", function() {
      init();
      update_min_stack();
    });
    addListener(body, "mousedown", function(event) {
      window_clicked = false;
    }, true);
    addListener(body, "mousedown", function(event) {
      if (!window_clicked) {
        const stack_length = stack_win.length;
        if (stack_length) {
          for (let i = stack_length - 1; i >= 0; i--) {
            const last_focus = stack_win[i];
            if (last_focus.focused) {
              last_focus.blur();
              break;
            }
          }
        }
      }
    });
    init();
  }
  function register(self) {
    addWindowListener(self, "drag");
    addWindowListener(self, "n");
    addWindowListener(self, "s");
    addWindowListener(self, "w");
    addWindowListener(self, "e");
    addWindowListener(self, "nw");
    addWindowListener(self, "ne");
    addWindowListener(self, "se");
    addWindowListener(self, "sw");
    addListener(getByClass(self.dom, "wb-min"), "click", function(event) {
      preventEvent(event);
      self.min ? self.restore().focus() : self.minimize();
    });
    addListener(getByClass(self.dom, "wb-max"), "click", function(event) {
      preventEvent(event);
      self.max ? self.restore().focus() : self.maximize().focus();
    });
    if (prefix_request) {
      addListener(getByClass(self.dom, "wb-full"), "click", function(event) {
        preventEvent(event);
        self.fullscreen().focus();
      });
    } else {
      self.addClass("no-full");
    }
    addListener(getByClass(self.dom, "wb-close"), "click", function(event) {
      preventEvent(event);
      self.close() || (self = null);
    });
    addListener(self.dom, "mousedown", function(event) {
      window_clicked = true;
    }, true);
    addListener(self.body, "mousedown", function(event) {
      self.focus();
    }, true);
  }
  function remove_min_stack(self) {
    stack_min.splice(stack_min.indexOf(self), 1);
    update_min_stack();
    self.removeClass("min");
    self.min = false;
    self.dom.title = "";
  }
  function update_min_stack() {
    const length = stack_min.length;
    const splitscreen_index = {};
    const splitscreen_length = {};
    for (let i = 0, self, key; i < length; i++) {
      self = stack_min[i];
      key = self.left + ":" + self.top;
      if (splitscreen_length[key]) {
        splitscreen_length[key]++;
      } else {
        splitscreen_index[key] = 0;
        splitscreen_length[key] = 1;
      }
    }
    for (let i = 0, self, key, width; i < length; i++) {
      self = stack_min[i];
      key = self.left + ":" + self.top;
      width = Math.min((root_w - self.left - self.right) / splitscreen_length[key], 250);
      self.resize(width + 1 | 0, self.header, true).move(self.left + splitscreen_index[key] * width | 0, root_h - self.bottom - self.header, true);
      splitscreen_index[key]++;
    }
  }
  function addWindowListener(self, dir) {
    const node = getByClass(self.dom, "wb-" + dir);
    if (!node) return;
    let touch, x, y;
    let raf_timer, raf_move, raf_resize;
    let dblclick_timer = 0;
    addListener(node, "mousedown", mousedown, eventOptions);
    addListener(node, "touchstart", mousedown, eventOptions);
    function loop() {
      raf_timer = requestAnimationFrame(loop);
      if (raf_resize) {
        self.resize();
        raf_resize = false;
      }
      if (raf_move) {
        self.move();
        raf_move = false;
      }
    }
    function mousedown(event) {
      preventEvent(event, true);
      self.focus();
      if (dir === "drag") {
        if (self.min) {
          self.restore();
          return;
        }
        if (!self.hasClass("no-max")) {
          const now = Date.now();
          const diff = now - dblclick_timer;
          dblclick_timer = now;
          if (diff < 300) {
            self.max ? self.restore() : self.maximize();
            return;
          }
        }
      }
      if (
        /*!self.max &&*/
        !self.min
      ) {
        addClass(body, "wb-lock");
        use_raf && loop();
        if ((touch = event.touches) && (touch = touch[0])) {
          event = touch;
          addListener(window, "touchmove", handler_mousemove, eventOptionsPassive);
          addListener(window, "touchend", handler_mouseup, eventOptionsPassive);
        } else {
          addListener(window, "mousemove", handler_mousemove, eventOptionsPassive);
          addListener(window, "mouseup", handler_mouseup, eventOptionsPassive);
        }
        x = event.pageX;
        y = event.pageY;
      }
    }
    function handler_mousemove(event) {
      preventEvent(event);
      if (touch) {
        event = event.touches[0];
      }
      const pageX = event.pageX;
      const pageY = event.pageY;
      const offsetX = pageX - x;
      const offsetY = pageY - y;
      const old_w = self.width;
      const old_h = self.height;
      const old_x = self.x;
      const old_y = self.y;
      let resize_w, resize_h, move_x, move_y;
      if (dir === "drag") {
        if (self.hasClass("no-move")) return;
        self.x += offsetX;
        self.y += offsetY;
        move_x = move_y = 1;
      } else {
        if (dir === "e" || dir === "se" || dir === "ne") {
          self.width += offsetX;
          resize_w = 1;
        } else if (dir === "w" || dir === "sw" || dir === "nw") {
          self.x += offsetX;
          self.width -= offsetX;
          resize_w = 1;
          move_x = 1;
        }
        if (dir === "s" || dir === "se" || dir === "sw") {
          self.height += offsetY;
          resize_h = 1;
        } else if (dir === "n" || dir === "ne" || dir === "nw") {
          self.y += offsetY;
          self.height -= offsetY;
          resize_h = 1;
          move_y = 1;
        }
      }
      if (resize_w) {
        self.width = Math.max(Math.min(self.width, self.maxwidth, root_w - self.x - self.right), self.minwidth);
        resize_w = self.width !== old_w;
      }
      if (resize_h) {
        self.height = Math.max(Math.min(self.height, self.maxheight, root_h - self.y - self.bottom), self.minheight);
        resize_h = self.height !== old_h;
      }
      if (resize_w || resize_h) {
        use_raf ? raf_resize = true : self.resize();
      }
      if (move_x) {
        if (self.max) {
          self.x = (pageX < root_w / 3 ? self.left : pageX > root_w / 3 * 2 ? root_w - self.width - self.right : root_w / 2 - self.width / 2) + offsetX;
        }
        self.x = Math.max(Math.min(self.x, self.overflow ? root_w - 30 : root_w - self.width - self.right), self.overflow ? 30 - self.width : self.left);
        move_x = self.x !== old_x;
      }
      if (move_y) {
        if (self.max) {
          self.y = self.top + offsetY;
        }
        self.y = Math.max(Math.min(self.y, self.overflow ? root_h - self.header : root_h - self.height - self.bottom), self.top);
        move_y = self.y !== old_y;
      }
      if (move_x || move_y) {
        if (self.max) {
          self.restore();
        }
        use_raf ? raf_move = true : self.move();
      }
      if (resize_w || move_x) {
        x = pageX;
      }
      if (resize_h || move_y) {
        y = pageY;
      }
    }
    function handler_mouseup(event) {
      preventEvent(event);
      removeClass(body, "wb-lock");
      use_raf && cancelAnimationFrame(raf_timer);
      if (touch) {
        removeListener(window, "touchmove", handler_mousemove, eventOptionsPassive);
        removeListener(window, "touchend", handler_mouseup, eventOptionsPassive);
      } else {
        removeListener(window, "mousemove", handler_mousemove, eventOptionsPassive);
        removeListener(window, "mouseup", handler_mouseup, eventOptionsPassive);
      }
    }
  }
  function init() {
    const doc = document.documentElement;
    root_w = doc.clientWidth;
    root_h = doc.clientHeight;
  }
  function focus_next() {
    const stack_length = stack_win.length;
    if (stack_length) {
      for (let i = stack_length - 1; i >= 0; i--) {
        const last_focus = stack_win[i];
        if (!last_focus.min) {
          last_focus.focus();
          break;
        }
      }
    }
  }
  function has_fullscreen() {
    return document["fullscreen"] || document["fullscreenElement"] || document["webkitFullscreenElement"] || document["mozFullScreenElement"];
  }
  function cancel_fullscreen() {
    is_fullscreen.full = false;
    if (has_fullscreen()) {
      document[prefix_exit]();
      return true;
    }
  }
  var use_raf, stack_min, stack_win, eventOptions, eventOptionsPassive, body, id_counter, index_counter, is_fullscreen, prefix_request, prefix_exit, root_w, root_h, window_clicked;
  var init_winbox = __esm({
    "node_modules/winbox/src/js/winbox.js"() {
      init_template();
      init_helper();
      use_raf = false;
      stack_min = [];
      stack_win = [];
      eventOptions = { "capture": true, "passive": false };
      eventOptionsPassive = { "capture": true, "passive": true };
      id_counter = 0;
      index_counter = 10;
      WinBox["new"] = function(params) {
        return new WinBox(params);
      };
      WinBox["stack"] = function() {
        return stack_win;
      };
      WinBox.prototype.mount = function(src) {
        this.unmount();
        src._backstore || (src._backstore = src.parentNode);
        this.body.textContent = "";
        this.body.appendChild(src);
        return this;
      };
      WinBox.prototype.unmount = function(dest) {
        const node = this.body.firstChild;
        if (node) {
          const root = dest || node._backstore;
          root && root.appendChild(node);
          node._backstore = dest;
        }
        return this;
      };
      WinBox.prototype.setTitle = function(title) {
        const node = getByClass(this.dom, "wb-title");
        setText(node, this.title = title);
        return this;
      };
      WinBox.prototype.setIcon = function(src) {
        const img = getByClass(this.dom, "wb-icon");
        setStyle(img, "background-image", "url(" + src + ")");
        setStyle(img, "display", "inline-block");
        return this;
      };
      WinBox.prototype.setBackground = function(background) {
        setStyle(this.dom, "background", background);
        return this;
      };
      WinBox.prototype.setUrl = function(url, onload) {
        const node = this.body.firstChild;
        if (node && node.tagName.toLowerCase() === "iframe") {
          node.src = url;
        } else {
          this.body.innerHTML = '<iframe src="' + url + '"></iframe>';
          onload && (this.body.firstChild.onload = onload);
        }
        return this;
      };
      WinBox.prototype.focus = function(state) {
        if (state === false) {
          return this.blur();
        }
        if (!this.focused) {
          const stack_length = stack_win.length;
          if (stack_length > 1) {
            for (let i = 1; i <= stack_length; i++) {
              const last_focus = stack_win[stack_length - i];
              if (last_focus.focused) {
                last_focus.blur();
                stack_win.push(stack_win.splice(stack_win.indexOf(this), 1)[0]);
                break;
              }
            }
          }
          setStyle(this.dom, "z-index", ++index_counter);
          this.index = index_counter;
          this.addClass("focus");
          this.focused = true;
          this.onfocus && this.onfocus();
        }
        return this;
      };
      WinBox.prototype.blur = function(state) {
        if (state === false) {
          return this.focus();
        }
        if (this.focused) {
          this.removeClass("focus");
          this.focused = false;
          this.onblur && this.onblur();
        }
        return this;
      };
      WinBox.prototype.hide = function(state) {
        if (state === false) {
          return this.show();
        }
        if (!this.hidden) {
          this.onhide && this.onhide();
          this.hidden = true;
          return this.addClass("hide");
        }
      };
      WinBox.prototype.show = function(state) {
        if (state === false) {
          return this.hide();
        }
        if (this.hidden) {
          this.onshow && this.onshow();
          this.hidden = false;
          return this.removeClass("hide");
        }
      };
      WinBox.prototype.minimize = function(state) {
        if (state === false) {
          return this.restore();
        }
        if (is_fullscreen) {
          cancel_fullscreen();
        }
        if (this.max) {
          this.removeClass("max");
          this.max = false;
        }
        if (!this.min) {
          stack_min.push(this);
          update_min_stack();
          this.dom.title = this.title;
          this.addClass("min");
          this.min = true;
          if (this.focused) {
            this.blur();
            focus_next();
          }
          this.onminimize && this.onminimize();
        }
        return this;
      };
      WinBox.prototype.restore = function() {
        if (is_fullscreen) {
          cancel_fullscreen();
        }
        if (this.min) {
          remove_min_stack(this);
          this.resize().move();
          this.onrestore && this.onrestore();
        }
        if (this.max) {
          this.max = false;
          this.removeClass("max").resize().move();
          this.onrestore && this.onrestore();
        }
        return this;
      };
      WinBox.prototype.maximize = function(state) {
        if (state === false) {
          return this.restore();
        }
        if (is_fullscreen) {
          cancel_fullscreen();
        }
        if (this.min) {
          remove_min_stack(this);
        }
        if (!this.max) {
          this.addClass("max").resize(
            root_w - this.left - this.right,
            root_h - this.top - this.bottom,
            true
          ).move(
            this.left,
            this.top,
            true
          );
          this.max = true;
          this.onmaximize && this.onmaximize();
        }
        return this;
      };
      WinBox.prototype.fullscreen = function(state) {
        if (this.min) {
          remove_min_stack(this);
          this.resize().move();
        }
        if (!is_fullscreen || !cancel_fullscreen()) {
          this.body[prefix_request]();
          is_fullscreen = this;
          this.full = true;
          this.onfullscreen && this.onfullscreen();
        } else if (state === false) {
          return this.restore();
        }
        return this;
      };
      WinBox.prototype.close = function(force) {
        if (this.onclose && this.onclose(force)) {
          return true;
        }
        if (this.min) {
          remove_min_stack(this);
        }
        stack_win.splice(stack_win.indexOf(this), 1);
        this.unmount();
        this.dom.remove();
        this.dom.textContent = "";
        this.dom["winbox"] = null;
        this.body = null;
        this.dom = null;
        this.focused && focus_next();
      };
      WinBox.prototype.move = function(x, y, _skip_update) {
        if (!x && x !== 0) {
          x = this.x;
          y = this.y;
        } else if (!_skip_update) {
          this.x = x ? x = parse(x, root_w - this.left - this.right, this.width) : 0;
          this.y = y ? y = parse(y, root_h - this.top - this.bottom, this.height) : 0;
        }
        setStyle(this.dom, "left", x + "px");
        setStyle(this.dom, "top", y + "px");
        this.onmove && this.onmove(x, y);
        return this;
      };
      WinBox.prototype.resize = function(w, h, _skip_update) {
        if (!w && w !== 0) {
          w = this.width;
          h = this.height;
        } else if (!_skip_update) {
          this.width = w ? w = parse(
            w,
            this.maxwidth
            /*- this.left - this.right*/
          ) : 0;
          this.height = h ? h = parse(
            h,
            this.maxheight
            /*- this.top - this.bottom*/
          ) : 0;
          w = Math.max(w, this.minwidth);
          h = Math.max(h, this.minheight);
        }
        setStyle(this.dom, "width", w + "px");
        setStyle(this.dom, "height", h + "px");
        this.onresize && this.onresize(w, h);
        return this;
      };
      WinBox.prototype.addControl = function(control) {
        const classname = control["class"];
        const image = control.image;
        const click = control.click;
        const index = control.index;
        const node = document.createElement("span");
        const icons = getByClass(this.dom, "wb-control");
        const self = this;
        if (classname) node.className = classname;
        if (image) setStyle(node, "background-image", "url(" + image + ")");
        if (click) node.onclick = function(event) {
          click.call(this, event, self);
        };
        icons.insertBefore(node, icons.childNodes[index || 0]);
        return this;
      };
      WinBox.prototype.removeControl = function(control) {
        control = getByClass(this.dom, control);
        control && control.remove();
        return this;
      };
      WinBox.prototype.addClass = function(classname) {
        addClass(this.dom, classname);
        return this;
      };
      WinBox.prototype.removeClass = function(classname) {
        removeClass(this.dom, classname);
        return this;
      };
      WinBox.prototype.hasClass = function(classname) {
        return hasClass(this.dom, classname);
      };
      WinBox.prototype.toggleClass = function(classname) {
        return this.hasClass(classname) ? this.removeClass(classname) : this.addClass(classname);
      };
    }
  });

  // node_modules/winbox/dist/css/winbox.min.css
  var init_winbox_min = __esm({
    "node_modules/winbox/dist/css/winbox.min.css"() {
    }
  });

  // assets/admin/js/builder/winbox/finder.js
  var init_finder = __esm({
    "assets/admin/js/builder/winbox/finder.js"() {
      init_winbox();
      init_winbox_min();
    }
  });

  // assets/admin/js/builder/rpanel/group/link/href.js
  function linkHref(attrs = {}) {
    const $target = $(attrs.target);
    const $template = $(`
        <div class="field gap-1">
            <label class="label">${attrs.label}</label>
            <div class="input-group">
                <textarea class="textarea" placeholder="https://"></textarea>
                <span class="input-group-addon input-group-addon-block-end">
                <button type="button" name="finder" class="btn btn-xs btn-ghost ml-auto" title="\u9009\u62E9\u6587\u4EF6">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M3.5 2C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V6H8.5C8.22386 6 8 5.77614 8 5.5V2H3.5ZM9 2.70711L11.2929 5H9V2.70711ZM2 2.5C2 1.67157 2.67157 1 3.5 1H8.5C8.63261 1 8.75979 1.05268 8.85355 1.14645L12.8536 5.14645C12.9473 5.24021 13 5.36739 13 5.5V12.5C13 13.3284 12.3284 14 11.5 14H3.5C2.67157 14 2 13.3284 2 12.5V2.5Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
                </button>
                <button type="button" name="remove" class="btn btn-xs btn-ghost" title="\u6E05\u7A7A\u5730\u5740">
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
      init_finder();
    }
  });

  // assets/admin/js/builder/rpanel/group/link/target.js
  function linkTarget(attrs) {
    const $target = $(attrs.target);
    const $template = $(`
        <div class="group">
            <div class="label">\u6253\u5F00\u65B9\u5F0F</div>
            <div class="value">
                <input name="link_target" id="target1" type="radio" value="">
                <label for="target1">\u672C\u7A97\u53E3</label>

                <input name="link_target" id="target2" type="radio" value="_blank">
                <label for="target2">\u65B0\u7A97\u53E3</label>

                <input name="link_target" id="target3" type="radio" value="_modal">
                <label for="target3">\u5F39\u7A97\u53E3</label>
            </div>
        </div>
    `);
    const $link = $target.closest("a");
    $template.find("#target1").prop("checked", !$link.attr("target"));
    $template.find("#target2").prop("checked", $link.attr("target") === "_blank");
    $template.find("#target3").prop("checked", $link.is('[data-modal],[target="_modal"]'));
    $template.find('[name="link_target"]').on("change", function() {
      if (this.value === "") {
        $link.removeAttr("target data-modal");
      } else if (this.value === "_blank") {
        $link.attr("target", "_blank").removeAttr("data-modal");
      } else if (this.value === "_modal") {
        $link.attr("target", "_modal");
      }
    });
    return $template;
  }
  var init_target = __esm({
    "assets/admin/js/builder/rpanel/group/link/target.js"() {
    }
  });

  // assets/admin/js/builder/rpanel/group/index.js
  var init_group = __esm({
    "assets/admin/js/builder/rpanel/group/index.js"() {
      init_href();
      init_target();
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
          linkHref({ label: "\u94FE\u63A5\u5730\u5740", target }),
          linkTarget({ target })
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
      var $iframe = $("#iframe");
      $iframe.on("load", function() {
        const $doc = $(this.contentDocument);
        const $body = $doc.find("body").attr("data-mode", "design");
        const editableSelector = "h1,h2,h3,h4,h5,h6,p,a,span,kbd,em,small,big,button,td,th,li,time";
        $doc.on("mousedown", function(e) {
          if (e.button > 0) return;
          const $el = $(e.target).closest(editableSelector);
          if (!$el.length) return;
          $body.find('[contenteditable="true"]').removeAttr("contenteditable");
          $el.attr("contenteditable", "true");
        });
        $body.on("click", '[contenteditable="true"]', function(e) {
          e.preventDefault();
          e.stopPropagation();
          $body.find(".pb-editable").removeClass("pb-editable");
          $(this).addClass("pb-editable");
          import_pubsub_js.default.publish("event.click.contenteditable", this);
        });
        $body.on("click", "> [data-block-type]", function(e) {
          e.preventDefault();
          e.stopPropagation();
          $body.find(".pb-editable").removeClass("pb-editable");
          $(this).addClass("pb-editable");
          import_pubsub_js.default.publish("event.click.block", this);
        });
        $body.on("click", function() {
          $body.find(".pb-editable").removeClass("pb-editable");
        });
      });
    }
  });
  require_builder_design();
})();
