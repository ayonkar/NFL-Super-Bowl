(function () {
    angular
        .module('myProject')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home/templates/home.html',
                controller: 'homeController',
                controllerAs: 'model',
                    resolve: {
                        currentUser: checkLoggedIn
                }
            })
            .when('/login', {
                templateUrl: 'views/user/templates/sign-in.html',
                controller:'signInController',
                controllerAs: 'model'
            })
            .when('/signup', {
                templateUrl: 'views/user/templates/sign-up.html',
                controller: 'signUpController',
                controllerAs: 'model'
            })
            .when('/editProfile', {
                templateUrl: 'views/user/templates/edit-profile.html',
                controller: 'editProfileController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/tickets', {
                templateUrl: 'views/tickets/templates/ticket-menu.html',
                controller: 'ticketMenuController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/ticketbookings', {
                templateUrl: 'views/tickets/templates/ticket-bookings.html',
                controller: 'ticketBookingsController',
                controllerAs: 'model',
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
    }

    function checkLoggedIn(userService, $q, $location) {
        var deferred = $q.defer();
        userService
            .loggedin()
            .then(function (user) {
                if(user === '0') {
                    //deferred.reject();
                    deferred.resolve(null);
                    $location.url('/');
                } else {
                   //$location.url('/');
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }

    function checkCurrentUser(userService, $q, $location) {
        var deferred = $q.defer();
        userService
            .loggedin()
            .then(function (user) {
                if(user === '0') {
                    deferred.resolve({});
                } else {
                    deferred.resolve(user);
                }
            });

        return deferred.promise;
    }
})();