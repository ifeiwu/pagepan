let winboxs = []; // 记录打开的窗口实例

require(['winbox'], function () {

    window.openItemEdit = function (title, url) {
        let winbox = new WinBox(title || ' ', {
            url: url,
            x: "center",
            y: "center",
            maxwidth: 1100,
            minwidth: 800,
            maxheight: "85%",
            autosize: true,
            border: 4,
            background: "#374152",
            overflow: true,
            class: ["no-full"],
            oncreate: function() {
                $(this.body).append('<div class="wb-loading">页面加载中...</div>')
            },
            onload: function() {
            },
            onclose: function(force){
                let winbox_id = this.id;
                // 关闭窗口从数组中删除实例
                let index = winboxs.findIndex(item => item.id === winbox_id);
                if (index !== -1) {
                    winboxs.splice(index, 1);
                }
            }
        });
        // 新打开窗口的位置应在已经打开窗口中的最后一个窗口位置下移 30 像素。
        if (winboxs.length > 0) {
            let last_winbox = winboxs[winboxs.length - 1];
            winbox.move(last_winbox.x + 30, last_winbox.y + 30);
        }
        // 记录已打开窗口的实例
        winboxs.push(winbox);
    }

    $(document).on('click', '.item-edit', function (e) {
        e.preventDefault();
        const data = $(this).data();
        openItemEdit(data.title, data.url);
    });
});