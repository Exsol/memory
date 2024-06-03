const statsHubShiftDailyPerformanceForm = function ($, Routing) {

    $(document).ready(function () {

        const formSelector = '.js--filter-hubs-daily-performance-form';

        function buttonSpinner(act) {
            if (act === 'show') {
                $('.js--filter-icon').addClass('is--hidden');
                $('.js--filter-spinner').removeClass('is--hidden');
            } else {
                $('.js--filter-icon').removeClass('is--hidden');
                $('.js--filter-spinner').addClass('is--hidden');
            }
        }

        function displaySpinner(cl, display) {
            if (display == 'show') {
                $(cl).removeClass('is--hidden');
            } else {
                $(cl).addClass('is--hidden');
            }
        }

        $(formSelector + ' .js--filter-region').on('change', function (e) {
            e.preventDefault();
            Filter.setHubSelect(formSelector);
            Filter.setEmployeesSelect(formSelector);
        });

        $(formSelector).submit(function (e) {
            e.preventDefault();
            var form = $(this);

            // set cookies when selected
            var dateFrom = $('.js--filter--date-from').val();
            var dateTo = $('.js--filter--date-to').val();
            Cookies.set('date_from', dateFrom, {expires: 30});
            Cookies.set('date_to', dateTo, {expires: 30});

            buttonSpinner('show');

            $.ajax({
                url: App.Routing.generate('admin_stats_hub_shift_daily_performance_ajax'),
                method: 'POST',
                dataType: 'json',
                data: form.serialize()
            }).done(function (response) {
                buttonSpinner('hide');
                var responseData = response.data || {};
                var responseOptions = response.options || {};
                var responseTable = response.table || {};
                //console.log(responseTable);
                if (responseTable.html.length === 0) {
                    $('.js--filter-table').html('');
                } else {
                    $('.js--filter-table').html(responseTable.html);

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
                    var table = $('.js--filter-table table').DataTable(dataTablesConfig);
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
                buttonSpinner('hide');
            });

            return false;
        });

    });
};

export default statsHubShiftDailyPerformanceForm;

