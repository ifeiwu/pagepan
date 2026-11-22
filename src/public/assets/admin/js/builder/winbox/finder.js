(() => {
  // assets/admin/js/builder/winbox/finder.js
  function open(url, title, callback) {
    WinBox.stack().forEach((winbox2) => winbox2.close());
    let winbox = new WinBox(title, {
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
      oncreate() {
        $(this.body).append('<div class="wb-loading">\u9875\u9762\u52A0\u8F7D\u4E2D...</div>');
      },
      onload() {
        $(window).one("finder.choose-file", function(e, image) {
          image = builder.site.domain3 + image + "?" + Date.now();
          callback(image);
          winbox.close();
        });
      },
      onclose() {
        winbox.setUrl("about:blank");
      }
    });
  }
})();
