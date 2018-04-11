(function(){
    angular
        .module('myProject')
        .controller('signUpController', signUpController)

    function signUpController($location, $routeParams, userService){

        var model = this;

        model.register = register;

        function register(user){

            if(!user)
            {
                model.message = 'All fields are required';
                return;
            }

            if(!user.username || !user.password || !user.vpassword){
                model.message = 'All fields are required';
                return;
            }



            if(user.password === user.vpassword){
                userService
                    .login(user)
                    .then(function(response){
                        console.log("In register" + response);
                        if (response.data == "1"){
                            model.message = 'User Already Exist';

                        } else{
                            console.log("Creating user" + response);
                            userService
                                .register(user)
                                .then(function (user) {
                                    console.log("ggggggggg");
                                    $location.url('/login');
                                });
                        }
                    });
            } else{
                model.message = 'Passwords do not match';
            }
        }
    }
})();