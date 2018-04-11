var app = require('./express.js');


var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(session({
    secret: "This is my session", // encrypt your cookies when it goes out to the client.
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure a public directory to host static content
app.use(app.express.static(__dirname + '/public'));

require("./server/app.js");

var port = process.env.PORT || 3000;

app.listen(port);