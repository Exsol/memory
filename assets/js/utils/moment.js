import moment from "moment";
import "moment/locale/de";
moment.locale('de');
global.moment = moment;

// const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

// new MomentLocalesPlugin({
//     localesToKeep: ['de'],
// });

const momentJs = function () {


};

export default momentJs;
