var timestamps = require('mongoose-times');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var event = new Schema({
  type: {
    type: String,
    enum: ['checkin', 'checkout']
  },  
  client: User
});

event.plugin(timestamps);
module.exports = mongoose.model('Event', event);