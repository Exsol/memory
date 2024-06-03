require('eonasdan-bootstrap-datetimepicker');
// require('typeahead.js');
// Bloodhound = require("bloodhound-js");
require('bootstrap-tagsinput');
require('sweetalert2');
require('bootstrap4-duallistbox');

require('./app.init.duallistbox');

import moment from 'moment';
import Dropzone from "dropzone";

$(function () {
    "use strict";

    $('.js--create-user').click(function (e) {
        //e.preventDefault();
        if ($(this).is(':checked')) {
            $('.js--create-user-target').removeClass('is--hidden');
            $('.js--create-user-target').find('input').attr('required', 'required');
        } else {
            $('.js--create-user-target').addClass('is--hidden');
            $('.js--create-user-target').find('input').removeAttr('required', 'required');
        }
    });

    $(".preloader").fadeOut();
    // ==============================================================
    // Theme options
    // ==============================================================
    // ==============================================================
    // sidebar-hover
    // ==============================================================

    $(".left-sidebar").hover(
        function () {
            $(".navbar-header").addClass("expand-logo");
        },
        function () {
            $(".navbar-header").removeClass("expand-logo");
        }
    );
    // this is for close icon when navigation open in mobile view
    $(".nav-toggler").on('click', function () {
        $("#main-wrapper").toggleClass("show-sidebar");
        $(".nav-toggler i").toggleClass("ti-menu");
    });
    $(".nav-lock").on('click', function () {
        $("body").toggleClass("lock-nav");
        $(".nav-lock i").toggleClass("mdi-toggle-switch-off");
        $("body, .page-wrapper").trigger("resize");
    });
    $(".search-box a, .search-box .app-search .srh-btn").on('click', function () {
        $(".app-search").toggle(200);
        $(".app-search input").focus();
    });

    // ==============================================================
    // Right sidebar options
    // ==============================================================
    $(function () {
        $(".service-panel-toggle").on('click', function () {
            $(".customizer").toggleClass('show-service-panel');

        });
        $('.page-wrapper').on('click', function () {
            $(".customizer").removeClass('show-service-panel');
        });
    });
    // ==============================================================
    // This is for the floating labels
    // ==============================================================
    $('.floating-labels .form-control').on('focus blur', function (e) {
        $(this).parents('.input-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');

    // ==============================================================
    //tooltip
    // ==============================================================
    $(function () {
        $('[data-bs-toggle="tooltip"]').tooltip()
    });
    // ==============================================================
    //Popover
    // ==============================================================
    $(function () {
        $('[data-bs-toggle="popover"]').popover()
    });

    // ==============================================================
    // Perfact scrollbar
    // ==============================================================
    $('.message-center, .customizer-body, .scrollable').perfectScrollbar({
        wheelPropagation: !0
    });

    /*var ps = new PerfectScrollbar('.message-body');
    var ps = new PerfectScrollbar('.mail');
    var ps = new PerfectScrollbar('.scroll-sidebar');
    var ps = new PerfectScrollbar('.customizer-body');*/

    // ==============================================================
    // Resize all elements
    // ==============================================================
    $("body, .page-wrapper").trigger("resize");
    $(".page-wrapper").delay(20).show();
    // ==============================================================
    // To do list
    // ==============================================================
    $(".list-task li label").click(function () {
        $(this).toggleClass("task-done");
    });
    // ==============================================================
    // Collapsable cards
    // ==============================================================
    $('a[data-action="collapse"]').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.card').find('[data-action="collapse"] i').toggleClass('ti-minus ti-plus');
        $(this).closest('.card').children('.card-body').collapse('toggle');
    });
    // Toggle fullscreen
    $('a[data-action="expand"]').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.card').find('[data-action="expand"] i').toggleClass('mdi-arrow-expand mdi-arrow-compress');
        $(this).closest('.card').toggleClass('card-fullscreen');
    });
    // Close BusinessCard
    $('a[data-action="close"]').on('click', function () {
        $(this).closest('.card').removeClass().slideUp('fast');
    });
    // ==============================================================
    // LThis is for mega menu
    // ==============================================================
    $(document).on('click', '.mega-dropdown', function (e) {
        e.stopPropagation()
    });
    // ==============================================================
    // Last month earning
    // ==============================================================
    var sparklineLogin = function () {
        $('.lastmonth').sparkline([6, 10, 9, 11, 9, 10, 12], {
            type: 'bar',
            height: '35',
            barWidth: '4',
            width: '100%',
            resize: true,
            barSpacing: '8',
            barColor: '#2961ff'
        });

    };
    var sparkResize;

    $(window).resize(function (e) {
        clearTimeout(sparkResize);
        sparkResize = setTimeout(sparklineLogin, 500);
    });
    sparklineLogin();

    // ==============================================================
    // This is for the innerleft sidebar
    // ==============================================================
    $(".show-left-part").on('click', function () {
        $('.left-part').toggleClass('show-panel');
        $('.show-left-part').toggleClass('ti-menu');
    });


    // Disable right click and f12
    // Rechte Mousetaste
    // $("html").on("contextmenu", function (e) {
    //     return false;
    // });
    // $(document).keydown(function (event) {
    //     if (event.keyCode == 123) { // Prevent F12
    //         return false;
    //     } else if (event.ctrlKey && event.shiftKey && event.keyCode == 73) { // Prevent Ctrl+Shift+I
    //         return false;
    //     }
    // });


    // Datetime picker initialization.
    // See http://eonasdan.github.io/bootstrap-datetimepicker/

    $('.datepicker').datetimepicker({
        format: "DD.MM.YYYY",
        icons: {
            time: 'far fa-clock',
            date: 'fas fa-calendar',
            up: 'fas fa-chevron-up',
            down: 'fas fa-chevron-down',
            previous: 'fas fa-chevron-left',
            next: 'fas fa-chevron-right',
            today: 'fas fa-check-circle',
            clear: 'fas fa-trash',
            close: 'fas fa-remove'
        }
    });

    $('.datetimepicker').datetimepicker({
        icons: {
            time: 'far fa-clock',
            date: 'fas fa-calendar',
            up: 'fas fa-chevron-up',
            down: 'fas fa-chevron-down',
            previous: 'fas fa-chevron-left',
            next: 'fas fa-chevron-right',
            today: 'fas fa-check-circle',
            clear: 'fas fa-trash',
            close: 'fas fa-remove'
        }
    });

    $(".statistics_datetimepicker").datetimepicker({
        format: "MM.YYYY",
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

    var dateTimePickerConfigWithDay = {
        format: "DD.MM.YYYY",
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
    };
    let dateTimePickerConfigMonth = {
        format: "MM",
        viewDate: 'true',
        //maxDate: (new Date().getMonth() + 1).toString(),
        //maxDate: "now",
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
    };

    let dateTimePickerConfigDay = {
        format: "DD",
        viewDate: 'true',
        maxDate: "now",
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
    };
    let dateTimePickerConfigYear = {
        format: "YYYY",
        //maxDate: new Date().getFullYear().toString(),
        maxDate: "now",
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
    };
    var dateTimePickerConfigWithHourFrom = {
        format: "DD.MM.YYYY HH:mm",
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
    };
    var dateTimePickerDeadline = {
       format: "DD.MM.yyyy HH:mm",
        minDate: "now",
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
    };
    var dateTimePickerConfigWithHourTo = {
        format: "DD.MM.YYYY HH:mm",
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
    };

    $(".filter_datetimepicker.js--with-hour-from").datetimepicker(dateTimePickerConfigWithHourFrom);
    $(".filter_datetimepicker.js--with-hour-to").datetimepicker(dateTimePickerConfigWithHourTo);
    $(".filter_datetimepicker").datetimepicker(dateTimePickerConfigWithDay);

    let globalDate = moment().subtract(1, "days"); //.subtract(1, 'months');

    if ($(".datetimepicker-year").length) {
        $(".datetimepicker-year").datetimepicker(dateTimePickerConfigYear);
        $(".datetimepicker-year").data("DateTimePicker").date(globalDate);
    }

    if ($(".datetimepicker-month").length) {
        $(".datetimepicker-month").datetimepicker(dateTimePickerConfigMonth);
        $(".datetimepicker-month").data("DateTimePicker").date(globalDate);
    }

    if ($(".datetimepicker-day").length) {
        $(".datetimepicker-day").datetimepicker(dateTimePickerConfigDay);
        // $('.datetimepicker-day').data("DateTimePicker").date(moment().subtract(1, 'days').format("DD"));
        $(".datetimepicker-day").data("DateTimePicker").date(globalDate);
    }

    if ($(".js--date-time-picker-full").length) {
        $(".js--date-time-picker-full").datetimepicker(dateTimePickerDeadline);
    }
    const setMonthEndAndFirstDay = (datepickerObj) => {

        let maxDate = moment();
        if (globalDate.format('YYYY-MM-DD') !== moment().format('YYYY-MM-DD')) {
            let monthEnd = globalDate.clone();
            monthEnd.set('date', monthEnd.daysInMonth()); // set last day of month
            maxDate = monthEnd;
        }
        datepickerObj.maxDate(maxDate);
        datepickerObj.date(globalDate);
    };

    $(".datetimepicker-year").on("dp.change", function (e) {
        let pickerYear = e.date.format('YYYY');

        // if year has changed
        if (pickerYear !== globalDate.format('YYYY')) {
            globalDate.set('year', pickerYear);
            globalDate.set('date', 1); // allways change the day to 1, use "date" setting "day" is day of week
            setMonthEndAndFirstDay($('.datetimepicker-day').data("DateTimePicker"));
        }
    });

    $(".datetimepicker-month").on("dp.change", function (e) {
        let pickerMonth = e.date.format('MM');

        // if month has changed
        if (pickerMonth !== globalDate.format('MM')) {
            globalDate.set('month', pickerMonth - 1);  // in momentjs 03 is april
            globalDate.set('date', 1); // allways change the day to 1, use "date" setting "day" is day of week

            setMonthEndAndFirstDay($('.datetimepicker-day').data("DateTimePicker"));
        }
    });

    $(".filter_datetimepicker.is--date-from").on("dp.change", function (e) {
        $('.filter_datetimepicker.is--date-to').data("DateTimePicker").minDate(e.date);
    });
    $(".filter_datetimepicker.is--date-to").on("dp.change", function (e) {
        $('.filter_datetimepicker.is--date-from').data("DateTimePicker").maxDate(e.date);
    });

    $('.user_log_datetimepicker').datetimepicker(dateTimePickerConfigWithDay);
    $('.vehicle_log_datetimepicker').datetimepicker(dateTimePickerConfigWithDay);


    $('.user_log_edit_tasks_datetimepicker.js--user-log-edit-tasks--date-from').datetimepicker(dateTimePickerConfigWithDay);
    $('.user_log_edit_tasks_datetimepicker.js--user-log-edit-tasks--date-to').datetimepicker(dateTimePickerConfigWithDay);

    $(".user_log_edit_tasks_datetimepicker.js--user-log-edit-tasks--date-from").on("dp.change", function (e) {
        $('.user_log_edit_tasks_datetimepicker.js--user-log-edit-tasks--date-to').data("DateTimePicker").minDate(e.date);
    });

    $(".user_log_edit_tasks_datetimepicker.js--user-log-edit-tasks--date-to").on("dp.change", function (e) {
        $('.user_log_edit_tasks_datetimepicker.js--user-log-edit-tasks--date-from').data("DateTimePicker").maxDate(e.date);
    });


    // $(".user_log_datetimepicker.is--date-from").on("dp.change", function (e) {
    //     $('.user_log_datetimepicker.is--date-to').data("DateTimePicker").minDate(e.date);
    // });
    // $(".user_log_datetimepicker.is--date-to").on("dp.change", function (e) {
    //     $('.user_log_datetimepicker.is--date-from').data("DateTimePicker").maxDate(e.date);
    // });


    if (!$.fn.isDateSupported()) {
        $('.invitation_datetimepicker').datetimepicker(dateTimePickerConfigWithDay);
    }

    $('.profile_datetimepicker').datetimepicker(dateTimePickerConfigWithDay);

    // // Bootstrap-tagsinput initialization
    // // http://bootstrap-tagsinput.github.io/bootstrap-tagsinput/examples/
    // var $input = $('input[data-bs-toggle="tagsinput"]');
    // if ($input.length) {
    //     var source = new Bloodhound({
    //         local: $input.data('tags'),
    //         queryTokenizer: Bloodhound.tokenizers.whitespace,
    //         datumTokenizer: Bloodhound.tokenizers.whitespace
    //     });
    //     source.initialize();
    //
    //     $input.tagsinput({
    //         trimValue: true,
    //         focusClass: 'focus',
    //         typeaheadjs: {
    //             name: 'tags',
    //             source: source.ttAdapter()
    //         }
    //     });
    // }

    // Disallow multiple roles
    // if ( $('#user_edit_roles').length ) {
    //     $('#user_edit_roles .form-check-input').change(function(){
    //         $('#user_edit_roles .form-check-input').not(this).prop('checked', false);
    //         $(this).prop('checked', true);
    //     });
    // }

    // Fixed menü nur für die Vollversion der Website
    if ( $(window).width() > 992){
        var table = $('.datatable').DataTable();
        table.fixedHeader.disable();

        $(window).scroll(function () {
            if ($(this).scrollTop() > 64) {
                $('.topbar').addClass('fixed');
            } else if ($(this).scrollTop() < 64) {
                $('.topbar').removeClass('fixed');
            }
        });
    }
    //eine asynchrone Funktion erstellen, die nach dem Laden aller Stile ausgelöst wird und die Größe aller erforderlichen Blöcke korrekt berechnen kann
    setTimeout(function () {
        let el = $('#main-wrapper');
        //Hinzufügen einer Prüfung, ob das Thema und der Navigationsort zur benutzerdefinierten Variante gehören, um die Standardthemen nicht zu beeinträchtigen.
        if (el.data('layout') === 'horizontal' && el.data('navbarbg') === 'skin6') {
            let window_width = $(window).width();
            let nav_bar_childer = $('.navbar').children();
            //Ermitteln der Breite aller Navigationselemente
            let nav_bar_width = 0;
            $(nav_bar_childer).each(function () {
                nav_bar_width += $(this).width();
            });
            //Wenn die Breite der Navigationselemente größer ist als die Bildschirmbreite, blenden Sie die Icons der Navigationselemente aus
            if (nav_bar_width > window_width) {
                //add class fop hide icon
                $('#sidebarnav').addClass('css--hide-icon');
            }
        }
    }, 200);

// init,configure dropzone
    Dropzone.autoDiscover = false;

    if ( $(".dropzone").length ) {

        let dropzoneOrderUpload = new Dropzone(".dropzone", DropzoneOptions);

        $('.js-dropzone-send').click(function (e) {
            e.preventDefault();
            dropzoneOrderUpload.processQueue();
        });

    }
});
