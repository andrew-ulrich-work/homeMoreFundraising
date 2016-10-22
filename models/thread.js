var timestamps = require('mongoose-times');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var thread = new Schema({
  providers:[{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  client: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});
thread.plugin(timestamps);
module.exports = mongoose.model('Thread', thread);