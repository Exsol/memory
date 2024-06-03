/**
 * @file timepicker plugin for jquery-jeditable
 * @author Mika Tuupola, Nicolas CARPi
 * @home https://github.com/NicolasCARPi/jquery_jeditable
 * @licence MIT (see LICENCE file)
 * @copyright © 2007 Mika Tuupola, Nicolas CARPi
 * @name PluginTimepicker
 */

(function ($) {
    $.editable.addInputType('fulltime', {
        /* Create input element. */
        element : function(settings, original) {

            var elementId = settings.loaddata;

            /* Create and pulldowns for hours and minutes. Append them to */
            /* form which is accessible as variable this.                 */
            var dayselect = $('<select id="day_" class="form-select mr-sm-1" />');
            var monthselect = $('<select id="month_" class="form-select mr-sm-1" />');
            var yearselect = $('<select id="year_" class="form-select mr-sm-3" />');
            var hourselect = $('<select id="hour_" class="form-select mr-sm-1" />');
            var minselect  = $('<select id="min_" class="form-select mr-sm-2" />');
            //var secondselect  = $('<select id="sec_" class="form-select mr-sm-1" />');

            var option;

            for (var day=0; day <= 31; day++) {
                if (day < 10) {
                    day = '0' + day;
                }
                option = $('<option />').val(day).append(day);
                dayselect.append(option);
            }
            $(this).append(dayselect);

            for (var month=0; month <= 12; month++) {
                if (month < 10) {
                    month = '0' + month;
                }
                option = $('<option />').val(month).append(month);
                monthselect.append(option);
            }
            $(this).append(monthselect);

            var dateObj = new Date();
            var startYear = 2022;
            var currentYear = dateObj.getFullYear();
            for (year = startYear; year <= currentYear; year++) {
                option = $('<option />').val(year).append(year);
                yearselect.append(option);
            }
            $(this).append(yearselect);

            for (var hour=0; hour <= 23; hour++) {
                if (hour < 10) {
                    hour = '0' + hour;
                }
                option = $('<option />').val(hour).append(hour);
                hourselect.append(option);
            }
            $(this).append(hourselect);

            // for (var min=0; min <= 45; min = parseInt(min, 10) + 15) {
            //     if (min < 10) {
            //         min = '0' + min;
            //     }
            //     option = $('<option />').val(min).append(min);
            //     minselect.append(option);
            // }
            for (var min=0; min <= 59; min++) {
                if (min < 10) {
                    min = '0' + min;
                }
                option = $('<option />').val(min).append(min);
                minselect.append(option);
            }
            $(this).append(minselect);

            // for (var sec=0; sec <= 59; sec++) {
            //     if (sec < 10) {
            //         sec = '0' + sec;
            //     }
            //     option = $('<option />').val(sec).append(sec);
            //     secondselect.append(option);
            // }
            // $(this).append(secondselect);

            /* Last create an hidden input. This is returned to plugin. It will */
            /* later hold the actual value which will be submitted to server.   */
            var hidden = $('<input type="hidden" />');
            $(this).append(hidden);
            return(hidden);
        },
        /* Set content / value of previously created input element. */
        content : function(string, settings, original) {

            var day, month, year, hour, min,
                dateObj = new Date(), isEmpty = false;

            if ( string == 'Bearbeiten' || string == '----' || string == '' ) {
                isEmpty = true;
            } else {
                /* Select correct hour and minute in pulldowns. */
                var dateTimeParts = string.split(' ');

                var dateParts = dateTimeParts[0].split('.');
                var timeParts = dateTimeParts[1].split(':');

                day = dateParts[0];
                month = dateParts[1];
                year = dateParts[2];

                hour = timeParts[0];
                min = timeParts[1];
                //var sec = timeParts[2];
            }

            if ( isEmpty || day == '--' ) {
                day = dateObj.getDate();
                if (day < 10) {
                    day = '0' + day;
                }
            }
            if ( isEmpty || month == '--' ) {
                month = dateObj.getMonth() + 1; //months from 1-12
                if (month < 10) {
                    month = '0' + month;
                }
            }
            if ( isEmpty || year == '--' ) year = dateObj.getFullYear();

            if ( isEmpty || hour == '--' ) {
                var dHour = dateObj.getHours();
                if ( dHour < 10 ) dHour = '0' + dHour;
                hour = dHour;
            }
            if ( isEmpty || min == '--' ) min = dateObj.getMinutes();
            // if ( isEmpty || sec == '--' ) sec = '00';

            $('#day_', this).val('' + day);
            $('#month_', this).val('' + month);
            $('#year_', this).val('' + year);
            $('#hour_', this).val('' + hour);
            $('#min_', this).val('' + min);
            // $('#sec_', this).val('' + sec);
        },
        /* Call before submit hook. */
        submit: function (settings, original) {
            /* Take values from hour and minute pulldowns. Create string such as    */
            /* 13:45 from them. Set value of the hidden input field to this string. */
            var value = $('#day_', this).val() + '.' + $('#month_', this).val() + '.' + $('#year_', this).val() + ' ' + $('#hour_', this).val() + ':' + $('#min_', this).val(); // + ':' + $('#sec_', this).val();
            $('input', this).val(value);
        }
    });
})(jQuery);