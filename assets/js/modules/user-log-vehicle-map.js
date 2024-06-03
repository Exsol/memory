//import {Loader, LoaderOptions} from 'google-maps';

const userLogVehicleMap = function ($, Routing) {

    $(document).ready(function () {

        if ($('.js--user-log-vehicle-map').length) {

            const logId = $('.js--user-log-vehicle-map').data('id');

            $.ajax({
                url: App.Routing.generate('admin_user_log_vehicle_map_ajax_data', {'id': logId}),
                method: 'POST',
                dataType: 'json'
            }).done(function (response) {

                if (response.map.length !== 0) {
                    $('#vehicleSumKm').text(response.map[0].sumKm);
                    $('.js--vehicle-sum-row').removeClass('is--hidden');

                    //const center = new google.maps.LatLng(response.map[0].lat, response.map[0].lng);
                    // const map = new google.maps.Map(document.getElementById("map"), {
                    //     zoom: 10,
                    //     center: center,
                    //     mapTypeId: "terrain",
                    // });

                    // Promise
                    mapsLoader
                        .load()
                        .then((google) => {
                            const center = new google.maps.LatLng(response.map[0].lat, response.map[0].lng);
                            const map = new google.maps.Map(document.getElementById("map"), {
                                zoom: 13,
                                center: center,
                                mapTypeId: "terrain",
                            });

                            // console.log(response.map);
                            var drawingManager;
                            var startLocation;
                            var lastLocation;
                            var marker, i;
                            var path;
                            var infoWindow = new google.maps.InfoWindow();
                            for (i = 0; i < response.map.length; i++) {
                                startLocation = new google.maps.LatLng(response.map[i].lat, response.map[i].lng);
                                if (response.map[i + 1] !== undefined) {
                                    lastLocation = new google.maps.LatLng(response.map[i + 1].lat, response.map[i + 1].lng);
                                } else {
                                    lastLocation = new google.maps.LatLng(response.map[i].lat, response.map[i].lng);
                                }
                                const lineSymbol = {
                                    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                                };
                                const icon = {
                                    url: response.map[i].speed === 0 ? "https://cdn.discordapp.com/attachments/930018447264477206/976045343357665350/vehicle-black.png" : "https://cdn.discordapp.com/attachments/930018447264477206/976045343647092746/vehicle-blue.png",
                                    scaledSize: new google.maps.Size(30, 30), // scaled size
                                };
                                marker = new google.maps.Marker({
                                    position: new google.maps.LatLng(response.map[i].lat, response.map[i].lng),
                                    map: map,
                                    title: '<strong>response.map[i].name</strong>',
                                    infoWindowContent: response.map[i],
                                    icon: icon
                                });
                                google.maps.event.addListener(marker, 'click', function () {
                                    infoWindow.setContent(this.infoWindowContent.name + '<br><br>' + this.infoWindowContent.lastDate + '<br><br>' + this.infoWindowContent.speed + ' km/h');
                                    infoWindow.open(map, this);
                                });
                                // marker.setAnimation(google.maps.Animation.BOUNCE);
                                path = new google.maps.Polyline({
                                    path: [startLocation, lastLocation],
                                    geodesic: true,
                                    strokeColor: "#FF0000",
                                    strokeOpacity: 1.0,
                                    strokeWeight: 2,
                                    icons: [
                                        {
                                            icon: lineSymbol,
                                            offset: "1",
                                            // repeat: "20px",
                                        },
                                    ],
                                });
                                path.setMap(map);
                                // pathLatLng = new google.maps.LatLng(response.map[i].lat, response.map[i].lng);
                            }

                        })
                        .catch(e => {
                            console.log(e);
                        });

                } else {
                    Swal.fire('Keine Daten', '', 'error');
                }
            });

        }
    });
};

export default userLogVehicleMap;

