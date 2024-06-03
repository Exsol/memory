const userLogEditTasksForm = function ($, Routing) {

    $(document).ready(function () {

        $('.js--filter-region').on('change', function (e) {
            e.preventDefault();
            var region = $('.js--filter-region').val();

            if (region !== '' && statsRegionHubs[region] !== undefined) {
                setHubs(statsRegionHubs[region]['hubs']);
            } else {
                setHubs(statsAllHubs);
            }

            setEmployeesSelect();
        });


        

    });

};

export default userLogEditTasksForm;

