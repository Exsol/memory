class WebserviceClass {

    static getWebServiceData($,Routing,Cookies) {

        let wsData = {
            uuid: '',
            wssUrl: $('meta[name="wss-url"]').attr('content'),
        };

        if (Cookies.get('uuid')) {
            wsData.uuid = Cookies.get('uuid');
        }

        if (wsData.uuid == '') {
            $.ajax({
                url: Routing.generate('admin_todo_get_user_uuid'),
                type: 'GET',
                dataType: 'json',
                async:false,
                processData: false,
                contentType: false,
                cache: false,
                success: function (data) {
                    Cookies.set('uuid', data.uuid, {expires: 30});
                    wsData.uuid = data.uuid;
                },
                error: function (e) {
                    console.log(e);
                }
            });
        }

        return wsData;
    }
}

export default WebserviceClass;