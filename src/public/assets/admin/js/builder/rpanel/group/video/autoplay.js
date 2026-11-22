(() => {
  // assets/admin/js/builder/rpanel/group/video/autoplay.js
  function videoAutoplay(attrs = {}) {
    const $target = $(attrs.target).find("video");
    const $template = $(`
        <div class="group">
            <div class="label">\u81EA\u52A8\u64AD\u653E</div>

            <div class="value">
                <input name="target" id="target1" type="radio" value="">
                <label for="target1">\u5426</label>

                <input name="target" id="target2" type="radio" value="autoplay">
                <label for="target2">\u662F</label>
            </div>
        </div>
    `);
    const $radio = $template.find('input[name="target"]');
    $radio.filter('[value=""]').prop("checked", !$target.is("[autoplay]"));
    $radio.filter('[value="autoplay"]').prop("checked", $target.is("[autoplay]"));
    $radio.on("change", function() {
      if (this.value === "autoplay") {
        $target.attr({
          autoplay: true,
          muted: true
        });
      } else {
        $target.removeAttr("autoplay muted");
      }
    });
    return $template;
  }
})();
