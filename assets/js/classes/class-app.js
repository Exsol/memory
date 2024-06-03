import {DateTime} from "@eonasdan/tempus-dominus";
import FormAjaxLoader from "./class-form-ajax-loader";
import bootbox from "../../extra-libs/bootbox-5";

var Swal = global.Swal = require('sweetalert2');


// const swalWithBootstrapButtons = Swal.mixin({
//     customClass: {
//         confirmButton: 'btn btn-success',
//         cancelButton: 'btn btn-danger'
//     },
//     buttonsStyling: false
// });

class App {

    static lockUnlockDailyReport(action, target) {

        var title = '';
        var text = 'Sind Sie sicher?';
        var icon = 'warning';
        var confirmButtonText = 'Ja';

        switch (action) {
            case 'lock':
                title = 'Tagesbericht sperren';
                text = 'Sind Sie sicher?';
                confirmButtonText = 'Ja, sperren';
                break;
            case 'unlock':
                title = 'Tagesbericht entsperren';
                text = 'Sind Sie sicher?';
                confirmButtonText = 'Ja, entsperren';
                break;
        }

        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            showCancelButton: true,
            confirmButtonText: confirmButtonText,
            cancelButtonText: 'Nein, abbrechen',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                document.location.href = target;
                // swalWithBootstrapButtons.fire(
                //     'Deleted!',
                //     'Your file has been deleted.',
                //     'success'
                // );
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                // swalWithBootstrapButtons.fire(
                //     'Cancelled',
                //     'Your imaginary file is safe :)',
                //     'error'
                // );
            }
        });
    }


    static userAbsenceChangeStatus(action, target, token, callbackFunction) {

        var title = '';
        var confirmText = 'Die Daten wurden erfolgreich gespeichert.';
        var text = 'Sind Sie sicher?';
        var icon = 'warning';
        var confirmButtonText = 'Ja';

        switch (action) {
            case 'confirm':
                title = 'Abwesenheit bestätigen';
                text = 'Sind Sie sicher?';
                confirmButtonText = 'Ja, bestätigen';
                confirmText = 'Die Abwesenheit wurde erfolgreich bestätigt.';
                break;
            case 'decline':
                title = 'Abwesenheit ablehnen';
                text = 'Sind Sie sicher?';
                confirmButtonText = 'Ja, ablehnen';
                confirmText = 'Die Abwesenheit wurde erfolgreich abgelehnt.';
                break;
            case 'delete':
                title = 'Abwesenheit löschen';
                text = 'Sind Sie sicher?';
                confirmButtonText = 'Ja, löschen';
                confirmText = 'Die Abwesenheit wurde erfolgreich gelöscht.';
                break;
        }

        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            showCancelButton: true,
            confirmButtonText: confirmButtonText,
            cancelButtonText: 'Nein, abbrechen',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                var data = {'action': action, 'token': token};

                $.ajax({
                    type: 'POST',
                    url: target,
                    dataType: 'json',
                    data: data,
                    cache: false,
                    // contentType: false,
                    // processData: false,
                    success: function (data) {
                        NProgress.done();
                        toastr.success('', confirmText);
                        callbackFunction();
                    },
                    error: function (e) {
                        toastr.error('', 'Das Formular enthält Fehler.');
                    }
                });


                // document.location.href = target;
                // swalWithBootstrapButtons.fire(
                //     'Deleted!',
                //     'Your file has been deleted.',
                //     'success'
                // );
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                // swalWithBootstrapButtons.fire(
                //     'Cancelled',
                //     'Your imaginary file is safe :)',
                //     'error'
                // );
            }
        });
    }

    static userFileDelete(target, fileIds, token, callbackFunction, callbackData) {

        const title = 'Löschung von Daten';
        const confirmText = 'Die Daten wurden erfolgreich gelöscht.';
        const text = 'Sind Sie sicher?';
        const icon = 'warning';
        const confirmButtonText = 'Ja, löschen';
        const cancelButtonText = 'Nein, abbrechen';

        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            showCancelButton: true,
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText,
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                var data = {fileIds: fileIds, 'token': token};

                $.ajax({
                    type: 'POST',
                    url: target,
                    dataType: 'json',
                    data: data,
                    cache: false,
                    success: function (data) {
                        NProgress.done();
                        toastr.success('', confirmText);
                        callbackFunction(callbackData);
                    },
                    error: function (e) {
                        toastr.error('', 'Das Formular enthält Fehler.');
                    }
                });

            }
        });
    }

    static todoMessageDelete(target,messageId,targetUpdate,token) {

        const title = 'Löschen einer Nachricht';
        const confirmText = 'Die Daten wurden erfolgreich gelöscht.';
        const text = 'Sind Sie sicher?';
        const icon = 'warning';
        const confirmButtonText = 'Ja, löschen';
        const cancelButtonText = 'Nein, abbrechen';

        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            showCancelButton: true,
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText,
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                var data = {messageId: messageId, 'token': token};

                $.ajax({
                    type: 'POST',
                    url: target,
                    dataType: 'json',
                    data: data,
                    cache: false,
                    beforeSend: function () {
                        $(targetUpdate).addClass('load-block');
                    },
                    success: function (data) {
                        NProgress.done();
                        toastr.success('', confirmText);
                        if (data.length > 0){
                            $(targetUpdate).html(data);
                            $(targetUpdate).removeClass('load-block');
                        }
                    },
                    error: function (e) {
                        toastr.error('', 'Das Formular enthält Fehler.');
                    }
                });

            }
        });
    }

    static confirmTodo(target,applyBy,token) {

        const title = 'Bestätigung der Ausführung der Aufgabe';
        const text = 'Sind Sie sicher?';
        const icon = 'warning';
        const confirmButtonText = 'Ja';
        const cancelButtonText = 'Nein';

        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            showCancelButton: true,
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText,
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                var data = {applyBy,token};

                $.ajax({
                    type: 'POST',
                    url: target,
                    data: data,
                    cache: false,
                    success: function (data) {
                        NProgress.done();
                        toastr.success('', data);
                        window.location.reload();
                    },
                    error: function (data) {
                        toastr.error('', 'Das Formular enthält Fehler.');
                        console.log(data);
                    }
                });

            }
        });
    }

    static processingTodo(target,token) {

        const title = 'Sie diese Aufgabe übernehmen wollen';
        const text = 'Sind Sie sicher?';
        const icon = 'warning';
        const confirmButtonText = 'Ja';
        const cancelButtonText = 'Nein';

        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            showCancelButton: true,
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText,
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                var data = {token};

                $.ajax({
                    type: 'POST',
                    url: target,
                    data: data,
                    cache: false,
                    success: function (data) {
                        NProgress.done();
                        toastr.success('', data);
                        setTimeout(function () {
                            window.location.reload();
                        }, 500);
                    },
                    error: function (data) {
                        toastr.error('', data);
                        console.log(data.responseText);
                    }
                });

            }
        });
    }

    static doneTodo(target,callback,token) {

        const title = 'Schließen Sie die Aufgabe';
        const text = 'Sind Sie sicher?';
        const icon = 'warning';
        const confirmButtonText = 'Ja';
        const cancelButtonText = 'Nein';

        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            showCancelButton: true,
            confirmButtonText: confirmButtonText,
            cancelButtonText: cancelButtonText,
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                var data = {token};
                $.ajax({
                    type: 'POST',
                    url: target,
                    data: data,
                    cache: false,
                    success: function (data) {
                        NProgress.done();
                        toastr.success('', data);
                        callback();
                    },
                    error: function (data) {
                        toastr.error('', 'Das Formular enthält Fehler.');
                        console.log(data)
                    }
                });

            }
        });
    }

    static receiptChangeStatusWithOutSwal(action, target, token, callbackFunction) {

        var data = {'action': action, 'token': token};

        var confirmText = 'Die Daten wurden erfolgreich gespeichert.';

        switch (action) {
            case 'book':
                confirmText = 'Der Beleg wurde erfolgreich bestätigt.';
                break;
            case 'unbook':
                confirmText = 'Der Belegbuchung wurde erfolgreich aufgehoben.';
                break;
        }

        $.ajax({
            type: 'POST',
            url: target,
            dataType: 'json',
            data: data,
            cache: false,
            success: function (data) {
                NProgress.done();
                toastr.success('', confirmText);
                callbackFunction(action);
            },
            error: function (e) {
                toastr.error('', 'Das Formular enthält Fehler.');
            }
        })

    }

    static receiptChangeStatus(action, target, token, callbackFunction) {

        var title = '';
        var confirmText = 'Die Daten wurden erfolgreich gespeichert.';
        var text = 'Sind Sie sicher?';
        var icon = 'warning';
        var confirmButtonText = 'Ja';

        switch (action) {
            case 'book':
                title = 'Beleg buchen';
                text = 'Sind Sie sicher?';
                confirmButtonText = 'Ja, buchen';
                confirmText = 'Der Beleg wurde erfolgreich bestätigt.';
                break;
            case 'unbook':
                title = 'Beleg Buchung aufheben';
                text = 'Sind Sie sicher?';
                confirmButtonText = 'Ja, aufheben';
                confirmText = 'Der Belegbuchung wurde erfolgreich aufgehoben.';
                break;
            case 'delete':
                title = 'Beleg löschen';
                text = 'Sind Sie sicher?';
                confirmButtonText = 'Ja, löschen';
                confirmText = 'Der Beleg wurde erfolgreich gelöscht.';
                break;
        }

        Swal.fire({
            title: title,
            text: text,
            icon: icon,
            showCancelButton: true,
            confirmButtonText: confirmButtonText,
            cancelButtonText: 'Nein, abbrechen',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                var data = {'action': action, 'token': token};

                $.ajax({
                    type: 'POST',
                    url: target,
                    dataType: 'json',
                    data: data,
                    cache: false,
                    // contentType: false,
                    // processData: false,
                    success: function (data) {
                        NProgress.done();
                        toastr.success('', confirmText);
                        callbackFunction();
                    },
                    error: function (e) {
                        toastr.error('', 'Das Formular enthält Fehler.');
                    }
                });

                // document.location.href = target;
                // swalWithBootstrapButtons.fire(
                //     'Deleted!',
                //     'Your file has been deleted.',
                //     'success'
                // );
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                // swalWithBootstrapButtons.fire(
                //     'Cancelled',
                //     'Your imaginary file is safe :)',
                //     'error'
                // );
            }
        });
    }


    static formvalidateAjax(fvClassName, fvFields, refreshCallback) {

        var fvClass = 'form.' + fvClassName;

        var fvAjax = $(fvClass).formValidation({
            fields: fvFields,
            plugins: {
                trigger: new Trigger(),
                bootstrap: new Bootstrap5({
                    rowSelector: function (field, ele) {
                        return '.form-field';
                    }
                }),
                // Validate fields when clicking the Submit button
                submitButton: new SubmitButton(),
                // Submit the form when all fields are valid
                //defaultSubmit: new DefaultSubmit(),
                icon: new Icon({
                    valid: 'fa fa-check',
                    invalid: 'fa fa-times',
                    validating: 'fa fa-refresh'
                })
            }
        });

        $(fvClass).data('formValidation').on('core.validator.validating', function (event) {
            App.disableSubmitButton(true, fvClass);
        }).on('core.field.invalid', function (event) {
            App.disableSubmitButton(true, fvClass);
        }).on('core.field.valid', function (event) {
            App.disableSubmitButton(false, fvClass);
        }).on('core.form.invalid', function (event) {
            App.disableSubmitButton(true, fvClass);
            toastr.error('', 'Das Formular enthält Fehler.');
        }).on('core.form.valid', function (event) {

            App.disableSubmitButton(true, fvClass);

            var $form = $(event.target),
                fvL = event.formValidation;

            NProgress.start();

            var formData = new FormData($(fvClass)[0]);

            $.ajax({
                type: 'POST',
                url: fvL.form.action,
                data: formData,
                cache: false,
                contentType: false,
                processData: false,
                success: function (data) {
                    NProgress.done();
                    toastr.success('', 'Die Daten wurden erfolgreich gespeichert.');

                    if (typeof refreshCallback !== 'undefined') {
                        refreshCallback();
                    }
                },
                error: function (e) {
                    App.disableSubmitButton(false, fvClass);
                    toastr.error('', 'Das Formular enthält Fehler.');
                }
            });

        });

    }

    static disableSubmitButton(b, cl) {
        $(cl + ' button[type="submit"]').prop('disabled', b);
    }


    static initEmployeeChart(className, tableClassName, url) {

        let ctx = $(className)[0].getContext('2d');

        Chart.defaults.scale.ticks.beginAtZero = true;

        let userChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: [],
                datasets: [
                    {
                        label: [],
                        backgroundColor: [],
                        data: [],
                    },
                ],
            },
            options: {
                legend: {display: false},
                title: {
                    display: true,
                    fontColor: "#b2b9bf",
                    text: "",
                },
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                fontColor: "#b2b9bf",
                                fontSize: 12,
                                // beginAtZero: true,
                            },
                        },
                    ],
                    xAxes: [
                        {
                            ticks: {
                                fontColor: "#b2b9bf",
                                fontSize: 12,
                            },
                        },
                    ],
                },
            },
        });


        ajax_chart(userChart, url);

        // function to update our chart
        function ajax_chart(chart, url, data) {
            data = data || {};

            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: data
            }).done(function (response) {
                var responseData = response.data || {};
                var responseOptions = response.options || {};
                var responseTable = response.table || {};

                if (responseData.labels.length === 0) {
                    $('.js--employee-stats-no-data').removeClass('is--hidden');
                    $('.js--employee-stats').addClass('is--hidden');
                } else {
                    $('.js--employee-stats-no-data').addClass('is--hidden');
                    $('.js--employee-stats').removeClass('is--hidden');
                    chart.data.labels = responseData.labels.slice(4, 10);
                    chart.data.datasets[0].data = responseData.datasets[0].data.slice(4, 10);
                    chart.data.datasets[0].label = responseData.datasets[0].label.slice(4, 10);
                    chart.data.datasets[0].backgroundColor = responseData.datasets[0].backgroundColor;

                    chart.options.title.text = responseOptions.title.text;
                    chart.update(); // finally update our chart
                }

                const userTableTitleData = response.data.labels;
                const userTableRowData = response.data.datasets[0].data;
                var result = userTableRowData.reduce(function (result, field, index) {
                    result[userTableTitleData[index]] = field;
                    return result;
                }, {});
                $('.userDashboardTable').empty();
                $('.userExtendTable').empty();
                var index = 0;
                $.each(result, function (i, data) {
                    index++;
                    if (index > 4 && index < 11) {
                        $("table.userDashboardTable").append("<tr><th>" + i + "</th><td>" + data + "</td></tr>");
                    }
                    if (index <= 4) {
                        $("table.userExtendTable").append("<tr><th>" + i + "</th><td>" + data + "</td></tr>");
                    }
                    if (index == 11) {
                        $("table.userExtendTable").append("<tr><th>" + i + "</th><td>" + data + "</td></tr>");
                    }
                });

                if (responseTable.html.length === 0) {
                    $('.js--employee-stats-table').html('');
                } else {
                    $('.js--employee-stats-table').html(responseTable.html);
                    $('.js--employee-stats-table .js--editable').each(function () {
                        const $this = $(this);
                        const $parent = $this.parents('.js--editable-parent');
                        const id = $this.data('id');
                        const logid = $parent.data('id');

                        // const $parentlog = $this.parents('.js--editable-parent-log-item');
                        const logitemid = $this.data('logitemid');

                        // const user_id = $(this).data('user-id');

                        const token = $parent.data('token');
                        const type = $(this).data('type');
                        const name = $(this).data('name');
                        // const day = $(this).data('day');
                        const $resultText = $('.js--duration-text-' + id);

                        switch (type) {
                            case 'fulltime':

                                $(this).editable(App.Routing.generate('admin_user_log_save_ajax_data', {
                                    userLog: logid,
                                    name: name,
                                    userLogItem: logitemid
                                }), {
                                    loaddata: id,
                                    type: 'fulltime',
                                    submit: 'OK',
                                    cancel: 'X',
                                    loadtext: 'Lade...',
                                    placeholder: '----',
                                    tooltip: 'Klicken zum bearbeiten...',
                                    cancelcssclass: 'btn btn-xs btn-danger mr-1',
                                    submitcssclass: 'btn btn-xs btn-primary mr-1',
                                    // onblur: "submit",
                                    //submitdata : { 'csrf-token' : $('.js--csrf-token').val() },
                                    submitdata: {
                                        'token': token,
                                        'type': type,
                                        'name': name,
                                        'id': id,
                                        'logid': logid,
                                        'userLogItem': logitemid
                                    },
                                    onerror: function (settings, original, response) {
                                        var json = $.parseJSON(response.responseText);
                                        toastr.error('', json.message, {"closeButton": true});
                                    },
                                    callback: function (response, settings) {
                                        var json = $.parseJSON(response);
                                        $this.text(json.data.data_set);
                                        $resultText.text(json.data.duration);
                                        toastr.success('', json.message, {"closeButton": true});
                                        $('.js--employee-stats-form').submit();
                                    }
                                });

                                break;
                            case 'select':
                                $(this).editable(App.Routing.generate('admin_user_log_save_ajax_data', {
                                    userLog: logid,
                                    name: name,
                                    userLogItem: logitemid
                                }), {
                                    loaddata: id,
                                    type: 'select',
                                    loadurl: App.Routing.generate('admin_user_log_load_ajax_data', {
                                        userLog: logid,
                                        name: name,
                                        userLogItem: logitemid
                                    }),
                                    submit: 'OK',
                                    cancel: 'X',
                                    loadtext: 'Lade...',
                                    placeholder: '----',
                                    tooltip: 'Klicken zum bearbeiten...',
                                    cancelcssclass: 'btn btn-xs btn-danger mr-1',
                                    submitcssclass: 'btn btn-xs btn-primary ml-2 mr-1',
                                    // onblur: "submit",
                                    //submitdata : { 'csrf-token' : $('.js--csrf-token').val() },
                                    submitdata: {
                                        'token': token,
                                        'type': type,
                                        'name': name,
                                        'id': id,
                                        'logid': logid,
                                        'userLogItem': logitemid
                                    },
                                    onerror: function (settings, original, response) {
                                        var json = $.parseJSON(response.responseText);
                                        toastr.error('', json.message, {"closeButton": true});
                                    },

                                    callback: function (response, settings) {
                                        var json = $.parseJSON(response);
                                        $this.text(json.data.data_set);
                                        $resultText.text(json.data.duration);
                                        toastr.success('', json.message, {"closeButton": true});
                                        $('.js--employee-stats-form').submit();
                                    }
                                });
                                break;

                            case 'text':
                            case 'textarea':
                                $(this).editable(App.Routing.generate('admin_user_log_save_ajax_data', {
                                    userLog: logid,
                                    name: name,
                                    userLogItem: logitemid
                                }), {
                                    loaddata: id,
                                    type: type,
                                    loadurl: App.Routing.generate('admin_user_log_load_ajax_data', {
                                        userLog: logid,
                                        name: name,
                                        userLogItem: logitemid
                                    }),
                                    submit: 'OK',
                                    cancel: 'X',
                                    loadtext: 'Lade...',
                                    placeholder: '----',
                                    tooltip: 'Klicken zum bearbeiten...',
                                    cancelcssclass: 'btn btn-xs btn-danger mr-1',
                                    submitcssclass: 'btn btn-xs btn-primary ml-2 mr-1',
                                    // onblur: "submit",
                                    //submitdata : { 'csrf-token' : $('.js--csrf-token').val() },
                                    submitdata: {
                                        'token': token,
                                        'type': type,
                                        'name': name,
                                        'id': id,
                                        'logid': logid,
                                        'userLogItem': logitemid
                                    },
                                    onerror: function (settings, original, response) {
                                        var json = $.parseJSON(response.responseText);
                                        toastr.error('', json.message, {"closeButton": true});
                                    },

                                    callback: function (response, settings) {
                                        var json = $.parseJSON(response);
                                        $this.text(json.data.data_set);
                                        $resultText.text(json.data.duration);
                                        toastr.success('', json.message, {"closeButton": true});
                                        $('.js--employee-stats-form').submit();
                                    }
                                });
                                break;

                        }

                    });

                    $('.js--ajax-edit').each(function () {
                        const $this = $(this);
                        $this.click(function (e) {
                            e.preventDefault();

                            App.ajaxEdit($this);

                            // var data = $this.data('params');
                            // var url = $this.data('action');
                            // var size = $this.data('size');
                            // var sf = ''; // 'hide';
                            // BootboxApp.bootboxDialog(url, data, size, sf);
                        });
                    });
                }
            });

            // $.getJSON(url, data).done(function(response) {
            //     chart.data.labels = response.data.labels;
            //     chart.data.datasets[0].data = response.data.datasets[0].data;
            //     chart.data.datasets[0].label = response.data.datasets[0].label;
            //     chart.data.datasets[0].backgroundColor = response.data.datasets[0].backgroundColor;
            //
            //     chart.options.title.text = response.options.title.text;
            //     chart.update(); // finally update our chart
            // });
        }

        $('.js--employee-stats-form').submit(function (e) {
            e.preventDefault();
            var form = $(this);
            var form_data = form.serialize();

            // set cookies when selected
            var dateFrom = $('.js--filter--date-from').val();
            var dateTo = $('.js--filter--date-to').val();
            Cookies.set('date_from', dateFrom, {expires: 30});
            Cookies.set('date_to', dateTo, {expires: 30});

            ajax_chart(userChart, url, form_data);
            return false;
        });

    }


    static initDashboardStats(className, classDashboardPerformances, urlAreaPerformances) {

        // function to update our chart
        function submitForm(data) {
            data = data || {};

            loadAreaPerformances(data);
        }

        function loadAreaPerformances(data) {
            data = data || {};

            $.ajax({
                url: urlAreaPerformances,
                method: 'POST',
                dataType: 'json',
                data: data,
                success: function (data) {
                    console.log(data);
                },
                error: function (data) {
                    console.log(data.responseText);
                }
            }).done(function (response) {
                console.log(response);

                // var responseData = response.data || {};
                // var responseOptions = response.options || {};
                // var responseTable = response.table || {};
                // if (responseTable.html.length === 0) {
                //     $(classDashboardPerformances).html('');
                // } else {
                //     //
                // }
            });
        }

        submitForm();

        $('.js--dashboard-stats-form').submit(function (e) {
            e.preventDefault();
            var form = $(this);
            var form_data = form.serialize();

            // set cookies when selected
            var dateFrom = $('.js--filter--date-from').val();
            var dateTo = $('.js--filter--date-to').val();
            Cookies.set('date_from', dateFrom, {expires: 30});
            Cookies.set('date_to', dateTo, {expires: 30});

            submitForm(form_data);
            return false;
        });

    }


    static initEmployeeTaskEdit(className, tableClassName, url) {

        // ajaxLoad(url);
        function ajaxLoad(url, data) {
            data = data || {};

            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: data
            }).done(function (response) {
                var responseData = response.data || {};
                var responseOptions = response.options || {};
                var responseTable = response.table || {};

                if (responseTable.html.length === 0) {
                    $(tableClassName).html('');
                } else {
                    $(tableClassName).html(responseTable.html);
                    $(tableClassName + ' .js--editable').each(function () {
                        const $this = $(this);
                        const $parent = $this.parents('.js--editable-parent');
                        const id = $this.data('id');
                        const logid = $parent.data('id');

                        // const $parentlog = $this.parents('.js--editable-parent-log-item');
                        const logitemid = $this.data('logitemid');

                        // const user_id = $(this).data('user-id');

                        const token = $parent.data('token');
                        const type = $(this).data('type');
                        const name = $(this).data('name');
                        // const day = $(this).data('day');
                        const $resultText = $('.js--duration-text-' + id);

                        switch (type) {
                            case 'fulltime':

                                $(this).editable(App.Routing.generate('admin_user_log_save_ajax_data', {
                                    userLog: logid,
                                    name: name,
                                    userLogItem: logitemid
                                }), {
                                    loaddata: id,
                                    type: 'fulltime',
                                    submit: 'OK',
                                    cancel: 'X',
                                    loadtext: 'Lade...',
                                    placeholder: '----',
                                    tooltip: 'Klicken zum bearbeiten...',
                                    cancelcssclass: 'btn btn-xs btn-danger mr-1',
                                    submitcssclass: 'btn btn-xs btn-primary mr-1',
                                    // onblur: "submit",
                                    //submitdata : { 'csrf-token' : $('.js--csrf-token').val() },
                                    submitdata: {
                                        'token': token,
                                        'type': type,
                                        'name': name,
                                        'id': id,
                                        'logid': logid,
                                        'userLogItem': logitemid
                                    },
                                    onerror: function (settings, original, response) {
                                        var json = $.parseJSON(response.responseText);
                                        toastr.error('', json.message, {"closeButton": true});
                                    },
                                    callback: function (response, settings) {
                                        var json = $.parseJSON(response);
                                        $this.text(json.data.data_set);
                                        $resultText.text(json.data.duration);
                                        toastr.success('', json.message, {"closeButton": true});
                                        $('.js--user-log-edit-tasks-form').submit();
                                    }
                                });

                                break;
                            case 'select':
                                $(this).editable(App.Routing.generate('admin_user_log_save_ajax_data', {
                                    userLog: logid,
                                    name: name,
                                    userLogItem: logitemid
                                }), {
                                    loaddata: id,
                                    type: 'select',
                                    loadurl: App.Routing.generate('admin_user_log_load_ajax_data', {
                                        userLog: logid,
                                        name: name,
                                        userLogItem: logitemid
                                    }),
                                    submit: 'OK',
                                    cancel: 'X',
                                    loadtext: 'Lade...',
                                    placeholder: '----',
                                    tooltip: 'Klicken zum bearbeiten...',
                                    cancelcssclass: 'btn btn-xs btn-danger mr-1',
                                    submitcssclass: 'btn btn-xs btn-primary ml-2 mr-1',
                                    // onblur: "submit",
                                    //submitdata : { 'csrf-token' : $('.js--csrf-token').val() },
                                    submitdata: {
                                        'token': token,
                                        'type': type,
                                        'name': name,
                                        'id': id,
                                        'logid': logid,
                                        'userLogItem': logitemid
                                    },
                                    onerror: function (settings, original, response) {
                                        var json = $.parseJSON(response.responseText);
                                        toastr.error('', json.message, {"closeButton": true});
                                    },

                                    callback: function (response, settings) {
                                        var json = $.parseJSON(response);
                                        $this.text(json.data.data_set);
                                        $resultText.text(json.data.duration);
                                        toastr.success('', json.message, {"closeButton": true});
                                        $('.js--user-log-edit-tasks-form').submit();
                                    }
                                });
                                break;

                            case 'text':
                            case 'textarea':
                                $(this).editable(App.Routing.generate('admin_user_log_save_ajax_data', {
                                    userLog: logid,
                                    name: name,
                                    userLogItem: logitemid
                                }), {
                                    loaddata: id,
                                    type: type,
                                    loadurl: App.Routing.generate('admin_user_log_load_ajax_data', {
                                        userLog: logid,
                                        name: name,
                                        userLogItem: logitemid
                                    }),
                                    submit: 'OK',
                                    cancel: 'X',
                                    loadtext: 'Lade...',
                                    placeholder: '----',
                                    tooltip: 'Klicken zum bearbeiten...',
                                    cancelcssclass: 'btn btn-xs btn-danger mr-1',
                                    submitcssclass: 'btn btn-xs btn-primary ml-2 mr-1',
                                    // onblur: "submit",
                                    //submitdata : { 'csrf-token' : $('.js--csrf-token').val() },
                                    submitdata: {
                                        'token': token,
                                        'type': type,
                                        'name': name,
                                        'id': id,
                                        'logid': logid,
                                        'userLogItem': logitemid
                                    },
                                    onerror: function (settings, original, response) {
                                        var json = $.parseJSON(response.responseText);
                                        toastr.error('', json.message, {"closeButton": true});
                                    },

                                    callback: function (response, settings) {
                                        var json = $.parseJSON(response);
                                        $this.text(json.data.data_set);
                                        $resultText.text(json.data.duration);
                                        toastr.success('', json.message, {"closeButton": true});
                                        $('.js--user-stats-form').submit();
                                    }
                                });
                                break;
                        }

                    });

                    $('.js--ajax-edit').each(function () {
                        const $this = $(this);
                        $this.click(function (e) {
                            e.preventDefault();

                            App.ajaxEdit($this);
                        });
                    });

                    $('.js--userlog-done-check-all').click(function (e) {

                        var qtyCheckBoxes = $('.js--userlog-done-check').length;
                        var qtyCheckboxesChecked = 0;

                        $('.js--userlog-done-check').each(function () {
                            if ($(this).is(':checked')) {
                                qtyCheckboxesChecked++;
                            }
                        });

                        if (qtyCheckBoxes == qtyCheckboxesChecked) {
                            $('.js--userlog-done-check').prop('checked', false);
                        } else {
                            $('.js--userlog-done-check').prop('checked', true);
                        }

                    });


                    $('.js--userlog-done-button').click(function () {
                        const $this = $(this);
                        const $parent = $this.parents('.js--editable-parent');
                        const id = $parent.data('id');

                        const data = {'ids': [id]};

                        $.ajax({
                            url: App.Routing.generate('admin_user_log_ajax_set_done'),
                            method: 'POST',
                            dataType: 'json',
                            data: data
                        }).done(function (response) {
                            $('.js--user-log-edit-tasks-form').submit();
                        });
                    });


                    $('.js--userlog-done-button-all').click(function () {

                        let data = {'ids': []};
                        $('.js--userlog-done-check').each(function () {
                            if ($(this).is(':checked')) {
                                data.ids.push($(this).val());
                            }
                        });

                        $.ajax({
                            url: App.Routing.generate('admin_user_log_ajax_set_done'),
                            method: 'POST',
                            dataType: 'json',
                            data: data
                        }).done(function (response) {
                            $('.js--user-log-edit-tasks-form').submit();
                        });
                    });

                }
            });

        }

        $('.js--user-log-edit-tasks-form').submit(function (e) {
            e.preventDefault();
            var form = $(this);
            var form_data = form.serialize();

            // set cookies when selected
            var dateFrom = $('.js--user-log-edit-tasks--date-from').val();
            var dateTo = $('.js--user-log-edit-tasks--date-to').val();
            var company = $('.js--user-log-edit-tasks--company').val();
            var region = $('.js--user-log-edit-tasks--region').val();
            var hub = $('.js--user-log-edit-tasks--hub').val();

            Cookies.set('date_from', dateFrom, {expires: 30});
            Cookies.set('date_to', dateTo, {expires: 30});
            Cookies.set('company', company, {expires: 30});
            Cookies.set('region', region, {expires: 30});
            Cookies.set('hub', hub, {expires: 30});

            ajaxLoad(url, form_data);
            return false;
        });


        $('.js--user-log-edit-tasks-region').on('change', function (e) {
            e.preventDefault();
            FormAjaxLoader.setHubs('.js--user-log-edit-tasks-region', '.js--user-log-edit-tasks-hub', '.js--spinner-hub');
        });


    }


    static initEmployeeTaskEditLog(className, tableClassName, url) {

        ajaxLoad(url);

        function ajaxLoad(url) {
            var data = {};

            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: data
            }).done(function (response) {
                var responseData = response.data || {};
                var responseOptions = response.options || {};
                var responseTable = response.table || {};

                if (responseTable.html.length === 0) {
                    $(tableClassName).html('');
                } else {
                    $(tableClassName).html(responseTable.html);
                    $(tableClassName + ' .js--editable').each(function () {
                        const $this = $(this);
                        const $parent = $this.parents('.js--editable-parent');
                        const id = $this.data('id');
                        const logid = $parent.data('id');

                        // const $parentlog = $this.parents('.js--editable-parent-log-item');
                        const logitemid = $this.data('logitemid');

                        const token = $parent.data('token');
                        const type = $(this).data('type');
                        const name = $(this).data('name');
                        // const day = $(this).data('day');
                        const $resultText = $('.js--duration-text-' + id);

                        switch (type) {
                            case 'fulltime':

                                $(this).editable(App.Routing.generate('admin_user_log_save_ajax_data', {
                                    userLog: logid,
                                    name: name,
                                    userLogItem: logitemid
                                }), {
                                    loaddata: id,
                                    type: 'fulltime',
                                    submit: 'OK',
                                    cancel: 'X',
                                    loadtext: 'Lade...',
                                    placeholder: '----',
                                    tooltip: 'Klicken zum bearbeiten...',
                                    cancelcssclass: 'btn btn-xs btn-danger mr-1',
                                    submitcssclass: 'btn btn-xs btn-primary mr-1',
                                    // onblur: "submit",
                                    //submitdata : { 'csrf-token' : $('.js--csrf-token').val() },
                                    submitdata: {
                                        'token': token,
                                        'type': type,
                                        'name': name,
                                        'id': id,
                                        'logid': logid,
                                        'userLogItem': logitemid
                                    },
                                    onerror: function (settings, original, response) {
                                        var json = $.parseJSON(response.responseText);
                                        toastr.error('', json.message, {"closeButton": true});
                                    },
                                    callback: function (response, settings) {
                                        var json = $.parseJSON(response);
                                        $this.text(json.data.data_set);
                                        $resultText.text(json.data.duration);
                                        toastr.success('', json.message, {"closeButton": true});

                                        ajaxLoad(url);
                                    }
                                });

                                break;
                            case 'select':
                                $(this).editable(App.Routing.generate('admin_user_log_save_ajax_data', {
                                    userLog: logid,
                                    name: name,
                                    userLogItem: logitemid
                                }), {
                                    loaddata: id,
                                    type: 'select',
                                    loadurl: App.Routing.generate('admin_user_log_load_ajax_data', {
                                        userLog: logid,
                                        name: name,
                                        userLogItem: logitemid
                                    }),
                                    submit: 'OK',
                                    cancel: 'X',
                                    loadtext: 'Lade...',
                                    placeholder: '----',
                                    tooltip: 'Klicken zum bearbeiten...',
                                    cancelcssclass: 'btn btn-xs btn-danger mr-1',
                                    submitcssclass: 'btn btn-xs btn-primary ml-2 mr-1',
                                    // onblur: "submit",
                                    //submitdata : { 'csrf-token' : $('.js--csrf-token').val() },
                                    submitdata: {
                                        'token': token,
                                        'type': type,
                                        'name': name,
                                        'id': id,
                                        'logid': logid,
                                        'userLogItem': logitemid
                                    },
                                    onerror: function (settings, original, response) {
                                        var json = $.parseJSON(response.responseText);
                                        toastr.error('', json.message, {"closeButton": true});
                                    },

                                    callback: function (response, settings) {
                                        var json = $.parseJSON(response);
                                        $this.text(json.data.data_set);
                                        $resultText.text(json.data.duration);
                                        toastr.success('', json.message, {"closeButton": true});

                                        ajaxLoad(url);
                                    }
                                });
                                break;

                            case 'text':
                            case 'textarea':
                                $(this).editable(App.Routing.generate('admin_user_log_save_ajax_data', {
                                    userLog: logid,
                                    name: name,
                                    userLogItem: logitemid
                                }), {
                                    loaddata: id,
                                    type: type,
                                    loadurl: App.Routing.generate('admin_user_log_load_ajax_data', {
                                        userLog: logid,
                                        name: name,
                                        userLogItem: logitemid
                                    }),
                                    submit: 'OK',
                                    cancel: 'X',
                                    loadtext: 'Lade...',
                                    placeholder: '----',
                                    tooltip: 'Klicken zum bearbeiten...',
                                    cancelcssclass: 'btn btn-xs btn-danger mr-1',
                                    submitcssclass: 'btn btn-xs btn-primary ml-2 mr-1',
                                    // onblur: "submit",
                                    //submitdata : { 'csrf-token' : $('.js--csrf-token').val() },
                                    submitdata: {
                                        'token': token,
                                        'type': type,
                                        'name': name,
                                        'id': id,
                                        'logid': logid,
                                        'userLogItem': logitemid
                                    },
                                    onerror: function (settings, original, response) {
                                        var json = $.parseJSON(response.responseText);
                                        toastr.error('', json.message, {"closeButton": true});
                                    },

                                    callback: function (response, settings) {
                                        var json = $.parseJSON(response);
                                        $this.text(json.data.data_set);
                                        $resultText.text(json.data.duration);
                                        toastr.success('', json.message, {"closeButton": true});
                                        $('.js--user-stats-form').submit();
                                    }
                                });
                                break;
                        }

                    });


                    // remove status-buttons-all if no checkbox is available
                    if ($('.js--userlog-status-check').length == 0) {
                        $('.js--userlog-status-button-all').remove();
                    }


                    $('.js--ajax-edit').each(function () {
                        const $this = $(this);
                        $this.click(function (e) {
                            e.preventDefault();

                            App.ajaxEdit($this);
                        });
                    });

                    $('.js--userlog-status-check-all').click(function (e) {

                        var qtyCheckBoxes = $('.js--userlog-status-check').length;
                        var qtyCheckboxesChecked = 0;

                        $('.js--userlog-status-check').each(function () {
                            if ($(this).is(':checked')) {
                                qtyCheckboxesChecked++;
                            }
                        });

                        if (qtyCheckBoxes == qtyCheckboxesChecked) {
                            $('.js--userlog-status-check').prop('checked', false);
                        } else {
                            $('.js--userlog-status-check').prop('checked', true);
                        }

                    });


                    $('.js--userlog-status-button').click(function () {
                        const $this = $(this);
                        const $parent = $this.parents('.js--editable-parent');
                        const id = $parent.data('id');
                        const status = $(this).data('status');

                        const data = {'ids': [id], 'status': status};

                        $.ajax({
                            url: App.Routing.generate('admin_user_log_ajax_set_status'),
                            method: 'POST',
                            dataType: 'json',
                            data: data
                        }).done(function (response) {
                            ajaxLoad(url);
                        });
                    });

                    $('.js--userlog-delete-button').click(function () {
                        const $this = $(this);
                        const $parent = $this.parents('.js--editable-parent');
                        const id = $parent.data('id');
                        const token = $(this).data('token');

                        const data = {'ids': [id], 'token': token};

                        var icon = 'warning';
                        var title = 'Eintrag löschen';
                        var text = 'Sind Sie sicher?';
                        var confirmButtonText = 'Ja, löschen';

                        Swal.fire({
                            title: title,
                            text: text,
                            icon: icon,
                            showCancelButton: true,
                            confirmButtonText: confirmButtonText,
                            cancelButtonText: 'Nein, abbrechen',
                            reverseButtons: true
                        }).then((result) => {
                            if (result.isConfirmed) {

                                $.ajax({
                                    url: App.Routing.generate('admin_user_log_ajax_delete'),
                                    method: 'POST',
                                    dataType: 'json',
                                    data: data
                                }).done(function (response) {
                                    ajaxLoad(url);
                                });

                            } else if (
                                /* Read more about handling dismissals below */
                                result.dismiss === Swal.DismissReason.cancel
                            ) {
                                // swalWithBootstrapButtons.fire(
                                //     'Cancelled',
                                //     'Your imaginary file is safe :)',
                                //     'error'
                                // );
                            }
                        });

                    });


                    $('.js--userlog-status-button-all').click(function () {

                        const status = $(this).data('status');

                        let data = {'ids': [], 'status': status};
                        $('.js--userlog-status-check').each(function () {
                            if ($(this).is(':checked')) {
                                data.ids.push($(this).val());
                            }
                        });

                        $.ajax({
                            url: App.Routing.generate('admin_user_log_ajax_set_status'),
                            method: 'POST',
                            dataType: 'json',
                            data: data
                        }).done(function (response) {
                            ajaxLoad(url);
                        });
                    });


                }
            });

        }

    }

    static ajaxEdit($obj) {
        var data = $obj.data('params');
        var url = $obj.data('action');
        var size = $obj.data('size');
        var sf = ''; // 'hide';
        //$('.bootbox').modal('hide');
        bootbox.hideAll();
        setTimeout(function () {
            BootboxApp.bootboxDialog(url, data, size, sf);
        }, 500);
    }

    static initVehicleStats(tableClassName, url) {

        ajax_stats(url);

        function ajax_stats(url, data) {
            data = data || {};
            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: data
            }).done(function (response) {
                var responseTable = response.table || {};
                if (responseTable.html.length === 0) {
                    $('.js--vehicle-report-table').html('');
                    $('.js--vehicle-report-no-data').removeClass('is--hidden');
                } else {
                    $('.js--vehicle-report-table').html(responseTable.html);
                    $('.js--vehicle-report-no-data').addClass('is--hidden');
                }
            });
        }


        $('.js--vehicle-report-form').submit(function (e) {
            e.preventDefault();
            var form = $(this);
            var form_data = form.serialize();

            // set cookies when selected
            var dateFrom = $('.js--filter--date-from').val();
            var dateTo = $('.js--filter--date-to').val();
            Cookies.set('date_from', dateFrom, {expires: 30});
            Cookies.set('date_to', dateTo, {expires: 30});

            ajax_stats(url, form_data);
            return false;
        });

    }

    static dashboardChart(className, labels, usersCount, fleetsCount, fleetLogCount) {

        var myChart = new Chart($(className)[0].getContext('2d'), {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Mitarbeiter',
                    fill: false,
                    backgroundColor: 'blue',
                    borderColor: 'blue',
                    data: usersCount,
                }, {
                    label: 'Flotte',
                    fill: false,
                    backgroundColor: 'lime',
                    borderColor: 'lime',
                    borderDash: [5, 5],
                    data: fleetsCount,
                }, {
                    label: 'Flotte Service',
                    fill: false,
                    backgroundColor: 'magenta',
                    borderColor: 'magenta',
                    data: fleetLogCount,
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,
                    text: 'Chart.js Line Chart'
                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Month'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Value'
                        }
                    }]
                }
            }
        });
    }

    static dashboardChartist(className) {
        $.ajax({
            url: '/admin/stats/',
            type: 'POST',
            data: {
                stat: 'dashboard'
            },
            dataType: 'json',
            async: true,

            success: function (data, status) {

                var chart = new Chartist.Line(className, {
                    labels: data.labels,
                    // series: data.series
                    series: [
                        data.userLogCount,
                        data.fleetLogCount
                    ]
                }, {
                    low: 0,
                    high: 200,

                    showArea: true,
                    fullWidth: true,
                    plugins: [
                        Chartist.plugins.tooltip()
                    ],
                    axisY: {
                        onlyInteger: true,
                        scaleMinSpace: 40,
                        offset: 20,
                        labelInterpolationFnc: function (value) {
                            return (value / 1);
                        }
                    }
                });

            },
            error: function (xhr, textStatus, errorThrown) {
                alert('Ajax request failed.');
            }
        });
    }


    static map(divId) {

        // const options: LoaderOptions = {/* todo */};

        // const loader = new Loader('AIzaSyDQ6uNmMSxsm5ZJz5moS3Lq3U4EO5p-jnU');
        //
        // loader.load().then(function (google) {
        //     const map = new google.maps.Map(document.getElementById('map'), {
        //         center: {lat: -34.397, lng: 150.644},
        //         zoom: 8,
        //     });
        // });

        // var map_2;
        // map_2 = new GMaps({
        //     div: divId,
        //     lat: -12.043333,
        //     lng: -77.028333
        // });
        // map_2.addMarker({
        //     lat: -12.043333,
        //     lng: -77.03,
        //     title: 'Lima',
        //     details: {
        //         database_id: 42,
        //         author: 'HPNeo'
        //     },
        //     click: function(e) {
        //         if (console.log)
        //             console.log(e);
        //         alert('You clicked in this marker');
        //     }
        // });
        // map_2.addMarker({
        //     lat: -12.042,
        //     lng: -77.028333,
        //     title: 'Marker with InfoWindow',
        //     infoWindow: {
        //         content: '<p>HTML Content</p>'
        //     }
        // });

    }

    static dashboardDataChart(className, tableClassName, url) {
        let ctx = $(className)[0].getContext('2d');

        Chart.defaults.scale.ticks.beginAtZero = true;

        let userChart = new Chart(ctx, {
            type: "bar",
            data: {
                labels: [],
                datasets: [
                    {
                        label: [],
                        backgroundColor: [],
                        data: [],
                    },
                ],
            },
            options: {
                legend: {display: false},
                title: {
                    display: true,
                    fontColor: "#b2b9bf",
                    text: "",
                },
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                fontColor: "#b2b9bf",
                                fontSize: 12,
                                // beginAtZero: true,
                            },
                        },
                    ],
                    xAxes: [
                        {
                            ticks: {
                                fontColor: "#b2b9bf",
                                fontSize: 12,
                            },
                        },
                    ],
                },
            },
        });

        ajax_chart(userChart, url);

        // function to update our chart
        function ajax_chart(chart, url, data) {
            var data = data || {};

            $.ajax({
                url: url,
                method: 'POST',
                dataType: 'json',
                data: data
            }).done(function (response) {
                var responseData = response.data || {};
                var responseOptions = response.options || {};
                var responseTable = response.table || {};

                if (responseData.labels.length === 0) {
                    $('.js--user-stats-no-data').removeClass('is--hidden');
                    $('.js--user-stats').addClass('is--hidden');
                } else {
                    $('.js--user-stats-no-data').addClass('is--hidden');
                    $('.js--user-stats').removeClass('is--hidden');

                    chart.data.labels = responseData.labels;
                    chart.data.datasets[0].data = responseData.datasets[0].data;
                    chart.data.datasets[0].label = responseData.datasets[0].label;
                    chart.data.datasets[0].backgroundColor = responseData.datasets[0].backgroundColor;

                    chart.options.title.text = responseOptions.title.text;
                    chart.update(); // finally update our chart
                }

                const userTableTitleData = response.data.labels;
                const userTableRowData = response.data.datasets[0].data;
                var result = userTableRowData.reduce(function (result, field, index) {
                    result[userTableTitleData[index]] = field;
                    return result;
                }, {});
                $('.userDashboardTable').empty();
                $.each(result, function (i, data) {
                    $("table.userDashboardTable").append("<tr><th>" + i + "</th><td>" + data + "</td></tr>");
                });

            });

        }

        $('.js--dashboard-stats-form').submit(function (e) {
            e.preventDefault();
            var form = $(this);
            var form_data = form.serialize();

            ajax_chart(userChart, url, form_data);
            return false;
        });

    }

    static saveDailyReport(url) {
        let date_from = $("#daily_report_date_from").val();
        let hub = $("#daily_report_hub").val();
        let satellit1 = $("#daily_report_satellit").val();
        let satellit2 = $("#daily_report_satellit_2").val();
        let satellit3 = $("#daily_report_satellit_3").val();
        let satellit4 = $("#daily_report_satellit_4").val();
        let satellit5 = $("#daily_report_satellit_5").val();
        let weather = $('input[name="daily_report[weather]"]:checked').val();
        let degree = $("#daily_report_degree").val();
        let performanceResults = $('input[name="daily_report[performance_result]"]:checked').val();
        let disabilities_difficulties = $("#daily_report_disabilities_difficulties").val();
        let performance_changes = $("#daily_report_performance_changes").val();
        let special_occurrences = $("#daily_report_special_occurrences").val();

        let daySumSwap = $("#daily_report_daySwap").val();
        let daySumCollect = $("#daily_report_dayCollect").val();
        let daySumDeploy = $("#daily_report_dayDeploy").val();
        let daySumRebalance = $("#daily_report_dayRebalance").val();

        let nightSumSwap = $("#daily_report_nightSwap").val();
        let nightSumCollect = $("#daily_report_nightCollect").val();
        let nightSumDeploy = $("#daily_report_nightDeploy").val();
        let nightSumRebalance = $("#daily_report_nightRebalance").val();
        let activeUser = $("#activeUserId").text();

        $('#getDailyReport').on('click', function (e) {
            e.preventDefault();
            let report_date = $("#daily_report_report_date").val();
            let hub = $("#daily_report_hub").val();

            $.ajax({
                type: 'POST',
                url: url + '/admin/daily-report/get-daily-report',
                data: {
                    'report_date': report_date,
                    'hub': hub,
                },
                success: function (data) {
                    console.log(data)
                    if (data.success) {
                        $.notify(data.message, {
                            type: 'success',
                            delay: 5000,
                            allow_dismiss: true
                        });
                        $("#daily_report_daySwap").val(data.data.day.sumSwap);
                        $("#daily_report_dayCollect").val(data.data.day.sumCollect);
                        $("#daily_report_dayDeploy").val(data.data.day.sumDeploy);
                        $("#daily_report_dayRebalance").val(data.data.day.sumRebalance);

                        $("#daily_report_nightSwap").val(data.data.night.sumSwap);
                        $("#daily_report_nightCollect").val(data.data.night.sumCollect);
                        $("#daily_report_nightDeploy").val(data.data.night.sumDeploy);
                        $("#daily_report_nightRebalance").val(data.data.night.sumRebalance);

                    } else {
                        $.notify(data.message, {
                            type: 'danger',
                            delay: 5000,
                            allow_dismiss: true
                        });
                    }
                },
                error: function (data) {
                    console.log(data.message);
                    $.notify(data.message, {
                        type: 'danger',
                        delay: 5000,
                        allow_dismiss: true
                    });
                }
            });
        });

        // $('#daily-save').on('click', function (e) {
        //     e.preventDefault();
        //     $.ajax({
        //         type: 'POST',
        //         url: url+'/admin/daily-report/save-daily-report',
        //         data: {
        //             'date_from': date_from,
        //             'hub': hub,
        //             'satellit1': satellit1,
        //             'satellit2': satellit2,
        //             'satellit3': satellit3,
        //             'satellit4': satellit4,
        //             'satellit5': satellit5,
        //             'weather': weather,
        //             'degree': degree,
        //             'performanceResults': performanceResults,
        //             'disabilities_difficulties': disabilities_difficulties,
        //             'performance_changes': performance_changes,
        //             'special_occurrences': special_occurrences,
        //             'daySumSwap': daySumSwap,
        //             'daySumCollect': daySumCollect,
        //             'daySumDeploy': daySumDeploy,
        //             'daySumRebalance': daySumRebalance,
        //             'nightSumSwap': nightSumSwap,
        //             'nightSumCollect': nightSumCollect,
        //             'nightSumDeploy': nightSumDeploy,
        //             'nightSumRebalance': nightSumRebalance,
        //             'activeUser': activeUser,
        //         },
        //         success: function (data) {
        //             if (data.success) {
        //                 $.notify(data.message, {
        //                     type: 'success',
        //                     delay: 5000,
        //                     allow_dismiss: true
        //                 });
        //
        //             } else {
        //                 $.notify(data.message, {
        //                     type: 'danger',
        //                     delay: 5000,
        //                     allow_dismiss: true
        //                 });
        //             }
        //         },
        //         error: function (data) {
        //             $.notify(data.message, {
        //                 type: 'danger',
        //                 delay: 5000,
        //                 allow_dismiss: true
        //             });
        //         }
        //     });
        // });
    }
}

export default App;

