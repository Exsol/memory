/**
 * Placeholder plugin for CKEditor
 *
 * @author Sujeet <sujeetkv90@gmail.com>
 * @link https://github.com/sujeetkv/placeholder-select
 *
 * Originally created by Troy Lutton https://github.com/troylutton/ckeditor
 */
CKEDITOR.plugins.add('placeholder_select', {
    requires: ['richcombo'],

    onLoad: function () {
        // Register styles for placeholder widget frame.
        CKEDITOR.addCss('.cke_placeholder_select{background-color:#ff0}');
    },

    init: function (editor) {
        var placeholder_format = '{{%placeholder%}}';

        //  array of placeholders to choose from that'll be inserted into the editor
        var placeholders = [];

        // init the default config - empty placeholders
        var defaultConfig = {
            placeholders: [],
            toolLabel: 'Vertragnehmer Parameter',
            toolTitle: 'Vertragnehmer Parameter',
            listGroup: 'Vertragnehmer Parameter'
        };

        // merge defaults with the passed in items
        var config = CKEDITOR.tools.extend(defaultConfig, editor.config.placeholder_select || {}, true);

        // run through an create the set of items to use
        for (var i in config.placeholders) {
            var item = false;

            if ('object' === typeof config.placeholders[i] && config.placeholders[i].value) {
                item = {};
                item.value = config.placeholders[i].value;
                item.text = config.placeholders[i].text || item.value;
                item.label = config.placeholders[i].label || item.text;
            }
            else if ('string' === typeof config.placeholders[i]) {
                item = {};
                item.value = config.placeholders[i];
                item.text = config.placeholders[i];
                item.label = config.placeholders[i];
            }

            if (item) {
                // get our custom placeholder format
                var placeholder = placeholder_format.replace('%placeholder%', item.value);
                placeholders.push([placeholder, item.label, item.text]);
            }
        }

        // add the menu to the editor
        editor.ui.addRichCombo('placeholder_select', {
            label: config.toolLabel,
            title: config.toolTitle,
            voiceLabel: config.toolLabel,
            className: 'cke_format',
            multiSelect: false,

            panel: {
                css: [editor.config.contentsCss, CKEDITOR.skin.getPath('editor')],
                voiceLabel: editor.lang.panelVoiceLabel,
                multiSelect: false,
                attributes: { 'aria-label': config.toolLabel }
            },

            init: function () {
                this.startGroup(config.listGroup);
                for (var i in placeholders) {
                    this.add(placeholders[i][0], placeholders[i][1], placeholders[i][2]);
                }
            },

            onClick: function (value) {
                editor.focus();
                editor.fire('saveSnapshot');
                editor.insertHtml(value);
                editor.fire('saveSnapshot');
            }
        });

        editor.widgets.add('placeholder_select', {
            // Widget person.
            ui: 'placeholder_select',
            pathName: 'placeholder_select',
            // We need to have wrapping element.
            template: '<span class="cke_placeholder_select">{{}}</span>',

            downcast: function () {
                return new CKEDITOR.htmlParser.text('{{' + this.data.name + '}}');
            },

            init: function () {
                // Note that placeholder markup characters are stripped for the name.
                this.setData('name', this.element.getText().slice(2, -2));
            },

            data: function () {
                this.element.setText('{{' + this.data.name + '}}');
            },

            getLabel: function () {
                return this.editor.lang.widget.label.replace(/%1/, this.data.name + ' placeholder_select');
            }
        });
    },

    afterInit: function (editor) {
        var placeholderReplaceRegex = /\{\{([^\[\]])+\}\}/g;

        editor.dataProcessor.dataFilter.addRules({
            text: function (text, node) {
                var dtd = node.parent && CKEDITOR.dtd[node.parent.name];

                // Skip the case when placeholder is in elements like <title> or <textarea>
                // but upcast placeholder in custom elements (no DTD).
                if (dtd && !dtd.span)
                    return;

                return text.replace(placeholderReplaceRegex, function (match) {
                    // Creating widget person.
                    var widgetWrapper = null,
                        innerElement = new CKEDITOR.htmlParser.element('span', {
                            'class': 'cke_placeholder_select'
                        });

                    // Adds placeholder identifier as innertext.
                    innerElement.add(new CKEDITOR.htmlParser.text(match));
                    widgetWrapper = editor.widgets.wrapElement(innerElement, 'placeholder_select');

                    // Return outerhtml of widget wrapper so it will be placed as replacement.
                    return widgetWrapper.getOuterHtml();
                });
            }
        });
    }
});
