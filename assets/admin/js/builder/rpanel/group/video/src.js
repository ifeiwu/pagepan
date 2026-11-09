RPanel.GroupVideoSrc = {
    
    view: function () {

		let value = $targetel.find('video').attr('src');

		return m(RPanel.GroupFinder, {
			label: '视频地址',
			placeholder: 'https://domain/*.mp4',
			rows: 3,
			value: value,
			file: 'media',
			update: function (value) {
				
				$targetel.find('video').attr('src', value);
			},
		});
    }
}