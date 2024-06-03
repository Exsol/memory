
const invoiceForm = function () {

    $('.js--amount-calculate-qty, .js--amount-calculate-price').on('change', function(e){
        var qty = $('.js--amount-calculate-qty').val();
        var price = $('.js--amount-calculate-price').val();

        if ( qty == '' ) {
            qty = 1;
        }
        if ( price == '' ) {
            price = 1;
        }

        qty = numberToCalc(qty);
        price = numberToCalc(price);

        $('.js--amount-calculate-qty').val(numberToShow(qty));
        $('.js--amount-calculate-price').val(numberToShow(price));

        var calculatedVal = numberToCalc(qty * price);
        $('.js--amount-calculate-target').val(numberToShow(calculatedVal));

        //calculateSupervisorLimit();
    });
/*
    function calculateSupervisorLimit() {
        if ( $('.js--invoice-form').hasClass('is--supervisor-invoice') ) {
            var targetVal = numberToCalc($('.js--amount-calculate-target').val());
            var limit = numberToCalc($('.js--amount-calculate-target').attr('data-supervisor-limit'));

            if ( targetVal > limit ) {
                $('.js--amount-calculate-qty').val('');
                $('.js--amount-calculate-price').val('');
                $('.js--amount-calculate-target').val('');
                $('.js--supervisor-limit-error').html('Bitte kontrollieren Sie Ihre Eingabe.\nDas errechnete Honorar ' + numberToShow(targetVal) + ' übersteigt ' + numberToShow(limit) + ' Euro.' );
            } else {
                $('.js--supervisor-limit-error').html('');
            }
        }
    }
*/

    $('.js--select-document-set').on('change', function(e){

        var invoiceType = $('option:selected', this).attr('data-invoice-type');

        if ( invoiceType == 'supervisor' ) {
            $('.js--hourly-billing').removeClass('is--hidden');
            $('.js--supervisor-services').removeClass('is--hidden');

            $('.js--amount-calculate').removeClass('is--hidden');
            $('.js--amount-calculate-target').attr('disabled', 'disabled');

            if (!$('.js--invoice-form').hasClass('is--supervisor-invoice')) {
                $('.js--invoice-form').addClass('is--supervisor-invoice')
                    .removeClass('is--work-invoice')
                    .removeClass('is--honorar-invoice');
            }
            //calculateSupervisorLimit();

        } else if ( invoiceType == 'work' ) {
            $('.js--hourly-billing').addClass('is--hidden');
            $('.js--supervisor-services').addClass('is--hidden');

            $('.js--amount-calculate').addClass('is--hidden');
            $('.js--amount-calculate-target').removeAttr('disabled');

            if (!$('.js--invoice-form').hasClass('is--work-invoice')) {
                $('.js--invoice-form').addClass('is--work-invoice')
                    .removeClass('is--supervisor-invoice')
                    .removeClass('is--honorar-invoice');
            }

        } else {

            $('.js--hourly-billing') .addClass('is--hidden');
            $('.js--supervisor-services') .addClass('is--hidden');

            $('.js--amount-calculate').removeClass('is--hidden');
            $('.js--amount-calculate-target').attr('disabled', 'disabled');

            $('.js--invoice-form').removeClass('is--supervisor-invoice')
                .removeClass('is--honorar-invoice');

            // $('.js--select-document-set-target').find('input:checked').each(function(index){
            //     if ( !$(this).attr('data-always-checked') ) {
            //         $(this).prop('checked', false);
            //     }
            // });
        }

    });

    if ( $('.js--tasks--max-length').length ) {
        setTasksMaxLength();

        $('.js--tasks--max-length').on('keyup', function (e) {
            setTasksMaxLength();
        });
    }

    function setTasksMaxLength() {
        var textlen = $('.js--tasks--max-length').prop('maxlength') - $('.js--tasks--max-length').val().length;
        $('.js--tasks--max-length-target').text(textlen);
    }

    function numberToShow(n) {
        return (n + '').replace('.', ',');
    }

    function numberToCalc(n) {
        n = parseFloat((n + '').replace(',', '.'));
        return Math.round(n * 100) / 100;
    }
}

export default invoiceForm;

