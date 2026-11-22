(() => {
  // assets/admin/js/builder/rpanel/group/code/theme.js
  var codeThemes = [
    { value: "", text: "\u65E0" },
    { value: "default", text: "Default" },
    { value: "github", text: "GitHub" },
    { value: "github-dark", text: "GitHub Dark" },
    { value: "dark", text: "Dark" },
    { value: "vs", text: "VS" },
    { value: "rainbow", text: "Rainbow" },
    { value: "agate", text: "Agate" },
    { value: "androidstudio", text: "Android Studio" },
    { value: "monokai-sublime", text: "Monokai Sublime" },
    { value: "mono-blue", text: "Mono Blue" },
    { value: "base16/zenburn", text: "base16/zenburn" },
    { value: "base16/railscasts", text: "base16/railscasts" },
    { value: "base16/tomorrow", text: "base16/tomorrow" },
    { value: "base16/dracula", text: "base16/dracula" }
  ];
  function codeTheme(attrs = {}) {
    const $target = $(attrs.target);
    const $template = $(`
        <div class="field gap-1">
            <label class="label"></label>
            <select class="select"></select>
        </div>
    `);
    const $select = $template.find("select");
    $template.find(".label").text(attrs.label || "\u8BED\u8A00\u4E3B\u9898");
    codeThemes.forEach(({ value, text }) => {
      $select.append(
        $("<option>", {
          value,
          text
        })
      );
    });
    $select.val($target.attr("theme") || "");
    $select.on("change", function() {
      $target.attr("theme", this.value);
    });
    return $template;
  }
})();
