RPanel.GroupButtonSize = {
    
    view: function (vnode) {

		let data = [];
		
		data.push({value: '', text: '默认'});
		data.push({value: 'btn-1', text: '1'});
		data.push({value: 'btn-2', text: '2'});
		data.push({value: 'btn-3', text: '3'});
		data.push({value: 'btn-4', text: '4'});
		data.push({value: 'btn-5', text: '5'});
		
		let label = '按钮大小';

		if ( window.breakpointWidth )
		{
            m.trust(label + '<span class="icon" title="' + window.breakpointText + '">' + window.breakpointIcon + '</span>');
		}
		
        return m('.group', [
            m('.label', label),
            m('.value', [
                m('select[name="btnsize"][id="btnsize"]', {
                    oncreate: function (vnode) {
						
                        vnode.attrs.onupdate(vnode);
                    },
                    onupdate: function (vnode) {
    
                        if ( ! $targetel.is('.btn') )
                        {
                            $(vnode.dom).parents('.group').hide();
                            
                            return;
                        }
                        else
                        {
                            $(vnode.dom).parents('.group').show();
                        }

						$.each(vnode.children, function (i, o) {
							
							let value = o.attrs.value;

							if ( value && $targetel.is('.' + value + window.breakpoint) )
							{
								vnode.dom.value = value;
								
								return false;
							}
							
							vnode.dom.value = '';
						});
                    },
                    onchange: function (e) {

                        $(e.target).find('option').each(function () {
							
                            $targetel.removeClass($(this).val() + window.breakpoint);
                        });
                        
						if ( this.value )
						{
							$targetel.addClass(this.value + window.breakpoint);
						}
                    }
                }, data.map(function (option, index) {

                    return m('option', {
                        value: option.value
                    }, option.text)
                }))
            ])
        ])
    }
}