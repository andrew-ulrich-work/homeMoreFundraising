var Users = require('./users-db')
var Bcrypt = require('bcrypt')
var Boom = require('boom')
var Users = require('./users-db')

var routes = [{
    method: 'GET',
    path: '/json',
    handler: function(request, reply) {
        var data = {
            key: 'value',
            another: false,
            number: 10,
            func: function() {
                return this.number * 10
            }
        }

        reply(data)
    }
}, {
    method: 'GET',
    path: '/private',
    handler: function(request, reply) {
        reply('Yeah! This message is only available for authenticated users!')
    },
    config: {
        auth: "basic",
        description: 'Sends a friendly greeting!',
        notes: 'No route parameters available',
        tags: ['greeting']
    }
}, {
    method: 'GET',
    path: '/',
    config: {
        auth: {
            mode: 'try',
            strategy: 'session'
        },
        plugins: {
            'hapi-auth-cookie': {
                redirectTo: false
            }
        },
        handler: function(request, reply) {
            if (request.auth.isAuthenticated) {
                return reply.view('profile')
            }

            reply.view('index')
        }
    }
}, {
    method: 'GET',
    path: '/parallax',
    config: {
        auth: {
            mode: 'try',
            strategy: 'session'
        },
        plugins: {
            'hapi-auth-cookie': {
                redirectTo: false
            }
        },
        handler: function(request, reply) {
            if (request.auth.isAuthenticated) {
                return reply.view('profile')
            }

            reply.view('parallax')
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
                return reply.view('Profile')
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
                    return reply.view('profile')
                }

                return reply.view('index')
            })
        }
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
}];


module.exports = routes
