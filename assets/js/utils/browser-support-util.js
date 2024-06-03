
const browserSupportUtil = function ($) {

    $.fn.isDateSupported = function () {
        var input = document.createElement('input');
        var value = 'a';
        input.setAttribute('type', 'date');
        input.setAttribute('value', value);
        return (input.value !== value);
    };

};

export default browserSupportUtil;
