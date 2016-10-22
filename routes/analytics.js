module.exports = [{
    method: 'GET',
    path: '/analytics',
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
                    title: 'Analytics',
                    user: request.auth.credentials,
                    role: request.auth.credentials.type,
                    analytics: 'active'
                };
                return reply.view('charts', data, {
                    layout: 'analytics'
                })
            }
        }
    }
}];