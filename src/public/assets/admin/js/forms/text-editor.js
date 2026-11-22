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

  // assets/admin/js/forms/text-editor.js
  var require_text_editor = __commonJS({
    "assets/admin/js/forms/text-editor.js"() {
      define(["hugerte"], function() {
        return function(component) {
          document.addEventListener("submit", function() {
            hugerte.triggerSave();
          }, true);
          var defaults = {
            base_url: "/assets/admin/lib/hugerte",
            target: component.querySelector("textarea"),
            skin: "oxide",
            language_url: "/assets/admin/lib/hugerte/zh_CN.js",
            language: "zh_CN",
            menubar: false,
            resize: false,
            statusbar: false,
            placeholder: "\u5728\u8FD9\u91CC\u8F93\u5165\u6587\u5B57",
            content_css: ["/assets/css/prose.css"],
            content_style: "body{padding:10px !important} .mce-content-body::before{left:10px !important}",
            body_class: "prose",
            min_height: 400,
            autoresize_bottom_margin: 0,
            plugins: ["advlist", "link", "autolink", "lists", "image", "axupimgs", "searchreplace", "code", "media", "charmap", "emoticons", "autoresize", "template"],
            toolbar: "template undo redo | bold italic underline strikethrough | forecolor backcolor | lineheight align bullist numlist | link image axupimgs media | charmap emoticons | searchreplace removeformat code",
            toolbar_mode: "sliding",
            // 'floating', 'sliding', 'scrolling', 'wrap'
            toolbar_sticky: true,
            toolbar_sticky_offset: 0,
            link_default_target: "_blank",
            document_base_url: location.origin,
            object_resizing: false,
            media_dimensions: false,
            image_advtab: true,
            image_dimensions: false,
            image_description: true,
            image_title: false,
            image_caption: true,
            // image_class_list,
            relative_urls: false,
            automatic_uploads: true,
            images_reuse_filename: true,
            // images_upload_url: '/upload/hugerte',
            images_upload_handler,
            many_images_upload_handler,
            file_picker_types: "image media",
            file_picker_callback: (callback, value, meta) => {
              const input = document.createElement("input");
              input.setAttribute("type", "file");
              let file_type = "image";
              let file_size_limit = 2;
              if (meta.filetype === "image") {
                input.setAttribute("accept", ".jpg, .jpeg, .webp, .avif, .png, .bmp");
              } else if (meta.filetype === "media") {
                file_type = "video";
                file_size_limit = 100;
                input.setAttribute("accept", ".mp4, .ogv, .webm");
              }
              input.addEventListener("change", (e) => {
                __require(["FileAPI"], function(FileAPI) {
                });
              });
              input.click();
            },
            setup: function(editor) {
              editor.on("keydown", function(e) {
                if (e.ctrlKey && e.key === "Enter") {
                  const node = editor.selection.getNode();
                  const div = editor.dom.getParent(node, "div");
                  if (!div) {
                    return;
                  }
                  e.preventDefault();
                  e.stopPropagation();
                  const p = editor.dom.create("p", {}, "<br>");
                  editor.dom.insertAfter(p, div);
                  editor.selection.setCursorLocation(p, 0);
                }
              });
            }
          };
          function images_upload_handler(blobInfo, success, failure) {
            let file = blobInfo.blob();
            if (file.size > 1024 * 1024 * 2) {
              failure(`${file.name} \u6587\u4EF6\u5927\u5C0F\u8D85\u8FC7 2MB \u9650\u5236\u3002\u53EF\u4EE5\u8003\u8651\u4F7F\u7528Caesium\uFF08https://saerasoft.com/caesium\uFF09\u538B\u7F29\u56FE\u7247\u540E\u518D\u4E0A\u4F20\u3002`);
              return;
            }
            let xhr = new XMLHttpRequest();
            xhr.withCredentials = false;
            xhr.open("POST", defaults.images_upload_url);
            xhr.onload = function() {
              if (xhr.status === 403) {
                failure("HTTP Error: " + xhr.status, { remove: true });
                return;
              }
              if (xhr.status < 200 || xhr.status >= 300) {
                failure("HTTP Error: " + xhr.status);
                return;
              }
              let json = JSON.parse(xhr.responseText);
              if (!json || typeof json.location != "string") {
                failure("Invalid JSON: " + xhr.responseText);
                return;
              }
              success(json.location);
            };
            xhr.onerror = function() {
              failure("Image upload failed due to a XHR Transport error. Code: " + xhr.status);
            };
            let formData = new FormData();
            formData.append("file", file, file.name);
            xhr.send(formData);
          }
          function many_images_upload_handler(blobInfo, success, failure) {
            images_upload_handler(blobInfo, success, failure);
          }
          hugerte.init($.extend(true, {}, defaults, $(component).data("option")));
          $(component).removeClass("invisible");
        };
      });
    }
  });
  require_text_editor();
})();
