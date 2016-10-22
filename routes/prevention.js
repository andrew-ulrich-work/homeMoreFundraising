module.exports = [{
    method: 'GET',
    path: '/prevention',
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
                    title: 'This is Index!',
                    user: request.auth.credentials,
                    role: request.auth.credentials.type,
                    prevention: 'active'
                };
                return reply.view('prevention', data, {
                    layout: 'default'
                })
            }
        }
    }
}];