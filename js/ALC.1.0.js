/****************
 *
 * Auto Loading of Content (ALC)
 * by Moool13
 * v1.0:30.09.12
 *
 ***************/

var ALC_Get = 1,
    ALC_page_num = 1;

function auto_load()
{
    ALC_page_top = (/*@cc_on!@*/0) ? document.documentElement.scrollTop : window.pageYOffset;
    ALC_height =  parseInt($('#ALC')[0].offsetHeight) - 800;
    if(ALC_Get && ALC_page_top > ALC_height && ALC_page_num < ALC_max_page)
    {
        ALC_page_num++;
        $.ajax(
            {
                type: 'GET',
                url: '/load/0-' + ALC_page_num,
                beforeSend: function()
                    {
                        ALC_Get = 0;
                    },
                success: function(data)
                    {
                        $('.ALC_load').append($('.ALC_load',data).html());
                        ALC_Get = 1;
                    },
                error: function()
                    {
                        alert('Error ALC');
                    }
            }
        );
    }
}

$(document).scroll(
    function()
    {
        auto_load();
    }
);