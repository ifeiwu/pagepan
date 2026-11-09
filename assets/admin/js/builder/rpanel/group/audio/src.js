RPanel.GroupAudioSrc = {

    view: function () {
    
    	let value = $targetel.find('audio').attr('src');
    
    	return m(RPanel.GroupFinder, {
    		label: '音频地址',
    		placeholder: 'https://domain/*.mp3',
    		rows: 3,
    		value: value,
    		file: 'media',
    		update: function (value) {
    			$targetel.find('audio').attr('src', value);
    		},
    	});
    }
}