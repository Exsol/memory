const statsPayrollForm = function ($, Routing) {

    $(document).ready(function () {

        const formSelector = '.js--stats-payroll-form';

        $(formSelector + ' .js--filter-region').on('change', function (e) {
            e.preventDefault();
            Filter.setHubSelect(formSelector);
            Filter.setEmployeesSelect(formSelector);
        });

        $(formSelector + ' .js--filter-hub').on('change', function (e) {
            e.preventDefault();
            Filter.setEmployeesSelect(formSelector);
        });

        $(".js--stats-payroll-form .filter_datetimepicker").on("dp.change", function (e) {
            Filter.setEmployeesSelect(formSelector);
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
                url: App.Routing.generate('admin_stats_payroll_ajax'),
                method: 'POST',
                dataType: 'json',
                data: form.serialize()
            }).done(function (response) {
                var responseData = response.data || {};
                var responseOptions = response.options || {};
                var responseTable = response.table || {};
                //console.log(responseTable);
                if (responseTable.html.length === 0) {
                    $('.js--stats-payroll-table').html('');
                } else {
                    $('.js--stats-payroll-table').html(responseTable.html);

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
                    var table = $('.js--stats-payroll-table table').DataTable(dataTablesConfig);
                    if ( $(window).width() > 992) {
                        new $.fn.dataTable.FixedHeader(table);
                    }
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

export default statsPayrollForm;

