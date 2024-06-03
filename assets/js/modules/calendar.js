/*========Calender Js=========*/
/*==========================*/

import {Calendar} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';
import deLocale from '@fullcalendar/core/locales/de';

const calendarJs = function ($, Routing) {

    /*=================*/
    // Calender day status
    /*=================*/
    var calendarsEvents = {
        Normal: "normal",
        Urlaub: "vacation",
        Krank: "sick",
    };
    /*=====================*/
    // Calendar Elements and options
    /*=====================*/
    var calendarEl = document.querySelector("#calendar-body");

    if ( calendarEl ) {

        var checkWidowWidth = function () {
            if (window.innerWidth <= 1199) {
                return true;
            } else {
                return false;
            }
        };
        var calendarHeaderToolbar = {
            left: "prev next addEventButton",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
        };
        /*=====================*/
        // Calendar get Data
        /*=====================*/
        const getDataForCalendar = (date) => {
            let date_from = date.startStr;
            let date_to = date.endStr;
            let employee_id = $('#calendar-body').data('employee-id');
            let data = {
                date_from,
                date_to,
                employee_id
            };
            let result = '';
            $.ajax({
                type: 'POST',
                url: App.Routing.generate('admin_employee_data_for_calendar'),
                data: data,
                dataType: "json",
                async: false,
                success: function (data) {
                    result = data;
                },
                error: function (e) {
                    console.log(e);
                }
            });
            return result;
        }


        let calendar = new Calendar(calendarEl, {
            plugins: [dayGridPlugin, timeGridPlugin, listPlugin, bootstrap5Plugin],
            locale: deLocale,
            themeSystem: 'bootstrap5',
            selectable: false,
            initialView: 'dayGridMonth',
            height: checkWidowWidth() ? 900 : 1052,
            firstDay: 1,
            lazyFetching: false,
            events: {
                url: App.Routing.generate('admin_employee_data_for_calendar'),
                method: 'POST',
                extraParams: function () { // add emloyee ID ror request data
                    let employee_id = $('#calendar-body').data('employee-id');
                    return {
                        employee_id
                    };
                }
            },
            headerToolbar: {
                left: 'prev,next',
                center: 'title',
                right: '',
            },
            eventClassNames: function ({event: calendarEvent}) {
                const getColorValue =
                    calendarsEvents[calendarEvent._def.extendedProps.calendar];
                return [
                    "event-fc-color fc-bg-" + getColorValue,
                ];
            },
        });

        //init calendar
        $('.js--init-calendar').click(function (e) {
            calendar.render();
        });
    }
};
export default calendarJs;