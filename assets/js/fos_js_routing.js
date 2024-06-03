
let Routing = require('../../vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router.min.js');
let routerConfig = require('./fos/fos_js_routes.json');

global.Routing = window.Routing = Routing;

Routing.setRoutingData(routerConfig);
module.exports = Routing;


// Call command:
// bin/console fos:js-routing:dump --format=json --target=assets/js/fos/fos_js_routes.json
// and yarn build or yarn start
