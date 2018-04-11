(function(){
    angular
        .module('myProject')
        .controller('signInController', signInController)

    function signInController($location, $routeParams, userService){

        var model = this;

        model.login = signIn;



        function signIn(username, password){

            if(username && password){
                userService
                    .signin(username, password)
                    .then(renderData,handleError);
            } else{
                model.message = "Please enter username and password!";
            }

            function renderData(user){
                if(user != null){
                    console.log("This is controller" + user);
                    $location.url('/');
                } else{
                    model.message = "Incorrect username/password, please try again1!";
                }
            }

            function handleError(error) {
                model.message = "Incorrect username/password, please try again!";
            }
        }


    }
})();