//var mongoose = require("mongoose");

//var connectionString = 'mongodb://localhost/Project';
//mongoose.connect(connectionString);
//mongoose.Promise = require('q').Promise;

var connectionString = 'mongodb://admin:admin@ds117758.mlab.com:17758/ayon_test';
//var connectionString = 'mongodb://127.0.0.1:27017/test';

//username = admin
//password = admin
//host = ds117758.mlab.com
//port = 17758
//app name = ayon_test
// if(process.env.MLAB_USERNAME) {
//     connectionString = process.env.MLAB_USERNAME + ":" +
//         process.env.MLAB_PASSWORD + "@" +
//         process.env.MLAB_HOST + ':' +
//         process.env.MLAB_PORT + '/' +
//         process.env.MLAB_APP_NAME;
// }

var mongoose = require("mongoose");
mongoose.connect(connectionString);
var TestSchema = mongoose.Schema({
    message: String
});
require("./services/user.service.server.js");

