const statsRegionsForm = function ($, Routing) {

    $(document).ready(function () {

        $('.js--filter-regions-form').submit(function (e) {
            e.preventDefault();
            var form = $(this);

            // set cookies when selected
            var dateFrom = $('.js--filter--date-from').val();
            var dateTo = $('.js--filter--date-to').val();
            Cookies.set('date_from', dateFrom, {expires: 30});
            Cookies.set('date_to', dateTo, {expires: 30});

            Filter.buttonSpinner('show');

            $.ajax({
                url: App.Routing.generate('admin_stats_regions_ajax'),
                method: 'POST',
                dataType: 'json',
                data: form.serialize()
            }).done(function (response) {

                var responseTable = response.table || {};

                if (responseTable.html.length === 0) {
                    $('.js--filter-region-table').html('');
                } else {
                    $('.js--filter-region-table').html(responseTable.html);

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
                    var table = $('.js--filter-region-table table').DataTable(dataTablesConfig);
                    if ( $(window).width() > 992) {
                        new $.fn.dataTable.FixedHeader(table);
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

export default statsRegionsForm;

