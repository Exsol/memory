
const wsFunctions = function ($, ws) {

    if (ws !== null) {
        ws.onmessage = function (e) {
            let notification = "Es gibt eine neue Nachricht in TODO ID: "+e.data;
            toastr.success('', notification);
        };

        ws.onopen = function (e) {
            console.log('Web Socket connected');
        };

        ws.onerror = function (e) {
            console.log(e);
        };
    }
};

export default wsFunctions;
