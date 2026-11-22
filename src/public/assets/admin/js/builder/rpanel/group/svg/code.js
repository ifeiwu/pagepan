(() => {
  // assets/admin/js/builder/winbox/editor.js
  function open(url, title, value, onSaveCallback, onCloseCallback) {
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
      open(
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
})();
