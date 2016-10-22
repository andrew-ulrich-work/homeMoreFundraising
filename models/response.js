var timestamps = require('mongoose-times');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var response = new Schema({
  user : {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  survey : {
    type: Schema.Types.ObjectId,
    ref: 'Survey'
  },
  prompt: {
    type: Schema.Types.ObjectId,
    ref: 'Prompt'
  },
  answer: Schema.Types.Mixed
});
response.plugin(timestamps);
module.exports = mongoose.model('Response', response);