/****************
 *
 * Auto Loading of Content (ALC)
 *
 * Author Moool13
 * Copyright by Moool13, 2012
 * v2.0:30.12.12 (v1.0:30.09.12)
 *
 ***************/



(function($)
{
    jQuery.ALC = jQuery.alc = function(opt)
    {
        ALC_opt = $.extend(
        {
            id: '#alc',
            overlay: true,
            rev: '<input type="button" value="Show more materials..">'
        }
        , opt);
        ALC = {
            get: 1,
            current_page: $('.swchItemA').text() * 1,
            max_page: $('a.swchItem:last').prev().text() * 1,
            url: document.location.pathname.match(/(\/[a-z]*[^\/]?)\/?([0-9]*)-?([0-9]*)-?([0-9]*)/i),
            full_url: '',
            addition: '',
            info_url: '',
            pag: ''
        }
        ALC.info_url = ALC.url[1].match(/(\/$|\/news|\/blog)/i) != null;
        ALC.full_url = ALC.info_url ?
            ALC.url[0].replace(/(\/$|\/news|\/blog)\/?([0-9]*)-?([0-9]*)-?([0-9]*)/i, ALC_replace_url) :
            ALC.url[1] + '/' + (ALC.url[2] === '' ? '0' : ALC.url[2]) + '-';
        ALC.pag = $(ALC.info_url ? '.swchItemA' : '.swchItemA1').parent();
        ($(document).height() <= $(window).height()) ? ALC_rev() : ALC.pag.hide();
        function ALC_replace_url(s0, s1, s2, s3, s4)
        {
            (s3 && s4) ? ALC.addition = '-' + s3 + '-' + s4 : '';
            return (s1 == '/') ? s1 + 'news/' : s1 + '/';
        }
        function ALC_ajax()
        {
            ALC.current_page++;
            $.ajax(
            {
                type: 'GET',
                url: ALC.full_url + ALC.current_page + ALC.addition,
                beforeSend: function()
                {
                    ALC.get = 0;
                    if(ALC_opt.overlay)
                    {
                        $('#myGrid').show().children('div').css(
                        {
                            display: 'block',
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            'z-index': 999999,
                            background: 'rgba(0,0,0,0.5)',
                            height: '100%',
                            width: '100%'
                        }).show();
                    }
                },
                success: function(data)
                {
                    $(ALC_opt.id).append($(ALC_opt.id, data).html());
                    ALC.get = 1;
                    ALC_opt.overlay ? $('#myGrid').hide() : '';
                    ($(document).height() <= $(window).height()) && (ALC.current_page < ALC.max_page) ? ALC_rev() :
                        ALC.info_url ? $('.swchItemA').parent().hide() : ALC.pag.hide();
                },
                error: function()
                {
                    ALC.current_page--;
                    ALC.get = 1;
                    ALC_opt.overlay ? $('#myGrid').hide() : '';
                }
            });
        }
        function ALC_rev()
        {
            $(ALC.info_url ? '.swchItemA' : '.swchItemA1').parent().html(ALC_opt.rev).children().click(
                function()
                {
                    ALC_ajax();
                    ALC.info_url ? $(this).hide() : '';
                }
            );
        }
        function ALC_scroll()
        {
            if(ALC.get
                && ($(window).height() + $(document).scrollTop() - $(ALC_opt.id).offset().top - $(ALC_opt.id).height() > 0)
                && (ALC.current_page < ALC.max_page)
                && ($(document).height() > $(window).height()))
            {
                ALC_ajax();
            }
        }
        return $(document).scroll(ALC_scroll);
    }
})(jQuery);