//import {Loader, LoaderOptions} from 'google-maps';

const statsVehiclesMapForm = function ($, Routing) {
    $(document).ready(function () {

        if ($('.js--stats-vehicle').length) {

            $('.js--stats-vehicle').empty();

            function setHubs(newOptions) {
                displaySpinner('.js--spinner-hub', 'show');
                // $('.js--filter-hub').empty();
                $.each(newOptions, function (key, value) {
                    $('.js--filter-hub').append(
                        $("<option></option>").attr("value", value.id).text(value.text)
                    );
                });
                setTimeout(
                    function () {
                        displaySpinner('.js--spinner-hub', 'hide');
                    },
                    200
                );
            }

            function setVehicles(newOptions) {
                displaySpinner('.js--spinner-stats-vehicle', 'show');
                $('.js--stats-vehicle').empty();
                $.each(newOptions, function (key, value) {
                    $('.js--stats-vehicle').append(
                        $("<option></option>").attr("value", value.id).text(value.text)
                    );
                });
                setTimeout(
                    function () {
                        displaySpinner('.js--spinner-stats-vehicle', 'hide');
                    },
                    200
                );
            }

            function displaySpinner(cl, display) {
                if (display == 'show') {
                    $(cl).removeClass('is--hidden');
                } else {
                    $(cl).addClass('is--hidden');
                }
            }

            $.ajax({
                url: App.Routing.generate('admin_stats_hub_all_getter'),
                method: 'GET',
                success: function (data) {
                    setHubs(data);
                },
                error: function (data) {
                    console.log(data.responseJSON);
                }
            });


            // console.log("asdsadsadsa");
            const defaultVehicle = $('.js--default-vehicle').data('default-vehicle');
            $('#vehicle_map_vehicle').val(defaultVehicle).trigger('change');

            function buttonSpinner(act) {
                if (act === 'show') {
                    $('.js--filter-icon').addClass('is--hidden');
                    $('.js--filter-spinner').removeClass('is--hidden');
                } else {
                    $('.js--filter-icon').removeClass('is--hidden');
                    $('.js--filter-spinner').addClass('is--hidden');
                }
            }


            $('.js--filter-hub').on('change', function (e) {
                $('.js--stats-vehicle').empty();
                e.preventDefault();
                var hubs = $('.js--filter-hub').val();
                console.log(hubs);
                $.ajax({
                    url: App.Routing.generate('admin_stats_vehicle_array_getter'),
                    method: 'POST',
                    data: {
                        hubs: hubs
                    },
                    success: function (data) {
                        // console.log("qqqqq");
                        // console.log(data);
                        setVehicles(data);
                    },
                    error: function (data) {
                        console.log("data", data);
                        // console.log(data.responseJSON);
                    }
                });
            });


            $('.js--stats-vehicles-map-form').submit(function (e) {
                e.preventDefault();

                // check if vehicle is selected
                const hubVal = $('.js--stats-vehicles-map-form .js--stats-vehicle').val();
                if ( hubVal == "" || hubVal == null || typeof hubVal == 'undefined' ) {
                    Swal.fire(
                        'Achtung!',
                        'Bitte wählen Sie ein Fahrzeug aus, um fortzufahren.',
                        'warning'
                    );


                    return false;
                }


                var form = $(this);

                // set cookies when selected
                var dateFrom = $('.js--filter--date-from').val();
                var dateTo = $('.js--filter--date-to').val();
                Cookies.set('date_from', dateFrom, {expires: 30});
                Cookies.set('date_to', dateTo, {expires: 30});

                buttonSpinner('show');

                $.ajax({
                    url: App.Routing.generate('admin_vehicles_map_ajax'),
                    method: 'POST',
                    dataType: 'json',
                    data: form.serialize()
                }).done(function (response) {
                    buttonSpinner('hide');
                    if (response.table.length !== 0) {
                        $('#vehicleSumKm').text(response.table[0].sumKm);
                        $('.js--vehicle-sum-row').removeClass('is--hidden');

                        //const center = new google.maps.LatLng(response.table[0].lat, response.table[0].lng);
                        // const map = new google.maps.Map(document.getElementById("map"), {
                        //     zoom: 10,
                        //     center: center,
                        //     mapTypeId: "terrain",
                        // });

                        // Promise
                        mapsLoader
                            .load()
                            .then((google) => {
                                const center = new google.maps.LatLng(response.table[0].lat, response.table[0].lng);
                                const map = new google.maps.Map(document.getElementById("map"), {
                                    zoom: 13,
                                    center: center,
                                    mapTypeId: "terrain",
                                });

                                // console.log(response.table);
                                var drawingManager;
                                var startLocation;
                                var lastLocation;
                                var marker, i;
                                var path;
                                var infoWindow = new google.maps.InfoWindow();
                                for (i = 0; i < response.table.length; i++) {
                                    startLocation = new google.maps.LatLng(response.table[i].lat, response.table[i].lng);
                                    if (response.table[i + 1] !== undefined) {
                                        lastLocation = new google.maps.LatLng(response.table[i + 1].lat, response.table[i + 1].lng);
                                    } else {
                                        lastLocation = new google.maps.LatLng(response.table[i].lat, response.table[i].lng);
                                    }
                                    const lineSymbol = {
                                        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                                    };
                                    const icon = {
                                        url: response.table[i].speed === 0 ? "https://cdn.discordapp.com/attachments/930018447264477206/976045343357665350/vehicle-black.png" : "https://cdn.discordapp.com/attachments/930018447264477206/976045343647092746/vehicle-blue.png",
                                        scaledSize: new google.maps.Size(30, 30), // scaled size
                                    };
                                    marker = new google.maps.Marker({
                                        position: new google.maps.LatLng(response.table[i].lat, response.table[i].lng),
                                        map: map,
                                        title: '<strong>response.table[i].name</strong>',
                                        infoWindowContent: response.table[i],
                                        icon: icon
                                    });
                                    google.maps.event.addListener(marker, 'click', function () {
                                        infoWindow.setContent(this.infoWindowContent.name + '<br><br>' + this.infoWindowContent.lastDate + '<br><br>' + this.infoWindowContent.speed);
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
                                    // pathLatLng = new google.maps.LatLng(response.table[i].lat, response.table[i].lng);
                                }

                                buttonSpinner('hide');
                            })
                            .catch(e => {
                                console.log(e);
                            });

                    } else {
                        Swal.fire('Keine Daten', '', 'error');
                    }
                });

                return false;

            });
        }
    });
};

export default statsVehiclesMapForm;

