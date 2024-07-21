import Uppy from "@uppy/core";
import Dashboard from "@uppy/dashboard";
import Form from "@uppy/form";
import FileInput from '@uppy/file-input';
import XHR from '@uppy/xhr-upload';
import Russian from '@uppy/locales/lib/ru_RU';
import FormValidation from '../../extra-libs/formvalidation-es6/core/Core';
import ImageEditor from '@uppy/image-editor';

const personForm = function ($, Routing) {
    $(document).ready(function () {

        $('.js--select-memory-thema').trigger('change');

        let lat = $('.lat').val();
        let lng = $('.lng').val();

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


        const formClass = '.js--person-form';
        const form = $('.validation-wizard').show();
        const typeTodo = $(formClass).data('type');
        const formType = $(formClass).data('type-form');


        $(document).on('click', '.js--add-epitaph', function (e) {

            let el = document.createElement('button');
            el.className = 'btn btn-default mt-3 js--delete-epitaph';
            el.innerHTML = 'Удалить';

            addFormToCollection(e, el);

            $(this).remove();

        });

        $(document).on('click', '.js--add-wordsMemory', function (e) {

            let el = document.createElement('button');
            el.className = 'btn btn-default mt-3 js--delete-item';
            el.innerHTML = 'Удалить';

            addFormToCollection(e, el);
        });

        $(document).on('click', '.js--add-linksMemory', function (e) {

            let el = document.createElement('button');
            el.className = 'btn btn-default mt-3 js--delete-item';
            el.innerHTML = 'Удалить';

            addFormToCollection(e, el);
        });

        $(document).on('click', '.js--add-burialPlace', function (e) {

            let el = document.createElement('button');
            el.className = 'btn btn-default mt-3 js--delete-burialPlace';
            el.innerHTML = 'Удалить';

            addFormToCollection(e, el);
            $(this).remove();
            $('#mapPerson').removeClass('d-none');
            mapInit();
        });


        $(document).on('click', '.js--delete-burialPlace', function (e) {

            let parent = $(this).parent();

            $('#mapPerson').addClass('d-none');

            let el = '<button type="button" class="btn btn-default mt-3 js--add-burialPlace" data-collection-holder-class="burialPlace">Отметить на карте место захоронения</button>';

            $('.lat').val('');
            $('.lng').val('');
            parent.parent().next().html(el);
            parent.remove();

        });

        $(document).on('click', '.js--delete-epitaph', function (e) {

            let parent = $(this).parent();

            let el = '<button type="button" class="btn btn-default m-3 js--add-epitaph" data-collection-holder-class="epitaph">Добавить эпитаф</button>';

            parent.parent().next().html(el)

            parent.remove();

        });

        $(document).on('click', '.js--delete-item', function (e) {
            $(this).parent().remove();
        });

        function addFormToCollection(e, el) {
            const collectionHolder = document.querySelector('.' + e.currentTarget.dataset.collectionHolderClass);

            console.log(collectionHolder.dataset.index);

            const item = document.createElement('li');

            item.innerHTML = collectionHolder
                .dataset
                .prototype
                .replace(
                    /__name__/g,
                    collectionHolder.dataset.index
                );

            item.append(el);

            collectionHolder.appendChild(item);

            collectionHolder.dataset.index++;

        };


        function mapInit() {

            setTimeout(function () {


                let lng = $('.lng').val() ? $('.lng').val() : '37.554263';
                let lat = $('.lat').val() ? $('.lat').val() : '55.724596';


                console.log(lng);
                console.log(lat);


                mapboxgl.accessToken = 'pk.eyJ1IjoibmFtbGkiLCJhIjoiY2tnM2k3YW94MGF3dzJxcW5uNHl5bjRkbyJ9.QYJaY-c7BegGsbWSG-Zaeg';


                mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js');

                const map = new mapboxgl.Map({
                    container: 'mapPerson',
                    style: 'mapbox://styles/mapbox/dark-v11',
                    center: [lng, lat],
                    bearing: 29,
                    zoom: 13
                });

                map.addControl(new MapboxLanguage({
                    defaultLanguage: 'ru'
                }));


                const marker = new mapboxgl.Marker({
                    draggable: true
                }).setLngLat([lng, lat])
                    .addTo(map);

                // Initialize a new marker

                function onDragEnd() {
                    const lngLat = marker.getLngLat();
                    $('.lng').val(lngLat.lng);
                    $('.lat').val(lngLat.lat);
                }

                marker.on('dragend', onDragEnd);


                const geocoder = new MapboxGeocoder({
                    // Initialize the geocoder
                    accessToken: mapboxgl.accessToken,
                    mapboxgl: mapboxgl,
                    placeholder: 'Поиск по карте'
                });


                geocoder.on('result', function (e) {
                    console.log(e.result.center);
                    geocoder.clear();
                    console.log(marker);
                    marker.setLngLat(e.result.center)

                });

                map.addControl(geocoder);

                map.on('load', () => {
                    map.addSource('single-point', {
                        'type': 'geojson',
                        'data': {
                            'type': 'FeatureCollection',
                            'features': []
                        }
                    });

                    geocoder.on('result', (event) => {
                        map.getSource('single-point').setData(event.result.geometry);
                    });

                });
            }, 1200);
        }

        const mapPersonViewId = '#mapBurialPlace';

        if ($(mapPersonViewId).length) {


            let lng = $(mapPersonViewId).data('lng');
            let lat = $(mapPersonViewId).data('lat');


            setTimeout(function () {
                mapboxgl.accessToken = 'pk.eyJ1IjoibmFtbGkiLCJhIjoiY2tnM2k3YW94MGF3dzJxcW5uNHl5bjRkbyJ9.QYJaY-c7BegGsbWSG-Zaeg';


                mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js');

                const map = new mapboxgl.Map({
                    container: 'mapBurialPlace',
                    style: 'mapbox://styles/mapbox/dark-v11',
                    center: [lng, lat],
                    bearing: 29,
                    zoom: 13
                });

                map.addControl(new MapboxLanguage({
                    defaultLanguage: 'ru'
                }));

                const marker = new mapboxgl.Marker({
                    draggable: false
                }).setLngLat([lng, lat])
                    .addTo(map);
            }, 1200);
        }


        //{{ path('admin_qrcode_view', {id: qrcode.id}) }}


        //default target is person/new
        let targetEl = '#js--upload-person-avatar';
        let targetEl2 = '#js--upload-person-photo-arhive';

        // let endpoint = '/person/code/'+'b9e7aa0b-1c80-4b33-8ae7-a9a56989d71e';
        let uuid = $('.js--uuid').val();

        let endpoint = Routing.generate('person_code', {uuid});

        console.log(endpoint);

        let previewFiles = [];
        let previewFilesPhotoArhive = [];

        let type = $('.js--person-form-edit').data('type');
        console.log(type);
        if (type === 'edit') {
            //targetEl = '#js--edit-files-uppy';
            endpoint = Routing.generate('edit_person_page', {uuid});

            $.ajax({
                type: 'GET',
                url: Routing.generate('person_get_preview_main_photo', {uuid}),
                dataType: "json",
                async: false,
                success: function (data) {
                    previewFiles = data;
                },

                error: function (e) {
                    console.log(e);
                }
            });


            $.ajax({
                type: 'GET',
                url: Routing.generate('person_get_preview_photo_arhive', {uuid}),
                dataType: "json",
                async: false,
                success: function (data) {
                    previewFilesPhotoArhive = data;
                },

                error: function (e) {
                    console.log(e);
                }
            });


        }

        if ($(targetEl).length) {

            setTimeout(function () {

                window.uppy = new Uppy({
                    locale: Russian,
                    id: 'id_1',
                    allowMultipleUploadBatches: false,
                    restrictions: {
                        maxFileSize: 15728640,//15 mb
                        maxNumberOfFiles: 1,
                        minNumberOfFiles: 1,
                        allowedFileTypes: ["image/*"]
                    },
                    onBeforeFileAdded: function (currentFile, files) {
                        currentFile.meta.name = '_' + currentFile.name.toLowerCase();
                        return currentFile;
                    },

                    onBeforeUpload: (files) => {

                        let state2 = uppy2.getState();

                        const updatedFiles = {};
                        Object.keys(files).forEach((fileID) => {
                            updatedFiles[fileID] = {
                                ...files[fileID],
                                name: `Avatar_@_6226922`
                            };
                        });

                        let result = Object.assign({}, updatedFiles, state2.files);
                        console.log(result);
                        return result;
                    },
                    meta: {
                        'isUploadFiles': true
                    },
                })
                    .use(Dashboard, {
                        inline: true,
                        width: "100%",
                        height: 650,
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
                                window.location.href = Routing.generate('person_code', {uuid});
                            } else {
                                console.log(response);
                            }
                        }
                    })
                    .use(ImageEditor, {
                        actions: {
                            revert: true,
                            rotate: true,
                            granularRotate: false,
                            flip: false,
                            zoomIn: true,
                            zoomOut: true,
                            cropSquare: false,
                            cropWidescreen: false,
                            cropWidescreenVertical: true,
                        }
                    })
                    .use(Form, {
                        target: '.js--person-form',
                        getMetaFromForm: true,
                        addResultToForm: true,
                        submitOnSuccess: false,
                        triggerUploadOnSubmit: false,
                    });

                window.uppy2 = new Uppy({
                    locale: Russian,
                    id: 'id_2',
                    allowMultipleUploadBatches: false,
                    restrictions: {
                        maxFileSize: 15728640,//15 mb
                        maxNumberOfFiles: 10,
                        minNumberOfFiles: 1,
                        allowedFileTypes: ["image/*"]
                    },
                    meta: {
                        'isUploadFiles': true
                    },
                })
                    .use(Dashboard, {
                        inline: true,
                        width: "100%",
                        height: 650,
                        hideUploadButton: true,
                        target: targetEl2,
                        trigger: targetEl2,
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
                        target: '.js--person-form',
                        getMetaFromForm: true,
                        addResultToForm: true,
                        submitOnSuccess: false,
                        triggerUploadOnSubmit: false,
                    });


                if (previewFiles.length) {
                    $(previewFiles).each(function (i, item) {
                        uppy.addFile({
                            name: previewFiles[i]['fileName'],
                            type: previewFiles[i]['fileFormat'],
                            data: b64toBlob(previewFiles[i]['fileContent']),
                            source: 'Local',
                            isRemote: false,
                        });
                    });
                }

                if (previewFilesPhotoArhive.length) {
                    $(previewFilesPhotoArhive).each(function (i, item) {
                        uppy2.addFile({
                            name: previewFilesPhotoArhive[i]['fileName'],
                            type: previewFilesPhotoArhive[i]['fileFormat'],
                            data: b64toBlob(previewFilesPhotoArhive[i]['fileContent']),
                            source: 'Local',
                            isRemote: false,
                        });
                    });
                }


            }, 100);

            $('.validation-wizard').steps({
                headerTag: 'h6',
                bodyTag: 'section',
                transitionEffect: 'fade',
                titleTemplate: '<span class="step">#index#</span> #title#',
                labels: {
                    finish: 'Отправить',
                    next: 'Далее',
                    previous: 'Назад'
                },
                onStepChanging: function (event, currentIndex, newIndex) {

                    if (currentIndex === 0) {
                        const state = uppy.getState();

                        if (jQuery.isEmptyObject(state.files)) {
                            Swal.fire('Обязательно загрузите фотографию', '', 'error');
                            return false
                        }
                    }
 

                    //step 2 validation
                    if (currentIndex === 1) {

                        const state = uppy2.getState();

                        if (jQuery.isEmptyObject(state.files)) {
                            Swal.fire('Обязательно загрузите фотоархив', '', 'error');
                            return false
                        }

                    }

                    console.log(currentIndex);
                    if (currentIndex === 2) {
                        if (lat !== null && lng !== null){
                            $('#mapPerson').removeClass('d-none');
                            mapInit();
                        }
                    }
                    return (
                        currentIndex > newIndex ||
                        (!(3 === newIndex && Number($('#age-2').val()) < 18) &&
                            (currentIndex < newIndex &&
                            (form.find('.body:eq(' + newIndex + ') label.error').remove(),
                                form.find('.body:eq(' + newIndex + ') .error').removeClass('error')),
                                (form.validate().settings.ignore = ':disabled,:hidden'),
                                form.valid()))
                    );
                },
                onFinishing: function (event, currentIndex) {
                    return (form.validate().settings.ignore = ':disabled'), form.valid();
                },
                onFinished: function (event, currentIndex) {
                    uppy.upload();
                },
            }),
                $('.validation-wizard').validate({
                    lang: 'ru',
                    ignore: 'input[type=hidden]',
                    errorClass: 'text-danger',
                    successClass: 'text-success',
                    highlight: function (element, errorClass) {
                        $(element).removeClass(errorClass);
                    },
                    unhighlight: function (element, errorClass) {
                        $(element).removeClass(errorClass);
                    },
                    errorPlacement: function (error, element) {
                        error.insertAfter(element);
                    },
                    rules: {
                        email: {
                            email: !0,
                        },
                        'person_create[emailClient][first]': {
                            minlength: 3,
                        },
                        'person_create[emailClient][second]': {
                            equalTo: ".js--client-email",
                            minlength: 3,
                        },
                    },
                    messages: {
                        email: {
                            required: "Это поле обязательное к заполнению",
                            email: "Не верный формат почтового ящика example@mail.com"
                        }
                    }
                });
        }

        $(".js--send-change-memory-link").on("click", function (e) {

            let uuid = $(this).data('uuid');
            $.ajax({
                type: "POST",
                url: Routing.generate('person_code_edit_link', {uuid}),
                success: function (data) {
                    console.log(data);
                    Swal.fire({
                        type: 'success',
                        title: 'Успешно',
                        text: 'Ссылка для изменения данных будет отправлена на e-mail, указанный при добавлении этой страницы',
                        icon: 'success',
                    });
                }
            })

        });
        $(".js--select-memory-thema").on("change", function () {
            let thema = $(this).val();
            let path = '/option-bg/v-'+thema+'.jpg'
            $('.js--preview-memory-bg').attr('src',path)
        });

    });
};


export default personForm;
