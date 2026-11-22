(() => {
  // assets/admin/js/builder/rpanel/group/img/size.js
  function ImgSize(attrs = {}) {
    const $target = $(attrs.target);
    const img = $target[0];
    const $template = $(`
        <div class="group">
            <div class="label">\u5B9E\u9645\u5C3A\u5BF8</div>
            <div class="value"></div>
        </div>
    `);
    $template.find(".value").text(
      `${img.naturalWidth} x ${img.naturalHeight} px`
    );
    return $template;
  }
})();
