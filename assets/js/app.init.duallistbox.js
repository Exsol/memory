$(function() {
    "use strict";

    if ( $('.diallistbox').length ) {
        $(".diallistbox").bootstrapDualListbox({
            nonSelectedListLabel: 'Verfügbar',
            selectedListLabel: 'Ausgewählt',
            preserveSelectionOnMove: 'moved',
            moveOnSelect: false,
            showFilterInputs: false,
            infoText: 'Angezeigt {0}',
        });
    }

});