var timestamps = require('mongoose-times');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var shelter = new Schema({
  name: String,
  capacity: Number
});

shelter.plugin(timestamps);
module.exports = mongoose.model('Shelter', shelter);