const userFileFilterForm = function ($, Routing) {

    $(document).ready(function () {

        const formSelector = '.js--user-file-filter-form';

        $(formSelector + ' .js--filter-region').on('change', function (e) {
            e.preventDefault();
            Filter.setHubSelect(formSelector);
            // Filter.setEmployeesSelect(formSelector);
        });

        $(formSelector).submit(function (e) {
            e.preventDefault();
            var form = $(this);

            // set cookies when selected
            // var dateFrom = $(formSelector + ' .js--filter--date-from').val();
            // var dateTo = $(formSelector + ' .js--filter--date-to').val();
            // Cookies.set('date_from', dateFrom, {expires: 30});
            // Cookies.set('date_to', dateTo, {expires: 30});

            Filter.buttonSpinner('show');

            $.ajax({
                url: App.Routing.generate('admin_user_file_ajax'),
                method: 'POST',
                dataType: 'json',
                data: form.serialize()
            }).done(function (response) {
                var responseData = response.data || {};
                var responseOptions = response.options || {};
                var responseTable = response.table || {};

                // if (responseData.userFilesIds.length >= 0) {
                //     List.setListIds(responseData.userFilesIds);
                // }

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

        $(".js--month-year-picker").datetimepicker({
            format: "MM.YYYY",
            viewDate: 'true',
            icons: {
                time: 'far fa-clock',
                date: 'fa fa-calendar',
                up: 'fa fa-chevron-up',
                down: 'fa fa-chevron-down',
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-check-circle',
                clear: 'fa fa-trash',
                close: 'fa fa-remove'
            }
        });

        $(document.body).on("click", ".js--userfile-status-button", function (e) {

            const status = $(this).data('status');
            const id = $(this).data('file-id');
            const isModal = $(this).data('modal');

            const data = {'ids': [id], 'status': status};
            if (isModal){
                $('.js--userfile-status-button').removeClass('d-none');
                $(this).addClass('d-none');
            }

            $.ajax({
                url: App.Routing.generate('admin_user_file_update_status'),
                method: 'POST',
                dataType: 'json',
                data: data
            }).done(function (response) {
                $('.js--user-file-filter-form').submit();
            });
        });

    });
};

export default userFileFilterForm;

