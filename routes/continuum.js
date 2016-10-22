module.exports = [{
    method: 'GET',
    path: '/continuum',
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
                    title: 'Continuum Members',
                    user: request.auth.credentials,
                    role: request.auth.credentials.type,
                    analytics: 'active'
                };
                return reply.view('continuum', data, {
                    layout: 'default'
                })
            }
        }
    }
}];