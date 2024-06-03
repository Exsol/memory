import Uppy from "@uppy/core";
import Dashboard from "@uppy/dashboard";
import Form from "@uppy/form";
import FileInput from '@uppy/file-input';
import XHR from '@uppy/xhr-upload';
import German from '@uppy/locales/lib/de_DE';
import FormValidation from '../../extra-libs/formvalidation-es6/core/Core';

const todoForm = function ($, Routing) {
    $(function () {
        const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
            const byteCharacters = atob(b64Data);
            const byteArrays = [];

            for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                const slice = byteCharacters.slice(offset, offset + sliceSize);

                const byteNumbers = new Array(slice.length);
                for (let i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }

                const byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
            }

            const blob = new Blob(byteArrays, {type: contentType});
            return blob;
        };


        const formClass = '.js--todo-form';
        const typeTodo = $(formClass).data('type');
        const formType = $(formClass).data('type-form');


        if ($(formClass).length) {

            const todoCreateType = $('select[name="todo_create[type]"]');
            const receiverDepartment = $('select[name="todo_create[receiverDepartment]"]');
            const senderDepartment = $('select[name="todo_create[senderDepartment]"]');


            const fv = $(formClass).formValidation({
                fields: {
                    'todo_create[content]': {
                        validators: {
                            callback: {
                                message: 'Der Kommentar muss zwischen 5 und 5000 Zeichen lang sein.',
                                callback: function (value) {
                                    const text = tinyMCE.activeEditor.getContent({
                                        format: 'text',
                                    });
                                    return text.length <= 5000 && text.length >= 5;
                                },
                            },
                        }
                    },
                    'todo_create[type]': {
                        validators: {
                            callback: {
                                message: 'Bitte füllen Sie das Feld aus',
                                callback: function (input) {
                                    let options = todoCreateType.select2('data');
                                    return options.length >= 1;
                                },
                            },
                        }
                    },
                    'todo_create[receiverDepartment]': {
                        validators: {
                            callback: {
                                message: 'Bitte füllen Sie das Feld aus',
                                callback: function (input) {
                                    const options = receiverDepartment.select2('data');
                                    return options.length >= 1;
                                },
                            },
                        }
                    },
                    'todo_create[senderDepartment]': {
                        validators: {
                            callback: {
                                message: 'Bitte füllen Sie das Feld aus',
                                callback: function (input) {
                                    const options = senderDepartment.select2('data');
                                    return options.length >= 1;
                                },
                            },
                        }
                    },
                    'todo_create[deadline]': {
                        validators: {
                            notEmpty: {
                                message: 'Bitte füllen Sie das Feld aus'
                            }
                        }
                    },
                },
                plugins: {
                    bootstrap: new Bootstrap5({
                        rowSelector: function (field, ele) {
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

            todoCreateType.on('change.select2', function (e,validation) {
                //if param is clear set validation
                if (validation === undefined) {
                    $(formClass).data('formValidation').revalidateField('todo_create[type]');
                }
            });
            receiverDepartment.on('change.select2', function () {
                console.log("receiverDepartment");
                $(formClass).data('formValidation').revalidateField('todo_create[receiverDepartment]');
            });
            senderDepartment.on('change.select2', function () {
                console.log("senderDepartment");
                $(formClass).data('formValidation').revalidateField('todo_create[senderDepartment]');
            });

            $('.js--date-time-picker-full').on('dp.change', function () {
                $(formClass).data('formValidation').revalidateField('todo_create[deadline]');
            });

            $(formClass).data('formValidation').on('core.field.invalid', function (event) {
                $('.js--send-todo-attachments').prop('disabled', true);
                $(formClass).data('valid', false);
            }).on('core.field.valid', function (event) {
                $('.js--send-todo-attachments').prop('disabled', false);
            }).on('core.form.invalid', function (event) {
                $('.js--send-todo-attachments').prop('disabled', true);
                $(formClass).data('valid', false);
            }).on('core.form.valid', function (event) {
                $(formClass).attr('data-valid', 'true');
                //$(formClass).submit();
            });
        }

        //default target is todo/new
        let targetEl = '#js--upload-new-files-uppy';
        let endpoint = Routing.generate('admin_todo_new', {typeTodo});

        let previewFiles = [];

        //if is target todo/edit
        if (formType === 'edit') {
            targetEl = '#js--edit-files-uppy';
            let todoId = $(formClass).data('todo-id');
            endpoint = Routing.generate('admin_todo_edit', {typeTodo, id: todoId});
            $.ajax({
                type: 'GET',
                url: Routing.generate('admin_get_preview_files', {id: todoId}),
                dataType: "json",
                async: false,
                success: function (data) {
                    console.log(data);
                    previewFiles = data;
                    //console.log(previewFiles);
                },

                error: function (e) {
                    console.log(e);
                }
            });
        }

        if ($(targetEl).length) {

            const uppy = new Uppy({
                locale: German,
                allowMultipleUploadBatches: false,
                restrictions: {
                    maxFileSize: 15728640,//15 mb
                    maxNumberOfFiles: 5,
                    minNumberOfFiles: 0,
                    allowedFileTypes: ["image/*", "application/pdf"]
                },
                meta: {
                    'isUploadFiles': true
                },
            })
                .use(Dashboard, {
                    inline: true,
                    width: "100%",
                    height: 350,
                    hideUploadButton: true,
                    target: targetEl,
                    trigger: targetEl,
                    showProgressDetails: true,
                    proudlyDisplayPoweredByUppy: false,

                })
                .use(XHR, {
                    endpoint: endpoint,
                    bundle: true,
                    getResponseData(responseText, response) {
                        if (response.status === 200) {
                            window.location.href = Routing.generate(JSON.parse(responseText));
                        } else {
                            console.log(response);
                        }
                    }
                })
                .use(Form, {
                    target: '.js--todo-form',
                    getMetaFromForm: true,
                    addResultToForm: true,
                    submitOnSuccess: false,
                    triggerUploadOnSubmit: false,
                });


            if (previewFiles.length) {
                $(previewFiles).each(function (i, item) {
                    uppy.addFile({
                        name: previewFiles[i]['fileName'], // file name
                        type: previewFiles[i]['fileFormat'], // file type
                        data: b64toBlob(previewFiles[i]['fileContent']), // file blob
                        source: 'Local',
                        isRemote: false,
                    });
                });
            }

            $(".js--send-todo-attachments").on("click", function (e) {
                e.preventDefault();
                $(formClass).data('formValidation').validate().then((status) => {
                    if (status === 'Valid') {
                        const state = uppy.getState();
                        if (jQuery.isEmptyObject(state.files)) {
                            //$(formClass).trigger('submit');
                            $(formClass).submit();
                        } else {
                            const content = tinyMCE.activeEditor.getContent();
                            //fix for update input value tinyMCE
                            $('#tinymce-reply').val(content);
                            uppy.upload();
                        }
                    }
                });
            });


            $(".js--select-receiver-department").on("change.select2", function (e) {

                const divisionSelectedItem = $('.js--select-receiver-division');

                //const select2Data = $(this).select2('data');

                const departmentsId = $(this).val();

                //if we have data (edit form)
                const curDivisionId = $('.js--select-receiver-division').val();

                // $.each(select2Data, function (index, value) {
                //     departmentsId.push(select2Data[index]['id']);
                // });

                $.ajax({
                    type: 'POST',
                    url: Routing.generate('get_todo_receiver_divisions_by_user'),
                    data: {departmentsId},
                    success: function (data) {
                        divisionSelectedItem
                            .empty()
                            .append("<option value=''></option>");
                        $.each(data, function (i, d) {
                            divisionSelectedItem.append("<option data-department-id='" + d.department + "' value='" + d.id + "'>" + d.text + "</option>");
                        });
                        $('.js--select-receiver-division').val(curDivisionId);
                    },
                    error: function (data) {
                        divisionSelectedItem
                            .empty();
                    }
                });
            });
            //update select
          //  $(".js--select-receiver-department").trigger("change.select2");

            if ($('.js--select-receiver-division').val() != 1){

                //default id is 1
                let departmentId = 1;

                $.each($('.js--select-receiver-division option'), function (i, v) {
                    //check if select selected
                    if ( $(this).attr('selected') === 'selected') {
                        departmentId = $(this).data('department-id');
                    }
                });

                $(".js--select-receiver-department").val(departmentId).trigger('change.select2',false);

            }else{
                $(".js--select-receiver-department").trigger("change.select2");
            }


            $(".js--sender-division").on("change.select2", function (e,param) {

                const typeParentSelectItem = $('.js--todo-type-parent');

                //const select2Data = $(this).select2('data');
                const divisionId = $(this).val();

                //const divisionsId = [];

                let curTodoCategory = 1;

                $.each($('.js--todo-type-child option'), function (i, v) {
                    //check if select selected
                    if ( $(this).attr('selected') === 'selected') {
                        curTodoCategory = $(this).data('parent');
                    }
                });

                // $.each(select2Data, function (index, value) {
                //     divisionsId.push(select2Data[index]['id']);
                // });

                $.ajax({
                    type: 'POST',
                    url: Routing.generate('get_type_category_by_division'),
                    data: {divisionId},
                    success: function (data) {
                        typeParentSelectItem
                            .empty()
                            .append("<option value=''></option>");
                        $.each(data, function (i, d) {
                            typeParentSelectItem.append("<option value='" + d.id + "'>" + d.text + "</option>");
                        });
                        //update child type select
                        //if is edit set category type
                        if (param === undefined ) {
                            $('.js--todo-type-child').val('').trigger('change.select2', false);
                        }else{
                            $('.js--todo-type-parent').val(curTodoCategory).trigger('change.select2', false);
                        }
                    },
                    error: function (data) {
                        typeParentSelectItem
                            .empty();
                    }
                });

            });

            $(".js--sender-division").trigger("change.select2",false);

            $(".js--todo-type-parent").on("change.select2", function (e,param) {

                const typeChildrenSelectItem = $('.js--todo-type-child option');

                const parentVal = $(this).val();

                $.each(typeChildrenSelectItem, function (i, v) {
                    let el = $(this);

                    $(el).attr('disabled',false);

                    if ($(el).data('parent') != parentVal){
                        $(el).attr('disabled',true);
                    }
                });

                //update child type select
                //if is not edit event
                if (param === undefined ){
                    $('.js--todo-type-child').val('').trigger('change.select2',false);
                }

            });




            if ($('.js--todo-type-child').val() != 1){

                //default id is 1
                let divisionId = 1;

                $.each($('.js--todo-type-child option'), function (i, v) {
                    //check if select selected
                    if ( $(this).attr('selected') === 'selected') {
                        divisionId = $(this).data('parent');
                    }
                });

                $(".js--todo-type-parent").val(divisionId).trigger('change.select2',false);

            }else{
                $(".js--todo-type-parent").trigger("change.select2");
            }


           // $(".js--todo-type-parent").trigger("change.select2");

            //disable all type child
            // $.each($('.js--todo-type-child option'), function (i, v) {
            //     $(this).attr('disabled',true);
            // });
        }
    });
};


export default todoForm;
