RPanel.GroupImgExt = {
    
    oninit: function(vnode) {
        
        let ext = '其它';
        let url = $targetel[0].currentSrc;
            
        if (/\.(jpg|png|gif|webp|svg|bmp|jpeg)/.test(url.toLowerCase()))
        {
            let start = url.lastIndexOf('.') + 1;
            let end = url.lastIndexOf('?') != -1 ? url.lastIndexOf('?') : url.length;
            
            ext = url.substring(start, end).toUpperCase();
        }
        
        this.data = ext
    },
    view: function () {
        
        return m('.group', [
            m('.label', '图片格式'),
            m('.value', this.data)
        ])
    }
}