
const customerForm = function (Routing) {

    $.typeahead({
        debug: false,
        input: ".js--form-create--search",
        maxItem: 50,
        minLength: 1,
        order: "asc",
        dynamic: true,
        delay: 500,
        backdrop: {
            "background-color": "#000"
        },
        template: function (query, item) {
            //console.log(['item', item]);
            //console.log(['template', '<span class="email">{{email}}</span>']);
            return '{{firstName}} {{lastName}} - {{email}}';
            // return '<span class="row">' +
            //     '<span class="email">{{email}} <small>{{firstName}} {{lastName}}</small></span>' +
            //     "</span>";
        },
        emptyTemplate: 'Kein Ergebnis für "{{query}}"',
        source: {
            customers: {
                display: ["firstName", "lastName", "email"],
                ajax: function (query) {
                    return {
                        type: "POST",
                        url: Routing.generate('admin_customer_search'),
                        path: "data.customers",
                        data: {
                            search: "{{query}}",
                            token: function () {
                                return $('.js--form-create--search').data('token');
                            }
                        }/*,
                        callback: {
                            done: function (data) {
                                console.log(data.data.customers);
                                // $.each(data.data.customers, function(index, value) {
                                //     console.log(value);
                                // });
                                return data;
                            }//,
                            // onCancel: function (node, event) {
                            //     $('.js--customer-user').val('');
                            //     $('.js--customer-email').val('');
                            //     $('.js--customer-firstname').val('');
                            //     $('.js--customer-lastname').val('');
                            // },
                            // onSearch: function (node, event) {
                            //     $('.js--customer-user').val('');
                            //     $('.js--customer-email').val('');
                            //     $('.js--customer-firstname').val('');
                            //     $('.js--customer-lastname').val('');
                            // },
                            // onClick: function (node, a, item, event) {
                            //
                            //     $('.js--customer-user').val(item.id);
                            //     $('.js--customer-email').val(item.email);
                            //     $('.js--customer-firstname').val(item.firstName);
                            //     $('.js--customer-lastname').val(item.lastName);
                            //     // console.log('onClick function triggered');
                            //     // console.log('node', node);
                            //     // console.log('a', a);
                            //     // console.log('item', item);
                            //     // console.log('event', event);
                            //     // console.log('/ onClick function triggered');
                            //
                            // },
                        },*/

                    };
                }
            }
        },
        callback: {
            onCancel: function (node, event) {
                $('.js--customer-user').val('');
                $('.js--customer-email').val('');
                $('.js--customer-firstname').val('');
                $('.js--customer-lastname').val('');
            },
            onSearch: function (node, event) {
                $('.js--customer-user').val('');
                $('.js--customer-email').val('');
                $('.js--customer-firstname').val('');
                $('.js--customer-lastname').val('');
            },
            onClick: function (node, a, item, event) {

                $('.js--customer-user').val(item.id);
                $('.js--customer-email').val(item.email);
                $('.js--customer-firstname').val(item.firstName);
                $('.js--customer-lastname').val(item.lastName);
                // console.log('onClick function triggered');
                // console.log('node', node);
                // console.log('a', a);
                // console.log('item', item);
                // console.log('event', event);
                // console.log('/ onClick function triggered');

            },
            onSubmit: function (node, form, item, event) {
            }
        }

    });

}

export default customerForm;

