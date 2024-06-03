class UserClass {

    static getUserId($,Routing,Cookies) {

        let userId = null;
        if (Cookies.get('userId')) {
             userId = Cookies.get('userId');
        } else {
            $.ajax({
                url: Routing.generate('admin_todo_get_user_id'),
                type: 'GET',
                dataType: 'json',
                async:false,
                processData: false,
                contentType: false,
                cache: false,
                success: function (data) {
                    Cookies.set('userId', data, {expires: 30});
                    userId = data;
                },
                error: function (e) {
                    console.log(e);
                }
            });
        }
        return userId;
    }


}

export default UserClass;