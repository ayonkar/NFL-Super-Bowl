(function () {
    angular
        .module('myProject')
        .controller('homeController', homeController)

    function homeController($location, $route, $http, userService, currentUser, $rootScope) {

        var model = this;

        model.currentUser = currentUser;


        model.checkEvents = checkEvents;

        model.logout = logout;

        // model.myFunction = myFunction;

        function init() {
            console.log("the current user is" + currentUser);
            getAirportInfo();


        }

        init();


        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/');
                    $route.reload();
                });
        }

        function getAirportInfo() {

            console.log("In airport Info");
            $http.get('assets/airportInfo.json')
                .then(function (airportInfo) {
                    model.airportInfo = airportInfo.data;
                });
        }

        function checkEvents(travel) {

            if (!travel) {
                model.message = 'All fields are required';
                return;
            }

            if (!travel.origin || !travel.destination || !travel.departureDate || !travel.arrivalDate || !travel.noOfPeople || !travel.zone) {
                model.message = 'All fields are required';
            }
            else if (!validateTravelDates(travel)) {
                return;
            }
            else {
                model.travel = travel;

                $rootScope.test = model.travel;
                console.log("In home controller : " + $rootScope.test);
                $location.url('/tickets');
            }

        }

        function validateTravelDates(travel) {

            console.log("Authenticating");
            departureDate = new Date(travel.departureDate);
            console.log("DepartureDate" + departureDate);
            arrivalDate = new Date(travel.arrivalDate);
            console.log("ArrivalDate" + arrivalDate);
            currentDate = new Date();
            console.log("CurrentDate " + currentDate);
            origin = travel.origin;
            destination = travel.destination;


            if (arrivalDate - departureDate < 0) {
                model.message = 'The arrival date cannot be before the departure date. Please select the correct departure date and/or arrival date.';
                return false;
            } else if (departureDate - currentDate < 0) {
                console.log("2nd IF");
                model.message = 'The departure date cannot less than the current date. Please select a different departure date.';
                return false;
            } else if (origin === destination) {
                model.message = 'The origin city and destination city cannot be same. Please re-type';
            } else {
                return true;
            }
        }

        // function myFunction(){
        //     console.log("Inside datepicker function");
        //     $('#datepicker1').click(function() {
        //         $("#datepicker1").datepicker({
        //             dateFormat: "yy-mm-dd"
        //         });
        //     }).click();
        // }

    }
})();