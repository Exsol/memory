
class FormAjaxLoader {

    static setHubs(srcDotClass, targetDotClass, spinnerDotClass) {
        FormAjaxLoader.displaySpinner(spinnerDotClass, 'show');

        var regions = $(srcDotClass).val();

        $.ajax({
            url: App.Routing.generate('admin_hub_ajax_load_by_regions'),
            method: 'POST',
            data: {'regions': regions},
            success: function (data) {
                $(targetDotClass).empty();
                $.each(data, function (key, value) {
                    $(targetDotClass).append(
                        $("<option></option>").attr("value", value.id).text(value.text)
                    );
                });
                FormAjaxLoader.displaySpinner(spinnerDotClass, 'hide');
            },
            error: function (data) {
                FormAjaxLoader.displaySpinner(spinnerDotClass, 'hide');
                console.log(data);
            }
        });
    }

    static setVehicles() {
        FormAjaxLoader.displaySpinner('.js--spinner-stats-vehicle', 'show');

        var hubs = $('.js--filter-hub').val();
        console.log(hubs);
        $.ajax({
            url: App.Routing.generate('admin_stats_vehicle_array_getter'),
            method: 'POST',
            data: {
                hubs: hubs
            },
            success: function (data) {

                $('.js--stats-vehicle').empty();
                $.each(data, function (key, value) {
                    $('.js--stats-vehicle').append(
                        $("<option></option>").attr("value", value.id).text(value.text)
                    );
                });
                FormAjaxLoader.displaySpinner('.js--spinner-stats-vehicle', 'hide');
            },
            error: function (data) {
                FormAjaxLoader.displaySpinner('.js--spinner-stats-vehicle', 'hide');
                console.log("data", data);
            }
        });

    }

    static displaySpinner(cl, display) {
        if (display == 'show') {
            $(cl).removeClass('is--hidden');
        } else {
            $(cl).addClass('is--hidden');
        }
    }


    static buttonSpinner(act) {
        if (act === 'show') {
            $('.js--filter-icon').addClass('is--hidden');
            $('.js--filter-spinner').removeClass('is--hidden');
        } else {
            $('.js--filter-icon').removeClass('is--hidden');
            $('.js--filter-spinner').addClass('is--hidden');
        }
    }

}

export default FormAjaxLoader;