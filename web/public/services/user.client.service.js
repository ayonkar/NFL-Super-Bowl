(function () {
    angular
        .module('myProject')
        .factory('userService', userService);

    function userService($http) {

        var api = {
            login: login,
            register: register,
            signin: signin,
            update: update,
            loggedin: loggedin,
            logout: logout,
        };
        return api;

        function register(user) {
            var url = "/api/register";
            return $http
                .post(url, user)
                .then(function (response) {
                    console.log("In register client " + response);
                    return response.data;
                });
        }

        function login(user) {
            var url = "/api/login";
            return $http
                .post(url, user);
        }


        function logout() {
            var url = "/api/logout";
            return $http
                .post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function loggedin() {
            var url = "/api/loggedin";
            return $http
                .get(url)
                .then(function (response) {
                    console.log("in client loggedin" + response.data);
                    return response.data;
                });
        }

        function signin(username, password) {
            var url = '/api/signin';
            var credentials = {
                username: username,
                password: password
            }
            console.log(credentials);
            return $http
                .post(url, credentials);
        }

        function update(userId, user) {
            console.log("Yes");
            var url = "/api/user/" + userId;
            console.log("No" + userId);
            return $http
                .put(url, user)
                .then(function (response) {
                    return response.data;
                })

        }
    }
})();