// 生成组件骨架
require(['jquery'], function ($) {
  const tags = 'a,p,li,h1,h2,h3,h4,h5,h6,th,td,div,big,time,span,small,strong,blockquote,summary';
  const excluded = ['SVG', 'IMG'];

  $(tags).each(function () {
    let el = this;
    let $el = $(el);
    const text = $.trim($el.text());

    if (!text || (!['P', 'BLOCKQUOTE'].includes(el.tagName) && $el.children(':not(br)').length)) {
      return;
    }

    // 合并多个 inline 同级元素
    let is_parent = false;

    if ($el.css('display') === 'inline') {
      const $children = $el.parent().children();

      if ($children.length > 1) {
        is_parent = $children.toArray().every(child => {
          if (excluded.includes(child.tagName)) return false;

          const display = $(child).css('display');
          return display !== 'block' && display !== 'inline-block';
        });

        if (is_parent) {
          $el = $el.parent();
          el = $el[0];
        }
      }
    }

    // 排除垂直文字
    if ($el.css('writing-mode').startsWith('vertical-')) {
      return;
    }

    const style = window.getComputedStyle(el);
    const fontSize = style.fontSize;
    let width = $el.width();

    // 按钮直接清空内容
    if ($el.is('[class*="btn-"]:not([class*="btn-link"])')) {
      $el.height($el.height()).html('');
      return;
    }

    // 测量文字尺寸
    const measure = $el.clone()[0];
    measure.textContent = text;

    measure.style.cssText = `
            font-size:${fontSize} !important;
            display:inline-block !important;
            width:auto !important;
            max-width:none !important;
            height:auto !important;
            max-height:none !important;
            line-height:1 !important;
            white-space:nowrap !important;
            position:absolute !important;
            visibility:hidden !important;
            z-index:-1 !important;
            margin:0 !important;
            padding:0 !important;
        `;

    document.body.appendChild(measure);

    const textHeight = $(measure).height() - 4;
    const textWidth = $(measure).width() - 1;

    measure.remove();

    if (is_parent) {
      width = textWidth;
    }

    const color = $el.css('color');
    const rows = width > 0 ? Math.ceil(textWidth / width) : 1;

    $el.empty();

    for (let i = 0; i < rows; i++) {
      const lineWidth = rows > 1
        ? (i === rows - 1 ? (width - 1) / 3 : width - 1)
        : textWidth;

      $el.append(`
                <span style="display:inline-block;width:auto;max-width:100%;border-radius:100px;line-height:0;overflow:hidden;">
                    <span style="display:inline-block;height:${textHeight}px;width:${lineWidth}px;background:${color};border-radius:100px"></span>
                </span>
            `);
    }
  });
});
