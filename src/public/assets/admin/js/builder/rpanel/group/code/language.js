(() => {
  // assets/admin/js/builder/rpanel/group/code/language.js
  var languages = [
    { value: "", text: "\u81EA\u52A8\u8BC6\u522B" },
    { value: "nohighlight", text: "\u5173\u95ED\u9AD8\u4EAE" },
    { value: "apache", text: "Apache config" },
    { value: "bash", text: "Bash" },
    { value: "c", text: "C" },
    { value: "cpp", text: "C++" },
    { value: "csharp", text: "C#" },
    { value: "css", text: "CSS" },
    { value: "diff", text: "Diff" },
    { value: "dockerfile", text: "Dockerfile" },
    { value: "go", text: "Go" },
    { value: "http", text: "HTTP" },
    { value: "ini", text: "TOML, also INI" },
    { value: "java", text: "Java" },
    { value: "javascript", text: "JavaScript" },
    { value: "json", text: "JSON" },
    { value: "kotlin", text: "Kotlin" },
    { value: "less", text: "Less" },
    { value: "lua", text: "Lua" },
    { value: "makefile", text: "Makefile" },
    { value: "markdown", text: "Markdown" },
    { value: "nginx", text: "Nginx config" },
    { value: "objectivec", text: "Objective-C" },
    { value: "perl", text: "Perl" },
    { value: "pgsql", text: "PostgreSQL and PL/pgSQL" },
    { value: "php", text: "PHP" },
    { value: "php-template", text: "PHP Template" },
    { value: "plaintext", text: "Plain text" },
    { value: "python", text: "Python" },
    { value: "python-repl", text: "Python REPL" },
    { value: "r", text: "R" },
    { value: "ruby", text: "Ruby" },
    { value: "rust", text: "Rust" },
    { value: "scss", text: "SCSS" },
    { value: "shell", text: "Shell Session" },
    { value: "sql", text: "SQL" },
    { value: "swift", text: "Swift" },
    { value: "typescript", text: "TypeScript" },
    { value: "vbnet", text: "Visual Basic .NET" },
    { value: "xml", text: "HTML, XML" },
    { value: "yaml", text: "YAML" }
  ];
  function codeLanguage(attrs = {}) {
    const $target = $(attrs.target);
    const className = $target.attr("class") || "";
    const match = className.match(/(?:^|\s)language-(\S+)/);
    const language = match ? match[1] : /\bnohighlight\b/.test(className) ? "nohighlight" : "";
    const $template = $(`
        <div class="field gap-1">
            <label class="label"></label>
            <select class="select"></select>
        </div>
    `);
    const $select = $template.find("select");
    $template.find(".label").text(attrs.label || "\u8BED\u8A00\u9AD8\u4EAE");
    languages.forEach(function(item) {
      $select.append(
        $("<option>", {
          value: item.value,
          text: item.text
        })
      );
    });
    $select.val(language);
    $select.on("change", function() {
      const language2 = this.value;
      $target.removeClass("nohighlight").removeClass(function(index, className2) {
        return (className2.match(/(^|\s)language-\S+/g) || []).join(" ");
      });
      if (language2 === "nohighlight") {
        $target.addClass("nohighlight");
      } else if (language2) {
        $target.addClass(`language-${language2}`);
      }
    });
    return $template;
  }
})();
