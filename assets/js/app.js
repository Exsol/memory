/*jshint esversion: 6 */


// any CSS you require will output into a single css file (app.css in this case)
// require('../scss/style.scss');

// require jQuery normally
const $ = require('jquery');
// create global $ and jQuery variables
global.$ = global.jQuery = jQuery = $;

var config = {};
var popper = global.popper = require('popper.js');
var bootstrap = global.bootstrap = require('bootstrap');
var bs4notify = global.bs4notify = require('bootstrap4-notify');
var elementResizeDetectorMaker = global.elementResizeDetectorMaker = require("element-resize-detector");
var toaster = global.toastr = require('toastr');
var Swal = global.Swal = require('sweetalert2');
var NProgress = global.NProgress = require('nprogress');

var erd = global.erd = elementResizeDetectorMaker();
// ({
//     strategy: "scroll" //<- For ultra performance.
// });

var Cookies = global.Cookies = require('js-cookie');

import Routing from './fos_js_routing';

import ChartJs from "chart.js";
import Chartist from "chartist";
import "chartist-plugin-tooltips";
import {Loader, LoaderOptions} from 'google-maps';
import "gmaps/gmaps";

require('../libs/fullcalendar/dist/fullcalendar.min');

import FormValidation from '../extra-libs/formvalidation-es6/core/Core';
import Bootstrap5 from '../extra-libs/formvalidation-es6/plugins/Bootstrap5';
import J from '../extra-libs/formvalidation-es6/plugins/J';
import Trigger from '../extra-libs/formvalidation-es6/plugins/Trigger';
import SubmitButton from '../extra-libs/formvalidation-es6/plugins/SubmitButton';
import DefaultSubmit from '../extra-libs/formvalidation-es6/plugins/DefaultSubmit';
import Icon from '../extra-libs/formvalidation-es6/plugins/Icon';
import iban from '../extra-libs/formvalidation-es6/validators/iban';
import bic from '../extra-libs/formvalidation-es6/validators/bic';
import notEmpty from '../extra-libs/formvalidation-es6/validators/notEmpty';
import date from '../extra-libs/formvalidation-es6/validators/date';
import stringLength from '../extra-libs/formvalidation-es6/validators/stringLength';
import digits from '../extra-libs/formvalidation-es6/validators/digits';


global.FormValidation = FormValidation;
global.Bootstrap5 = Bootstrap5;
// global.J = J;
global.Trigger = Trigger;
global.SubmitButton = SubmitButton;
global.DefaultSubmit = DefaultSubmit;
global.Icon = Icon;
global.iban = iban;
global.bic = bic;
global.notEmpty = notEmpty;
global.date = date;
global.stringLength = stringLength;
global.digits = digits;

require('../extra-libs/formvalidation-es6/locales/de_DE');

// var polyfill = require('polyfill');
// global.polyfill = polyfill;

require('./bootbox.app.js');
// require('./formvalidation.js');

require('../../node_modules/jquery-jeditable');
require('./modules/jeditable-fulltime');

//require('../../node_modules/jquery-typeahead/src/jquery.typeahead'); // with debug mode
require('../../node_modules/jquery-typeahead/dist/jquery.typeahead.min');

require('../../node_modules/datatables.net/js/jquery.dataTables.js');
require('../../node_modules/datatables.net-bs5/js/dataTables.bootstrap5.js');
// require('../../node_modules/datatables.net-responsive/js/dataTables.responsive.js');
// require('../../node_modules/datatables.net-responsive-bs5/js/responsive.bootstrap5.js');
require('../../node_modules/datatables.net-fixedheader-bs5/js/fixedHeader.bootstrap5.js');

require('./modules/cal-init');


import List from './classes/class-list';
global.List = List;

import Filter from './classes/class-filter';
Filter.Routing = Routing;
global.Filter = Filter;


import momentJs from './utils/moment';
momentJs();

import browserSupportUtil from './utils/browser-support-util';
browserSupportUtil($);

import datepickerUtil from './utils/datepicker-util';
datepickerUtil($);

import formvalidationUtil from "./utils/formvalidation-util";
formvalidationUtil($);

import select2Util from "./utils/select2-util";
select2Util($);

import jEditableUtil from "./utils/jeditable-util";
jEditableUtil($);

import contentUtil from "./utils/content-util";
contentUtil($);

import mapsUtil from "./utils/maps-util";
mapsUtil($);

import App from './classes/class-app';
App.Routing = Routing;
global.App = App;
import FormAjaxLoader from './classes/class-form-ajax-loader';
global.FormAjaxLoader = FormAjaxLoader;


import '../bootstrap';


