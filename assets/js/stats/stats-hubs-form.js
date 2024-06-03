const statsHubsForm = function ($, Routing) {

    $(document).ready(function () {

        const formSelector = '.js--filter-hubs-form';

        // $('.js--filter-hub').empty();

        $(formSelector + ' .js--filter-region').on('change', function (e) {
            e.preventDefault();
            Filter.setHubSelect(formSelector);
            // $('.js--filter-hub').empty();
            // e.preventDefault();
            // var regions = $('.js--filter-region').val();
            // $.ajax({
            //     url: App.Routing.generate('admin_stats_ajax_hubs'),
            //     method: 'POST',
            //     data: {
            //         regions: regions
            //     },
            //     success: function (data) {
            //         Filter.setHubs(data);
            //     },
            //     error: function (data) {
            //         console.log(data.responseJSON);
            //     }
            // });
        });

        $('.js--filter-hubs-form').submit(function (e) {
            e.preventDefault();
            var form = $(this);

            // set cookies when selected
            var dateFrom = $('.js--filter--date-from').val();
            var dateTo = $('.js--filter--date-to').val();
            Cookies.set('date_from', dateFrom, {expires: 30});
            Cookies.set('date_to', dateTo, {expires: 30});

            Filter.buttonSpinner('show');

            $.ajax({
                url: App.Routing.generate('admin_stats_hubs_ajax'),
                method: 'POST',
                dataType: 'json',
                data: form.serialize()
            }).done(function (response) {

                var responseData = response.data || {};
                var responseOptions = response.options || {};
                var responseTable = response.table || {};

                if (responseTable.html.length === 0) {
                    $('.js--filter-hub-table').html('');
                } else {
                    $('.js--filter-hub-table').html(responseTable.html);

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
                    var table = $('.js--filter-hub-table table').DataTable(dataTablesConfig);
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

export default statsHubsForm;

