const statsTaskControlHubShiftDailyPerformanceForm = function ($, Routing) {

    $(document).ready(function () {

        const formSelector = '.js--filter-stats-control-hubs-daily-performance-form';

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
                url: App.Routing.generate('admin_task_control_hub_shift_daily_performance_ajax'),
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
                    if ($(window).width() > 992) {
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

        $(document.body).on("keyup change", ".js--set-user-control-day", function (e) {
                $(this).next().removeClass('invisible');
                // let btn = $('<input/>').attr({
                //     type: "button",
                //     class: "btn btn-sm btn-primary ms-3 js--send-user-control-day",
                //     value: 'Senden',
                //     'data-sum-task': $(this).data('sum-task'),
                //     'data-hub-id': $(this).data('hub-id')
                // });
                // $(this).parent().append(btn);
        });

        $(document.body).on("click", ".js--send-user-control-day", function (e) {

            e.preventDefault();

            const _this = $(this);
            const token = $('.js--table-task-control').data('token');
            const hubId = $(this).data('hub-id');
            const day = $(this).data('day');
            const appTask = $(this).prev().val();
            const sumTask = $(this).data('sum-task');
            const difference = sumTask - appTask;

            const data = {hubId,day,appTask,difference,token};

            $.ajax({
                type: 'POST',
                url:  Routing.generate('admin_set_data_to_task_control'),
                data: data,
                cache: false,
                dataType: "json",
                success: function (data) {


                    //update difference in table
                    const differenceTargetEl = _this.closest('td').next().find('.js--task-control-difference-label');
                    differenceTargetEl.html(data.difference);

                    if (data.difference != 0 && data.difference != ""){
                        differenceTargetEl.addClass('text-danger');
                    }else{
                        differenceTargetEl.removeClass('text-danger');
                    }
                    //change bg color
                    _this.removeClass('btn-primary');
                    _this.addClass('btn-success');

                    toastr.success('', 'Daten erfolgreich aktualisiert');

                },
                error: function (e) {

                    toastr.error('', 'Es ist ein Fehler aufgetreten');
                }
            });
        });

        // $(document.body).on("focusout", ".js--set-user-control-day", function (e) {
        //     const _this = $(this);
        //     setTimeout(function() {
        //         _this.next().addClass('invisible');
        //     }, 100);
        // });
    });
};

export default statsTaskControlHubShiftDailyPerformanceForm;

