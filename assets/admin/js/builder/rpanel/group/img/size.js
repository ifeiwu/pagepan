RPanel.GroupImgSize = {
    
    view: function () {
        
        return m('.group', [
            m('.label', '实际尺寸'),
            m('.value', $targetel[0].naturalWidth + ' x ' + $targetel[0].naturalHeight + ' px')
        ])
    }
}