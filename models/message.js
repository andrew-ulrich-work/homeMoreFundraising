var timestamps = require('mongoose-times');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var message = new Schema({
  thread: {
    type: Schema.Types.ObjectId,
    ref: 'Thread'
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  message: String
});
message.plugin(timestamps);
module.exports = mongoose.model('Message', message);