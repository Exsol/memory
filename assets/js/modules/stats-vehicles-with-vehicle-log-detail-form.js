const statsVehiclesWithVehicleLogDetailForm = function ($, Routing) {

    $(document).ready(function () {

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

        function setHubs(newOptions) {
            displaySpinner('.js--spinner-hub', 'show');
            $('.js--filter-hub').empty();
            $.each(newOptions, function (key, value) {
                $('.js--filter-hub').append(
                    $("<option></option>").attr("value", value.id).text(value.name)
                );
            });
            setTimeout(
                function () {
                    displaySpinner('.js--spinner-hub', 'hide');
                },
                200
            );
        }

        if (typeof statsRegionHubs !== 'undefined') {

            $('.js--filter-region').on('change', function (e) {
                e.preventDefault();
                var region = $('.js--filter-region').val();

                if (region !== '' && statsRegionHubs[region] !== undefined) {
                    setHubs(statsRegionHubs[region]['hubs']);
                } else {
                    setHubs(statsAllHubs);
                }
            });


            $('.js--stats-vehicles-log-with-log-detail-form').submit(function (e) {
                e.preventDefault();
                var form = $(this);

                // set cookies when selected
                var dateFrom = $('.js--filter--date-from').val();
                var dateTo = $('.js--filter--date-to').val();
                Cookies.set('date_from', dateFrom, {expires: 30});
                Cookies.set('date_to', dateTo, {expires: 30});

                buttonSpinner('show');

                $.ajax({
                    url: App.Routing.generate('admin_vehicles_log_with_vehicle_log_detail_ajax'),
                    method: 'POST',
                    dataType: 'json',
                    data: form.serialize()
                }).done(function (response) {
                    var responseData = response.data || {};
                    var responseOptions = response.options || {};
                    var responseTable = response.table || {};
                    //console.log(responseTable);
                    if (responseTable.html.length === 0) {
                        $('.js--filter-table').html('');
                    } else {
                        $('.js--filter-table').html(responseTable.html);
                    }
                    buttonSpinner('hide');
                });

                return false;
            });

        }

    });
};

export default statsVehiclesWithVehicleLogDetailForm;

