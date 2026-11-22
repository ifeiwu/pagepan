(() => {
  // assets/admin/js/builder/rpanel/group/img/ext.js
  function imgExt(attrs = {}) {
    const $target = $(attrs.target);
    const url = $target[0]?.currentSrc || "";
    const match = url.match(/\.(jpg|jpeg|png|gif|webp|svg|bmp)(?:[?#]|$)/i);
    const ext = match ? match[1].toUpperCase() : "\u5176\u5B83";
    const $template = $(`
        <div class="group">
            <div class="label">\u56FE\u7247\u683C\u5F0F</div>
            <div class="value"></div>
        </div>
    `);
    $template.find(".value").text(ext);
    return $template;
  }
})();
