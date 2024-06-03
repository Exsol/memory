var bootbox = require('../extra-libs/bootbox-5/src/bootbox');
global.bootbox = window.bootbox = bootbox;

var BootboxApp = function() {

    var bootboxDialog = function(u, d, s, va, sf) {

        var footerHideClass = 'hide';
        if ( sf == 'show' ) footerHideClass = '';

        var centeredClass = '';
        if ( va == 'center' ) centeredClass = 'modal-dialog-centered';

        switch(s) {
            case 'large':
                cl = 'modal-xl';
                break;
            // case 'medium':
            //     cl = '';
            //     break;
            case 'small':
                cl = 'modal-sm';
                break;
            default:
                cl = '';
                break;
        }

        //NProgress.start();

        $.ajax({
            method: "get",
            size: s,
            url: u,
            onEscape: true,
            backdrop: true,
            data : d,
            success: function(data) {
                //NProgress.done();
                bootbox.dialog({
                    message: data,
                    title: "",
                    buttons: {
                        cancel: {
                            label: "label.close",
                            className: "btn-default"
                        }
                    }
                }).on('shown.bs.modal', function(relatedTarget) {
                    //console.log(relatedTarget);
                })
                .find("div.modal-dialog").addClass(cl).addClass(centeredClass)
                .find("div.modal-footer").addClass(footerHideClass);
            }
        });
    };

    return {
        init : function() {
        },
        bootboxDialog : function(u, d, s, va, sf) {
            bootboxDialog(u, d, s, va, sf);
        }
    };

}();

/* Initialize app when page loads */
$(function(){ BootboxApp.init(); });

global.BootboxApp = window.BootboxApp = BootboxApp;
