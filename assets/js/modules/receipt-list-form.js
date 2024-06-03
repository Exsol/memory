
const receiptListForm = function ($, Routing) {

    $(document).ready(function () {

        const formSelector = '.js--receipt-list-form';
        let formAction = '';


        $(formSelector + ' .js--filter-region').on('change', function (e) {
            e.preventDefault();
            Filter.setHubSelect(formSelector);
            Filter.setEmployeesSelect(formSelector);
        });

        $(formSelector + ' .js--filter-hub').on('change', function (e) {
            e.preventDefault();
            Filter.setEmployeesSelect(formSelector);
        });

        $(formSelector + " .filter_datetimepicker").on("dp.change", function (e) {
            Filter.setEmployeesSelect(formSelector);
        });


        $(formSelector + ' .js--receipt-list-download').click(function(e){
            e.preventDefault();

            //const formData = new FormData($(formSelector+':first'));
            const formData = $(formSelector+':first').serialize();

            $.ajax({
                url: App.Routing.generate('admin_receipt_list_ajax_download'),
                method: 'POST',
                dataType: 'json',
                data: formData
            }).done(function (response) {
                var responseData = response.data || {};
                var responseOptions = response.options || {};
                toastr.success('', 'Download erfolgreich erstellt.');
            });

        });



        $(formSelector).submit(function (e) {
            e.preventDefault();
            var form = $(this);

            // set cookies when selected
            var dateFrom = $(formSelector + ' .js--filter--date-from').val();
            var dateTo = $(formSelector + ' .js--filter--date-to').val();
            Cookies.set('date_from', dateFrom, {expires: 30});
            Cookies.set('date_to', dateTo, {expires: 30});

            Filter.buttonSpinner('show');

            $.ajax({
                url: App.Routing.generate('admin_receipt_list_ajax'),
                method: 'POST',
                dataType: 'json',
                data: form.serialize()
            }).done(function (response) {
                var responseData = response.data || {};
                var responseOptions = response.options || {};
                var responseTable = response.table || {};

                if (responseData.receiptIds.length >= 0) {
                    List.setListIds(responseData.receiptIds);
                }

                if (responseTable.html.length === 0) {
                    $('.js--receipt-list-table').html('');
                } else {
                    $('.js--receipt-list-table').html(responseTable.html);

                    if (typeof dataTablesConfig == 'undefined') {
                        dataTablesConfig = {
                            ordering: true,
                            info: true,
                            searching: true,
                            paging: true,
                            processing: true,
                            aLengthMenu: [
                                [100, 9999999],
                                [100, "All"]
                            ],
                        };
                    }

                    var table = $('.js--receipt-list-table table').DataTable(dataTablesConfig);
                    if ( $(window).width() > 992) {
                        new $.fn.dataTable.FixedHeader(table);
                    }
                    $('.js--col-qty').html(responseOptions.stats_booked);

                    var timer;
                    erd.listenTo($('.container-fluid'), function (element) {
                        clearTimeout(timer);
                        timer = setTimeout(function () {
                            table.draw();
                        }, 200);
                    });
                }
                Filter.buttonSpinner('hide');
            });

            return false;
        });

    });
};

export default receiptListForm;

