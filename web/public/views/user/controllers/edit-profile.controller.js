(function(){
    angular
        .module('myProject')
        .controller('editProfileController', editProfileController)

    function editProfileController($location, $route, userService, currentUser){

        var model = this;

        model.update = update;
        model.user = currentUser;

        var userId = currentUser._id;
        console.log("userId is " + userId);

        model.logout = logout;



        function logout(){
            userService
                .logout()
                .then(function(){
                    $location.url('/');
                    $route.reload();
                });
        }

        function update(user, password, password1){
            if(password && password1){
                if(password === password1){
                    user.password = password;
                    user.vpassword = password1;
                    userService
                        .update(userId, user)
                        .then(function(user){
                            model.message = 'Profile is updated successfully';
                        });
                } else{
                    model.message = 'Passwords do not match';
                }
            } else{
                model.message = 'Oops! You haven\'t edited any field';
            }
        }

    }
})();