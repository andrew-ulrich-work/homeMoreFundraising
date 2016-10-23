var mongoose = require('mongoose');
var User = mongoose.model('User');
var Thread = mongoose.model('Thread');
var Message = mongoose.model('Message');

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
}, {
  method: 'GET',
  path: '/users/{id}/history',
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
    Thread.findOne({client: req.params.id}).exec(function(err, result) {
      Message
      .find({thread: result._id})
      .populate({
        path: 'author',
        select: 'name type _id',
      })
      .exec(function(err, results) {
        return reply(results);
      });
    });
  }
}]