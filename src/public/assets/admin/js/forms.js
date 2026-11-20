(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
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
      $cUploadImage = $(".c-image-upload");
      $preview = $cUploadImage.find(".preview");
      __require(["FileAPI"], function(FileAPI2) {
        $cUploadImage.on("change", ".fileapi-upload-image", function(evt) {
          let files = FileAPI2.getFiles(evt);
          let $submit = $('button[type="submit"]');
          let $choice = $(evt.currentTarget);
          let $upload = $choice.closest(".c-image-upload");
          let $progress = $upload.find(".c-image-upload-progress");
          let $success = $upload.find(".c-image-upload-success");
          let $input = $upload.find('input[type="hidden"]');
          let option = $upload.data("option");
          let image_name = option.name;
          let image_path = option.path;
          let image_prefix = option.prefix;
          let image_suffix = option.suffix;
          let image_width = option.width;
          let image_height = option.height;
          let image_quality = option.quality;
          let image_convert = option.convert;
          let image_allowed = option.allowed || default_allowed_exts;
          let image_maxsize = option.maxsize || 10;
          let image_isresize = option.isresize;
          let image_isoverwrite = option.isoverwrite;
          let image_path2 = $('input[name="$upload_path"]').val();
          FileAPI2.filterFiles(
            files,
            function(file, info) {
              let ext = mimeToExtMap[file.type];
              let allowed_exts = image_allowed.split(",");
              if (allowed_exts.includes(ext)) {
                if (file.size <= image_maxsize * FileAPI2.MB) {
                  return true;
                } else {
                  UIkit.notification(`\u56FE\u7247 ${file.name} \u5927\u4E8E ${image_maxsize}MB \u4E0D\u80FD\u4E0A\u4F20`, { status: "warning" });
                }
              } else {
                UIkit.notification(`\u53EA\u5141\u8BB8\u4E0A\u4F20\u7684\u56FE\u7247\u683C\u5F0F\uFF1A${allowed_exts.join("\u3001")}`, { status: "warning" });
              }
              return false;
            },
            function(files2, rejected) {
              FileAPI2.readAsDataURL(files2[0], function(evt2) {
                if (evt2.type === "load") {
                  $preview.show().find("img").attr("src", evt2.result);
                } else if (evt2.type === "progress") {
                  var pr = evt2.loaded / evt2.total * 100;
                } else {
                  alert("\u8BFB\u53D6\u56FE\u7247\u5931\u8D25");
                }
              });
              if (files2.length == 0) {
                return false;
              }
              let rdata = {};
              rdata.image_name = image_name ? image_name : "";
              rdata.image_path = image_path2 ? image_path2 : "";
              rdata.image_path = image_path ? image_path : image_path2;
              rdata.image_prefix = image_prefix ? image_prefix : "";
              rdata.image_suffix = image_suffix ? image_suffix : "";
              rdata.image_width = image_width ? image_width : "";
              rdata.image_height = image_height ? image_height : "";
              rdata.image_convert = image_convert || "";
              rdata.image_allowed = image_allowed || "";
              rdata.image_maxsize = image_maxsize || "";
              $progress.removeClass("uk-hidden").val(1);
            }
          );
        });
      });
      $(".c-image-upload").on("click", ".c-image-upload-preview-delete", function() {
        let $upload = $(this).closest(".c-image-upload");
        let $input_name = $upload.find('input[type="hidden"]');
        let $input_file = $upload.find('input[type="file"]');
        let image = $input_name.val();
        if (!/^http(s)?:\/\/.+/i.test(image)) {
          let path = $upload.data("path") ?? $('input[name="$upload_path"]').val();
        }
        $upload.find(".c-image-upload-preview img").attr("src", "");
        $upload.find(".c-image-upload-preview").hide();
        $upload.find(".c-image-upload-area").show();
        $input_name.val("");
        $input_file.val("");
      });
      $(".c-image-upload").show();
      $(".remote-image-link").click(function() {
        let image = window.prompt("\u8BF7\u8F93\u5165\u8FDC\u7A0B\u56FE\u7247\u94FE\u63A5\uFF1A", "https://");
        if (/^http(s)?:\/\/.+/i.test(image)) {
          let $this = $(this);
          let $upload = $this.closest(".c-image-upload");
          $upload.find('input[type="hidden"]').val(image);
          $upload.find(".c-image-upload-preview img").attr("src", image);
          $upload.find(".c-image-upload-area").hide();
          $upload.find(".c-image-upload-preview").show();
        } else if (image !== null) {
          alert("\u65E0\u6548\u56FE\u7247\u94FE\u63A5\u5730\u5740\uFF01");
        }
      });
    }
  });

  // assets/admin/js/forms.js
  var require_forms = __commonJS({
    "assets/admin/js/forms.js"() {
      var import_upload_image = __toESM(require_upload_image());
    }
  });
  require_forms();
})();
