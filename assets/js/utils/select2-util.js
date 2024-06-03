// require('../../../node_modules/bootstrap-datepicker');
require('select2/dist/js/select2.full');
require('select2/dist/js/i18n/de');

const select2Util = function ($) {

    $('.select2').select2({
        placeholder: "----",
        theme: 'bootstrap-5',
        allowClear: true
    });

};

export default select2Util;
