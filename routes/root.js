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
                return reply.redirect('/dashboard');
            }
            var data = {
                title: 'Home',
                context: 'home'
            };
            return reply.view('index', data)
        }
    }
}, {
    method: 'GET',
    path: '/dashboard',
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
                var data = {
                    title: 'Dashboard',
                    user: request.auth.credentials,
                    role: request.auth.credentials.type,
                    dashboard: 'active'
                };
                return reply.view('dashboard', data)
            }
        }
    }
}, {
    method: 'GET',
    path: '/settings',
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
                return reply.view('settings')
            }
        }
    }
}, {
    method: 'GET',
    path: '/timeline',
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
                return reply.view('timeline')
            }
        }
    }
}, {
    method: 'GET',
    path: '/help',
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
                return reply.view('help')
            }
        }
    }
}];