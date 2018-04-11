var mongoose = require('mongoose');
var userSchema = require('./user.schema.server.js');
var userModel = mongoose.model('UserModel', userSchema);
var ticketSchema = require('./ticket.schema.server.js');
var ticketModel = mongoose.model('TicketModel', ticketSchema);
var q = require('q');
userModel.searchUser = searchUser;
userModel.createUser = createUser;
userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserById = findUserById;
userModel.updateUser = updateUser;
userModel.bookTicket = bookTicket;
userModel.cancelTicketByName = cancelTicketByName;
userModel.findUserByGoogleId = findUserByGoogleId;

module.exports = userModel;


function searchUser(username, password){
    console.log(username);
    return userModel.findOne({username: username, password: password});
}

function createUser(user){

    var deffered = q.defer(); //
    userModel.create(user, function (err, user) {
        if(err){
            console.log("ERRRRROR" + err);
            deffered.reject(err);}
        else
            deffered.resolve(user);
    });
    return deffered.promise;
}

function findUserByCredentials(username,password){
    console.log(username);
    return userModel.findOne({username: username, password: password});
}

function findUserById(userId){
    return userModel.findById(userId);
}

function updateUser(userId,newUser){
    console.log("Edit Profile in model" + userId + "Yes" + newUser);
    return userModel.update({_id: userId},{$set: newUser});
}

function bookTicket(ticket){
    console.log("Ticket Name in user model server " + ticket);
     return ticketModel.create(ticket);
}

function cancelTicketByName(ticketName){
    console.log("In model cancelTicketBy Name" + ticketName);
    return ticketModel.remove({name:ticketName});
}

function findUserByGoogleId(googleId){
    return userModel.findOne({'google.id':googleId});
 }
