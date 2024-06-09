$(function () {

    var $searchableTree = $('#treeview-searchable').treeview({
        selectedBackColor: "#03a9f3",
        onhoverColor: "rgba(0, 0, 0, 0.05)",
        expandIcon: 'ti-plus',
        collapseIcon: 'ti-minus',
        nodeIcon: 'fa fa-folder',
        data: treeData,
    });

    var search = function (e) {
        var pattern = $('#input-search').val();
        var options = {
            ignoreCase: $('#chk-ignore-case').is(':checked'),
            exactMatch: $('#chk-exact-match').is(':checked'),
            revealResults: $('#chk-reveal-results').is(':checked')
        };
        var results = $searchableTree.treeview('search', [pattern, options]);

        var output = '<p>' + results.length + ' matches found</p>';
        $.each(results, function (index, result) {
            output += '<p>- ' + result.text + '</p>';
        });
        $('#search-output').html(output);
    };

    $('#btn-search').on('click', search);
    $('#input-search').on('keyup', search);

    $('#btn-clear-search').on('click', function (e) {
        $searchableTree.treeview('clearSearch');
        $('#input-search').val('');
        $('#search-output').html('');
    });

});
