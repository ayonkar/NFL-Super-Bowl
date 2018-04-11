(function() {
    angular
        .module('myProject')
        .controller('ticketBookingsController', ticketBookingsController)

    function ticketBookingsController($location, $route,userService, currentUser,ticketService,$scope, $rootScope) {

        console.log("YAHOOO Ticket Booking Controller");

        var model = this;

        model.user = currentUser;
        model.logout = logout;
        model.userId = currentUser._id;

        model.nfltickets = $rootScope.testnew ;


        model.cancelTicket = cancelTicket;

        function init(){
            console.log("YO" + model.nfltickets);

        }
        init();





        function logout(){
            console.log("In logout ticketbooking");
            userService
                .logout()
                .then(function(){
                    console.log("In logout ticketbooking response");
                    $location.url('/');
                    $route.reload();
                });
        }

        function cancelTicket(ticketName){
            ticketService
                .cancelTicket(ticketName)
                .then(function(nfltickets){
                    model.nfltickets = nfltickets;
                })
        }

    }
})();
