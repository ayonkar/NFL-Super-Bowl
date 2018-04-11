(function () {
    angular
        .module('myProject')
        .factory('ticketService', ticketService);

    function ticketService($http) {

        var api = {
            getNFLTickets: getNFLTickets,
            getFlightTickets: getFlightTickets,
            getHotels: getHotels,
            getCars: getCars,
            bookTicket: bookTicket,
            cancelTicket: cancelTicket,
        };
        return api;

        function getNFLTickets() {

            var url = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=' + '8xDHOknRSAAABtfseUyJ575a2tbem1I2' + '&keyword=new york giants';
            return $http
                .get(url)
                .then(function (response) {
                    return response.data._embedded.events[0];
                }, function (err) {
                    console.log(err);
                });
        }

        function getFlightTickets(travel1, flag, size) {
            console.log("In client getFlights");
            if (flag === 1 || flag === '1') {
                count = size + 15;
            } else {
                count = 15;
            }

            var details = {
                "request": {
                    "passengers": {
                        "adultCount": travel1.noOfPeople
                    },
                    "slice": [{
                        "origin": travel1.origin,
                        "destination": travel1.destination,
                        "date": travel1.departureDate,
                        "preferredCabin": travel1.zone
                    }, {
                        "origin": travel1.destination,
                        "destination": travel1.origin,
                        "date": travel1.arrivalDate,
                        "preferredCabin": travel1.zone
                    }],
                    "solutions": count,
                    "refundable": true
                }
            }

            var api = 'AIzaSyBJoisTMUjUlY6JRMmr0EJjmaZnM1WduJs';
            var url = 'https://www.googleapis.com/qpxExpress/v1/trips/search?key=' + api;
            return $http
                .post(url, details)
                .then(function (response) {
                    console.log("Google API");
                    return response.data.trips.tripOption;
                }, function (err) {
                    console.log(err);
                });
        }

        function getHotels(flag, size, travel1) {
            if (flag === 0 || flag === '0') {
                count = 15;
            } else {
                count = size + 15;
            }
            var key = 'Awl5tvyQ2nqrcd4rqPM2LCXV4dGGjWyp';
            var url = 'https://api.sandbox.amadeus.com/v1.2/hotels/search-airport?apikey=' + key + '&location=' + travel1.destination + '&check_in=' + travel1.departureDate + '&check_out=' + travel1.arrivalDate + '&radius=50&number_of_results=' + count;

            return $http
                .get(url)
                .then(function (response) {
                    console.log("Amadeus API");
                    console.log("Amadeus Hotel Results" + response.data.results);
                    return response.data.results;
                }, function (err) {
                    console.log(err);
                });

        }

        function getCars(travel1) {

            var key = 'HFhXP9LZlMH037wICJgcZrAdpzIsKWdN';
            var url = 'https://api.sandbox.amadeus.com//v1.2/cars/search-airport?apikey=' + key + '&location=' + travel1.destination + '&pick_up=' + travel1.departureDate + '&drop_off=' + travel1.arrivalDate;

            return $http
                .get(url)
                .then(function (response) {
                    return response.data.results;
                }, function (err) {
                    console.log(err);
                });
        }


        function bookTicket(nflTicketDetails) {
            var url = '/api/bookTicket';
            return $http
                .post(url, nflTicketDetails)
                .then(function (response) {
                    console.log("Inside bookTicket ticket client sservice");
                    console.log("Inside bookTicket ticket client sservice data" + response.data);
                    return response.data;
                }, function (err) {
                    console.log(err);
                })
        }


        function cancelTicket(ticketName) {
            var url = '/api/cancelTicket/' + ticketName;

            console.log("The ticket name in ticket client service is " + ticketName);
            return $http
                .delete(url)
                .then(function (response) {
                    return response.data;
                });
        }


    }
})();
