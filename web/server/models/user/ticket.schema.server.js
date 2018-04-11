var mongoose = require('mongoose');

var ticketSchema = mongoose.Schema({
    name: String,
    date: String,
    start: String,
}, {collection: 'ticket'});

module.exports = ticketSchema;