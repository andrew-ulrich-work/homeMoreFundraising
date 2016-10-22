module.exports = [{
    method: 'GET',
    path: '/shelter',
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
                    title: 'Shelter',
                    user: request.auth.credentials,
                    role: request.auth.credentials.type,
                    shelter: 'active'
                };
                return reply.view('shelter', data, {
                    layout: 'default'
                })
            }
        }
    }
}];