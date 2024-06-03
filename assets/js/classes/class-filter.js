class Filter {

    static buttonSpinner(act) {
        if (act === 'show') {
            $('.js--filter-icon').addClass('is--hidden');
            $('.js--filter-spinner').removeClass('is--hidden');
        } else {
            $('.js--filter-icon').removeClass('is--hidden');
            $('.js--filter-spinner').addClass('is--hidden');
        }
    }


    static displaySpinner(cl, display) {
        if (display == 'show') {
            $(cl).removeClass('is--hidden');
        } else {
            $(cl).addClass('is--hidden');
        }
    }


    static setHubs(newOptions, formSelector) {
        Filter.displaySpinner('.js--spinner-filter-hub', 'show');
        $(formSelector + ' .js--filter-hub').empty();
        $.each(newOptions.data, function (key, value) {
            $(formSelector + ' .js--filter-hub').append(
                $("<option></option>").attr("value", value.id).text(value.name)
            );
        });
        setTimeout(
            function () {
                Filter.displaySpinner('.js--spinner-filter-hub', 'hide');
            },
            200
        );
    }

    static setHubSelect(formSelector) {
        Filter.displaySpinner(formSelector + ' .js--spinner-filter-hub', 'show');

        var regions = $(formSelector + ' .js--filter-region').val();

        $.ajax({
            url: App.Routing.generate('admin_filter_ajax_hubs'),
            method: 'POST',
            data: {
                regions: regions
            },
            success: function (response) {
                var responseData = response.data || {};

                $(formSelector + ' .js--filter-hub').empty();
                $.each(responseData, function (key, value) {
                    $(formSelector + ' .js--filter-hub').append(
                        $("<option></option>").attr("value", value.id).text(value.name)
                    );
                });
                setTimeout(
                    function () {
                        Filter.displaySpinner(formSelector + ' .js--spinner-filter-hub', 'hide');
                    },
                    200
                );

            },
            error: function (data) {
                Filter.displaySpinner(formSelector + ' .js--spinner-filter-hub', 'hide');
            }
        });


    }

    static setEmployeesSelect(formSelector) {
        var form = $(formSelector);

        var companies = $(formSelector + ' .js--filter-company').val();
        var regions = $(formSelector + ' .js--filter-region').val();
        var hubs = $(formSelector + ' .js--filter-hub').val();

        Filter.displaySpinner(formSelector + ' .js--spinner-filter-user', 'show');

        $.ajax({
            url: App.Routing.generate('admin_filter_ajax_employees'),
            method: 'POST',
            dataType: 'json',
            data: {
                companies: companies,
                regions: regions,
                hubs: hubs
            }
        }).done(function (response) {
            var responseData = response.data || {};
            $('.js--filter-user').empty();
            $(formSelector + ' .js--filter-user').append(
                $("<option></option>").attr("value", "").text("---")
            );

            $.each(responseData, function (key, value) {
                $(formSelector + ' .js--filter-user').append(
                    $("<option></option>").attr("value", value.id).text(value.name)
                );
            });
            Filter.displaySpinner(formSelector + ' .js--spinner-filter-user', 'hide');
        });
    }

}

export default Filter;

