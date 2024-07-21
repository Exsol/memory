require('eonasdan-bootstrap-datetimepicker');
require('bootstrap-tagsinput');
require('sweetalert2');
require('bootstrap4-duallistbox');

require('./app.init.duallistbox');

import moment from 'moment';
import Dropzone from "dropzone";

$(function () {

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

    const dateTimePickerConfigWithDay = {
        format: "DD.MM.YYYY",
        locale: 'ru',
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

    $(function(){
        if ($(".js--datetimepicker").length) {
            console.log('init js--datetimepicker');
            $('.js--datetimepicker').datetimepicker(dateTimePickerConfigWithDay);
        }
        $('.datepicker').datetimepicker({
            format: "DD.MM.YYYY",
            locale: 'ru',
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
    });




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

    setTimeout(function () {
        let el = $('#main-wrapper');

        if (el.data('layout') === 'horizontal' && el.data('navbarbg') === 'skin6') {
            let window_width = $(window).width();
            let nav_bar_childer = $('.navbar').children();

            let nav_bar_width = 0;
            $(nav_bar_childer).each(function () {
                nav_bar_width += $(this).width();
            });

            if (nav_bar_width > window_width) {

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
