var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: {type: String, unique: true},
    password: String,
    vpassword: String,
    fname: String,
    lname: String,
    email: String,
    gender: String,
    birthday: String,
    google: {id: String, token: String},
    dateCreated: {type: Date, default: Date.now()}
}, {collection: 'user'});

module.exports = userSchema;

