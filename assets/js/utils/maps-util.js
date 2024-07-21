import { Loader } from '@googlemaps/js-api-loader';


const mapsLoader = new Loader({
    apiKey: "",
    version: "weekly",
    libraries: ["places"]
});

global.mapsLoader = mapsLoader;

// // Promise
// loader
//     .load()
//     .then((google) => {
//         new google.maps.Map(document.getElementById("map"), mapOptions);
//     })
//     .catch(e => {
//         console.log(e);
//     });


const mapsUtil = function ($) {

};

export default mapsUtil;
