var timestamps = require('mongoose-times');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var prompt = new Schema({
  type: {
    type: String,
    enum: ['prompt', 'info', 'done']
  },
  survey : {
    type: Schema.Types.ObjectId,
    ref: 'Survey'
  },
  question: String,
  answers: Schema.Types.Mixed,
  nextprompt: Schema.Types.Mixed
});
prompt.plugin(timestamps);
module.exports = mongoose.model('Prompt', prompt);