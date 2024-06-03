const todoShow = function ($, Routing) {
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

        $(document.body).on("click", ".js--download-todo-attachment", function (e) {

            const id = $(this).data('attachment-id');
            const fileName = $(this).data('file-name');
            const fileFormat = $(this).data('file-format');


            $.ajax({
                url: Routing.generate('admin_todo_get_file_by_attachment_id', {id}),
                type: 'GET',
                dataType: 'json',
                processData: false,
                contentType: false,
                cache: false,
                success: function (data) {

                    const fileContent = data.fileContent;
                    const blob = b64toBlob(fileContent, fileFormat);
                    const link = document.createElement('a');

                    link.href = window.URL.createObjectURL(blob);
                    link.download = fileName;
                    link.click();
                    link.remove();

                },
                error: function (e) {
                    console.log(e);
                }
            });


        });

    });
};


export default todoShow;
