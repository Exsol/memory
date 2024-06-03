const todoFilterForm = function ($, Routing) {

    $(document).ready(function () {

        const formSelector = '.js--todo-filter-form';


        $(formSelector).submit(function (e) {
            e.preventDefault();
            let form = $(this);
            let typeTodo =  $(formSelector + ' .js--type-todo').val();;
            // set cookies when selected
            let dateFrom = $(formSelector + ' .js--filter--date-from').val();
            let dateTo = $(formSelector + ' .js--filter--date-to').val();
            // Cookies.set('date_from', dateFrom, {expires: 30});
            // Cookies.set('date_to', dateTo, {expires: 30});

            Filter.buttonSpinner('show');

            $.ajax({
                url:  Routing.generate('admin_todo_ajax', {typeTodo}),
                method: 'POST',
                dataType: 'json',
                data: form.serialize()
            }).done(function (response) {
                if (response.length === 0) {
                    $('.js--filter-table').html('');
                } else {
                    $('.js--filter-table').html(response);
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
                    let timer;
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

export default todoFilterForm;

