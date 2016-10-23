var mongoose = require('mongoose');
var User = mongoose.model('User');
var Thread = mongoose.model('Thread');
var Message = mongoose.model('Message');

module.exports = [{
  method: 'GET',
  path: '/threads',
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
    /* Get the user by id */
    var user = User.find({id: req.user.id});
    // Get all threads for the current provider
    Thread.find({providers: user}).exec(function(err, results) {
      return reply(results);
    });
  }
}, {
  method: 'GET',
  path: '/threads/{id}',
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
    Thread.findOne({id: req.params.id}).exec(function(err, result) {
      return reply(result);
    });
  }
}, {
  method: 'GET',
  path: '/threads/{id}/messages',
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
    Message
    .find({thread: req.params.id})
    .populate({
      path: 'author',
      select: 'name type _id',
    })
    .exec(function(err, results) {
      return reply(results);
    });
  }
}]
