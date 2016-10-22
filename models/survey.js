var timestamps = require('mongoose-times');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var survey = new Schema({
  user : {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  rootprompt : {
    type: Schema.Types.ObjectId,
    ref: 'Prompt'
  },
  name: String
});
survey.plugin(timestamps);
module.exports = mongoose.model('Survey', survey);