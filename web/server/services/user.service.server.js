var app = require('../../express.js');
var UserModel = require('../models/user/user.model.server.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
passport.use('local',new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

//loaded google strategy
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

//Configure google and using callback we are listening to our local

var googleConfig = {
    clientID     : '368451744535-dsiu61h7ohihqoj8qndtt0g0ujnaot9f.apps.googleusercontent.com',
    clientSecret : 'Lqu9Zv8mzEeEPkclrrT0LQd7',
    callbackURL  : 'http://127.0.0.1:3000/auth/google/callback'
};

passport.use(new GoogleStrategy(googleConfig, googleStrategy));
//app.post('/api/login', passport.authenticate('project'), login);

app.post('/api/login', login);
app.post('/api/register', register);
app.post('/api/signin', passport.authenticate('local'), signin);
app.get('/api/loggedin', loggedin);
app.post('/api/logout', logout);
app.put('/api/user/:userId', updateUserByUserId);
app.get('/api/project/user/:userId', findUserById);
app.post('/api/bookTicket', bookTicket);
app.delete('/api/cancelTicket/:ticketName', cancelTicketByName);

//redirects to google for logging in
app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

//comes back from google with a response
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/index.html#!/',
        failureRedirect: '/index.html#!/login'
    }));

function googleStrategy(token, refreshToken, profile, done) {
    UserModel
        .findUserByGoogleId(profile.id)
        .then(
            function(user) {
                if(user) {
                    return done(null, user);
                } else {
                    console.log("In google strategy else part");
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    console.log("The email is " + email);
                    console.log("The emailParts is " + emailParts[0]);
                    var newGoogleUser = {
                        username:  emailParts[0],
                        fName: profile.name.givenName,
                        lName:  profile.name.familyName,
                        email:     email,
                        google: {
                            id:    profile.id,
                            token: token
                        }
                    };
                    console.log("Username" + username + "fname"+ firstName + "lname" + lastName);
                    return UserModel.createUser(newGoogleUser);
                }
            },
            function(err) {
                if (err) { return done(err); }
            }
        )
        .then(
            function(user){
                return done(null, user);
            },
            function(err){
                if (err) { return done(err); }
            }
        );
}

function cancelTicketByName(req,res)
{
    var ticketName = req.params['ticketName'];

    console.log("The ticket name in user service server is " + ticketName);

    UserModel
        .cancelTicketByName(ticketName)
        .then(function(){
            if(ticketName){
                res.json(ticketName);
            } else{
                res.sendStatus(400).send(err);
            }
        });

}
function bookTicket(req, res){
    var ticket = req.body;
    // console.log(ticket)
    //console.log("Inside bookTicket server function" + ticket.name);
    UserModel
        .bookTicket(ticket)
        .then(function(){
            console.log("Inside bookTicket server function return from user model");
            res.sendStatus(200);
            return;
        }, function(){
            res.sendStatus(404);
            return;
        });
}

function register(req, res) {
    var user = req.body;
    console.log("Yahoo in server" + user);
    UserModel
        .createUser(user)
        .then(function(user){
            console.log("Creaing user in server" + user);
            //res.sendStatus(200);
            res.json(user);
        });
}

function createUser(req, res){
    var user = req.body;

    UserModel
        .createUser(user)
        .then(function(user){
            if(user){
                res.json(user);
            } else{
                res.sendStatus(400);
            }
        });
}

function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}

function loggedin(req, res) {
    if(req.isAuthenticated()) {
        res.json(req.user);
        console.log("in loggedin"+req.user);
    } else {
        res.send('0');
    }
}


function localStrategy(username, password, done) {

    UserModel
        .findUserByCredentials(username,password)

        .then(
            function(user) {
                console.log(username);

                if(user) {
                    return done(null, user); //user exist
                } else{
                    return done(null, false); // user does not exist
                }
            },
            function(err) {
                console.log(password);

                if (err) {
                    return done(err); } // database error may be database was timed out ot there was a connection error
            }
        );
}

function signin(req, res) {

    var user = req.user;
    console.log("aaaaaaaaaa" + user);
    res.json(user);
}

function login(req, res) {
    //var user = req.user;
    var user = req.body;
    console.log(user);
    UserModel
        .searchUser(user.username, user.password)
        .then( function(response){
            console.log("In login "+response);
            if(response){
                console.log("In login IF"+response);
                res.send("1");
            } else{
                res.send("-1");
            }
        });
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    UserModel
        .findUserById(user._id)
        .then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
}
function findUserById(req, res) {
    var userId = req.params['userId'];
    UserModel
        .findUserById(userId)
        .then(function(user){
            if(user){
                res.json(user);
            } else{
                res.sendStatus(400).send(err);
            }
        });
}

function updateUserByUserId(req, res) {
    var user = req.body;
    var userId = req.params['userId'];

    UserModel
        .updateUser(userId, user)
        .then(function(user){
            console.log("Edit Profile in Server" + userId + "Yes" + user);
            if(user){
                res.json(user);
            } else{
                res.sendStatus(400).send(err);
            }
        });
}