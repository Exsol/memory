const dashboardManager = function ($, Routing) {

    if ( $('body').attr('id') !== 'dashboard' ) return;

    const showAnimationBtn = (el, show = false) => {
        if (show) {
            el.find('.js--filter-icon').addClass('is--hidden');
            el.find('.js--filter-spinner').removeClass('is--hidden');
        } else {
            el.find('.js--filter-icon').removeClass('is--hidden');
            el.find('.js--filter-spinner').addClass('is--hidden');
        }
        return true;
    }

    const getUsersData = (url, el = $(), param = {}) => {
        showAnimationBtn(el, true);

        let return_data = [];
        param.form = $('.year-month-form').serialize();
        $.ajax({
            type: 'POST',
            data: param,
            url: url,
            dataType: "json",
            async: false,
            beforeSend: function () {
                $('.dashboard-area-stats').addClass('load-block');
            },
            success: function (data) {
                $('.dashboard-area-stats').removeClass('load-block');
                return_data = data;
                showAnimationBtn(el, false);
            },
            complete: function () {

            },
            error: function (e) {
                // console.log(e);
            }
        });
        return return_data;
    }
    let removeHiddenAttrForOptionSelect = (select) => {
        select.each(function () {
            $(this).removeAttr('hidden');
            $(this).removeAttr('selected');
        });
    }


    $(document.body).on("change", ".js--region-select", function () {
        let picked_region_id = $(this).val();

        //let hub_picker = $('.js--hub-select option');
        let hub_picker = $(this).closest('form').find('.js--hub-select option');
        //remove all hidden attr for select hub
        removeHiddenAttrForOptionSelect(hub_picker);
        //set count for set attr for first select
        let c = 0;
        //add hidden attr for option which do not belong to the current region
        hub_picker.each(function (i) {
            let region_id = $(this).attr('data-region-id');

            // if (picked_region_id !== region_id && picked_region_id !== "") {
            //     $(this).attr('hidden', true);
            //     //Check if the option refers to the current region && it is the first one, then add the selected option.
            // } else if (picked_region_id === region_id && c === 0) {
            //     $(this).attr('selected', 'selected');
            //     c++;
            // }
            if (picked_region_id !== region_id && region_id != undefined) {
                $(this).attr('hidden', true);
                //Check if the option refers to the current region && it is the first one, then add the selected option.
            }
        });
        //refresh hub select
        $(this).closest('form').find('.js--hub-select').prop("selectedIndex", 0).change();
    });


    $(document.body).on("click", ".js--filter-user-data", function (e) {
        e.preventDefault();
        let el = $(this).closest('form').find('.js--hub-select');
        let regionId = $('option:selected', el).attr('data-region-id');
        let hubId = el.val();
        let thisEl = $(this);
        let data = getUsersData(Routing.generate('admin_dashboard_manager_get_users_data'), thisEl, {
            'region_id': regionId,
            'hub_id': hubId
        });
        //update table with users data if we have array
        if (data.length !== 0) {
            updateTable('#datatable-user-stat', data);
        }
    });
    $(document.body).on("click", ".js--filter-user-accounting", function (e) {
        e.preventDefault();
        let elHub = $(this).closest('form').find('.js--hub-select');
        let elRegion = $(this).closest('form').find('.js--region-select');
        let regionId = elRegion.val();
        if (regionId === "") {
            regionId = $('option:selected', elHub).attr('data-region-id');
        }
        let hubId = elHub.val();
        let thisEl = $(this);
        let data = getUsersData(Routing.generate('admin_dashboard_manager_get_users_accounting'), thisEl, {
            'region_id': regionId,
            'hub_id': hubId
        });
        //update table with users data if we have array
        if (data.length !== 0) {
            updateTable('#datatable-user-accounting', data);
        }
    });

    $(document.body).on("click", ".js--filter-accounting-area", function (e) {
        let region_id = $(this).closest('.js--area-block').data('area-id');
        let hub_id = $(this).data('hub-id');
        let target = '.js--accounting';
        $('.js--tab-block-accounting').tab('show');
        updateFilterSelect(region_id, hub_id, target);
        $(target + ' .js--filter-user-accounting').trigger('click');
    });

    $(document.body).on("click", ".js--filter-employees-total-hours", function (e) {
        let region_id = $(this).closest('.js--area-block').data('area-id');
        let hub_id = $(this).data('hub-id');
        let target = '.js-employees-total';
        $('.js--employees-total-hours').tab('show');
        updateFilterSelect(region_id, hub_id, target);
        $(target + ' .js--filter-user-data').trigger('click');
    });

    const updateFilterSelect = (region_id, hub_id, target) => {
        $(target + ' .js--region-select').val(region_id);
        if (hub_id !== undefined) {
            $(target + ' .js--hub-select').val(hub_id);
        } else {
            $(target + ' .js--hub-select').prop('selectedIndex', 0);
        }
    }

    // const scrollToEl = (el) => {
    //     $([document.documentElement, document.body]).animate({
    //         scrollTop: $(el).offset().top
    //     }, 100);
    // }
    const updateTable = (table, data) => {
        $(table).dataTable().fnClearTable();
        $(table).dataTable().fnAddData(data);
    }

    const optionDatatableUserStat = () => {
        return {
            orderCellsTop: false,
            autoWidth: false,
            serverSide: false,
            searching: false,
            aLengthMenu: [
                [50, 100, 9999999],
                [50, 100, "All"]
            ],
            bLengthChange: true,
            iDisplayLength: 50,
            data: getUsersData(Routing.generate('admin_dashboard_manager_get_users_data')),
            columns: [
                {data: 'name', name: 'name'},
                {data: 'days', name: 'days'},
                {data: 'hours', name: 'hours'},
                {data: 'taskTotal', name: 'taskTotal'},
                {data: 'performance', name: 'performance'},
                {
                    data: 'countUserAbsence', render: function (countUserAbsence) {
                        if (countUserAbsence >= 1) {
                            return '<i class="fa fa-check"></i> Ja';
                        } else {
                            return 'Nein';
                        }
                    }
                },
                {
                    data: 'countUpfitting', render: function (countUpfitting) {
                        if (countUpfitting >= 1) {
                            return '<i class="fa fa-check"></i> Ja';
                        } else {
                            return 'Nein';
                        }
                    }
                },
                {data: 'actions', name: 'actions'}
            ],
            searchDelay: 500,
        }
    }

    let table_user_stat = $('#datatable-user-stat').DataTable(optionDatatableUserStat());

    let dataUserAccountingIds = [];
    const optionDatatableUserAccounting = () => {
        return {
            orderCellsTop: false,
            autoWidth: false,
            serverSide: false,
            searching: false,
            // columnDefs: [{
            //     type: 'date',
            //     "targets": [0,1,2,3,4,5],
            //     "orderable": false
            // }],
            aLengthMenu: [
                [50, 100, 9999999],
                [50, 100, "All"]
            ],
            order: [[0, 'desc']],
            bLengthChange: true,
            iDisplayLength: 50,
            data: getUsersData(Routing.generate('admin_dashboard_manager_get_users_accounting')),
            columns: [
                {data: 'receiptDate', name: 'receiptDate'},
                {data: 'regionName', name: 'regionName'},
                {data: 'hubName', name: 'hubName'},
                {data: 'typeName', name: 'typeName'},
                {
                    data: 'amount', render: function (amount) {
                        return new Intl.NumberFormat("de-DE", {style: "currency", currency: "EUR"}).format(
                            amount,
                        )
                        // return amount + ' €';
                    }
                },
                {data: 'modalLink', name: 'modalLink'}
            ],
            // fnDrawCallback: function () {
            //     let data = this.fnGetData();
            //     let receiptsIds = [];
            //     if (data.length) {
            //         for (let key in data) {
            //             receiptsIds.push(data[key]['receiptId'])
            //         }
            //     }
            //     List.setListIds(receiptsIds);
            // },

            fnPreDrawCallback: function (oSettings) {
                /* reset data */
                dataUserAccountingIds = [];
            },
            fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                /* push data */
                dataUserAccountingIds.push(aData);
            },
            fnDrawCallback: function () {

                let userAccountingIds = [];
                // console.log(dataUserAccountingIds);
                if (dataUserAccountingIds.length > 1) {
                    for (let key in dataUserAccountingIds) {
                        let accountingId = Number(dataUserAccountingIds[key]['receiptId']);
                        userAccountingIds.push(accountingId)
                    }
                }
                // console.log(userAccountingIds);
                List.setListIds(userAccountingIds);
            },
            footerCallback: function (row, data, start, end, display) {
                let api = this.api();

                // Remove the formatting to get integer data for summation
                let intVal = function (i) {
                    return typeof i === 'string'
                        ? i.replace(/[\$,]/g, '') * 1
                        : typeof i === 'number'
                            ? i
                            : 0;
                };

                // Total over all pages
                let total = api
                    .column(4)
                    .data()
                    .reduce((a, b) => intVal(a) + intVal(b), 0);

                // Total over this page
                let pageTotal = api
                    .column(4, {page: 'current'})
                    .data()
                    .reduce((a, b) => intVal(a) + intVal(b), 0);

                // Update footer
                api.column(4).footer().innerHTML =
                    new Intl.NumberFormat("de-DE", {style: "currency", currency: "EUR"}).format(
                        pageTotal,
                    ) + " (" + new Intl.NumberFormat("de-DE", {style: "currency", currency: "EUR"}).format(
                        total,
                    ) + ")";

                //pageTotal.toFixed(2) + ' € (' + total.toFixed(2) + ' € Summe)';
            }
        }
    }

    let table_user_accounting = $('#datatable-user-accounting').DataTable(optionDatatableUserAccounting());

    $(document.body).on("click", ".js--send-form-area-manager-stats", function (e) {
        e.preventDefault();
        let data = $('.year-month-form').serialize();
        let route_name = $('.year-month-form').data('route-name');
        let el = $(this);
        // let select_date = $('#month_year_form_date_day').val() + '.' + $('#month_year_form_date_month').val() + '.' + $('#month_year_form_date_year').val();
        // Cookies.set('year_month_form', select_date, {expires: 30});
        $.ajax({
            type: 'POST',
            url: App.Routing.generate(route_name),
            data: data,
            cache: false,
            //contentType: false,
            processData: false,
            dataType: "json",
            beforeSend: function () {

                showAnimationBtn(el, true);

                $('.dashboard-area-stats').addClass('load-block');

                $('<div>', {
                    class: 'spinner-border spinner-center-position',
                }).appendTo('.dashboard-area-stats');

            },
            success: function (data) {

                $('.dashboard-area-stats').removeClass('load-block');
                //update statistic block
                $('.dashboard-area-stats').html(data.content);


                //remove active class tab-pane
                $('.dashboard-area-stats .tab-pane').removeClass('active');
                //get curreint active class ID
                let tab_panel_active = $('.nav-link.active').attr('href');
                //set active tab
                $(tab_panel_active).addClass('active');
                //set data for datatable-user-stat
                $('#datatable-user-stat').DataTable(optionDatatableUserStat());

                //set data for datatable-user-accounting
                $('#datatable-user-accounting').DataTable(optionDatatableUserAccounting());

                //update state of data for yearMonthForm
                setYearMonthFormState();

                showAnimationBtn(el, false);
            },
            error: function (e) {
                // console.log(e);
            }
        });

    });
    $(document.body).on("click", ".js--call-modal", function (e) {
        e.preventDefault();
        App.ajaxEdit($(this));
    });
    $(document.body).on("click", ".js--filter-redirect", function (e) {

        //Filter type (performance or planing[Offene Tageseinsatzplanungen])
        let type = $(this).data('filter-type');
        // get period from click element
        let period = $(this).data('period');
        //create current data default
        let now = new Date();
        //create date_from by format(dd.mm.yyyy)
        let date_from = ('0' + now.getDate()).slice(-2) + '.' + ('0' + (now.getMonth() + 1)).slice(-2) + '.' + now.getFullYear();
        //get date_from from year-month-form state
        if (window.yearMonthFormState) {
            date_from = window.yearMonthFormState;
        }
        //get region ID
        let region = $(this).closest('.js--area-block').data('area-id');
        //get hub ID
        let hub = $(this).data('hub-id');
        // create URL path for filter link
        let url = '';

        if (type === 'performance') {
            if (period == 'day') {
                url = Routing.generate('admin_stats_users', {date_from, period, region, hub})
            } else {
                url = Routing.generate('admin_stats_hub_shift_daily_performance', {date_from, period, region, hub})
            }

        } else if (type === 'planing') {
            url = Routing.generate('admin_user_log_list_open', {date_from, period, region, hub})
        }
        window.open(url, '_blank');
    });

    const setYearMonthFormState = () => {
        let day = $('.js--date-day').val();
        let month = $('.js--date-month').val();
        let year = $('.js--date-year').val();
        window.yearMonthFormState = day + '.' + month + '.' + year;
    }

    //create async function for set state of date
    //for fix bug when data is not accept by filter but form is not submit
    setTimeout(() => {
        setYearMonthFormState();
    }, 1000);

};
export default dashboardManager;