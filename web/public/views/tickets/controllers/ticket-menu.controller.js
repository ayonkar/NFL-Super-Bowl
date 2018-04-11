(function () {
    angular
        .module('myProject')
        .controller('ticketMenuController', ticketMenuController)

    function ticketMenuController($location, $route, userService, currentUser, $rootScope, ticketService, $window) {

        var model = this;
        model.user = currentUser;

        model.travel1 = $rootScope.test;

        model.getMoreFlights = getMoreFlights;
        model.gotoAirlinesSite = gotoAirlinesSite;

        model.getMoreHotels = getMoreHotels;

        console.log("In log out ticket-menu1");
        model.prospect = prospect;
        model.bookTicket = bookTicket;
        model.logout = logout;

        model.dataLoading = true;
        model.dataLoading1 = true;
        model.dataLoading2 = false;
        console.log("In ticket menu controller using rootscope : " + model.nflTicketDetails);


        console.log("In log out ticket-menu2");

        function init() {
            console.log("the current user is" + currentUser);


            console.log("Init method in ticket controller " + model.travel1);

            nflTickets();
            flightTickets();
            hotelReservation();
            carRental();
        }

        init();

        var flightHomePages = {
            'AS': {
                'website': 'https://www.alaskaair.com/',
                'name': 'Alaska Air'
            },
            'AQ': {
                'website': 'https://www.hawaiianairlines.com/',
                'name': 'Hawaii Airlines'
            },
            'AA': {
                'website': 'https://www.aa.com/homePage.do',
                'name': 'American Airlines'
            },
            'DL': {
                'website': 'https://www.delta.com/',
                'name': 'Delta'
            },
            'HA': {
                'website': 'https://www.hawaiianairlines.com/',
                'name': 'Hawaii Airlines'
            },
            'NW': {
                'website': 'https://www.delta.com/',
                'name': 'Delta'
            },
            'WN': {
                'website': 'https://www.southwest.com/',
                'name': 'Southwest Airlines'
            },
            'UA': {
                'website': 'https://www.united.com/ual/en/us/',
                'name': 'United Airlines'
            },
            'B6': {
                'website': 'https://www.jetblue.com/',
                'name': 'JetBlue'
            },
            'SY': {
                'website': 'https://www.suncountry.com/booking/search.html',
                'name': 'Sun Country Airlines'
            },
            'VX': {
                'website': 'https://www.virginamerica.com/',
                'name': 'Virgin America'
            },
            'NK': {
                'website': 'https://www.spirit.com/Default.aspx',
                'name': 'Spirit Airlines'
            },
            'G4': {
                'website': 'https://www.allegiantair.com/',
                'name': 'Allegiant Airlines'
            },
            'F9': {
                'website': 'https://www.flyfrontier.com/',
                'name': 'frontier Airlines'
            }
        }

        var carHomePags = {
            'ALAMO': 'https://www.alamo.com/en_US/car-rental/home.html',
            'ENTERPRISE': 'https://www.enterprise.com/en/home.html',
            'BUDGET': 'https://www.budget.com/en/home',
            'DOLLAR': 'https://www.dollar.com/',
            'THRIFTY': 'https://www.thrifty.com/',
            'HERTZ': 'https://www.hertz.com/rentacar/reservation/',
            'NATIONAL': 'https://www.nationalcar.com/en_US/car-rental/home.html',
            'ACE': 'https://www.acerentacar.com/',
            'ADVANTAGE': 'https://www.advantage.com/',
            'PAYLESS': 'https://www.paylesscar.com/',
            'AVIS': 'https://www.avis.com/en/home',
            'EUROPCAR': 'https://www.europcar.com/'
        }


        function nflTickets() {
            console.log("NFL tickets method" + model.travel1);
            console.log("NFL tickets rootScope" + $rootScope.test);
            ticketService
                .getNFLTickets()
                .then(function (response) {
                    viewMatchTicketDetails(response)
                })
                .then(function () {
                    var mtb = angular.element(document.querySelector('#matchTicket'));
                    mtb.removeAttr('disabled');
                });
        }

        function flightTickets() {
            ticketService
                .getFlightTickets(model.travel1, 0, 0)
                .then(function (travel1DetailResponse) {
                    getFlightDetails(travel1DetailResponse);
                })
                .then(function () {
                    var ftb = angular.element(document.querySelector('#flightTicket'));
                    ftb.removeAttr('disabled');
                })
                .finally(function () {
                    model.dataLoading = false;
                });
        }

        function hotelReservation() {
            ticketService
                .getHotels(0, 0, model.travel1)
                .then(function (hotels) {
                    console.log("Returning from Amadeus client service");
                    hotelDetails(hotels);
                })
                .then(function () {
                    console.log("Hotel HTML view console");
                    var htb = angular.element(document.querySelector('#hotelReservation'));
                    console.log("For Hotel HTML view in detail" + htb);
                    htb.removeAttr('disabled');
                })
                .finally(function () {
                    model.dataLoading1 = false;
                    model.dataLoading2 = true;
                });
        }

        function carRental() {
            ticketService
                .getCars(model.travel1)
                .then(function (cars) {
                    carDetails(cars);
                })
                .then(function () {
                    var cb = angular.element(document.querySelector('#carRent'));
                    cb.removeAttr('disabled');
                });
        }

        function logout() {
            console.log("In log out ticket-menu");
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                    $route.reload();
                });
        }

        function prospect(view) {
            var mt = angular.element(document.querySelector('#matchTicket'));
            var ft = angular.element(document.querySelector('#flightTicket'));
            var ht = angular.element(document.querySelector('#hotelReservation'));

            if (view === 'match') {
                model.TicketType = 'views/tickets/templates/nfl-ticket.html';
                mt.addClass('active');
            }
            else if (view === 'flight') {
                model.TicketType = 'views/tickets/templates/flight-ticket.html';
            }
            else if (view === 'hotel') {
                model.TicketType = 'views/tickets/templates/hotel-reservation.html';

            } else if (view === 'car') {
                model.TicketType = 'views/tickets/templates/car-rental.html';

            }
        }

        function viewMatchTicketDetails(event) {
            console.log();
            model.nflTicketDetails = {};
            model.nflTicketDetails.name = event.name;
            model.nflTicketDetails.image = event.images[0].url;
            model.nflTicketDetails.address = event._embedded.venues[0].address.line1;
            // console.log("Address Line 1" + model.nflTicketDetails.address);
            model.nflTicketDetails.venue = event._embedded.venues[0].name;
            model.nflTicketDetails.city = event._embedded.venues[0].city.name;
            model.nflTicketDetails.state = event._embedded.venues[0].state.name;
            model.nflTicketDetails.country = event._embedded.venues[0].country.name;
            model.nflTicketDetails.date = event.dates.start.localDate;
            model.nflTicketDetails.start = event.dates.start.localTime;
            model.nflTicketDetails.min = event.priceRanges[0].min;
            model.nflTicketDetails.max = event.priceRanges[0].max;
            model.nflTicketDetails.saleStart = event.sales.public.startDateTime;
            model.nflTicketDetails.parkingDetail = event._embedded.venues[0].parkingDetail;
            model.nflTicketDetails.seatmap = event.seatmap.staticUrl;
            model.nflTicketDetails.url = event.url;
            console.log("URL" + model.nflTicketDetails.url);

            $rootScope.testnew = model.nflTicketDetails;

        }

        function getFlightDetails(airplane) {
            model.flightTicketDetails = [];
            for (var t in airplane) {
                flight = {};
                flight.price = airplane[t].saleTotal;
                flight.slices = [];
                for (var s in airplane[t].slice) {
                    travel1 = {};
                    travel1.segments = [];
                    for (var sg in airplane[t].slice[s].segment) {
                        current = {};
                        current.carrier = airplane[t].slice[s].segment[sg].flight.carrier;
                        flight.carrier = airplane[t].slice[s].segment[sg].flight.carrier;
                        current.number = airplane[t].slice[s].segment[sg].flight.number;
                        current.legs = [];
                        for (var l in airplane[t].slice[s].segment[sg].leg) {
                            info = {};
                            info.arrival = airplane[t].slice[s].segment[sg].leg[l].arrivalTime;
                            info.departure = airplane[t].slice[s].segment[sg].leg[l].departureTime;
                            info.origin = airplane[t].slice[s].segment[sg].leg[l].origin;
                            info.destination = airplane[t].slice[s].segment[sg].leg[l].destination;
                            current.legs.push(info)
                        }
                        travel1.segments.push(current);
                    }
                    flight.slices.push(travel1);
                }
                flight.airline = flightHomePages[flight.carrier].name;
                model.flightTicketDetails.push(flight);
            }
        }

        function getMoreFlights() {
            console.log("More Flights");
            ticketService
                .getFlightTickets(model.travel1, 1, model.flightTicketDetails.length)
                .then(function (travel1DetailResponse) {
                    getFlightDetails(travel1DetailResponse);
                });
        }


        function gotoAirlinesSite(ticket, type) {
            airline = flightHomePages[ticket.carrier].website;
            $window.open(airline, '_blank');
        }

        function hotelDetails(hotels) {
            model.hotels = []
            for (var r in hotels) {
                hotel = {}
                hotel.name = hotels[r].property_name;
                // hotel.image = hotels[r].images[1].url;
                hotel.latitude = hotels[r].location.latitude;
                console.log("Latitude" + hotel.latitude);
                hotel.longitude = hotels[r].location.longitude;

                // hotel.map = [];
                // for (var m in hotels[r].location) {
                //     //info1 = {};
                //     hotel.lat = hotels[r].location.latitude;
                //     hotel.lon = hotels[r].location.longitude;
                //     hotel.map.push(hotel.lat,hotel.lon);
                //     console.log("Hotel location array data" + hotel.map);
                // }


                hotel.price = hotels[r].total_price.currency + hotels[r].total_price.amount;
                hotel.address = hotels[r].address.line1;
                hotel.city = hotels[r].address.city;
                hotel.region = hotels[r].address.region;
                hotel.country = hotels[r].address.country;
                hotel.phone = hotels[r].contacts[0].detail;
                // hotel.image = [];
                // for (var a in hotels[r].images) {
                //     hotel.image.push(hotels[r].images[a].url);
                // }
                hotel.amenities = [];
                for (var a in hotels[r].amenities) {
                    hotel.amenities.push(hotels[r].amenities[a].description);
                }
                if (hotels[r].awards[0]) {
                    hotel.rating = hotels[r].awards[0].rating;
                }
                hotel.roomType = hotels[r].rooms[0].room_type_info.room_type;
                hotel.bedType = hotels[r].rooms[0].room_type_info.bed_type;
                hotel.beds = hotels[r].rooms[0].room_type_info.number_of_beds;
                hotel.description = [];
                for (var d in hotels[r].rooms[0].descriptions) {
                    hotel.description.push(hotels[r].rooms[0].descriptions[d]);
                }
                model.hotels.push(hotel);
            }
        }

        function getMoreHotels() {
            ticketService
                .getHotels(1, model.hotels.length, model.travel1)
                .then(function (hotels) {
                    hotelDetails(hotels);
                })
        }

        function carDetails(cars) {
            model.cars = []
            for (var c in cars) {
                car = {}
                car.company = cars[c].provider.company_name;
                car.companycode = cars[c].provider.company_code;
                car.line1 = cars[c].address.line1;
                car.city = cars[c].address.city;
                car.region = cars[c].address.region;
                car.country = cars[c].address.country;
                car.options = []
                for (var l in cars[c].cars) {
                    vehicle = {}
                    vehicle.transmission = cars[c].cars[l].vehicle_info.transmission;
                    vehicle.fuel = cars[c].cars[l].vehicle_info.fuel;
                    vehicle.category = cars[c].cars[l].vehicle_info.category;
                    vehicle.type = cars[c].cars[l].vehicle_info.type;
                    vehicle.rate = cars[c].cars[l].rates[0].price.currency + cars[c].cars[l].rates[0].price.amount;
                    if (cars[c].cars[l].images) {
                        vehicle.image = cars[c].cars[l].images[0].url;
                    }
                    vehicle.price = cars[c].cars[l].estimated_total.currency + cars[c].cars[l].estimated_total.amount;

                    car.options.push(vehicle);
                }
                car.website = carHomePags[cars[c].provider.company_name];
                model.cars.push(car);
            }
        }

        function bookTicket(nflTicketDetails) {

            console.log("Inside bookTicket function in controller");
            ticketService
                .bookTicket(nflTicketDetails)
                .then(function () {
                    console.log("Agin Inside bookTicket response");
                    model.name = 'Ticket Booked!';
                })
        }


    }
})();