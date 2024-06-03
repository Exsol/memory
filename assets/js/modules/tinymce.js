/* Import TinyMCE */
import tinymce from 'tinymce';

/* Default icons are required for TinyMCE 5.3 or above */
import 'tinymce/icons/default';
import 'tinymce-i18n/langs/de';

/* A theme is also required */
import 'tinymce/themes/silver';

import 'tinymce/models/dom';

const tinymceJs = function ($) {

    var tinymceReplyEl = document.querySelector("#tinymce-reply");

    if ( tinymceReplyEl ) {
        // $(function () {
            tinymce.init({
                selector: 'textarea#tinymce-reply',
                menubar: false,
                skin: false,
                content_css: false,
                toolbar: [
                    { name: 'history', items: [ 'undo', 'redo' ] },
                    //{ name: 'styles', items: [ 'styles' ] },
                    { name: 'formatting', items: [ 'bold', 'italic', 'underline', 'strikethrough', 'removeformat' ] },
                    //{ name: 'alignment', items: [ 'alignleft', 'aligncenter', 'alignright', 'alignjustify' ] },
                    //{ name: 'indentation', items: [ 'outdent', 'indent' ] }
                ],
                branding: false,
                language: 'de',
                setup: function (editor) {
                    if ($('.js--todo-form').length) {
                        editor.on('keyup', function () {
                            $('.js--todo-form').data('formValidation').revalidateField('todo_create[content]');
                        });
                    }
                    if ($('.js--message-todo-form').length) {
                        editor.on('keyup', function () {
                            $('.js--message-todo-form').data('formValidation').revalidateField('todo_create[content]');
                        });
                    }
                },
                //content_style: contentUiCss.toString() + '\n' + contentCss.toString(),
            });
        // });
    }


    var tinymceTodoTypeEl = document.querySelector("#tinymce-todo-type");

    if ( tinymceTodoTypeEl ) {
        // $(function () {
            tinymce.init({
                selector: 'textarea#tinymce-todo-type',
                menubar: false,
                toolbar: [
                    { name: 'history', items: [ 'undo', 'redo' ] },
                    { name: 'styles', items: [ 'styles' ] },
                    { name: 'formatting', items: [ 'bold', 'italic', 'underline', 'strikethrough', 'removeformat' ] },
                    { name: 'alignment', items: [ 'alignleft', 'aligncenter', 'alignright', 'alignjustify' ] },
                    { name: 'indentation', items: [ 'outdent', 'indent' ] }
                ],
                branding: false,
                skin: false,
                content_css: false,
                language: 'de',
                setup: function (editor) {
                },
                //content_style: contentUiCss.toString() + '\n' + contentCss.toString(),
            });
        // });
    }



};
export default tinymceJs;