
const formvalidationUtil = function ($) {

    if ($('.js--invoice-comment-status-form').length) {
        const fv = $('.js--invoice-comment-status-form').formValidation({
            fields: {
                'invoice_status_comment[comment]': {
                    validators: {
                        notEmpty: {
                            message: 'Bitte geben Sie einen Kommentar ein.'
                        }
                    }
                },
            },
            plugins: {
                bootstrap: new Bootstrap5({
                    rowSelector: function(field, ele) {
                        return '.form-field';
                    }
                }),
                trigger: new Trigger({
                    delay: {
                        display_name: 0.5,
                        email: 0.5,
                    },
                }),
                icon: new Icon({
                    valid: 'fa fa-check',
                    invalid: 'fa fa-times',
                    validating: 'fa fa-refresh'
                }),
                submitButton: new SubmitButton()
            }
        });

        $('.js--invoice-comment-status-form').data('formValidation').on('core.field.invalid', function (event) {
            disableSubmitButton(true, '.js--invoice-comment-status-form');
        }).on('core.field.valid', function (event) {
            disableSubmitButton(false, '.js--invoice-comment-status-form');
        }).on('core.form.invalid', function (event) {
            disableSubmitButton(true, '.js--invoice-comment-status-form');
        }).on('core.form.valid', function (event) {
            disableSubmitButton(true, '.js--invoice-comment-status-form');

            $(".js--invoice-comment-status-form").submit();
        });
    }

    if ($('.js--invitation-invoice-form').length) {
        const form = document.querySelector('.js--invitation-invoice-form');
        const fv = $('.js--invitation-invoice-form').formValidation({
            fields: {
                'invitation_customer[firstName]': {
                    validators: {
                        notEmpty: {
                            message: 'Bitte geben Sie Ihren Vornamen ein.'
                        }
                    }
                },
                'invitation_customer[lastName]': {
                    validators: {
                        notEmpty: {
                            message: 'Bitte geben Sie Ihren Nachnamen ein.'
                        }
                    }
                },
                'invitation_customer[birthday]': {
                    selector: '.js--birthday',
                    validators: {
                        callback: {
                            message: 'Bitte geben Sie Ihr Geburtsdatum ein.',
                            callback: function (input) {

                                if ( !isSupervisorInvoice('.js--invitation-invoice-form') ) {
                                    const pinValue = $('.js--pension-insurance-number').val();

                                    if ( pinValue !== '' ) {
                                        return {
                                            valid: true,
                                        }
                                    }

                                    if ( (input.value === '' || input.value == 'tt.mm.jjjj') && pinValue === '' ) {
                                        // fv.revalidateField('invitation_customer[pensionInsuranceNumber]');
                                        return {
                                            valid: false,
                                            message: 'Bitte geben Sie Ihr Geburtsdatum oder Ihre Rentenversicherungsnummer ein.',
                                        }
                                    }
                                }

                                // Validate if empty
                                if (input.value == '' || input.value == 'tt.mm.jjjj') {
                                    return {
                                        valid: false,
                                        message: 'Bitte geben Sie Ihr Geburtsdatum ein.',
                                    }
                                }

                                let currentDate = new Date();
                                let maxDate = (currentDate.getFullYear() - 16) + '-' + currentDate.getMonth() + '-' + currentDate.getDay();

                                let dateFormatString = 'YYYY-MM-DD';
                                if ( !$.fn.isDateSupported() ) {
                                    dateFormatString = 'DD.MM.YYYY';
                                    maxDate = currentDate.getDay() + '.' + currentDate.getMonth() + '.' + (currentDate.getFullYear() - 16);
                                }

                                const validateBirthdate = date().validate({
                                    value: input.value,
                                    options: {
                                        format: dateFormatString,
                                        message: 'Das eingegebene Datum ist nicht gültig. Das Mindestalter ist 16 Jahre.',
                                        max: maxDate
                                    }
                                });


                                if (!validateBirthdate.valid) {
                                    return validateBirthdate;
                                } else {
                                    return {
                                        valid: true,
                                    }
                                }
                            }
                        }
                    }
                },
                'invitation_customer[academicDegree]': {
                    validators: {
                        notEmpty: {
                            message: 'Bitte geben Sie Ihren höchsten akademischen Grad ein.'
                        }
                    }
                },
                'invitation_customer[profession]': {
                    validators: {
                        notEmpty: {
                            message: 'Bitte geben Sie Ihre aktuelle Tatigkeit / derzeitigen Beruf ein.'
                        }
                    }
                },
                'invitation_customer[street]': {
                    validators: {
                        notEmpty: {
                            message: 'Bitte geben Sie Ihre Strasse ein.'
                        }
                    }
                },
                'invitation_customer[houseNumber]': {
                    validators: {
                        notEmpty: {
                            message: 'Bitte geben Sie Ihre Hausnummer ein.'
                        }
                    }
                },
                'invitation_customer[zip]': {
                    validators: {
                        notEmpty: {
                            message: 'Bitte geben Sie Ihr Postleitzahl ein.'
                        }
                    }
                },
                'invitation_customer[city]': {
                    validators: {
                        notEmpty: {
                            message: 'Bitte geben Sie Ihren Wohnort ein.'
                        }
                    }
                },
                'invitation_customer[taxNumber]': {
                    validators: {
                        // notEmpty: {
                        //     message: 'Bitte geben Sie Ihre Steuer ID ein.'
                        // },
                        // digits: {
                        //     message: 'Die Steuer ID besteht nur aus Ziffern.'
                        // },
                        // stringLength: {
                        //     min: 11,
                        //     max: 11,
                        //     message: 'Die Steuer ID besteht aus 11 Ziffern.'
                        // },
                        callback: {
                            callback: function (input) {

                                if ( !isSupervisorInvoice('.js--invitation-invoice-form') ) {

                                    // Validate if empty
                                    if (input.value == '') {
                                        return {
                                            valid: false,
                                            message: 'Bitte geben Sie Ihre Steuer ID ein.'
                                        }
                                    }

                                    const validateDigits = digits().validate({
                                        value: input.value,
                                        options: {
                                            message: '',
                                        },
                                    });

                                    if (!validateDigits.valid) {
                                        return {
                                            valid: false,
                                            message: 'Die Steuer ID besteht nur aus Ziffern.'
                                        }
                                    }

                                    const validateStrLength = stringLength().validate({
                                        value: input.value,
                                        options: {
                                            min: 11,
                                            max: 11,
                                            message: 'Die Steuer ID besteht aus 11 Ziffern.',
                                        },
                                    });

                                    if (!validateStrLength.valid) {
                                        return validateStrLength;
                                    } else {
                                        return {
                                            valid: true,
                                        }
                                    }

                                } else {
                                    if (input.value == '') {
                                        return {
                                            valid: true,
                                        }
                                    }
                                }

                                return true;
                            }
                        }
                    }
                },
                'invitation_customer[taxOffice]': {
                    validators: {
                        // notEmpty: {
                        //     message: 'Bitte geben Sie Ihr zuständiges Finanzamt ein.'
                        // }
                        callback: {
                            callback: function (input) {

                                if ( !isSupervisorInvoice('.js--invitation-invoice-form') ) {
                                    // Validate if empty
                                    if (input.value == '') {
                                        return {
                                            valid: false,
                                            message: 'Bitte geben Sie Ihr zuständiges Finanzamt ein.'
                                        }
                                    }
                                } else {
                                    if (input.value == '') {
                                        return {
                                            valid: true,
                                        }
                                    }
                                }

                                return true;
                            }
                        }
                    }
                },
                'invitation_customer[iban]': {
                    validators: {
                        callback: {
                            message: 'Bitte geben Sie Ihre IBAN ein.',
                            callback: function (input) {

                                // don't validate, if paytype is cash
                                if ($('.js--paytype-target').hasClass('is--hidden')) {
                                    return {
                                        valid: true
                                        //message: 'The error message'
                                    }
                                }

                                // Validate if empty
                                if (input.value == '') {
                                    return {
                                        valid: false,
                                        message: 'Bitte geben Sie Ihre IBAN ein.'
                                    }
                                }

                                const validateIban = iban().validate({
                                    value: input.value,
                                    options: {
                                        message: 'Die eingegebene IBAN ist nicht gültig',
                                    },
                                });

                                if (!validateIban.valid) {
                                    return validateIban;
                                }
                            }
                        }
                    }
                },
                'invitation_customer[bic]': {
                    validators: {
                        callback: {
                            message: 'Bitte geben Sie Ihren BIC ein.',
                            callback: function (input) {
                                // don't validate, if paytype is cash
                                if ($('.js--paytype-target').hasClass('is--hidden')) {
                                    return {
                                        valid: true
                                    }
                                }

                                // Validate if empty
                                if (input.value == '') {
                                    return {
                                        valid: false,
                                        message: 'Bitte geben Sie Ihre BIC ein.'
                                    }
                                }

                                const validateBic = bic().validate({
                                    value: input.value,
                                    options: {
                                        message: 'Der eingegebene BIC ist nicht gültig',
                                    },
                                });

                                return validateBic;
                            }
                        }
                    }
                },
                'invitation_customer[bankName]': {
                    validators: {
                        callback: {
                            message: 'Bitte geben Sie den Namen Ihres Kreditinstituts ein.',
                            callback: function (input) {
                                // don't validate, if paytype is cash
                                if ($('.js--paytype-target').hasClass('is--hidden')) {
                                    return {
                                        valid: true
                                    }
                                }

                                // Validate if empty
                                if (input.value == '') {
                                    return {
                                        valid: false,
                                        message: 'Bitte geben Sie den Namen Ihres Kreditinstituts ein.'
                                    }
                                }

                                return true;
                            }
                        }
                    }
                },
                'invitation_customer[pensionInsuranceNumber]': {
                    //'selector': '.js--pension-insurance-number',
                    validators: {
                        callback: {
                            //message: 'Die Sozialversicherungsnummer hat folgendes Muster 10250270A103.',
                            callback: function (input) {

                                // validate if not supervisor invoice
                                if ( !isSupervisorInvoice('.js--invitation-invoice-form') ) {

                                    const bdayValue = $('.js--birthday').val();
                                    if ( bdayValue !== '' ) {
                                        return {
                                            valid: true,
                                        }
                                    }
                                    if ( input.value === '' && bdayValue === '' ) {
                                        return {
                                            valid: false,
                                            message: 'Bitte geben Sie Ihre Rentenversicherungsnummer oder Ihr Geburtsdatum ein.',
                                        }
                                    }

                                    if (input.value == '') {
                                        return {
                                            valid: false,
                                            message: 'Bitte geben Sie Ihre Rentenversicherungsnummer ein.'
                                        }
                                    }

                                    // validate string format
                                    if (!input.value.match(/^[0-9]{8}[A-Z][0-9]{3}$/i)) {
                                        return {
                                            valid: false,
                                            message: 'Die Sozialversicherungsnummer hat folgendes Muster 10250270A103.'
                                        }
                                    }

                                } else {
                                    if (input.value == '') {
                                        return {
                                            valid: true
                                        }
                                    }
                                }
                                return true;
                            }
                        }
                    }
                },
                'invitation_customer[privacyPolicyAccepted]': {
                    validators: {
                        notEmpty: {
                            message: 'Bitte stimmen Sie der elektronischen Verarbeitung Ihrer Daten zu. Ihre Daten werden ausschliesslich intern verwendet und nicht an Dritte weiter gegeben.'
                        }
                    }
                }

            },
            plugins: {
                bootstrap: new Bootstrap5({
                    rowSelector: function(field, ele) {
                        return '.form-field';
                    }
                }),
                trigger: new Trigger({
                    delay: {
                        display_name: 0.5,
                        email: 0.5,
                    },
                }),
                icon: new Icon({
                    valid: 'fa fa-check',
                    invalid: 'fa fa-times',
                    validating: 'fa fa-refresh'
                }),
                submitButton: new SubmitButton()
            }
            //});
        });


        // Get plugin instance
        //const fv = $('.js--invitation-invoice-form').data('formValidation');

        $('input[name="invitation_customer[birthday]"]').on('change', function () {
            $('.js--invitation-invoice-form').data('formValidation').revalidateField('invitation_customer[birthday]');
            $('.js--invitation-invoice-form').data('formValidation').revalidateField('invitation_customer[pensionInsuranceNumber]');
        });

        $('input[name="invitation_customer[iban]"]').on('change', function () {
            $('.js--invitation-invoice-form').data('formValidation').revalidateField('invitation_customer[iban]');
        });
        $('input[name="invitation_customer[bic]"]').on('change', function () {
            $('.js--invitation-invoice-form').data('formValidation').revalidateField('invitation_customer[bic]');
        });
        $('input[name="invitation_customer[pensionInsuranceNumber]"]').on('change', function () {
            $('.js--invitation-invoice-form').data('formValidation').revalidateField('invitation_customer[pensionInsuranceNumber]');
            $('.js--invitation-invoice-form').data('formValidation').revalidateField('invitation_customer[birthday]');
        });


        if ( $(".invitation_datetimepicker").length ) {
            $(".invitation_datetimepicker").on("dp.change", function (e) {
                $('.js--invitation-invoice-form').data('formValidation').revalidateField('invitation_customer[birthday]');
                $('.js--invitation-invoice-form').data('formValidation').revalidateField('invitation_customer[pensionInsuranceNumber]');
            });
        }

        // Listen on the event
        $('.js--invitation-invoice-form').data('formValidation').on('core.field.invalid', function (event) {
            disableSubmitButton(true, '.js--invitation-invoice-form');
        }).on('core.field.valid', function (event) {
            disableSubmitButton(false, '.js--invitation-invoice-form');
        }).on('core.form.invalid', function (event) {
            disableSubmitButton(true, '.js--invitation-invoice-form');
        }).on('core.form.valid', function (event) {
            disableSubmitButton(true, '.js--invitation-invoice-form');

            //const $form = $(".js--invitation-invoice-form");
            $(".js--invitation-invoice-form").submit();
        });

    }


    if ($('.js--invoice-form-create').length) {

        const supervisorFieldCreate = $('#invoice_create_supervisorServices');

        const fvCf = $('.js--invoice-form-create').formValidation({
            fields: {
                'invoice_create[place]': {
                    validators: {
                        notEmpty: {
                            message: 'Bitte geben Sie den Ort der Leistungsdurchführung ein.'
                        }
                    }
                },
                'invoice_create[signaturePlace]': {
                    validators: {
                        notEmpty: {
                            message: 'Bitte geben Sie den Ort der Vertragsunterschrift ein.'
                        }
                    }
                },
                'invoice_create[tasks]': {
                    validators: {
                        notEmpty: {
                            message: 'Bitte geben Sie die Aufgabe(n) ein.'
                        }
                    }
                },
                'invoice_create[startAt]': {
                    validators: {
                        // notEmpty: {
                        //     message: 'Bitte geben Sie ein Datum für den Beginn der Durchführungszeit ein.'
                        // }
                        callback: {
                            //message: 'Bitte geben Sie Ihr Geburtsdatum ein.',
                            callback: function (input) {

                                // Validate if empty
                                if (input.value == '') {
                                    return {
                                        valid: false,
                                        message: 'Bitte geben Sie ein Datum für den Beginn der Durchführungszeit ein.'
                                    }
                                }

                                let endDate = $('.js--invoice-date--end').val();

                                const validateStartDate = date().validate({
                                    value: input.value,
                                    options: {
                                        format: 'YYYY-MM-DD',
                                        message: 'Das eingegebene Datum ist nicht gültig. Das Von-Datum muss vor dem Bis-Datum liegen.',
                                        max: endDate
                                    }
                                });

                                if (!validateStartDate.valid) {
                                    return validateStartDate;
                                }
                            }
                        }
                    }
                },
                'invoice_create[endAt]': {
                    validators: {
                        callback: {
                            //message: 'Bitte geben Sie Ihr Geburtsdatum ein.',
                            callback: function (input) {

                                // don't validate, if empty
                                if (input.value == '') {
                                    return {
                                        valid: true
                                    };
                                }

                                let startDate = $('.js--invoice-date--start').val();

                                const validateEndDate = date().validate({
                                    value: input.value,
                                    options: {
                                        format: 'YYYY-MM-DD',
                                        message: 'Das eingegebene Datum ist nicht gültig. Das Bis-Datum muss nach dem Von-Datum liegen.',
                                        min: startDate
                                    }
                                });

                                if (!validateEndDate.valid) {
                                    return validateEndDate;
                                }
                            }
                        }
                    }
                },
                'invoice_create[hourQty]': {
                    validators: {
                        callback: {
                            callback: function (input) {

                                // Validate if empty
                                if (!$('.js--invoice-form-create').hasClass('is--work-invoice') && input.value == '') {
                                    return {
                                        valid: false,
                                        message: 'Bitte geben Sie die Stundenzahl ein.'
                                    }
                                }

                            }
                        }
                    }
                },
                'invoice_create[hourPrice]': {
                    validators: {
                        callback: {
                            callback: function (input) {

                                // Validate if empty
                                if (!$('.js--invoice-form-create').hasClass('is--work-invoice') && input.value == '') {
                                    return {
                                        valid: false,
                                        message: 'Bitte geben Sie den Stundensatz ein.'
                                    }
                                }

                            }
                        }
                    }
                },
                'invoice_create[fullAmount]': {
                    validators: {
                        callback: {
                            callback: function (input) {

                                // Validate if not empty
                                if (input.value == '') {
                                    return {
                                        valid: true,
                                    }
                                }

                                if ( $('.js--invoice-form-create').hasClass('is--supervisor-invoice') ) {
                                    let targetVal = numberToCalc(input.value);
                                    let limit = numberToCalc($('.js--amount-calculate-target').attr('data-supervisor-limit'));

                                    if ( targetVal > limit ) {
                                        return {
                                            valid: false,
                                            message: 'Bitte kontrollieren Sie Ihre Eingabe.\nDas errechnete Honorar ' + numberToShow(targetVal) + ' übersteigt ' + numberToShow(limit) + ' Euro.'
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                'invoice_create[supervisorServices][]': {
                    validators: {
                        callback: {
                            callback: function (input) {

                                // validate if supervisor invoice
                                if ( $('.js--invoice-form-create').hasClass('is--supervisor-invoice') ) {
                                    // Get the selected options
                                    const options = supervisorFieldCreate.select2('data');
                                    if (options === null || options.length < 1) {
                                        return {
                                            valid: false,
                                            message: 'Bitte wählen Sie mindestens eine Übungsleiter Leistung.',
                                        }
                                    } else {
                                        return {
                                            valid: true,
                                        }
                                    }
                                }

                            }
                        }
                    }
                }
            },
            plugins: {
                bootstrap: new Bootstrap5({
                    rowSelector: function(field, ele) {
                        return '.form-field';
                    }
                }),
                trigger: new Trigger({
                    delay: {
                        display_name: 0.5,
                        email: 0.5,
                    },
                }),
                icon: new Icon({
                    valid: 'fa fa-check',
                    invalid: 'fa fa-times',
                    validating: 'fa fa-refresh'
                }),
                submitButton: new SubmitButton()
            }
            //});
        });

        // Get plugin instance
        //const fv = $('.js--invitation-invoice-form').data('formValidation');

        $('input[name="invoice_create[startAt]"]').on('change', function () {
            $('.js--invoice-form-create').data('formValidation').revalidateField('invoice_create[startAt]');
            $('.js--invoice-form-create').data('formValidation').revalidateField('invoice_create[endAt]');
        });
        $('input[name="invoice_create[endAt]"]').on('change', function () {
            $('.js--invoice-form-create').data('formValidation').revalidateField('invoice_create[startAt]');
            $('.js--invoice-form-create').data('formValidation').revalidateField('invoice_create[endAt]');
        });

        $('input[name="invoice_create[hourQty]"]').on('change', function () {
            $('.js--invoice-form-create').data('formValidation').revalidateField('invoice_create[hourQty]');
            $('.js--invoice-form-create').data('formValidation').revalidateField('invoice_create[fullAmount]');
        });
        $('input[name="invoice_create[hourPrice]"]').on('change', function () {
            $('.js--invoice-form-create').data('formValidation').revalidateField('invoice_create[hourPrice]');
            $('.js--invoice-form-create').data('formValidation').revalidateField('invoice_create[fullAmount]');
        });
        $('input[name="invoice_create[invoiceDocumentSet]"]').on('change', function () {
            $('.js--invoice-form-create').data('formValidation').revalidateField('invoice_create[fullAmount]');
        });

        supervisorFieldCreate
            .on('change.select2', function() {
                //console.log('select changed');
                // Revalidate the color field when an option is chosen
                $('.js--invoice-form-create').data('formValidation').revalidateField('invoice_create[supervisorServices][]');
            });

        // Listen on the event
        $('.js--invoice-form-create').data('formValidation').on('core.field.invalid', function (event) {
            disableSubmitButton(true, '.js--invoice-form-create');
        }).on('core.field.valid', function (event) {
            disableSubmitButton(false, '.js--invoice-form-create');
        }).on('core.form.invalid', function (event) {
            disableSubmitButton(true, '.js--invoice-form-create');
        }).on('core.form.valid', function (event) {
            disableSubmitButton(true, '.js--invoice-form-create');

            //const $form = $(".js--invoice-form");
            $(".js--invoice-form").submit();
        });

    }


    if ($('.js--invoice-form-edit').length) {

        const supervisorFieldEdit = $('#invoice_supervisorServices');

        const fvEf = $('.js--invoice-form-edit').formValidation({
            fields: {
                'invoice[place]': {
                    validators: {
                        notEmpty: {
                            message: 'Bitte geben Sie den Ort der Leistungsdurchführung ein.'
                        }
                    }
                },
                'invoice[signaturePlace]': {
                    validators: {
                        notEmpty: {
                            message: 'Bitte geben Sie den Ort der Vertragsunterschrift ein.'
                        }
                    }
                },
                'invoice[tasks]': {
                    validators: {
                        notEmpty: {
                            message: 'Bitte geben Sie die Aufgabe(n) ein.'
                        }
                    }
                },
                'invoice[startAt]': {
                    validators: {
                        // notEmpty: {
                        //     message: 'Bitte geben Sie ein Datum für den Beginn der Durchführungszeit ein.'
                        // }
                        callback: {
                            //message: 'Bitte geben Sie Ihr Geburtsdatum ein.',
                            callback: function (input) {

                                // Validate if empty
                                if (input.value == '') {
                                    return {
                                        valid: false,
                                        message: 'Bitte geben Sie ein Datum für den Beginn der Durchführungszeit ein.'
                                    }
                                }

                                let endDate = $('.js--invoice-date--end').val();

                                const validateStartDate = date().validate({
                                    value: input.value,
                                    options: {
                                        format: 'YYYY-MM-DD',
                                        message: 'Das eingegebene Datum ist nicht gültig. Das Von-Datum muss vor dem Bis-Datum liegen.',
                                        max: endDate
                                    }
                                });

                                if (!validateStartDate.valid) {
                                    return validateStartDate;
                                }
                            }
                        }
                    }
                },
                'invoice[endAt]': {
                    validators: {
                        callback: {
                            //message: 'Bitte geben Sie Ihr Geburtsdatum ein.',
                            callback: function (input) {

                                // don't validate, if empty
                                if (input.value == '') {
                                    return {
                                        valid: true
                                    };
                                }

                                let startDate = $('.js--invoice-date--start').val();

                                const validateEndDate = date().validate({
                                    value: input.value,
                                    options: {
                                        format: 'YYYY-MM-DD',
                                        message: 'Das eingegebene Datum ist nicht gültig. Das Bis-Datum muss nach dem Von-Datum liegen.',
                                        min: startDate
                                    }
                                });

                                if (!validateEndDate.valid) {
                                    return validateEndDate;
                                }
                            }
                        }
                    }
                },
                'invoice[hourQty]': {
                    validators: {
                        callback: {
                            callback: function (input) {

                                // Validate if empty
                                if (!$('.js--invoice-form-edit').hasClass('is--work-invoice') && input.value == '') {
                                    return {
                                        valid: false,
                                        message: 'Bitte geben Sie die Stundenzahl ein.'
                                    }
                                }

                            }
                        }
                    }
                },
                'invoice[hourPrice]': {
                    validators: {
                        callback: {
                            callback: function (input) {

                                // Validate if empty
                                if (!$('.js--invoice-form-edit').hasClass('is--work-invoice') && input.value == '') {
                                    return {
                                        valid: false,
                                        message: 'Bitte geben Sie den Stundensatz ein.'
                                    }
                                }

                            }
                        }
                    }
                },
                'invoice[fullAmount]': {
                    validators: {
                        callback: {
                            callback: function (input) {

                                // Validate if not empty
                                if (input.value == '') {
                                    return {
                                        valid: true,
                                    }
                                }

                                if ( $('.js--invoice-form-edit').hasClass('is--supervisor-invoice') ) {
                                    let targetVal = numberToCalc(input.value);
                                    let limit = numberToCalc($('.js--amount-calculate-target').attr('data-supervisor-limit'));

                                    if ( targetVal > limit ) {
                                        return {
                                            valid: false,
                                            message: 'Bitte kontrollieren Sie Ihre Eingabe.\nDas errechnete Honorar ' + numberToShow(targetVal) + ' übersteigt ' + numberToShow(limit) + ' Euro.'
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                'invoice[supervisorServices][]': {
                    validators: {
                        callback: {
                            callback: function (input) {

                                // validate if supervisor invoice
                                if ( $('.js--invoice-form-edit').hasClass('is--supervisor-invoice') ) {
                                    // Get the selected options
                                    const options = supervisorFieldEdit.select2('data');
                                    if (options === null || options.length < 1) {
                                        return {
                                            valid: false,
                                            message: 'Bitte wählen Sie mindestens eine Übungsleiter Leistung.',
                                        }
                                    } else {
                                        return {
                                            valid: true,
                                        }
                                    }
                                }

                            }
                        }
                    }
                }

            },
            plugins: {
                bootstrap: new Bootstrap5({
                    rowSelector: function(field, ele) {
                        return '.form-field';
                    }
                }),
                trigger: new Trigger({
                    delay: {
                        display_name: 0.5,
                        email: 0.5,
                    },
                }),
                icon: new Icon({
                    valid: 'fa fa-check',
                    invalid: 'fa fa-times',
                    validating: 'fa fa-refresh'
                }),
                submitButton: new SubmitButton()
            }
            //});
        });

        // Get plugin instance
        //const fv = $('.js--invitation-invoice-form').data('formValidation');

        $('input[name="invoice[startAt]"]').on('change', function () {
            $('.js--invoice-form-edit').data('formValidation').revalidateField('invoice[startAt]');
            $('.js--invoice-form-edit').data('formValidation').revalidateField('invoice[endAt]');
        });
        $('input[name="invoice[endAt]"]').on('change', function () {
            $('.js--invoice-form-edit').data('formValidation').revalidateField('invoice[startAt]');
            $('.js--invoice-form-edit').data('formValidation').revalidateField('invoice[endAt]');
        });

        $('input[name="invoice[hourQty]"]').on('change', function () {
            $('.js--invoice-form-edit').data('formValidation').revalidateField('invoice[hourQty]');
            $('.js--invoice-form-edit').data('formValidation').revalidateField('invoice[fullAmount]');
        });
        $('input[name="invoice[hourPrice]"]').on('change', function () {
            $('.js--invoice-form-edit').data('formValidation').revalidateField('invoice[hourPrice]');
            $('.js--invoice-form-edit').data('formValidation').revalidateField('invoice[fullAmount]');
        });
        $('input[name="invoice[invoiceDocumentSet]"]').on('change', function () {
            $('.js--invoice-form-edit').data('formValidation').revalidateField('invoice[fullAmount]');
        });

        supervisorFieldEdit
            .on('change.select2', function() {
                //console.log('select changed');
                // Revalidate the color field when an option is chosen
                $('.js--invoice-form-edit').data('formValidation').revalidateField('invoice[supervisorServices][]');
            });


        // Listen on the event
        $('.js--invoice-form-edit').data('formValidation').on('core.field.invalid', function (event) {
            disableSubmitButton(true, '.js--invoice-form-edit');
        }).on('core.field.valid', function (event) {
            disableSubmitButton(false, '.js--invoice-form-edit');
        }).on('core.form.invalid', function (event) {
            disableSubmitButton(true, '.js--invoice-form-edit');
        }).on('core.form.valid', function (event) {
            disableSubmitButton(true, '.js--invoice-form-edit');

            //const $form = $(".js--invoice-form");
            $(".js--invoice-form").submit();
        });

    }


    // if ($('.js--todo-form').length) {
    //
    //     // tinymce.init({
    //     //     selector: 'textarea#tinymce-reply',
    //     //     skin: false,
    //     //     content_css: false,
    //     //     setup: function (editor) {
    //     //         editor.on('keyup', function () {
    //     //             $('.js--todo-form').data('formValidation').revalidateField('todo_create[content]');
    //     //         });
    //     //     },
    //     // });
    //
    //     const fv = $('.js--todo-form').formValidation({
    //         fields: {
    //             'todo_create[content]': {
    //                 validators: {
    //                     callback: {
    //                         message: 'Der Kommentar muss zwischen 5 und 5000 Zeichen lang sein.',
    //                         callback: function (value) {
    //                             const text = tinyMCE.activeEditor.getContent({
    //                                 format: 'text',
    //                             });
    //                             return text.length <= 5000 && text.length >= 5;
    //                         },
    //                     },
    //                 }
    //             },
    //             'todo_create[type]': {
    //                 validators: {
    //                     callback: {
    //                         message: 'Please choose 2-4 color you like most',
    //                         callback: function (input) {
    //                             // Get the selected options
    //                             const options = $('select[name="todo_create[type]"]').select2('data');
    //                             return options != null && options.length >= 2 && options.length <= 4;
    //                         },
    //                     },
    //                 }
    //             },
    //
    //         },
    //         plugins: {
    //             bootstrap: new Bootstrap5({
    //                 rowSelector: function(field, ele) {
    //                     return '.form-field';
    //                 }
    //             }),
    //             trigger: new Trigger({
    //                 delay: {
    //                     display_name: 0.5,
    //                     email: 0.5,
    //                 },
    //             }),
    //             icon: new Icon({
    //                 valid: 'fa fa-check',
    //                 invalid: 'fa fa-times',
    //                 validating: 'fa fa-refresh'
    //             }),
    //             submitButton: new SubmitButton()
    //         }
    //     });
    //
    //     $('.js--todo-form').data('formValidation').on('core.field.invalid', function (event) {
    //         disableSubmitButton(true, '.js--todo-form');
    //         $('.js--todo-form').data('valid',false);
    //     }).on('core.field.valid', function (event) {
    //         disableSubmitButton(false, '.js--todo-form');
    //         $('.js--todo-form').data('valid',false);
    //     }).on('core.form.invalid', function (event) {
    //         disableSubmitButton(true, '.js--todo-form');
    //         $('.js--todo-form').data('valid',false);
    //     }).on('core.form.valid', function (event) {
    //         disableSubmitButton(true, '.js--todo-form');
    //         //$(".js--todo-form").submit();
    //         $('.js--todo-form').data('valid',true);
    //     });
    // }

    function getAttr(objClass, dataName) {
        if ( $(objClass).hasData(dataName) ) {
            return $(objClass).attr('data-'+dataName);
        }
        return false;
    }

    function isSupervisorInvoice(objClass) {

        if ( $(objClass).attr('data-invoice-type') == 'supervisor' ) {
            return true;
        }
        return false;
    }

    function isWorkInvoice(objClass) {

        if ( $(objClass).attr('data-invoice-type') == 'work' ) {
            return true;
        }
        return false;
    }

    function disableSubmitButton(b, cl) {
        $(cl).find('button[type="submit"]').prop('disabled', b);
    }

    function numberToShow(n) {
        return (n + '').replace('.', ',');
    }

    function numberToCalc(n) {
        n = parseFloat((n + '').replace(',', '.'));
        return Math.round(n * 100) / 100;
    }

};

export default formvalidationUtil;
