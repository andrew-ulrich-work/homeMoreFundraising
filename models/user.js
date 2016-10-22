var timestamps = require('mongoose-times');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var user = new Schema({
  type: {
    type: String,
    enum: ['provider', 'client', 'bot']
  },
  name: String,
  phone: String
});
user.plugin(timestamps);
module.exports = mongoose.model('User', user);