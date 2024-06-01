define(function () {

	function getCookie(name) {
        
        var arr = document.cookie.split('; ');
        
        for (var i = 0; i < arr.length; i++) {
            
            var arr1 = arr[i].split('=');
            
            if ( arr1[0] == name ) {
                
                return arr1[1];
            }
        }
        
        return '';
    };

    function setCookie(name, value, day = 7) {
        
        let exp_date = new Date();
        
        exp_date.setDate(exp_date.getDate() + day);
        
        document.cookie = name + '=' + value + '; expires=' + exp_date;
    };
    
    
    return function (lang = '') {

        if ( lang )
        {
            setCookie('i18n-lang', lang);
        }
        else
        {
            lang = getCookie('i18n-lang') || $('html').attr('lang');
            
            lang = lang || navigator.language.toLowerCase();

            // $.removeCookie('i18n-lang');
        }//console.log(navigator.language.toLowerCase())

        $.getJSON('assets/i18n/' + lang + '.json', function(data) {
        
            if ( data )
            {
                $('[data-i18n]').each(function() {
                    
                    $el = $(this);
                    
                    if ( $el.is('img') )
                    {
                        let src = data[$el.data('i18n')];
                        
                        if ( src )
                        {
                            $el.attr('src', src);
                        }
                    }
                    else
                    {
                        $el.html(data[$el.data('i18n')]);
                    }
                });
            }
        });
    };
});