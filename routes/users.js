module.exports = [{
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
},{
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
    path: '/default',
    handler: function(request, reply) {
        reply.view('item', {
            title: 'Item Title',
            body: 'Item Body'
        });
    }
}, {
    method: 'GET',
    path: '/single',
    config: {
        auth: {
            mode: 'try',
        },
        plugins: {
            'hapi-auth-cookie': {
                redirectTo: false
            }
        },
        handler: function(request, reply) {
            reply.view('single', {
                title: 'Item Title',
                body: 'Item Body'
            }, {
                layout: 'single'
            });
        }
    }
},{
    method: 'GET',
    path: '/custom',
    config: {
        auth: {
            mode: 'try',
        },
        plugins: {
            'hapi-auth-cookie': {
                redirectTo: false
            }
        },
        handler: function(request, reply) {
            reply.view('item', {
                title: 'Item Title',
                body: 'Item Body'
            }, {
                layout: 'custom'
            });
        }
    }
}, {
    method: 'GET',
    path: '/js/{file*}',
    config: {
        auth: {
            mode: 'try',
        },
        plugins: {
            'hapi-auth-cookie': {
                redirectTo: false
            }
        },
        handler: {
            directory: {
                path: 'public/js'
            }
        }
    }
}, {
    method: 'GET',
    path: '/css/{file*}',
    config: {
        auth: {
            mode: 'try',
        },
        plugins: {
            'hapi-auth-cookie': {
                redirectTo: false
            }
        },
        handler: {
            directory: {
                path: 'public/css'
            }
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
}];