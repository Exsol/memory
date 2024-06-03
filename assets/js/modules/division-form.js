

const divisionForm = function ($, Routing) {
    $(function () {

            $(".js--parent-todo-type").on("change", function (e) {
                const parentId = $(this).data('parent');
                const parentVal = $(this).val();
                const statusCheckbox = $(this).prop('checked');

                //if parentId is empty and this checked => set checked attr children elements
                //else if parentId is empty and this not checked => set unchecked attr children elements
               if(parentId === ''){
                   $("input[name*='division[todoTypes][]']").each(function(){
                       if (parentVal == $(this).data('parent') && statusCheckbox) {
                           $(this).prop('checked', true);
                       }else if(parentVal == $(this).data('parent') && !statusCheckbox){
                           $(this).prop('checked', false);
                       }
                   });
                }

            });
        let checkedCheckbox = {};

        const updateCheckedCheckbox = () => {
            $.each($("input[name*='division[todoTypes][]']"), function (index, value) {
                if ($(this).data('parent')===''){
                    let parentId = $(this).val();
                    checkedCheckbox[parentId] = 0;
                }
                if ($(this).prop('checked') && $(this).data('parent')!==''){
                    let parentId = $(this).data('parent');
                    checkedCheckbox[parentId] = $("input[data-parent='" + parentId + "']").length;
                }
            });
        }


        updateCheckedCheckbox();

            $(".js--child-todo-type").on("change", function (e) {

                const parentId = $(this).data('parent');
                const statusCheckbox = $(this).prop('checked');


                if(parentId !== ''){
                    $.each($("input[name*='division[todoTypes][]']"), function (index, value) {
                        if ($(this).val() == parentId ) {

                            if (statusCheckbox) {
                                $(this).prop('checked', true);
                                checkedCheckbox[parentId] = checkedCheckbox[parentId]+1;
                            }else{
                                checkedCheckbox[parentId] = checkedCheckbox[parentId]-1;
                            }

                        }

                    });
                }
                updateCheckedCheckbox();
                if (checkedCheckbox[parentId] <= 0){
                    $('.js--parent-todo-type[value="'+parentId+'"]').prop('checked', false);
                }

            });
    });
};


export default divisionForm;
