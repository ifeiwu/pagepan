RPanel.GroupLottieSrc = {

    view: function () {
        
        const getValue = function (value) {
            
            return /^(http:|https:)?\/\//.test(value) ? value : builder.site.domain + value;
        }

		let value = getValue($targetel.attr('src'));

		return m(RPanel.GroupFinder, {
			label: 'JSON 地址',
			placeholder: 'https://domain/*.json',
			rows: 3,
			value: value,
			file: 'json',
			update: function (value) {
                
                value = getValue(value);

				$targetel.attr('src', value);
                
                $targetel[0].load(value);
			},
		});
    }
}