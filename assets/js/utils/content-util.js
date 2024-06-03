// require('../../../node_modules/bootstrap-datepicker');
require('select2');
require('select2/dist/js/i18n/de');

const contentUtil = function ($) {

    $('.btn-content').click(function(){
        var url = $(this).attr("href");
        $.ajax({
            type: "GET",
            url: url,
            //dataType: 'json',
            success: function(res) {
                $('.modal-body').html(res);
                $('#modal-content').modal('show');
            },
            error:function(request, status, error) {
                console.log("ajax call went wrong:" + request.responseText);
            }
        });
    });

};

export default contentUtil;
