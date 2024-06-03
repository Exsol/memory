const userForm = function ($, Routing) {
    $(function () {

        $(".js--access-right-department-checkbox").on("change", function (e) {
            const dataId = $(this).data('id');
            const relationType = $(this).data('relation-type');
            const statusCheckbox = $(this).prop('checked');

            //if parentId is empty and this checked => set checked attr children elements
            //else if parentId is empty and this not checked => set unchecked attr children elements
            if (dataId !== '') {

                $(".js--accordion-" + relationType + " .js--access-right-divisions-checkbox[data-parent='" + dataId + "']").each(function () {
                    if (dataId == $(this).data('parent') && statusCheckbox) {
                        $(this).prop('checked', true);
                    } else if (dataId == $(this).data('parent') && !statusCheckbox) {
                        $(this).prop('checked', false);
                    }
                });
            }

        });

        $(".js--access-right-divisions-checkbox").on("change", function (e) {

            const parentId = $(this).data('parent');
            const relationType = $(this).data('relation-type');
            const statusCheckbox = $(this).prop('checked');

            if (parentId !== '') {
                if (statusCheckbox) {
                    $(".js--accordion-" + relationType + " .js--access-right-department-checkbox[data-id='" + parentId + "']").prop('checked', true);
                } else if ($(".js--accordion-" + relationType + " .js--access-right-divisions-checkbox[data-parent='" + parentId + "']:checked").length === 0) {
                    // count all childs of parent and uncheck parent if all unchecked
                    $(".js--accordion-" + relationType + " .js--access-right-department-checkbox[data-id='" + parentId + "']").prop('checked', false);
                }
            }
        });




        $('.js--accordion-toggle-all').click(function() {
            var allCollapsed = $('.accordion-collapse.multi-collapse').not('.show').length === $('.accordion-collapse.multi-collapse').length;
            if (allCollapsed) {
                $('.accordion-button.multi-collapse').not('.collapsed').addClass('collapsed');
                $('.accordion-collapse.multi-collapse').collapse('show');
                $(this).text('Alle schließen');
            } else {
                $('.accordion-button.multi-collapse.collapsed').removeClass('collapsed');
                $('.accordion-collapse.multi-collapse').collapse('hide');
                $(this).text('Alle umschalten');
            }
        });


    });
};

export default userForm;
