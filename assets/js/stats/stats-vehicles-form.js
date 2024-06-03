//import {Loader, LoaderOptions} from 'google-maps';

const statsVehiclesForm = function ($, Routing) {

    $(document).ready(function () {

        const formSelector = '.js--stats-vehicles-form';

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
                url: App.Routing.generate('admin_user_log_with_vehicle_ajax'),
                method: 'POST',
                dataType: 'json',
                data: form.serialize()
            }).done(function (response) {

                var responseTable = response.table || {};

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
                        new $.fn.dataTable.FixedHeader( table );
                    }
                    var timer;
                    erd.listenTo($('.container-fluid'), function(element) {
                        clearTimeout(timer);
                        timer = setTimeout(function() {
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

export default statsVehiclesForm;

