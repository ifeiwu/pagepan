RPanel.GroupVideoPoster = {
    
    view: function () {

		let value = $targetel.find('video').attr('poster');

		return m(RPanel.GroupFinder, {
			label: '视频封面',
			placeholder: 'https://domain/*.png or *.jpg',
			rows: 3,
			value: value,
			file: 'image',
			update: function (value) {
				
				$targetel.find('video').attr('poster', value);
			},
		});
    }
}