import bootbox from "../../extra-libs/bootbox-5";
import Uppy from "@uppy/core";
import Dashboard from "@uppy/dashboard";
import Form from "@uppy/form";
import XHR from '@uppy/xhr-upload';
import German from '@uppy/locales/lib/de_DE';


const todoMessageForm = function ($, Routing, ws) {

    $(document).ready(function () {

        const ajaxSelector = 'js--message-todo-form-ajax';

        if ($('.js--message-todo-form').length) {

            setTimeout(() => {
                $(".scrollable").scrollTop($(".scrollable").prop("scrollHeight"));
                $(".scrollable").perfectScrollbar('update');
            }, 100);
            const typeTodo = $('.js--type-todo').val();
            const todoId = $('.js--todo-id').val();
            const targetEl = '#js--add-new-message-files-uppy';
            const endpoint = Routing.generate('admin_todo_add_message_ajax', {id: todoId});
            const userId = $('.js--user-id').val();

            const token = $('.js--add-message-ajax-token').val();


            const updateContentByFakeInput = () => {

                const content = $('.js--fake-input').val();

                if (content.length >= 2 && content.length <= 5000) {
                    $('.js--todo-message-content').val(content);
                    //submit form
                    $('.js--message-todo-form-ajax').trigger('click');
                } else {
                    $('.js--fake-input').parent().addClass('css-input-error');
                    toastr.error('', 'Der Kommentar muss zwischen 2 und 5000 Zeichen lang sein.');
                }
            };

            $(document.body).on("click", ".js--send-trigger", function (e) {
                updateContentByFakeInput();
            });

            $(document.body).on("focus", ".js--fake-input", function (e) {
                $(this).parent().toggleClass('css--focus-input');
                $('.js--fake-input').parent().removeClass('css-input-error');
            });

            $(document.body).on("blur", ".js--fake-input", function (e) {
                $(this).parent().toggleClass('css--focus-input');
            });

            $(document.body).on("keypress", ".js--fake-input", function (e) {
                $(this).parent().removeClass('css-input-error');
            });


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
                    'token': token
                },
            })
                .use(Dashboard, {
                    inline: false,
                    width: "100%",
                    height: 450,
                    hideUploadButton: true,
                    //target: targetEl,
                    //trigger: targetEl,
                    showProgressDetails: true,
                    proudlyDisplayPoweredByUppy: false,
                })
                .use(XHR, {
                    endpoint: endpoint,
                    bundle: true,
                    getResponseData(responseText, response) {
                        if (response.status === 200) {
                            toastr.success('', responseText);
                            getMessageList(typeTodo, todoId);
                            //send websocket
                            if (ws !== null) {
                                ws.send(todoId);
                            }
                        } else {
                            toastr.error('', responseText);
                        }
                    }
                })
                .use(Form, {
                    target: '.js--message-todo-form',
                    getMetaFromForm: true,
                    addResultToForm: true,
                    submitOnSuccess: false,
                    triggerUploadOnSubmit: false,
                });


            const fv = $('.js--message-todo-form').formValidation({
                fields: {
                    // 'todo_message[content]': {
                    //     validators: {
                    //         callback: {
                    //             message: 'Der Kommentar muss zwischen 5 und 5000 Zeichen lang sein.',
                    //             callback: function (value) {
                    //                 const text = tinyMCE.activeEditor.getContent({
                    //                     format: 'text',
                    //                 });
                    //                 return text.length <= 5000 && text.length >= 5;
                    //             },
                    //         },
                    //     }
                    // },
                    'todo_message[fileTodo]': {
                        validators: {
                            file: {
                                extension: 'pdf,jpg,png',
                                type: 'application/pdf,image/jpeg,image/png',
                                message: 'Das Dateiformat ist nicht geeignet',
                                maxSize: 10485760,
                            },
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

            // tinymce.init({
            //     selector: 'textarea#tinymce-reply',
            //     skin: false,
            //     content_css: false,
            //     setup: function (editor) {
            //         editor.on('keyup', function () {
            //             $('.js--message-todo-form').data('formValidation').revalidateField('todo_message[content]');
            //         });
            //     },
            // });
            const dashboard = uppy.getPlugin('Dashboard');

            //$(document.body).on("dragenter", ".js--fake-input", function (e) {
            $('body').on("dragenter", function (e) {
                //uppy.getPlugin('Dashboard').openModal();
                 dashboard.openModal();
            });

            $(document.body).on("change", ".js--modal-fake-input", function (e) {
                $('.js--todo-message-content').val($(this).val());
            });

            $(document.body).on("click", ".js--send-modal-trigger", function (e) {
                //$('.uppy-StatusBar-actionBtn--upload').trigger('click');
                dashboard.uppy.upload();

            });

            $(document.body).on("focus", ".js--modal-fake-input", function (e) {
                $(this).parent().toggleClass('css--focus-input');
            });

            $(document.body).on("blur", ".js--modal-fake-input", function (e) {
                $(this).parent().toggleClass('css--focus-input');
            });

            uppy.on('dashboard:modal-open', () => {
                if (!$('.js--modal-fake-input').length) {
                    const el =
                        '<div class="input-group css--modal-fake-input-row">' +
                        '<input placeholder="Eingeben und mit Enter abschicken" class="js--modal-fake-input form-control" type="text">' +
                        '<button class="js--send-modal-trigger btn btn-sm btn-primary" type="button">' +
                        '<i class="fa fa-check"></i>' +
                        '</button>' +
                        '</div>';
                    $(".uppy-Dashboard-progressindicators").prepend(el);
                }
            });

            uppy.on('dashboard:modal-closed', () => {
                //clear all modal data
                $('.uppy-DashboardContent-back').trigger('click');
                $('.js--modal-fake-input').val('');
                $('.js--todo-message-content').val('');
            });
            $('.js--message-todo-form').data('formValidation').on('core.form.valid', function (event) {

                // const submitButton = $('.js--message-todo-form').data('formValidation').plugins.submitButton.clickedButton;
                //
                // const submitButtonClassArray = $(submitButton).attr('class').split(' ');
                //
                // if (submitButtonClassArray.includes(ajaxSelector)) {

                //const content = tinymce.activeEditor.getContent();
                const content = $('.js--fake-input').val();

                const state = uppy.getState();

                if (jQuery.isEmptyObject(state.files)) {

                    var formData = new FormData();

                    formData.append('todo_message[content]', content);
                    formData.append('token', token);

                    $.ajax({
                        url: Routing.generate('admin_todo_add_message_ajax', {id: todoId}),
                        type: 'POST',
                        dataType: 'json',
                        data: formData,
                        processData: false,
                        contentType: false,
                        cache: false,
                        success: function (data) {
                            toastr.success('', data);
                            $('.js--fake-input').val('');
                            $('.js--todo-message-content').val('');
                            $('.js--modal-fake-input').val('');
                            getMessageList(typeTodo, todoId);

                            if (ws !== null) {
                                ws.send(todoId);
                            }

                        },
                        error: function (e) {
                            console.log(e);
                        }
                    });

                } else {
                    //const content =  $('.js--fake-input').val();
                    //fix for update input value tinyMCE
                    //$('#tinymce-reply').val(content);
                    uppy.upload();
                    if (ws !== null) {
                        ws.send(todoId);
                    }
                }
            }).on('core.field.invalid', function (event) {
                console.log(event);
                // if (event === "todo_message[content]") {
                //     toastr.error('', 'Der Kommentar ist zu klein oder zu groß');
                // }

            });
            if (ws !== null) {
                ws.onmessage = function (e) {
                    console.log(e.data);
                    //if we have message from server with current todoID reload current chat
                    if (e.data == todoId) {
                        getMessageList(typeTodo, todoId);
                    }else{
                        let notification = "Es gibt eine neue Nachricht in TODO ID: "+e.data;
                        toastr.success('', notification);
                    }
                };
            }

            $(document).on('keypress', function (e) {

                if (e.which === 13) {

                    //updateContentByFakeInput();

                    if (dashboard.isModalOpen()) {
                       e.preventDefault();
                       $('.js--message-todo-form-ajax').trigger('click');
                    }else {
                        updateContentByFakeInput();
                    }
                }
            });

        }
        return false;
    });


    const getMessageList = (typeTodo, id) => {

        const token = $('.js--get-message-list-token').val();

        $.ajax({
            url: Routing.generate('admin_todo_get_message_list', {typeTodo, id, token}),
            type: 'GET',
            dataType: 'json',
            processData: false,
            contentType: false,
            cache: false,
            beforeSend: function () {
                $('.js--message-body-list').addClass('load-block');
                $('.js--message-todo-form').addClass('load-block');
            },
            success: function (data) {
                if (data.length > 0) {
                    //update tinyMCE
                    //tinyMCE.activeEditor.setContent('');
                    $('.js--fake-input').val('');
                    $('.js--todo-message-content').val('');
                    $('.js--modal-fake-input').val('');
                    //update uppy
                    $('.uppy-StatusBar-actionBtn--done').trigger('click');

                    //add messages to message list
                    $('.js--message-body-list').html(data);
                    $('.js--message-body-list').removeClass('load-block');
                    $('.js--message-todo-form').removeClass('load-block');


                    $('.scrollable').perfectScrollbar({
                        wheelPropagation: !0
                    });

                    $(".scrollable").scrollTop($(".scrollable").prop("scrollHeight"));

                    $(".scrollable").perfectScrollbar('update');

                    //All todoAttachments block update
                    updateAllTodoAttachments(id);
                }
            },
            error: function (e) {
                console.log(e);
            }
        });
    };

    const updateAllTodoAttachments = (id) => {

        const token = $('.js--get-all-todo-attachments').val();

        $.ajax({
            url: Routing.generate('admin_todo_get_all_todo_attachment', {id, token}),
            type: 'GET',
            dataType: 'json',
            processData: false,
            contentType: false,
            cache: false,
            beforeSend: function () {
                $('.js--all-todo-attachments').addClass('load-block');
            },
            success: function (data) {
                if (data.length > 0) {
                    $('.js--all-todo-attachments').html(data);
                    $('.js--all-todo-attachments').removeClass('load-block');
                }
            },
            error: function (e) {
                console.log(e);
            }
        });
    };

    $(document.body).on("click", ".js--modal-view-todo-attachment", function (e) {
        const data = $(this).data('params');
        const url = $(this).data('action');
        const size = $(this).data('size');
        const sf = '';
        bootbox.hideAll();
        BootboxApp.bootboxDialog(url, data, size, sf);
    });
};

export default todoMessageForm;

