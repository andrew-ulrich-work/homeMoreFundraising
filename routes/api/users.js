var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = [{
  method: 'GET',
  path: '/users',
  config: {
    auth: {
      mode: 'try'
    },
    plugins: {
      'hapi-auth-cookie':  {
        redirectTo: false
      }
    }
  },
  handler: function(req, reply) {
    User.find({type: 'client'}).exec(function(err, results) {
      return reply(results);
    });
  }
}]