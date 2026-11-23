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

  // assets/admin/js/forms/upload-image.js
  var require_upload_image = __commonJS({
    "assets/admin/js/forms/upload-image.js"() {
      var default_allowed_exts = "jpg,jpeg,png,webp,avif,gif,svg";
      var mimeToExtMap = {
        "image/jpeg": "jpg",
        "image/jpg": "jpg",
        "image/png": "png",
        "image/gif": "gif",
        "image/webp": "webp",
        "image/avif": "avif",
        "image/svg+xml": "svg",
        "image/bmp": "bmp",
        "image/tiff": "tiff",
        "image/x-icon": "ico"
      };
      FileAPI = {
        debug: false,
        // debug mode, see Console
        cors: false,
        // if used CORS, set `true`
        media: false
        // if used WebCam, set `true`
        //  	staticPath: '/assets/js/lib/fileapi/'
      };
      var $components = $(".c-upload-image");
      __require(["FileAPI"], function(FileAPI2) {
        $components.each(function() {
          const $choose = $(this).find(".choose");
          FileAPI2.event.dnd($choose[0], function(over) {
            $choose.closest(".upload").css("backgroundColor", over ? "#ebe6e7" : "");
          }, function(files) {
            if (files.length) {
              upload($choose, files);
            }
          });
        });
        $components.on("change", ".choose", function(evt) {
          upload($(this), FileAPI2.getFiles(evt));
        });
        function upload($choose, files) {
          const $component = $choose.closest(".c-upload-image");
          const $upload = $component.find(".upload");
          const $progressbar = $component.find(".progressbar");
          const $progress = $progressbar.find("progress");
          const $percentage = $progressbar.find(".percentage");
          const $preview = $component.find(".preview");
          const $field_name = $component.find("[data-field-name]");
          const $field_path = $component.find("[data-field-path]");
          const option = $component.data("option");
          const image_allowed = option.allowed || default_allowed_exts;
          const image_maxsize = option.maxsize || 10;
          const dataset_id = $('input[name="dataset_id"]').val();
          const item_id = $('input[name="id"]').val();
          FileAPI2.filterFiles(files, function(file, info) {
            const ext = mimeToExtMap[file.type];
            const allowed_exts = image_allowed.split(",");
            if (allowed_exts.includes(ext)) {
              if (file.size <= image_maxsize * FileAPI2.MB) {
                return true;
              } else {
                alert(`\u56FE\u7247 ${file.name} \u5927\u4E8E ${image_maxsize}MB \u4E0D\u80FD\u4E0A\u4F20`);
              }
            } else {
              alert(`\u53EA\u5141\u8BB8\u4E0A\u4F20\u7684\u56FE\u7247\u683C\u5F0F\uFF1A${allowed_exts.join("\u3001")}`);
            }
            return false;
          }, function(files2, rejected) {
            if (files2.length === 0) {
              return false;
            }
            $progressbar.show();
            $progress.val(0);
            $percentage.text("0%");
            $component.find(".more").hide();
            $preview.find(".delete").hide();
            FileAPI2.readAsDataURL(files2[0], function(evt) {
              if (evt.type === "load") {
                $upload.hide();
                $preview.show().find("img").attr("src", evt.result).addClass("grayscale");
              } else if (evt.type === "progress") {
                var pr = evt.loaded / evt.total * 100;
              } else {
                alert("\u8BFB\u53D6\u56FE\u7247\u5931\u8D25");
              }
            });
            FileAPI2.upload({
              url: "/admin/forms/upload/image",
              data: {
                "item_id": item_id,
                "dataset_id": dataset_id,
                "field_name": $field_name.attr("name"),
                "option": option
              },
              files: {
                "image": files2[0]
              },
              filecomplete: function(err, xhr, file) {
                try {
                  if (xhr.response) {
                    const json = JSON.parse(xhr.response);
                    if (json.code === 0) {
                      const image_name = json.data.name;
                      const image_path = json.data.path;
                      const image_url = `/${image_path}/${image_name}?${(/* @__PURE__ */ new Date()).getTime()}`;
                      $component.find(".preview>img").attr("src", image_url).removeClass("grayscale");
                      $field_name.val(image_name);
                      $field_path.val(image_path);
                    } else {
                      alert(json.message);
                    }
                  }
                } catch (error) {
                  alert(`\u4E0A\u4F20\u56FE\u7247\u5931\u8D25\uFF1A${xhr.response}`);
                }
              },
              complete: function(err, xhr) {
                if (!err) {
                  $preview.find(".delete").show();
                  setTimeout(() => $progressbar.hide(), 500);
                } else {
                  alert(`\u4E0A\u4F20\u56FE\u7247\u5931\u8D25\uFF1A${err}`);
                }
              },
              progress: function(evt, file, xhr, options) {
                let percentage = parseInt(evt.loaded / evt.total * 100);
                $progress.val(percentage);
                $percentage.text(percentage + "%");
              }
            });
          });
        }
      });
      $components.on("click", ".preview>.delete", function() {
        const $component = $(this).closest(".c-upload-image");
        const $field_name = $component.find("[data-field-name]");
        const $field_path = $component.find("[data-field-path]");
        const $input_file = $component.find('input[type="file"]');
        const dataset_id = $('input[name="dataset_id"]').val();
        const item_id = $('input[name="id"]').val();
        const data = {
          "id": item_id,
          "dataset_id": dataset_id,
          "field_name": $field_name.attr("name"),
          "path": $field_path.val(),
          "value": $field_name.val()
        };
        $.get("/admin/forms/upload/delete", data, function(res) {
          if (res.code === 0) {
            $component.find(".preview").hide();
            $component.find(".preview>img").attr("src", "");
            $component.find(".preview>.delete").hide();
            $component.find(".more").show();
            $component.find(".upload").show();
            $field_name.val("");
            $field_path.val("");
            $input_file.val("");
          } else {
            alert(res.message);
          }
        });
      });
      $components.on("click", ".remote-image", function() {
        let image = window.prompt("\u8BF7\u8F93\u5165\u8FDC\u7A0B\u56FE\u7247\u94FE\u63A5\uFF1A", "https://");
        if (/^http(s)?:\/\/.+/i.test(image)) {
          const $this = $(this);
          const $component = $this.closest(".c-upload-image");
          $component.find("[data-field-name]").val(image);
          $component.find("[data-field-path]").val("");
          $component.find(".preview>img").attr("src", image);
          $component.find(".preview>.delete").show();
          $component.find(".upload").hide();
          $component.find(".more").hide();
          $component.find(".preview").show();
        } else if (image !== null) {
          alert("\u65E0\u6548\u56FE\u7247\u94FE\u63A5\u5730\u5740\uFF01");
        }
      });
    }
  });
  require_upload_image();
})();
