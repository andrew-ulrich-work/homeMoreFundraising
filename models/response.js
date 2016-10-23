var timestamps = require('mongoose-times');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var response = new Schema({
    phone: String,
    qId: String,
    response: String,
    surveyType: String
});

response.plugin(timestamps);
module.exports = mongoose.model('Response', response);
