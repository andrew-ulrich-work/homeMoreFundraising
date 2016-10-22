var Users = require('../users-db')
var Bcrypt = require('bcrypt')

module.exports = [{
    method: 'GET',
    path: '/private',
    config: {
        auth: "basic",
        description: 'Sends a friendly greeting!',
        notes: 'No route parameters available',
        tags: ['greeting'],
        handler: function(request, reply) {
            reply('Yeah! This message is only available for authenticated users!')
        },
    }
}, {
    method: 'GET',
    path: '/logout',
    config: {
        auth: 'session',
        handler: function(request, reply) {
            request.cookieAuth.clear();
            reply.view('index')
        }
    }
}, {
    method: 'POST',
    path: '/',
    config: {
        auth: {
            mode: 'try'
        },
        plugins: {
            'hapi-auth-cookie': {
                redirectTo: false
            }
        },
        handler: function(request, reply) {
            if (request.auth.isAuthenticated) {
                return reply.view('dashboard')
            }
            var username = request.payload.username
            var user = Users[username]
            if (!user) {
                return reply(Boom.notFound('No user registered with given credentials'))
            }
            var password = request.payload.password
            return Bcrypt.compare(password, user.password, function(err, isValid) {
                if (isValid) {
                    request.server.log('info', 'user authentication successful')
                    request.cookieAuth.set(user);
                    return reply.view('dashboard')
                }
                return reply.view('index')
            })
        }
    }
}];