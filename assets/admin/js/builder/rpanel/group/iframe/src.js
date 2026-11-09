RPanel.GroupIframeSrc = {

    view: function () {
    
    	let value = $targetel.find('iframe').attr('src');
    
    	return m(RPanel.GroupFinder, {
    		label: '页面地址',
    		placeholder: 'http://',
    		rows: 4,
    		value: value,
    		file: '',
    		update: function (value) {
    			
    			$targetel.find('iframe').attr('src', value);
    		},
    	});
    }
}