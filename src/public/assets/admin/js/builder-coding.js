(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // assets/admin/js/builder-coding.js
  var require_builder_coding = __commonJS({
    "assets/admin/js/builder-coding.js"() {
      var $save = $("#save_code");
      var $editor = $("#editor");
      var $app = $("#app");
      var lastSavedValue = "";
      var readonlyMessage = "";
      var isSaving = false;
      var editor = monaco.editor.create($editor[0], {
        theme: "vs-dark",
        language: "php",
        minimap: { enabled: true },
        stickyScroll: { enabled: false }
      });
      $app[0].addEventListener("sp-resize", () => editor.layout());
      editor.onDidAttemptReadOnlyEdit(() => {
        if (readonlyMessage) alert(readonlyMessage);
      });
      editor.onDidChangeModelContent(() => {
        $save.prop("disabled", isSaving || editor.getValue() === lastSavedValue);
      });
      $.get("/admin/builder/page/blocks-code", { page_id: appvar.page.id }, function(res) {
        if (res.code === 0) {
          lastSavedValue = res.data;
          editor.setValue(lastSavedValue);
          $save.prop("disabled", true);
        } else {
          readonlyMessage = res.message;
          editor.updateOptions({ readOnly: true });
          $save.prop("disabled", true);
          alert(readonlyMessage);
        }
      }).fail(function() {
        readonlyMessage = "\u4EE3\u7801\u52A0\u8F7D\u5931\u8D25\uFF0C\u8BF7\u5237\u65B0\u9875\u9762\u91CD\u8BD5\u3002";
        editor.updateOptions({ readOnly: true });
        $save.prop("disabled", true);
        alert(readonlyMessage);
      });
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, savePageBlocks);
      $save.on("click", savePageBlocks);
      function savePageBlocks() {
        if (isSaving || editor.getValue() === lastSavedValue) return;
        const content = editor.getValue();
        isSaving = true;
        $save.prop("disabled", true);
        $.post("/admin/builder/page/save-blocks", {
          page_id: appvar.page.id,
          content
        }, function(res) {
          if (res.code === 0) {
            lastSavedValue = content;
            iframe.contentWindow.location.reload();
          } else {
            alert(res.message);
          }
        }).fail(function() {
          alert("\u4FDD\u5B58\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002");
        }).always(function() {
          isSaving = false;
          $save.prop("disabled", editor.getValue() === lastSavedValue);
        });
      }
    }
  });
  require_builder_coding();
})();
