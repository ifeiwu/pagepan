RPanel.GroupImgSrc = {
    view: function () {
        let value = $.PFrame.getPicture();
        return m(RPanel.GroupFinder, {
            label: '图片地址',
            placeholder: 'https://domain/*.png or *.jpg',
            rows: 3,
            value: value,
            file: 'image',
            update: function (value) {
                if (value) {
                    $.PFrame.setPicture(value);
                } else {
                    $.PFrame.removePicture();
                    setTimeout(() => {
                        $targetel.trigger('click');
                    }, 50);
                }
            },
        });
    }
}