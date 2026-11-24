(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
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
            toolbar_sticky_offset: 64,
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
              alert("\u5B9E\u73B0\u6587\u4EF6\u6D4F\u89C8\u9009\u62E9");
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
          function images_upload_handler(blobInfo, progress) {
            return new Promise((resolve, reject) => {
              const file = blobInfo.blob();
              if (file.size > 1024 * 1024 * 5) {
                failure(`${file.name} \u6587\u4EF6\u5927\u5C0F\u8D85\u8FC7 5MB \u9650\u5236\u3002\u53EF\u4EE5\u8003\u8651\u4F7F\u7528Caesium\uFF08https://saerasoft.com/caesium\uFF09\u538B\u7F29\u56FE\u7247\u540E\u518D\u4E0A\u4F20\u3002`);
                return;
              }
              const xhr = new XMLHttpRequest();
              xhr.withCredentials = false;
              xhr.open("POST", "/admin/forms/upload/text-editor-image");
              xhr.upload.onprogress = (e) => {
                progress(e.loaded / e.total * 100);
              };
              xhr.onload = () => {
                if (xhr.status === 403) {
                  reject({ message: "HTTP Error: " + xhr.status, remove: true });
                  return;
                }
                if (xhr.status < 200 || xhr.status >= 300) {
                  reject("HTTP Error: " + xhr.status);
                  return;
                }
                const json = JSON.parse(xhr.responseText);
                if (!json || typeof json.location != "string") {
                  reject("Invalid JSON: " + xhr.responseText);
                  return;
                }
                resolve(json.location);
              };
              xhr.onerror = () => {
                reject("Image upload failed due to a XHR Transport error. Code: " + xhr.status);
              };
              const dataset_id = $('input[name="dataset_id"]').val();
              const item_id = $('input[name="id"]').val();
              const formData = new FormData();
              formData.append("image", file, file.name);
              formData.append("dataset_id", dataset_id);
              formData.append("item_id", item_id);
              xhr.send(formData);
            });
          }
          function many_images_upload_handler(blobInfo, success, failure2) {
            const progress = (value) => {
            };
            images_upload_handler(blobInfo, progress).then((result) => {
              success(result);
            }).catch((error) => {
              failure2(error);
            });
          }
          hugerte.init($.extend(true, {}, defaults, $(component).data("option")));
          $(component).removeClass("invisible");
        };
      });
    }
  });
  require_text_editor();
})();
